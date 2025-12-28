import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Extension } from '@tiptap/core';
import { Plugin, PluginKey } from '@tiptap/pm/state';
import { Decoration, DecorationSet } from '@tiptap/pm/view';
import Underline from '@tiptap/extension-underline';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/hooks/use-toast';
import { checkGrammar, Suggestion, Alternative } from '@/services/ai';
import {
    X, Wand2, Check, Sparkles, Lightbulb, RefreshCw,
    FileText, History, Trash, HelpCircle, LogOut, Trophy,
    Bold, Italic, Underline as UnderlineIcon, Heading1, Heading2,
    List, ListOrdered, Eraser, ChevronUp,
    Search, ShieldCheck
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

// Text Map approach: Maps every plain text character offset to its Prosemirror position.
const getTextMap = (doc: any) => {
    const map: number[] = [];
    let currentOffset = 0;

    doc.descendants((node: any, pos: number) => {
        if (node.isText) {
            for (let i = 0; i < node.text.length; i++) {
                map[currentOffset + i] = pos + i;
            }
            currentOffset += node.text.length;
        } else if (node.isBlock && pos > 0 && node.type.name !== 'doc') {
            map[currentOffset] = pos;
            currentOffset += 1;
        }
    });
    return map;
};

const getPosFromOffset = (map: number[], offset: number) => {
    return map[offset] || offset + 1;
};

const LineDecorationExtension = Extension.create<{ suggestions: Suggestion[], onSuggestionClick: (s: Suggestion, pos: { top: number, left: number }) => void }>({
    name: 'lineDecorations',
    addProseMirrorPlugins() {
        return [
            new Plugin({
                key: new PluginKey('lineDecorations'),
                props: {
                    decorations: (state) => {
                        const suggestions = this.options.suggestions;
                        const decorations: Decoration[] = [];
                        const textMap = getTextMap(state.doc);

                        suggestions.forEach((s) => {
                            const from = getPosFromOffset(textMap, s.offset);
                            const to = from + s.length;

                            if (from >= 0 && to <= state.doc.content.size) {
                                if (s.original) {
                                    const actualWord = state.doc.textBetween(from, to).toLowerCase().trim();
                                    const expectedWord = s.original.toLowerCase().trim();
                                    if (!actualWord.includes(expectedWord) && !expectedWord.includes(actualWord)) {
                                        return;
                                    }
                                }

                                decorations.push(
                                    Decoration.inline(from, to, {
                                        class: cn(
                                            'cursor-pointer border-b-2 transition-all duration-200 py-0.5',
                                            s.category === 'correctness' ? 'border-red-500 bg-red-500/10' :
                                                s.category === 'clarity' ? 'border-blue-500 bg-blue-500/10' :
                                                    s.category === 'engagement' ? 'border-green-500 bg-green-500/10' :
                                                        'border-purple-500 bg-purple-500/10'
                                        ),
                                        'data-suggestion': JSON.stringify(s)
                                    })
                                );
                            }
                        });
                        return DecorationSet.create(state.doc, decorations);
                    },
                    handleDOMEvents: {
                        click: (_view, event) => {
                            const node = event.target as HTMLElement;
                            const suggestionData = node.getAttribute('data-suggestion');
                            if (suggestionData) {
                                const s = JSON.parse(suggestionData) as Suggestion;
                                this.options.onSuggestionClick(s, { top: event.clientY, left: event.clientX });
                                return true;
                            }
                            return false;
                        }
                    }
                }
            })
        ];
    },
});

const MenuBar = ({ editor }: { editor: any }) => {
    if (!editor) return null;

    return (
        <div className="flex items-center gap-1 px-6 py-3 bg-white dark:bg-card border-t border-border/30 rounded-b-[3rem] shadow-[0_-10px_30px_rgba(0,0,0,0.02)]">
            <div className="flex items-center gap-1">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={cn("h-10 w-10 p-0 rounded-xl transition-all", editor.isActive('bold') ? "bg-primary/10 text-primary font-black" : "opacity-60 hover:opacity-100")}
                >
                    <Bold className="h-4 w-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={cn("h-10 w-10 p-0 rounded-xl transition-all", editor.isActive('italic') ? "bg-primary/10 text-primary" : "opacity-60 hover:opacity-100")}
                >
                    <Italic className="h-4 w-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    className={cn("h-10 w-10 p-0 rounded-xl transition-all", editor.isActive('underline') ? "bg-primary/10 text-primary" : "opacity-60 hover:opacity-100")}
                >
                    <UnderlineIcon className="h-4 w-4" />
                </Button>

                <div className="w-[1px] h-6 bg-border/50 mx-2"></div>

                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={cn("h-10 w-10 p-0 rounded-xl transition-all", editor.isActive('heading', { level: 1 }) ? "bg-primary/10 text-primary" : "opacity-60 hover:opacity-100")}
                >
                    <Heading1 className="h-4 w-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={cn("h-10 w-10 p-0 rounded-xl transition-all", editor.isActive('heading', { level: 2 }) ? "bg-primary/10 text-primary" : "opacity-60 hover:opacity-100")}
                >
                    <Heading2 className="h-4 w-4" />
                </Button>

                <div className="w-[1px] h-6 bg-border/50 mx-2"></div>

                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={cn("h-10 w-10 p-0 rounded-xl transition-all", editor.isActive('orderedList') ? "bg-primary/10 text-primary" : "opacity-60 hover:opacity-100")}
                >
                    <ListOrdered className="h-4 w-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={cn("h-10 w-10 p-0 rounded-xl transition-all", editor.isActive('bulletList') ? "bg-primary/10 text-primary" : "opacity-60 hover:opacity-100")}
                >
                    <List className="h-4 w-4" />
                </Button>

                <div className="w-[1px] h-6 bg-border/50 mx-2"></div>

                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
                    className="h-10 w-10 p-0 rounded-xl hover:text-red-500 opacity-60 transition-all"
                >
                    <Eraser className="h-4 w-4" />
                </Button>
            </div>

            <div className="ml-auto flex items-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-2 group cursor-pointer hover:bg-primary/5 px-3 py-1.5 rounded-lg transition-all">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 italic">
                        {(editor.getText() || "").split(/\s+/).filter(Boolean).length} words
                    </span>
                    <ChevronUp className="h-3 w-3 opacity-30 group-hover:translate-y-[-2px] transition-transform" />
                </div>
            </div>
        </div>
    );
};

const SkillTree: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const levels = [
        { id: 1, title: 'The Beginner', status: 'completed', icon: '🌱', description: 'Start your journey with basic grammar and spelling.' },
        { id: 2, title: 'Hinglish Hero', status: 'current', icon: '⚔️', description: 'Master the art of blending Hindi and English.' },
        { id: 3, title: 'Tone Artisan', status: 'locked', icon: '🎨', description: 'Learn to switch between Professional and Casual tones.' },
        { id: 4, title: 'Style Savant', status: 'locked', icon: '✨', description: 'Polish your writing for maximum impact and clarity.' },
        { id: 5, title: 'Lekhak Vigya', status: 'locked', icon: '👑', description: 'The ultimate master of writing. Flawless and creative.' },
    ];

    return (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
            <Card className="w-full max-w-4xl bg-[#fcfcfc] dark:bg-card border-none shadow-[0_50px_100px_rgba(0,0,0,0.3)] rounded-[3rem] overflow-hidden relative border border-white/20">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-accent to-gold"></div>
                <div className="p-8 flex flex-col items-center gap-8">
                    <div className="w-full flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                                <Trophy className="h-8 w-8" />
                            </div>
                            <div>
                                <h2 className="text-3xl font-black tracking-tighter uppercase italic">LEKHAK <span className="text-primary">SKILL TREE</span></h2>
                                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Level up your writing game like a pro</p>
                            </div>
                        </div>
                        <Button variant="ghost" size="icon" className="rounded-full h-12 w-12 hover:bg-black/5" onClick={onClose}>
                            <X className="h-6 w-6" />
                        </Button>
                    </div>

                    <div className="flex flex-col items-center w-full max-h-[600px] overflow-y-auto custom-scrollbar py-10 space-y-12">
                        {levels.map((level, i) => (
                            <div key={level.id} className="flex flex-col items-center relative group w-full max-w-md">
                                {i < levels.length - 1 && (
                                    <div className={cn(
                                        "absolute top-20 left-1/2 -ml-0.5 w-1 h-20 z-0",
                                        level.status === 'completed' ? "bg-primary" : "bg-gray-200 dark:bg-gray-800 border-dashed border-l-2"
                                    )}></div>
                                )}
                                <div className={cn(
                                    "relative z-10 w-24 h-24 rounded-full flex items-center justify-center text-4xl shadow-2xl transition-all duration-500 cursor-pointer border-4 scale-100 group-hover:scale-110",
                                    level.status === 'completed' ? "bg-primary text-white border-white border-solid" :
                                        level.status === 'current' ? "bg-white dark:bg-card border-primary border-solid animate-pulse" : "bg-gray-100 dark:bg-muted border-gray-300 dark:border-gray-700 opacity-60 grayscale"
                                )}>
                                    {level.icon}
                                    {level.status === 'completed' && <Check className="absolute -bottom-1 -right-1 bg-green-500 text-white rounded-full p-1 h-8 w-8 border-4 border-[#fcfcfc]" />}
                                </div>
                                <div className="mt-4 text-center space-y-1 max-w-[250px]">
                                    <h4 className="font-black text-xl uppercase tracking-tighter">{level.title}</h4>
                                    <p className="text-xs text-muted-foreground font-medium leading-relaxed">{level.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="w-full bg-primary/5 p-6 rounded-3xl border border-primary/10 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="text-4xl font-black text-primary">LVL 2</div>
                            <div className="h-2 w-48 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                                <div className="h-full bg-primary w-[45%] rounded-full"></div>
                            </div>
                            <div className="text-sm font-black text-muted-foreground">450 / 1000 XP</div>
                        </div>
                        <Button className="font-black px-8 rounded-2xl shadow-xl hover:scale-105 transition-all">START CHALLENGE</Button>
                    </div>
                </div>
            </Card>
        </div>
    );
};

interface LekhakDoc {
    id: string;
    title: string;
    content: string;
    timestamp: number;
}

const EditorPage: React.FC = () => {
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [alternatives, setAlternatives] = useState<Alternative[]>([]);
    const [selectedTone, setSelectedTone] = useState<string>("Professional");
    const [isChecking, setIsChecking] = useState(false);
    const [activeSidebarTab, setActiveSidebarTab] = useState<'review' | 'write' | 'check'>('review');
    const [selectedCategory, setSelectedCategory] = useState<'all' | 'correctness' | 'clarity' | 'engagement' | 'delivery'>('all');
    const [popoverPos, setPopoverPos] = useState({ top: 0, left: 0 });
    const [popoverOpen, setPopoverOpen] = useState(false);
    const [activeSuggestion, setActiveSuggestion] = useState<Suggestion | null>(null);
    const [showSkillTree, setShowSkillTree] = useState(false);

    const [activeView, setActiveView] = useState<'editor' | 'docs' | 'trash'>('editor');
    const [documents, setDocuments] = useState<LekhakDoc[]>([
        {
            id: '1',
            title: 'Welcome to Lekhak',
            content: `
                <p>Welcome to Lekhak AI, your premium Hinglish writing assistant! ✨</p>
                <p>Lekhak AI ko aapki writing improve karne ke liye design kiya gaya hai. Chahe aap professional email likh rahe ho ya casual WhatsApp message, we help you sound better.</p>
                <p><strong>Try these features:</strong></p>
                <ul>
                    <li><strong>Real-time Proofreading:</strong> Hum aapki typos aur grammar errors ko highlight karte hain.</li>
                    <li><strong>Rephrasing Lab:</strong> Professional, Creative, aur Casual tones me 15+ suggestions paaiye.</li>
                    <li><strong>Hinglish Support:</strong> Hum "ki", "ka", "pata nahi" jaise phrases ko intelligently samajhte hain.</li>
                </ul>
                <p>Start editing this document or click "New Doc" to start fresh!</p>
            `,
            timestamp: Date.now()
        }
    ]);
    const [trash, setTrash] = useState<LekhakDoc[]>([]);
    const [activeDocId, setActiveDocId] = useState<string | null>('1');
    const [currentTitle, setCurrentTitle] = useState('Welcome to Lekhak');

    const fileInputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const { toast } = useToast();

    const onSuggestionClick = useCallback((s: Suggestion, pos: { top: number, left: number }) => {
        setActiveSuggestion(s);
        setPopoverPos(pos);
        setPopoverOpen(true);
    }, []);

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            LineDecorationExtension.configure({
                suggestions: [],
                onSuggestionClick
            }),
        ],
        content: '',
        onUpdate: ({ editor }) => {
            const content = editor.getHTML();
            if (activeDocId) {
                setDocuments(prev => prev.map(d => d.id === activeDocId ? { ...d, content, timestamp: Date.now() } : d));
            }
        },
        editorProps: {
            attributes: {
                class: 'prose prose-lg dark:prose-invert focus:outline-none max-w-none min-h-[500px] p-8 text-lg leading-relaxed font-medium',
            },
        },
    });

    useEffect(() => {
        if (editor && activeDocId === '1' && editor.isEmpty) {
            editor.commands.setContent(documents[0].content);
        }
    }, [editor]);

    useEffect(() => {
        if (editor) {
            editor.setOptions({
                extensions: [
                    StarterKit,
                    Underline,
                    LineDecorationExtension.configure({
                        suggestions,
                        onSuggestionClick
                    }),
                ],
            });
            editor.view.dispatch(editor.state.tr);
        }
    }, [suggestions, editor, onSuggestionClick]);

    const handleCheck = useCallback(async () => {
        if (!editor) return;
        const currentText = editor.getText();
        if (!currentText.trim()) return;

        setIsChecking(true);
        try {
            const results = await checkGrammar(currentText);
            setSuggestions(results.suggestions || []);
            setAlternatives(results.alternatives || []);
        } catch (error) {
            console.error('Lekhak check failed', error);
        } finally {
            setIsChecking(false);
        }
    }, [editor]);

    useEffect(() => {
        if (!editor) return;
        const timer = setTimeout(() => {
            handleCheck();
        }, 1500);
        return () => clearTimeout(timer);
    }, [editor?.getText(), handleCheck]);

    const applyFix = (suggestion: Suggestion) => {
        if (!editor) return;
        const textMap = getTextMap(editor.state.doc);
        const from = getPosFromOffset(textMap, suggestion.offset);
        const to = from + suggestion.length;

        editor.chain()
            .focus()
            .insertContentAt({ from, to }, suggestion.suggestion)
            .run();

        setSuggestions(prev => prev.filter(s => s.offset !== suggestion.offset));
        setPopoverOpen(false);
        toast({ title: "Accepted!", description: "Applied suggestion." });
    };

    const applyAlternative = (text: string) => {
        if (!editor) return;
        editor.commands.setContent(`<p>${text}</p>`);
        toast({ title: "Applied!", description: "Text updated successfully." });
    };

    const handleNewDoc = () => {
        handleSaveDoc();
        if (editor) {
            editor.commands.setContent('<p></p>');
            setCurrentTitle('Untitled Document');
            setActiveDocId(null);
            setSuggestions([]);
            setAlternatives([]);
            setActiveView('editor');
            toast({ title: "New Document", description: "Start writing from scratch." });
        }
    };

    const handleSaveDoc = () => {
        if (!editor) return;
        const content = editor.getHTML();
        if (activeDocId) {
            setDocuments(prev => prev.map(d => d.id === activeDocId ? { ...d, title: currentTitle, content, timestamp: Date.now() } : d));
        } else if (content !== '<p></p>') {
            const newDoc = { id: Date.now().toString(), title: currentTitle, content, timestamp: Date.now() };
            setDocuments(prev => [newDoc, ...prev]);
            setActiveDocId(newDoc.id);
        }
    };

    const handleDeleteDoc = (id: string, fromTrash: boolean = false) => {
        if (fromTrash) {
            setTrash(prev => prev.filter(d => d.id !== id));
            toast({ title: "Deleted Permanently", description: "Removed from trash." });
        } else {
            const doc = documents.find(d => d.id === id);
            if (doc) {
                setTrash(prev => [doc, ...prev]);
                setDocuments(prev => prev.filter(d => d.id !== id));
                if (activeDocId === id) {
                    setActiveDocId(null);
                    setCurrentTitle('Untitled Document');
                    editor?.commands.setContent('<p></p>');
                }
                toast({ title: "Moved to Trash", description: "Document moved to trash bin." });
            }
        }
    };

    const handleRestoreDoc = (id: string) => {
        const doc = trash.find(d => d.id === id);
        if (doc) {
            setDocuments(prev => [doc, ...prev]);
            setTrash(prev => prev.filter(d => d.id !== id));
            toast({ title: "Restored", description: "Document returned to your collection." });
        }
    };

    const openDoc = (doc: LekhakDoc) => {
        if (editor) {
            handleSaveDoc();
            setActiveDocId(doc.id);
            setCurrentTitle(doc.title);
            editor.commands.setContent(doc.content);
            setActiveView('editor');
            toast({ title: "Document Opened", description: `Loaded: ${doc.title}` });
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && editor) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const content = event.target?.result as string;
                const htmlContent = `<p>${content.replace(/\n/g, '</p><p>')}</p>`;
                editor.commands.setContent(htmlContent);
                setCurrentTitle(file.name.replace(/\.[^/.]+$/, ""));
                toast({ title: "File Uploaded!", description: `Imported content from ${file.name}` });
                handleCheck();
            };
            reader.readAsText(file);
        }
    };

    const categories = [
        { id: 'all', label: 'All', color: 'bg-primary' },
        { id: 'correctness', label: 'Correctness', color: 'bg-red-500' },
        { id: 'clarity', label: 'Clarity', color: 'bg-blue-500' },
        { id: 'engagement', label: 'Engagement', color: 'bg-green-500' },
        { id: 'delivery', label: 'Delivery', color: 'bg-purple-500' },
    ];

    const filteredSuggestions = suggestions.filter(s => selectedCategory === 'all' || s.category === selectedCategory);
    const filteredAlternatives = alternatives.filter(alt => alt.label === selectedTone).slice(0, 5);

    const sidebarItems = [
        { icon: <Wand2 className="h-5 w-5" />, label: 'Lekhak Home', id: 'editor' },
        { icon: <FileText className="h-5 w-5" />, label: 'Your Documents', id: 'docs' },
        { icon: <History className="h-5 w-5" />, label: 'History', id: 'history' },
        { icon: <Trash className="h-5 w-5" />, label: 'Trash', id: 'trash' },
        { icon: <HelpCircle className="h-5 w-5" />, label: 'Support', id: 'support' },
    ];

    return (
        <div className="flex min-h-screen bg-[#fcfcfc] dark:bg-background font-sans overflow-hidden" ref={containerRef}>
            {/* Sidebar */}
            <aside className="w-20 lg:w-72 border-r bg-white dark:bg-card flex flex-col shrink-0 transition-all duration-300">
                <div className="p-8 pb-12 flex items-center gap-4 cursor-pointer" onClick={() => setActiveView('editor')}>
                    <div className="p-3 bg-primary rounded-2xl rotate-3 shadow-xl text-white shrink-0">
                        <Wand2 className="h-6 w-6" />
                    </div>
                    <div className="hidden lg:block overflow-hidden">
                        <h2 className="text-2xl font-black tracking-tighter bg-gradient-to-r from-primary via-accent to-gold bg-clip-text text-transparent italic uppercase whitespace-nowrap">LEKHAK <span className="not-italic">AI</span></h2>
                    </div>
                </div>

                <nav className="flex-1 px-4 space-y-2">
                    {sidebarItems.map((item, i) => (
                        <div key={i} className={cn(
                            "flex items-center gap-4 px-4 py-4 rounded-[1.25rem] cursor-pointer transition-all group",
                            activeView === item.id ? "bg-primary text-white shadow-xl shadow-primary/20" : "hover:bg-primary/5 text-muted-foreground hover:text-primary"
                        )} onClick={() => {
                            if (item.id === 'editor' || item.id === 'docs' || item.id === 'trash') {
                                setActiveView(item.id as any);
                            } else {
                                toast({ title: "Coming Soon", description: `${item.label} feature is in development.` });
                            }
                        }}>
                            <div className={cn("transition-transform group-hover:scale-110 shrink-0", activeView === item.id ? "scale-100" : "scale-90")}>
                                {item.icon}
                            </div>
                            <span className={cn("hidden lg:block text-sm font-black uppercase tracking-wider", activeView === item.id ? "opacity-100" : "opacity-70")}>{item.label}</span>
                        </div>
                    ))}
                </nav>

                <div className="p-6 mt-auto">
                    <div className="hidden lg:block p-6 bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl border border-primary/10 mb-6 group cursor-pointer" onClick={() => setShowSkillTree(true)}>
                        <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">Power Writing</p>
                        <p className="text-xs font-bold text-muted-foreground leading-relaxed group-hover:text-primary transition-colors">Level up to unlock deep AI Hinglish insights.</p>
                    </div>
                    <div className="flex items-center gap-4 px-4 cursor-pointer text-muted-foreground hover:text-red-500 transition-colors">
                        <LogOut className="h-5 w-5" />
                        <span className="hidden lg:block text-xs font-black uppercase tracking-[0.2em]">Sign Out</span>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto custom-scrollbar">
                <header className="sticky top-0 z-30 flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 lg:p-10 bg-[#fcfcfc]/80 dark:bg-background/80 backdrop-blur-md">
                    <div className="flex items-center gap-5">
                        {activeView === 'editor' ? (
                            <div className="flex gap-2">
                                <Button variant="outline" className="rounded-xl font-black border-2 border-primary/10 hover:bg-primary/5 flex items-center gap-2 h-11" onClick={handleNewDoc}>
                                    <FileText className="h-4 w-4" /> New Doc
                                </Button>
                                <Button variant="outline" className="rounded-xl font-black border-2 border-primary/10 hover:bg-primary/5 flex items-center gap-2 h-11" onClick={handleUploadClick}>
                                    <Sparkles className="h-4 w-4" /> Upload
                                </Button>
                                <input type="file" ref={fileInputRef} className="hidden" accept=".txt,.md" onChange={handleFileUpload} />
                            </div>
                        ) : (
                            <h2 className="text-3xl font-black tracking-tighter uppercase italic text-primary">
                                {activeView === 'docs' ? 'Your Documents' : 'Trash Bin'}
                            </h2>
                        )}
                    </div>

                    <div className="flex items-center gap-6">
                        {activeView === 'editor' && (
                            <div className="flex items-center gap-4 bg-white dark:bg-card p-2 rounded-2xl shadow-xl border border-border/50">
                                {isChecking ? (
                                    <div className="flex items-center gap-3 px-4 py-2 text-xs font-black text-primary animate-pulse bg-primary/5 rounded-xl">
                                        <RefreshCw className="h-4 w-4 animate-spin" /> ANALYZING...
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-3 px-4 py-2 text-xs font-black text-green-500 bg-green-500/5 rounded-xl">
                                        <Check className="h-4 w-4" /> ENGINE READY
                                    </div>
                                )}
                            </div>
                        )}
                        <div className="flex items-center gap-4">
                            <Button variant="ghost" size="icon" className="rounded-xl h-12 w-12 hover:bg-black/5" onClick={() => setShowSkillTree(true)}>
                                <Trophy className="h-6 w-6 text-gold" />
                            </Button>
                            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-primary to-accent shadow-lg flex items-center justify-center text-white font-black text-xl">
                                M
                            </div>
                        </div>
                    </div>
                </header>

                <main className="p-6 lg:p-10 pt-0">
                    <div className="max-w-[1600px] mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                            {/* Left Component */}
                            <div className="lg:col-span-8 space-y-10">
                                {activeView === 'editor' && (
                                    <Card className="border-none shadow-2xl bg-white dark:bg-card rounded-[4rem] overflow-hidden border border-white/20 relative">
                                        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary via-accent to-gold opacity-80"></div>
                                        <div className="p-12 pb-6">
                                            <input
                                                value={currentTitle}
                                                onChange={(e) => setCurrentTitle(e.target.value)}
                                                className="w-full bg-transparent border-none focus:outline-none text-4xl font-black tracking-tighter text-primary/80 dark:text-white/90 placeholder:text-muted-foreground/30 italic uppercase"
                                                placeholder="Untitled Document..."
                                            />
                                        </div>

                                        <CardContent className="p-0 flex flex-col min-h-[800px]">
                                            <div className="flex-1">
                                                <EditorContent editor={editor} />
                                            </div>
                                            <MenuBar editor={editor} />
                                        </CardContent>

                                        {/* Inline Popover */}
                                        <div
                                            style={{ position: 'fixed', top: popoverPos.top, left: popoverPos.left }}
                                            className="pointer-events-none z-50"
                                        >
                                            <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                                                <PopoverTrigger asChild>
                                                    <div className="w-1 h-1" />
                                                </PopoverTrigger>
                                                <PopoverContent className="w-80 p-0 border-none shadow-2xl rounded-[2rem] overflow-hidden pointer-events-auto border border-white/20">
                                                    {activeSuggestion && (
                                                        <div className="flex flex-col">
                                                            <div className={cn(
                                                                "px-6 py-4 flex items-center justify-between",
                                                                activeSuggestion.category === 'correctness' ? "bg-red-500 text-white" :
                                                                    activeSuggestion.category === 'clarity' ? "bg-blue-500 text-white" :
                                                                        activeSuggestion.category === 'engagement' ? "bg-green-500 text-white" : "bg-purple-500 text-white"
                                                            )}>
                                                                <span className="text-[10px] font-black uppercase tracking-widest">{activeSuggestion.category}</span>
                                                                <Button variant="ghost" size="icon" className="h-6 w-6 text-white/50 hover:text-white rounded-full" onClick={() => setPopoverOpen(false)}>
                                                                    <X className="h-4 w-4" />
                                                                </Button>
                                                            </div>
                                                            <div className="p-8 bg-white dark:bg-card space-y-6">
                                                                <div className="space-y-2">
                                                                    <span className="line-through text-muted-foreground text-xs italic opacity-50">"{activeSuggestion.original}"</span>
                                                                    <div className="text-2xl font-black text-primary">"{activeSuggestion.suggestion}"</div>
                                                                </div>
                                                                <p className="text-sm text-muted-foreground font-bold opacity-80">{activeSuggestion.explanation}</p>
                                                                <div className="grid grid-cols-2 gap-4">
                                                                    <Button variant="outline" className="font-black rounded-xl text-[10px] h-11 uppercase" onClick={() => setPopoverOpen(false)}>IGNORE</Button>
                                                                    <Button className="font-black bg-primary text-white rounded-xl text-[10px] h-11 uppercase shadow-lg" onClick={() => applyFix(activeSuggestion)}>APPLY</Button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </PopoverContent>
                                            </Popover>
                                        </div>
                                    </Card>
                                )}

                                {activeView === 'docs' && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
                                        {documents.map((doc) => (
                                            <Card key={doc.id} className="group border-none shadow-xl hover:shadow-2xl transition-all rounded-[3rem] overflow-hidden bg-white dark:bg-card cursor-pointer" onClick={() => openDoc(doc)}>
                                                <CardContent className="p-10 space-y-6">
                                                    <div className="flex items-center justify-between">
                                                        <div className="p-4 bg-primary/5 rounded-2xl group-hover:bg-primary group-hover:text-white transition-colors text-primary">
                                                            <FileText className="h-6 w-6" />
                                                        </div>
                                                        <Button variant="ghost" size="icon" className="rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-500" onClick={(e) => { e.stopPropagation(); handleDeleteDoc(doc.id); }}>
                                                            <Trash className="h-5 w-5" />
                                                        </Button>
                                                    </div>
                                                    <h4 className="text-2xl font-black tracking-tighter uppercase">{doc.title}</h4>
                                                    <div className="text-sm text-muted-foreground line-clamp-3 opacity-60" dangerouslySetInnerHTML={{ __html: doc.content }}></div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                )}

                                {activeView === 'trash' && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
                                        {trash.length === 0 ? (
                                            <div className="col-span-full py-40 text-center opacity-20 space-y-6">
                                                <Trash className="h-32 w-32 mx-auto" />
                                                <p className="text-xl font-black uppercase tracking-[0.5em]">Trash is empty</p>
                                            </div>
                                        ) : trash.map((doc) => (
                                            <Card key={doc.id} className="group border-none shadow-xl rounded-[3rem] overflow-hidden bg-white dark:bg-card opacity-60 hover:opacity-100 transition-all border border-dashed">
                                                <CardContent className="p-10 space-y-6">
                                                    <div className="flex items-center justify-between">
                                                        <div className="p-4 bg-muted rounded-2xl">
                                                            <History className="h-6 w-6" />
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <Button variant="outline" size="sm" className="rounded-xl font-black text-[10px]" onClick={() => handleRestoreDoc(doc.id)}>RESTORE</Button>
                                                            <Button variant="ghost" size="sm" className="rounded-xl font-black text-[10px] text-red-500" onClick={() => handleDeleteDoc(doc.id, true)}>PURGE</Button>
                                                        </div>
                                                    </div>
                                                    <h4 className="text-2xl font-black tracking-tighter uppercase">{doc.title}</h4>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Grammarly-style Sidebar */}
                            <div className="lg:col-span-4 space-y-8">
                                <div className="flex bg-muted/30 p-1.5 rounded-3xl border border-border/30">
                                    {[
                                        { id: 'review', icon: Wand2, label: 'Review' },
                                        { id: 'write', icon: Sparkles, label: 'Write' },
                                        { id: 'check', icon: ShieldCheck, label: 'Check' }
                                    ].map((tab) => (
                                        <Button
                                            key={tab.id}
                                            variant={activeSidebarTab === tab.id ? "default" : "ghost"}
                                            className={cn(
                                                "flex-1 flex flex-col items-center gap-1 h-auto py-3 rounded-2xl transition-all",
                                                activeSidebarTab === tab.id ? "shadow-xl" : "opacity-50"
                                            )}
                                            onClick={() => setActiveSidebarTab(tab.id as any)}
                                        >
                                            <tab.icon className="h-5 w-5" />
                                            <span className="text-[10px] font-black uppercase tracking-widest">{tab.label}</span>
                                        </Button>
                                    ))}
                                </div>

                                {activeSidebarTab === 'review' && (
                                    <div className="space-y-8 animate-fade-in">
                                        <div className="grid grid-cols-2 gap-3">
                                            {categories.map((cat) => (
                                                <Button
                                                    key={cat.id}
                                                    variant="ghost"
                                                    className={cn(
                                                        "h-14 rounded-2xl flex flex-col items-start px-5 justify-center transition-all border relative",
                                                        selectedCategory === cat.id ? "bg-white dark:bg-card shadow-xl border-border/50" : "opacity-40 hover:opacity-100 border-transparent"
                                                    )}
                                                    onClick={() => setSelectedCategory(cat.id as any)}
                                                >
                                                    <div className={cn("absolute left-0 top-0 w-1.5 h-full", cat.color)}></div>
                                                    <span className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">{cat.label}</span>
                                                    <span className="text-lg font-black tracking-tighter">
                                                        {cat.id === 'all' ? suggestions.length : suggestions.filter(s => s.category === cat.id).length}
                                                    </span>
                                                </Button>
                                            ))}
                                        </div>

                                        <div className="space-y-6 max-h-[1000px] overflow-y-auto pr-2 custom-scrollbar pb-32">
                                            {filteredSuggestions.length === 0 ? (
                                                <div className="py-20 text-center space-y-6 opacity-30">
                                                    <Check className="h-20 w-20 mx-auto text-primary" />
                                                    <p className="text-xs font-black uppercase tracking-widest">Everything looks great!</p>
                                                </div>
                                            ) : filteredSuggestions.map((s, i) => (
                                                <Card key={i} className={cn(
                                                    "border-none shadow-xl rounded-[2.5rem] overflow-hidden border-l-[12px] transition-all",
                                                    s.category === 'correctness' ? "bg-red-50/20 dark:bg-red-500/5 border-l-red-500" :
                                                        s.category === 'clarity' ? "bg-blue-50/20 dark:bg-blue-500/5 border-l-blue-500" :
                                                            s.category === 'engagement' ? "bg-green-50/20 dark:bg-green-500/5 border-l-green-500" :
                                                                "bg-purple-50/20 dark:bg-purple-500/5 border-l-purple-500"
                                                )}>
                                                    <CardContent className="p-8 space-y-6">
                                                        <div className="flex justify-between items-start">
                                                            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-40 italic">{s.category}</span>
                                                            <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full" onClick={() => setSuggestions(suggestions.filter(x => x.offset !== s.offset))}>
                                                                <X className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                        <div className="space-y-4">
                                                            <div className="flex flex-col gap-2">
                                                                <span className="line-through text-muted-foreground text-xs italic opacity-50">"{s.original}"</span>
                                                                <span className="text-primary font-black text-2xl tracking-tighter">"{s.suggestion}"</span>
                                                            </div>
                                                            <p className="text-sm text-muted-foreground leading-relaxed font-bold opacity-80">{s.explanation}</p>
                                                        </div>
                                                        <div className="flex gap-4">
                                                            <Button
                                                                className={cn(
                                                                    "flex-1 h-12 text-[10px] font-black text-white rounded-2xl shadow-xl uppercase",
                                                                    s.category === 'correctness' ? "bg-red-500" :
                                                                        s.category === 'clarity' ? "bg-blue-500" :
                                                                            s.category === 'engagement' ? "bg-green-500" : "bg-purple-500"
                                                                )}
                                                                onClick={() => applyFix(s)}
                                                            >
                                                                Accept
                                                            </Button>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {activeSidebarTab === 'write' && (
                                    <div className="space-y-8 animate-fade-in pb-32">
                                        <div className="p-8 bg-primary/5 rounded-[3rem] border border-primary/10">
                                            <div className="flex items-center gap-4 mb-8">
                                                <Sparkles className="h-5 w-5 text-primary" />
                                                <h4 className="text-xl font-black tracking-tighter uppercase italic">Write with AI</h4>
                                            </div>
                                            <div className="flex bg-muted p-1 rounded-2xl mb-8">
                                                {["Professional", "Creative", "Casual"].map((tone) => (
                                                    <Button
                                                        key={tone}
                                                        variant={selectedTone === tone ? "default" : "ghost"}
                                                        size="sm"
                                                        className="flex-1 rounded-xl text-[10px] font-black uppercase"
                                                        onClick={() => setSelectedTone(tone)}
                                                    >
                                                        {tone}
                                                    </Button>
                                                ))}
                                            </div>
                                            <div className="space-y-4">
                                                {filteredAlternatives.length > 0 ? filteredAlternatives.map((alt, i) => (
                                                    <Card key={i} className="border-none shadow-sm hover:shadow-xl transition-all cursor-pointer bg-white dark:bg-background rounded-2xl" onClick={() => applyAlternative(alt.text)}>
                                                        <CardContent className="p-5 flex items-start gap-4">
                                                            <div className="p-3 bg-primary/10 rounded-xl text-primary">
                                                                <Lightbulb className="h-4 w-4" />
                                                            </div>
                                                            <p className="text-sm font-bold leading-relaxed">{alt.text}</p>
                                                        </CardContent>
                                                    </Card>
                                                )) : (
                                                    <div className="p-12 border-4 border-dashed border-muted rounded-3xl text-center opacity-40">
                                                        <span className="text-[10px] font-black uppercase tracking-widest">No alternatives available</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeSidebarTab === 'check' && (
                                    <div className="space-y-8 animate-fade-in pb-32">
                                        <Card className="border-none bg-gradient-to-br from-indigo-500/10 to-purple-500/10 p-8 rounded-[3rem]">
                                            <div className="flex items-center gap-4 mb-8">
                                                <Search className="h-5 w-5 text-indigo-500" />
                                                <h4 className="text-xl font-black tracking-tighter uppercase italic">Wisdom Shield</h4>
                                            </div>
                                            <div className="space-y-8">
                                                <div className="p-6 bg-white dark:bg-card rounded-3xl shadow-xl space-y-4">
                                                    <div className="flex justify-between items-center text-[10px] font-black uppercase opacity-60">
                                                        <span>AI SCORE</span>
                                                        <span className="text-indigo-500">SAFE</span>
                                                    </div>
                                                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                                                        <div className="h-full bg-indigo-500 w-[15%]" />
                                                    </div>
                                                </div>
                                                <div className="p-6 bg-white dark:bg-card rounded-3xl shadow-xl space-y-4">
                                                    <div className="flex justify-between items-center text-[10px] font-black uppercase opacity-60">
                                                        <span>PLAGIARISM</span>
                                                        <span className="text-purple-500">CLEAN</span>
                                                    </div>
                                                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                                                        <div className="h-full bg-purple-500 w-[2%]" />
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {showSkillTree && <SkillTree onClose={() => setShowSkillTree(false)} />}
            <Toaster />
        </div>
    );
};

export default EditorPage;
