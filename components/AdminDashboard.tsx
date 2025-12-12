
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useRef } from 'react';
import { Lock, Plus, Image as ImageIcon, FileText, Tag, Layout, LogIn, ArrowLeft, CheckCircle2, AlertCircle, BarChart3, Users, Eye, Mic, MessageSquare, Send, Bold, Heading, List, Link as LinkIcon, Paperclip, Smartphone } from 'lucide-react';
import { Article } from '../types';

interface AdminDashboardProps {
    onAddArticle: (article: Article) => void;
    onExit: () => void;
}

type Tab = 'overview' | 'editor' | 'messages';

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onAddArticle, onExit }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [authError, setAuthError] = useState(false);
    const [activeTab, setActiveTab] = useState<Tab>('overview');

    // Editor State
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [content, setContent] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [tags, setTags] = useState('');
    const [author, setAuthor] = useState('MetaElite Team');
    const [postType, setPostType] = useState<'article' | 'voice'>('article');
    const [audioUrl, setAudioUrl] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const contentRef = useRef<HTMLTextAreaElement>(null);

    // Messaging State
    const [adminNotes, setAdminNotes] = useState<{id: number, text: string, date: string}[]>([
        { id: 1, text: "Remember to update the cricket scores for the weekend match.", date: "Today, 10:30 AM" },
        { id: 2, text: "Check analytics for the new verification guide.", date: "Yesterday" }
    ]);
    const [noteInput, setNoteInput] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === 'meta2025') {
            setIsAuthenticated(true);
            setAuthError(false);
        } else {
            setAuthError(true);
        }
    };

    // Editor Toolbar Helper
    const insertFormat = (tagStart: string, tagEnd: string = '') => {
        if (!contentRef.current) return;
        const start = contentRef.current.selectionStart;
        const end = contentRef.current.selectionEnd;
        const text = contentRef.current.value;
        const before = text.substring(0, start);
        const selection = text.substring(start, end);
        const after = text.substring(end);

        const newText = before + tagStart + selection + tagEnd + after;
        setContent(newText);
        
        // Restore focus and cursor
        setTimeout(() => {
            if (contentRef.current) {
                contentRef.current.focus();
                const newCursorPos = start + tagStart.length + selection.length + tagEnd.length;
                contentRef.current.setSelectionRange(newCursorPos, newCursorPos);
            }
        }, 0);
    };

    const handlePublish = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !category || !content) return;

        const newArticle: Article = {
            id: Date.now(),
            title,
            category,
            excerpt,
            // Split content by double newlines to form paragraphs, preserving markdown
            content: content.split('\n\n').filter(line => line.trim() !== ''), 
            date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
            author,
            tags: tags.split(',').map(t => t.trim()).filter(Boolean),
            image: imageUrl || "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&h=800&fit=crop",
            type: postType,
            audioUrl: postType === 'voice' ? audioUrl : undefined,
            views: 0
        };

        onAddArticle(newArticle);
        setSuccessMsg('Published Successfully');
        
        // Reset form
        setTitle('');
        setContent('');
        setExcerpt('');
        setImageUrl('');
        setTags('');
        setAudioUrl('');
        setPostType('article');
        
        setTimeout(() => setSuccessMsg(''), 3000);
    };

    const handleAddNote = (e: React.FormEvent) => {
        e.preventDefault();
        if (!noteInput.trim()) return;
        setAdminNotes([{ id: Date.now(), text: noteInput, date: "Just now" }, ...adminNotes]);
        setNoteInput('');
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center px-4 animate-in fade-in">
                <div className="w-full max-w-md bg-slate-900/50 border border-white/10 rounded-3xl p-8 backdrop-blur-md shadow-2xl">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/20 shadow-lg shadow-amber-500/20">
                            <Lock className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-white">VIP Admin Access</h2>
                        <p className="text-slate-400 text-sm mt-2">Secure Gateway</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <input 
                                type="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter Access Code" 
                                className="w-full bg-slate-950 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-slate-600 focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition-all outline-none"
                            />
                        </div>
                        {authError && (
                            <div className="flex items-center gap-2 text-red-400 text-xs px-2">
                                <AlertCircle className="w-3 h-3" /> Invalid credentials
                            </div>
                        )}
                        <button 
                            type="submit"
                            className="w-full py-4 bg-white text-slate-950 hover:bg-slate-200 rounded-xl font-bold transition-all shadow-lg flex items-center justify-center gap-2"
                        >
                            <LogIn className="w-4 h-4" /> Enter Panel
                        </button>
                    </form>
                    
                    <button onClick={onExit} className="w-full mt-4 text-slate-500 hover:text-white text-xs transition-colors">
                        Return to Site
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 animate-in slide-in-from-bottom-4 min-h-screen">
            
            {/* Admin Header */}
            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
                        <Layout className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-white tracking-tight">Admin<span className="text-amber-500">Panel</span></h1>
                        <p className="text-slate-400 text-xs uppercase tracking-wider">Welcome back, Boss</p>
                    </div>
                </div>
                <button 
                    onClick={onExit}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-white/10 hover:bg-white/10 rounded-lg text-slate-300 transition-colors text-sm font-medium"
                >
                    <ArrowLeft className="w-4 h-4" /> Exit
                </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
                <button 
                    onClick={() => setActiveTab('overview')}
                    className={`px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 transition-all whitespace-nowrap ${activeTab === 'overview' ? 'bg-amber-500 text-slate-950' : 'bg-slate-900 text-slate-400 border border-white/5'}`}
                >
                    <BarChart3 className="w-4 h-4" /> Overview
                </button>
                <button 
                    onClick={() => setActiveTab('editor')}
                    className={`px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 transition-all whitespace-nowrap ${activeTab === 'editor' ? 'bg-amber-500 text-slate-950' : 'bg-slate-900 text-slate-400 border border-white/5'}`}
                >
                    <FileText className="w-4 h-4" /> VIP Editor
                </button>
                <button 
                    onClick={() => setActiveTab('messages')}
                    className={`px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 transition-all whitespace-nowrap ${activeTab === 'messages' ? 'bg-amber-500 text-slate-950' : 'bg-slate-900 text-slate-400 border border-white/5'}`}
                >
                    <Smartphone className="w-4 h-4" /> Mobile Messages
                </button>
            </div>

            {/* TAB CONTENT: OVERVIEW */}
            {activeTab === 'overview' && (
                <div className="space-y-6 animate-in fade-in">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-slate-900/60 border border-white/10 p-6 rounded-3xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Users className="w-24 h-24 text-blue-500" />
                            </div>
                            <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">Total Visitors</p>
                            <h3 className="text-4xl font-black text-white mt-2">124,592</h3>
                            <span className="text-emerald-400 text-xs font-bold mt-2 inline-block">+12% this week</span>
                        </div>
                        <div className="bg-slate-900/60 border border-white/10 p-6 rounded-3xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Eye className="w-24 h-24 text-amber-500" />
                            </div>
                            <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">Total Page Views</p>
                            <h3 className="text-4xl font-black text-white mt-2">892,104</h3>
                            <span className="text-emerald-400 text-xs font-bold mt-2 inline-block">+5% this week</span>
                        </div>
                        <div className="bg-slate-900/60 border border-white/10 p-6 rounded-3xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <FileText className="w-24 h-24 text-purple-500" />
                            </div>
                            <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">Active Articles</p>
                            <h3 className="text-4xl font-black text-white mt-2">48</h3>
                            <span className="text-slate-500 text-xs font-bold mt-2 inline-block">Updated just now</span>
                        </div>
                    </div>

                    {/* Quick Actions Panel */}
                    <div className="bg-gradient-to-r from-slate-900 to-slate-950 border border-white/10 rounded-3xl p-8">
                        <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
                        <div className="flex flex-wrap gap-4">
                            <button onClick={() => setActiveTab('editor')} className="px-6 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-white font-medium flex items-center gap-2 transition-colors">
                                <Plus className="w-4 h-4" /> New Article
                            </button>
                            <button 
                                onClick={() => {
                                    setPostType('voice');
                                    setCategory('Cricket');
                                    setActiveTab('editor');
                                }} 
                                className="px-6 py-3 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-xl font-medium flex items-center gap-2 transition-colors"
                            >
                                <Mic className="w-4 h-4" /> Upload Cricket Voice Note
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB CONTENT: EDITOR */}
            {activeTab === 'editor' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in">
                    <div className="lg:col-span-2 space-y-6">
                        <form onSubmit={handlePublish} className="bg-slate-900/60 border border-white/10 p-6 md:p-8 rounded-3xl space-y-6 shadow-2xl relative">
                            {postType === 'voice' && (
                                <div className="absolute top-6 right-6 bg-emerald-500 text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                                    <Mic className="w-3 h-3" /> Voice Mode Active
                                </div>
                            )}

                            <div className="space-y-4">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                                    <Layout className="w-3 h-3" /> Article Title
                                </label>
                                <input 
                                    type="text" 
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder={postType === 'voice' ? "Cricket Match Update - Voice Note" : "e.g. The Future of Meta Verification"}
                                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:ring-1 focus:ring-amber-500 outline-none text-lg font-bold"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                                        <Tag className="w-3 h-3" /> Category
                                    </label>
                                    <select 
                                        value={category} 
                                        onChange={(e) => setCategory(e.target.value)}
                                        className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-1 focus:ring-amber-500 outline-none"
                                        required
                                    >
                                        <option value="" disabled>Select Category</option>
                                        <option value="Cricket">Cricket (Sports)</option>
                                        <option value="Instagram">Instagram</option>
                                        <option value="Facebook">Facebook</option>
                                        <option value="WhatsApp">WhatsApp</option>
                                        <option value="Security">Security</option>
                                    </select>
                                </div>
                                <div className="space-y-4">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                                        <Layout className="w-3 h-3" /> Post Type
                                    </label>
                                    <div className="flex gap-2">
                                        <button
                                            type="button"
                                            onClick={() => setPostType('article')}
                                            className={`flex-1 py-3 rounded-xl text-xs font-bold uppercase tracking-wider border ${postType === 'article' ? 'bg-amber-500 border-amber-500 text-black' : 'bg-slate-950 border-white/10 text-slate-400'}`}
                                        >
                                            Standard
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => { setPostType('voice'); setCategory('Cricket'); }}
                                            className={`flex-1 py-3 rounded-xl text-xs font-bold uppercase tracking-wider border ${postType === 'voice' ? 'bg-emerald-500 border-emerald-500 text-black' : 'bg-slate-950 border-white/10 text-slate-400'}`}
                                        >
                                            Voice Post
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {postType === 'voice' && (
                                <div className="space-y-4 animate-in slide-in-from-top-2">
                                    <label className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                                        <Mic className="w-3 h-3" /> Audio Source URL
                                    </label>
                                    <input 
                                        type="url" 
                                        value={audioUrl}
                                        onChange={(e) => setAudioUrl(e.target.value)}
                                        placeholder="https://example.com/cricket-update.mp3"
                                        className="w-full bg-slate-950 border border-emerald-500/30 rounded-xl px-4 py-3 text-emerald-200 placeholder:text-emerald-500/30 focus:ring-1 focus:ring-emerald-500 outline-none font-mono text-sm"
                                        required
                                    />
                                </div>
                            )}

                            <div className="space-y-4">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                                    <ImageIcon className="w-3 h-3" /> Cover Image URL
                                </label>
                                <input 
                                    type="url" 
                                    value={imageUrl}
                                    onChange={(e) => setImageUrl(e.target.value)}
                                    placeholder="https://..."
                                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:ring-1 focus:ring-amber-500 outline-none font-mono text-sm"
                                />
                            </div>

                            {/* Pro Text Editor */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                                    <FileText className="w-3 h-3" /> Content Editor
                                </label>
                                
                                {/* Toolbar */}
                                <div className="flex flex-wrap gap-2 bg-slate-950 border border-white/10 rounded-t-xl p-2">
                                    <button type="button" onClick={() => insertFormat('**', '**')} className="p-2 hover:bg-white/10 rounded text-slate-400 hover:text-white" title="Bold">
                                        <Bold className="w-4 h-4" />
                                    </button>
                                    <button type="button" onClick={() => insertFormat('## ')} className="p-2 hover:bg-white/10 rounded text-slate-400 hover:text-white" title="Header">
                                        <Heading className="w-4 h-4" />
                                    </button>
                                    <button type="button" onClick={() => insertFormat('- ')} className="p-2 hover:bg-white/10 rounded text-slate-400 hover:text-white" title="List Item">
                                        <List className="w-4 h-4" />
                                    </button>
                                    <div className="w-px h-6 bg-white/10 mx-1"></div>
                                    <button type="button" onClick={() => insertFormat('![Image](', ')')} className="p-2 hover:bg-white/10 rounded text-slate-400 hover:text-white" title="Insert Image">
                                        <ImageIcon className="w-4 h-4" />
                                    </button>
                                    <button type="button" onClick={() => insertFormat('[Link Text](', ')')} className="p-2 hover:bg-white/10 rounded text-slate-400 hover:text-white" title="Insert Link">
                                        <LinkIcon className="w-4 h-4" />
                                    </button>
                                </div>

                                <textarea 
                                    ref={contentRef}
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    placeholder="Write professionally here... Use the toolbar above for formatting. Separate sections with double new lines."
                                    className="w-full bg-slate-950/80 border border-white/10 border-t-0 rounded-b-xl px-4 py-3 text-white placeholder:text-slate-600 focus:ring-1 focus:ring-amber-500 outline-none h-96 font-mono text-sm leading-relaxed"
                                    required
                                />
                            </div>

                            <button 
                                type="submit"
                                className="w-full py-4 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl font-black text-lg transition-all shadow-lg flex items-center justify-center gap-2"
                            >
                                {successMsg ? <CheckCircle2 className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                                {successMsg || "Publish to Live Site"}
                            </button>
                        </form>
                    </div>

                    {/* Preview Side */}
                    <div className="space-y-6">
                        <div className="bg-slate-900/40 border border-white/5 rounded-3xl p-6 sticky top-24">
                            <h3 className="text-white font-bold mb-4 text-xs uppercase tracking-wider flex items-center gap-2">
                                <Eye className="w-3 h-3" /> Live Preview
                            </h3>
                            {/* Card Preview */}
                            <div className="bg-slate-950 border border-white/10 rounded-2xl overflow-hidden group">
                                <div className="aspect-video bg-slate-900 relative">
                                    {imageUrl && <img src={imageUrl} alt="Cover" className="w-full h-full object-cover" />}
                                    <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur px-2 py-1 rounded text-[10px] font-bold text-white border border-white/10">
                                        {category || "Category"}
                                    </div>
                                    {postType === 'voice' && (
                                        <div className="absolute center inset-0 flex items-center justify-center bg-black/30">
                                            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center border border-white/30">
                                                <Mic className="w-6 h-6 text-white" />
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="p-4">
                                    <h4 className="text-white font-bold text-lg mb-2 line-clamp-2">{title || "Your Title Here"}</h4>
                                    <p className="text-slate-400 text-xs line-clamp-3 mb-4">{content || "Article content preview..."}</p>
                                    <div className="flex items-center gap-2 text-[10px] text-slate-500">
                                        <div className="w-5 h-5 rounded-full bg-slate-800"></div>
                                        <span>{author}</span>
                                        <span className="w-1 h-1 rounded-full bg-slate-700"></span>
                                        <span>Just now</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB CONTENT: MESSAGES (Mobile Friendly) */}
            {activeTab === 'messages' && (
                <div className="max-w-2xl mx-auto h-[70vh] flex flex-col bg-slate-900/60 border border-white/10 rounded-3xl overflow-hidden shadow-2xl animate-in fade-in">
                    <div className="p-4 bg-slate-950 border-b border-white/10 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg">
                            <MessageSquare className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h3 className="text-white font-bold text-sm">Admin Notes</h3>
                            <p className="text-slate-400 text-xs">Quick drafts from mobile</p>
                        </div>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900/30">
                        {adminNotes.length === 0 && (
                            <div className="text-center text-slate-600 mt-20">
                                <p>No notes yet.</p>
                            </div>
                        )}
                        {adminNotes.map((note) => (
                            <div key={note.id} className="bg-slate-800/80 border border-white/5 p-4 rounded-2xl rounded-tl-none self-start max-w-[85%] animate-in slide-in-from-left-2">
                                <p className="text-slate-200 text-sm leading-relaxed">{note.text}</p>
                                <p className="text-[10px] text-slate-500 mt-2 text-right">{note.date}</p>
                            </div>
                        ))}
                    </div>

                    <form onSubmit={handleAddNote} className="p-4 bg-slate-950 border-t border-white/10 flex gap-2">
                        <input 
                            type="text" 
                            value={noteInput}
                            onChange={(e) => setNoteInput(e.target.value)}
                            placeholder="Type a quick note..."
                            className="flex-1 bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:ring-1 focus:ring-indigo-500 outline-none"
                        />
                        <button 
                            type="submit" 
                            className="p-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition-colors disabled:opacity-50"
                            disabled={!noteInput.trim()}
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </form>
                </div>
            )}

        </div>
    );
};

export default AdminDashboard;
