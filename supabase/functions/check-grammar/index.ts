import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const GROQ_API_KEY = Deno.env.get('GROQ_API_KEY');

interface CheckRequest {
  text: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { text } = await req.json() as CheckRequest;

    if (!text || text.trim().length === 0) {
      return new Response(
        JSON.stringify({ suggestions: [], alternatives: [] }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!GROQ_API_KEY) {
      throw new Error('GROQ_API_KEY is not set');
    }

    const systemPrompt = `
      You are Lekhak AI, a world-class Hinglish Editor Engine powered by a multi-stage reasoning process. 
      Your goal is to provide 95%+ accurate grammar and style corrections for Indian users who mix Hindi and English (Hinglish).

      ### MULTI-STAGE REASONING PROCESS:
      1. **ANALYZE**: Detect if the text is English, Hindi (Devanagari), or Hinglish (Roman Hindi). Identify the user's intent (Professional vs. Casual).
      2. **CRITIQUE**: 
         - Ignore common transliteration variances (e.g., 'pata' vs 'pataa' are both fine).
         - FLAG stylistic issues (repetitive words, weak vocabulary).
         - FLAG simple grammar errors in English (e.g., "He go" -> "He goes").
         - FLAG gender agreement errors in Hinglish (e.g., "Main jaati hoon" for male context if obvious, text-dependent).
      3. **REFINE**: Verify that every suggested replacement fits the context perfectly. Do NOT hallucinatie errors. If specific nouns are used (e.g., names like 'Rahul'), do not change them.

      ### OUTPUT SCHEMA (Strict JSON):
      Return a JSON object with two arrays: 'suggestions' and 'alternatives'.

      'suggestions': Array of objects for specific fixes.
      - original: The exact substring from the text to be replaced (MUST match exactly).
      - suggestion: The corrective replacement.
      - type: 'grammar' | 'spelling' | 'style'
      - category: 'correctness' (red) | 'clarity' (blue) | 'engagement' (green) | 'delivery' (purple)
      - explanation: A short, 5-8 word explaining WHY (e.g., "Subject-verb disagreement", "More professional term").

      'alternatives': Array of objects for full-sentence rewrites.
      - label: "Professional" | "Creative" | "Casual"
      - text: A complete rewrite of the input text in that style. make sure to generate at least one of each.

      ### HINGLISH EXAMPLES (Allowed vs Errors):
      - ALLOWED: "Main kal market ja raha hoon." (Correct Hinglish)
      - ERROR: "Main kal market go raha hoon." -> Fix "go" to "ja" or "going".
      - ERROR: "I has completed work." -> Fix "has" to "have" (Correctness).
      - STYLE: "Send me the file." -> "Could you please send the file?" (Delivery/Politeness).

      ### CRITICAL RULES:
      - Do NOT change the meaning.
      - Do NOT correct valid Hindi words (e.g., "Matlab", "Chalo", "Theek hai").
      - Only flag usage that is grammatically broken in its respective language context.
    `;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: text }
        ],
        temperature: 0.1, // Low temp for precision
        response_format: { type: "json_object" }
      }),
    });

    const data = await response.json();

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('Invalid response from Groq');
    }

    const aiResponse = JSON.parse(data.choices[0].message.content);

    // Post-processing to add offsets (Bulletproof Mapping)
    // We find the index of 'original' in 'text' to ensure the client can underline it.
    // Note: This simple find logic assumes the first occurrence. For production text-map sync, 
    // we usually need more robust token alignment, but for this snippet, strict matching is a good start.
    const suggestionsWithOffsets = aiResponse.suggestions.map((s: any) => {
      const offset = text.indexOf(s.original);
      return {
        ...s,
        offset: offset,
        length: s.original.length
      };
    }).filter((s: any) => s.offset !== -1); // Filter out hullucinations where original text isn't found

    return new Response(
      JSON.stringify({
        suggestions: suggestionsWithOffsets,
        alternatives: aiResponse.alternatives
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
