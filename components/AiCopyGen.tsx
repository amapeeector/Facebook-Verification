/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { generateMarketingCopy } from '../services/geminiService';
import { Sparkles, Loader2, Copy } from 'lucide-react';

const AiCopyGen: React.FC = () => {
    const [brand, setBrand] = useState('');
    const [niche, setNiche] = useState('');
    const [generated, setGenerated] = useState('');
    const [loading, setLoading] = useState(false);

    const handleGen = async () => {
        if (!brand || !niche) return;
        setLoading(true);
        try {
            const text = await generateMarketingCopy(brand, niche, 'bio');
            setGenerated(text);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-slate-900/50 border border-white/10 rounded-xl p-5 shadow-inner">
            <h4 className="text-xs font-mono text-purple-400 mb-4 flex items-center gap-2 uppercase tracking-wider">
                <Sparkles className="w-3 h-3" />
                Free Bio Generator
            </h4>
            
            <div className="space-y-3">
                <input 
                    type="text" 
                    placeholder="Brand Name (e.g. MetaElite)" 
                    value={brand}
                    onChange={e => setBrand(e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2.5 text-xs text-white placeholder:text-slate-600 focus:ring-1 focus:ring-purple-500 outline-none transition-all"
                />
                <input 
                    type="text" 
                    placeholder="Niche (e.g. Marketing)" 
                    value={niche}
                    onChange={e => setNiche(e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2.5 text-xs text-white placeholder:text-slate-600 focus:ring-1 focus:ring-purple-500 outline-none transition-all"
                />
                <button 
                    onClick={handleGen}
                    disabled={loading}
                    className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-2 mt-2"
                >
                    {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : "Generate Bio"}
                </button>
            </div>

            {generated && (
                <div className="mt-4 p-3 bg-slate-950 rounded-lg border border-purple-500/20 relative group animate-in fade-in slide-in-from-top-2">
                    <p className="text-xs text-slate-300 whitespace-pre-wrap leading-relaxed">{generated}</p>
                    <button 
                        onClick={() => navigator.clipboard.writeText(generated)}
                        className="absolute top-2 right-2 p-1.5 bg-white/5 rounded-md text-slate-500 hover:text-white transition-colors"
                        title="Copy to clipboard"
                    >
                        <Copy className="w-3 h-3" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default AiCopyGen;