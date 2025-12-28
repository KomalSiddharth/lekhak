import { supabase } from '@/lib/supabase';

export interface Suggestion {
  offset: number;
  length: number;
  original: string;
  suggestion: string;
  explanation: string;
  type: 'grammar' | 'style' | 'tone';
  category: 'correctness' | 'clarity' | 'engagement' | 'delivery';
}

export interface Alternative {
  text: string;
  label: string;
}

export interface GrammarCheckResult {
  suggestions: Suggestion[];
  alternatives: Alternative[];
}

// Local Patterns for common Hinglish/Hindi errors and basic English typos
const LOCAL_PATTERNS = [
  {
    regex: /\b(i|I)\s+needs\b/g,
    suggestion: 'need',
    explanation: 'Subject-verb agreement: Use "need" with "I".',
    type: 'grammar' as const,
    category: 'correctness' as const,
  },
  {
    regex: /\bja(a+)\s+raha\b/g,
    suggestion: 'ja raha',
    explanation: 'Spelling: "ja" is the standard transliteration.',
    type: 'style' as const,
    category: 'clarity' as const,
  },
  {
    regex: /\bimportent\b/gi,
    suggestion: 'important',
    explanation: 'Spelling: Use "important" instead.',
    type: 'grammar' as const,
    category: 'correctness' as const,
  },
  {
    regex: /\balot\b/gi,
    suggestion: 'a lot',
    explanation: 'Spelling: "a lot" should be two words.',
    type: 'grammar' as const,
    category: 'correctness' as const,
  },
  {
    regex: /\bcontinously\b/gi,
    suggestion: 'continuously',
    explanation: 'Spelling: Check your spelling of "continuously".',
    type: 'grammar' as const,
    category: 'correctness' as const,
  },
];

const callLanguageTool = async (text: string): Promise<Suggestion[]> => {
  try {
    const response = await fetch('https://api.languagetool.org/v2/check', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        text: text,
        language: 'en-US', // Default to English rules for general grammar
      }),
    });

    const data = await response.json();
    return data.matches.map((match: any) => ({
      offset: match.offset,
      length: match.length,
      original: text.substring(match.offset, match.offset + match.length),
      suggestion: match.replacements[0]?.value || '',
      explanation: match.message,
      type: 'grammar' as const,
      category: 'correctness' as const,
    }));
  } catch (e) {
    console.error('LanguageTool call failed:', e);
    return [];
  }
};

export const checkGrammar = async (text: string): Promise<GrammarCheckResult> => {
  if (!text.trim()) return { suggestions: [], alternatives: [] };

  let allSuggestions: Suggestion[] = [];
  let allAlternatives: Alternative[] = [];

  // 1. Parallel Execution: LanguageTool (Layer 1) & Supabase/Gemini (Layer 2)
  const [ltResults, aiResults] = await Promise.all([
    callLanguageTool(text),
    supabase ? supabase.functions.invoke('check-grammar', { body: { text } }).catch(() => ({ data: null, error: true })) : Promise.resolve({ data: null, error: true })
  ]);

  // Combine LanguageTool Results
  allSuggestions = [...ltResults];

  // Combine AI Results
  if (aiResults?.data) {
    const aiSuggestions: Suggestion[] = aiResults.data.suggestions || [];
    allAlternatives = aiResults.data.alternatives || [];

    // Smart Merge: Don't add AI suggestion if it overlaps with an LT suggestion
    aiSuggestions.forEach(aiSug => {
      const isOverlap = allSuggestions.some(ltSug =>
        (aiSug.offset >= ltSug.offset && aiSug.offset < ltSug.offset + ltSug.length) ||
        (ltSug.offset >= aiSug.offset && ltSug.offset < aiSug.offset + aiSug.length)
      );
      if (!isOverlap) {
        allSuggestions.push(aiSug);
      }
    });
  }

  // 2. Local Pattern Matching (Last resort for specific project overrides)
  LOCAL_PATTERNS.forEach(pattern => {
    let match;
    pattern.regex.lastIndex = 0; // Reset regex
    while ((match = pattern.regex.exec(text)) !== null) {
      if (!allSuggestions.some(s => s.offset === match!.index)) {
        allSuggestions.push({
          offset: match.index,
          length: match[0].length,
          original: match[0],
          suggestion: pattern.suggestion,
          explanation: pattern.explanation,
          type: pattern.type,
          category: pattern.category,
        });
      }
    }
  });

  // Sort by offset
  allSuggestions.sort((a, b) => a.offset - b.offset);

  return { suggestions: allSuggestions, alternatives: allAlternatives };
};
