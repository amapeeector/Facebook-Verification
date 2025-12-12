
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { Lock, Plus, Image as ImageIcon, FileText, Tag, Layout, LogIn, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';
import { Article } from '../types';

interface AdminDashboardProps {
    onAddArticle: (article: Article) => void;
    onExit: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onAddArticle, onExit }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [authError, setAuthError] = useState(false);

    // Form State
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [content, setContent] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [tags, setTags] = useState('');
    const [author, setAuthor] = useState('MetaElite Team');
    const [successMsg, setSuccessMsg] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === 'meta2025') {
            setIsAuthenticated(true);
            setAuthError(false);
        } else {
            setAuthError(true);
        }
    };

    const handlePublish = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !category || !content) return;

        const newArticle: Article = {
            id: Date.now(),
            title,
            category,
            excerpt,
            content: content.split('\n').filter(line => line.trim() !== ''), // Split by newlines for paragraphs
            date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
            author,
            tags: tags.split(',').map(t => t.trim()).filter(Boolean),
            image: imageUrl || "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&h=800&fit=crop"
        };

        onAddArticle(newArticle);
        setSuccessMsg('Article published successfully!');
        
        // Reset form
        setTitle('');
        setCategory('');
        setExcerpt('');
        setContent('');
        setImageUrl('');
        setTags('');
        
        setTimeout(() => setSuccessMsg(''), 3000);
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center px-4 animate-in fade-in">
                <div className="w-full max-w-md bg-slate-900/50 border border-white/10 rounded-3xl p-8 backdrop-blur-md shadow-2xl">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/5">
                            <Lock className="w-8 h-8 text-slate-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-white">Admin Access</h2>
                        <p className="text-slate-400 text-sm mt-2">Enter credentials to manage content.</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <input 
                                type="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter Password" 
                                className="w-full bg-slate-950 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-slate-600 focus:ring-1 focus:ring-accent-500 focus:border-accent-500 transition-all outline-none"
                            />
                        </div>
                        {authError && (
                            <div className="flex items-center gap-2 text-red-400 text-xs px-2">
                                <AlertCircle className="w-3 h-3" /> Invalid password
                            </div>
                        )}
                        <button 
                            type="submit"
                            className="w-full py-4 bg-accent-600 hover:bg-accent-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-accent-500/20 flex items-center justify-center gap-2"
                        >
                            <LogIn className="w-4 h-4" /> Authenticate
                        </button>
                    </form>
                    
                    <button onClick={onExit} className="w-full mt-4 text-slate-500 hover:text-white text-xs transition-colors">
                        Return to Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto px-4 py-12 animate-in slide-in-from-bottom-4">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-black text-white">Content Creator</h1>
                    <p className="text-slate-400">Publish new articles to the trends feed.</p>
                </div>
                <button 
                    onClick={onExit}
                    className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-slate-300 transition-colors text-sm font-medium"
                >
                    <ArrowLeft className="w-4 h-4" /> Exit Admin
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Editor Column */}
                <div className="lg:col-span-2 space-y-6">
                    <form onSubmit={handlePublish} className="glass-panel p-6 rounded-3xl space-y-6">
                        
                        <div className="space-y-4">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                                <FileText className="w-3 h-3" /> Article Title
                            </label>
                            <input 
                                type="text" 
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="e.g. The Future of Meta Verification"
                                className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:ring-1 focus:ring-accent-500 outline-none text-lg font-bold"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                                    <Layout className="w-3 h-3" /> Category
                                </label>
                                <select 
                                    value={category} 
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-1 focus:ring-accent-500 outline-none"
                                    required
                                >
                                    <option value="" disabled>Select Category</option>
                                    <option value="Instagram">Instagram</option>
                                    <option value="Facebook">Facebook</option>
                                    <option value="WhatsApp">WhatsApp</option>
                                    <option value="Security">Security</option>
                                    <option value="Analysis">Analysis</option>
                                    <option value="Business Suite">Business Suite</option>
                                </select>
                            </div>
                            <div className="space-y-4">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                                    <Tag className="w-3 h-3" /> Tags
                                </label>
                                <input 
                                    type="text" 
                                    value={tags}
                                    onChange={(e) => setTags(e.target.value)}
                                    placeholder="Comma separated"
                                    className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:ring-1 focus:ring-accent-500 outline-none"
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                                <ImageIcon className="w-3 h-3" /> Cover Image URL
                            </label>
                            <input 
                                type="url" 
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                                placeholder="https://..."
                                className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:ring-1 focus:ring-accent-500 outline-none font-mono text-sm"
                            />
                        </div>

                         <div className="space-y-4">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                                <FileText className="w-3 h-3" /> Excerpt
                            </label>
                            <textarea 
                                value={excerpt}
                                onChange={(e) => setExcerpt(e.target.value)}
                                placeholder="Short summary for the card preview..."
                                className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:ring-1 focus:ring-accent-500 outline-none h-24 resize-none"
                                required
                            />
                        </div>

                        <div className="space-y-4">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                                <FileText className="w-3 h-3" /> Full Content
                            </label>
                            <div className="relative">
                                <textarea 
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    placeholder="Write your article here. Use '## ' for headers. Separate paragraphs with new lines."
                                    className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:ring-1 focus:ring-accent-500 outline-none h-96 font-mono text-sm leading-relaxed"
                                    required
                                />
                                <div className="absolute bottom-4 right-4 text-[10px] text-slate-500 bg-slate-900 px-2 py-1 rounded border border-white/5 pointer-events-none">
                                    Markdown Supported
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 flex items-center gap-4">
                             <button 
                                type="submit"
                                className="px-8 py-3 bg-accent-600 hover:bg-accent-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-accent-500/20 flex items-center gap-2"
                            >
                                <Plus className="w-4 h-4" /> Publish Article
                            </button>
                            {successMsg && (
                                <div className="text-emerald-400 text-sm font-bold flex items-center gap-2 animate-in fade-in">
                                    <CheckCircle2 className="w-4 h-4" /> {successMsg}
                                </div>
                            )}
                        </div>
                    </form>
                </div>

                {/* Preview Column */}
                <div className="space-y-6">
                    <div className="sticky top-24">
                        <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Live Card Preview</h3>
                        <div className="bg-slate-900/20 border border-white/5 rounded-3xl p-6 hover:bg-slate-900/60 transition-all flex flex-col hover:shadow-xl group pointer-events-none">
                            <div className="mb-4 flex items-center justify-between">
                                <span className="text-xs font-bold text-accent-400 bg-accent-500/10 px-2 py-1 rounded-lg uppercase tracking-wide">
                                    {category || "Category"}
                                </span>
                            </div>
                            
                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-accent-300 transition-colors leading-tight line-clamp-2">
                                {title || "Article Title goes here..."}
                            </h3>
                            
                            <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3">
                                {excerpt || "The excerpt summary will appear in this section of the card..."}
                            </p>
                            
                            <div className="pt-6 border-t border-white/5 flex items-center justify-between mt-auto">
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-slate-400">
                                        <div className="w-3 h-3 bg-slate-600 rounded-full" />
                                    </div>
                                    <span className="text-xs text-slate-500">{author}</span>
                                </div>
                                <span className="text-xs text-slate-600">{new Date().toLocaleDateString()}</span>
                            </div>
                        </div>

                        <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl text-xs text-blue-200 leading-relaxed">
                            <strong>Note:</strong> Articles created here are stored in application state. They will persist during navigation but will reset if you refresh the browser window (no backend database).
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
