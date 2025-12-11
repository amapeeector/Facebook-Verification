
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { ViewMode } from '../types';
import { GitBranch, FileText, Link, BrainCircuit, Image, Sparkles, ArrowRight, Shirt } from 'lucide-react';

interface ToolsDashboardProps {
  onNavigate: (mode: ViewMode) => void;
}

const ToolsDashboard: React.FC<ToolsDashboardProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-20 mb-20">
      {/* Hero Section */}
      <div className="text-center space-y-6 pt-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-mono text-slate-300 mb-2">
            <Sparkles className="w-4 h-4 text-fuchsia-400" />
            <span>AI Powered Suite</span>
        </div>
        
        <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-500 font-sans leading-tight">
          Link 2 Ink
        </h1>
        
        <p className="text-slate-400 text-xl font-light max-w-2xl mx-auto leading-relaxed">
          Advanced AI generation tools for Code, Content, Fashion, and Imagery.
        </p>

        {/* Vertical Action Stack */}
        <div className="flex flex-col items-center gap-6 pt-8 w-full max-w-[550px] mx-auto">
            
            {/* GitHub Option */}
            <div className="w-full flex items-center gap-4 group relative">
                <button 
                    onClick={() => onNavigate(ViewMode.REPO_ANALYZER)}
                    className="w-full glass-panel p-5 rounded-2xl hover:bg-white/10 transition-all border border-white/5 hover:border-violet-500/50 text-left group-hover:translate-x-1 group-hover:shadow-neon-violet relative overflow-hidden"
                >
                    <div className="absolute right-0 top-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                        <GitBranch className="w-24 h-24 -rotate-12" />
                    </div>
                    <div className="flex items-center gap-5 relative z-10">
                        <div className="p-3.5 bg-violet-500/20 rounded-xl text-violet-300 border border-violet-500/20 group-hover:bg-violet-500 group-hover:text-white transition-colors">
                            <GitBranch className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white group-hover:text-violet-200 transition-colors">Repo Analyzer</h3>
                            <p className="text-xs text-slate-400 font-mono mt-1 group-hover:text-slate-300">Codebase Visualization & Q&A</p>
                        </div>
                        <ArrowRight className="ml-auto w-5 h-5 text-slate-500 group-hover:text-violet-400" />
                    </div>
                </button>
            </div>

            {/* Web Article Option */}
            <div className="w-full flex items-center gap-4 group relative">
                <button 
                    onClick={() => onNavigate(ViewMode.ARTICLE_INFOGRAPHIC)}
                    className="w-full glass-panel p-5 rounded-2xl hover:bg-white/10 transition-all border border-white/5 hover:border-emerald-500/50 text-left group-hover:translate-x-1 group-hover:shadow-neon-emerald relative overflow-hidden"
                >
                     <div className="absolute right-0 top-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                        <FileText className="w-24 h-24 -rotate-12" />
                    </div>
                    <div className="flex items-center gap-5 relative z-10">
                        <div className="p-3.5 bg-emerald-500/20 rounded-xl text-emerald-300 border border-emerald-500/20 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                            <FileText className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white group-hover:text-emerald-200 transition-colors">Site Sketch</h3>
                            <p className="text-xs text-slate-400 font-mono mt-1 group-hover:text-slate-300">URL to Infographic</p>
                        </div>
                        <ArrowRight className="ml-auto w-5 h-5 text-slate-500 group-hover:text-emerald-400" />
                    </div>
                </button>
            </div>

            {/* Fashion Studio Option */}
            <div className="w-full flex items-center gap-4 group relative">
                <button 
                    onClick={() => onNavigate(ViewMode.FASHION_STUDIO)}
                    className="w-full glass-panel p-5 rounded-2xl hover:bg-white/10 transition-all border border-white/5 hover:border-amber-500/50 text-left group-hover:translate-x-1 group-hover:shadow-neon-amber relative overflow-hidden"
                >
                     <div className="absolute right-0 top-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Shirt className="w-24 h-24 -rotate-12" />
                    </div>
                    <div className="flex items-center gap-5 relative z-10">
                        <div className="p-3.5 bg-amber-500/20 rounded-xl text-amber-300 border border-amber-500/20 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                            <Shirt className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white group-hover:text-amber-200 transition-colors">Fashion Studio</h3>
                            <p className="text-xs text-slate-400 font-mono mt-1 group-hover:text-slate-300">Virtual Try-On & Runway Video</p>
                        </div>
                        <ArrowRight className="ml-auto w-5 h-5 text-slate-500 group-hover:text-amber-400" />
                    </div>
                </button>
            </div>

             {/* Image Editor Option */}
            <div className="w-full flex items-center gap-4 group relative">
                <button 
                    onClick={() => onNavigate(ViewMode.IMAGE_EDITOR)}
                    className="w-full glass-panel p-5 rounded-2xl hover:bg-white/10 transition-all border border-white/5 hover:border-pink-500/50 text-left group-hover:translate-x-1 group-hover:shadow-neon-pink relative overflow-hidden"
                >
                     <div className="absolute right-0 top-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Image className="w-24 h-24 -rotate-12" />
                    </div>
                    <div className="flex items-center gap-5 relative z-10">
                        <div className="p-3.5 bg-pink-500/20 rounded-xl text-pink-300 border border-pink-500/20 group-hover:bg-pink-500 group-hover:text-white transition-colors">
                            <Image className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white group-hover:text-pink-200 transition-colors">Reality Engine</h3>
                            <p className="text-xs text-slate-400 font-mono mt-1 group-hover:text-slate-300">AI Image Manipulation</p>
                        </div>
                        <ArrowRight className="ml-auto w-5 h-5 text-slate-500 group-hover:text-pink-400" />
                    </div>
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ToolsDashboard;
