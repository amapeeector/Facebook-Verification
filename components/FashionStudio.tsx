
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useRef } from 'react';
import { generateVirtualTryOn, generateFashionVideo } from '../services/geminiService';
import { FashionTier, ModelType, BackgroundType, FashionJob } from '../types';
import { Upload, Shirt, Video, Loader2, Crown, Zap, Lock, Sparkles, Download, Wand2, Hash } from 'lucide-react';

const getImageSrc = (data: string) => {
    if (data.startsWith('http')) return data;
    return `data:image/jpeg;base64,${data}`;
};

const FashionStudio: React.FC = () => {
    const [tier, setTier] = useState<FashionTier>('Free'); // Default tier
    const [jobs, setJobs] = useState<FashionJob[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    
    // Configuration State
    const [selectedModel, setSelectedModel] = useState<ModelType>('Female');
    const [selectedBg, setSelectedBg] = useState<BackgroundType>('Studio White');
    const [generateVideo, setGenerateVideo] = useState(false);
    const [pmcCode, setPmcCode] = useState('');
    
    const fileInputRef = useRef<HTMLInputElement>(null);

    const checkPmc = (code: string) => {
        setPmcCode(code);
        if (code.toUpperCase() === '#PMC') {
            setTier('Ultra');
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement> | React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        let files: FileList | null = null;
        if ('dataTransfer' in e) {
            files = (e as React.DragEvent).dataTransfer.files;
        } else {
            files = (e as React.ChangeEvent<HTMLInputElement>).files;
        }

        if (files) {
            const newJobs: FashionJob[] = Array.from(files)
                .filter(file => file.type.startsWith('image/'))
                .map(file => {
                    const url = URL.createObjectURL(file);
                    return {
                        id: Math.random().toString(36).substr(2, 9),
                        originalImage: url,
                        fileObj: file,
                        status: 'queue',
                        type: 'image'
                    } as any; 
                });
            
            setJobs(prev => [...newJobs, ...prev]);
        }
    };

    const processQueue = async () => {
        if (tier === 'Free') {
            alert("Upgrade to Pro to generate fashion content.");
            return;
        }

        const queue = jobs.filter(j => j.status === 'queue');
        if (queue.length === 0) return;

        setJobs(prev => prev.map(j => j.status === 'queue' ? { ...j, status: 'processing' } : j));

        await Promise.all(queue.map(async (job) => {
            try {
                const base64 = await new Promise<string>((resolve) => {
                    const reader = new FileReader();
                    // @ts-ignore
                    reader.onload = () => resolve((reader.result as string).split(',')[1]);
                    // @ts-ignore
                    reader.readAsDataURL(job.fileObj);
                });

                const isUltra = tier === 'Ultra';
                const resultData = await generateVirtualTryOn(base64, selectedModel, selectedBg, isUltra);
                
                let videoUrl = undefined;
                if (generateVideo && (tier === 'Pro' || tier === 'Ultra')) {
                    videoUrl = await generateFashionVideo(resultData, isUltra);
                }

                setJobs(prev => prev.map(j => j.id === job.id ? {
                    ...j,
                    status: 'completed',
                    generatedImage: resultData,
                    generatedVideo: videoUrl,
                    type: videoUrl ? 'video' : 'image'
                } : j));

            } catch (err) {
                console.error(err);
                setJobs(prev => prev.map(j => j.id === job.id ? { ...j, status: 'failed' } : j));
            }
        }));
    };

    if (tier === 'Free') {
        return (
            <div className="max-w-4xl mx-auto py-20 text-center space-y-8 animate-in fade-in">
                <div className="inline-flex p-4 rounded-full bg-slate-900 border border-amber-500/30 shadow-[0_0_50px_rgba(245,158,11,0.2)] mb-4">
                    <Crown className="w-12 h-12 text-amber-500" />
                </div>
                <h2 className="text-5xl font-black text-white tracking-tight">
                    Fashion <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">Mode</span>
                </h2>
                <p className="text-slate-400 text-lg max-w-xl mx-auto leading-relaxed">
                    Automated Virtual Try-On technology. Upload product photos and instantly generate professional model shots and runway videos.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mt-12 text-left">
                    <div className="p-6 bg-slate-900/50 rounded-2xl border border-white/5 hover:border-amber-500/30 transition-all">
                        <h3 className="text-white font-bold text-lg mb-2 flex items-center gap-2">
                            <Shirt className="w-5 h-5 text-slate-400" /> Tier Pro
                        </h3>
                        <ul className="space-y-2 text-sm text-slate-400">
                            <li>• Unlimited Image Generations</li>
                            <li>• 3 Model Types</li>
                            <li>• Standard Backgrounds</li>
                        </ul>
                        <button onClick={() => setTier('Pro')} className="mt-6 w-full py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold transition-colors">
                            Unlock Pro
                        </button>
                    </div>
                    <div className="p-6 bg-gradient-to-br from-slate-900 to-amber-900/20 rounded-2xl border border-amber-500/30 hover:shadow-neon transition-all relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-amber-500 text-black text-[10px] font-bold px-3 py-1 rounded-bl-xl">VEO 3.1 ULTRA</div>
                        <h3 className="text-white font-bold text-lg mb-2 flex items-center gap-2">
                            <Video className="w-5 h-5 text-amber-400" /> Ultra / Teacher
                        </h3>
                        <ul className="space-y-2 text-sm text-amber-100/70">
                            <li>• Runway Video Generation</li>
                            <li>• 4K Resolution Output</li>
                            <li>• Priority GPU Batching</li>
                        </ul>
                        <div className="mt-6 space-y-3">
                            <div className="relative">
                                <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                <input 
                                    type="text" 
                                    placeholder="Enter Code (e.g. #PMC)"
                                    value={pmcCode}
                                    onChange={(e) => checkPmc(e.target.value)}
                                    className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:ring-1 focus:ring-amber-500/50"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto py-10 px-4 space-y-8">
            {/* Header / Tier Status */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-900/50 p-6 rounded-3xl border border-white/5">
                <div>
                    <h2 className="text-3xl font-black text-white flex items-center gap-3">
                        Fashion Studio
                        <span className={`text-xs px-3 py-1 rounded-full border uppercase tracking-wider ${tier === 'Ultra' ? 'bg-amber-500/20 text-amber-300 border-amber-500/50' : 'bg-indigo-500/20 text-indigo-300 border-indigo-500/50'}`}>
                            {tier} Mode
                        </span>
                    </h2>
                    <p className="text-slate-400 text-sm mt-1">
                        AI-Powered Virtual Try-On & Content Generator
                    </p>
                </div>
                <div className="flex items-center gap-3">
                     {tier === 'Ultra' && (
                         <div className="flex items-center gap-2 text-amber-400 text-xs font-mono bg-amber-900/20 px-4 py-2 rounded-full border border-amber-500/20">
                             <Zap className="w-3 h-3" /> VEO 3.1 ENGINE ACTIVE
                         </div>
                     )}
                     <button 
                        onClick={processQueue}
                        disabled={jobs.filter(j => j.status === 'queue').length === 0}
                        className="px-6 py-3 bg-white text-black hover:bg-slate-200 rounded-xl font-bold flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                     >
                        <Wand2 className="w-4 h-4" /> Generate Batch ({jobs.filter(j => j.status === 'queue').length})
                     </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
                
                {/* Left Panel: Settings & Upload */}
                <div className="space-y-6">
                    {/* Settings */}
                    <div className="glass-panel p-6 rounded-3xl space-y-6">
                        <div className="space-y-3">
                            <label className="text-xs text-slate-500 uppercase font-bold tracking-wider">Model Type</label>
                            <div className="grid grid-cols-2 gap-2">
                                {['Female', 'Male', 'Diverse', 'Mannequin'].map(m => (
                                    <button 
                                        key={m}
                                        onClick={() => setSelectedModel(m as ModelType)}
                                        className={`py-2 px-3 rounded-lg text-xs font-medium transition-all ${selectedModel === m ? 'bg-white text-black' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
                                    >
                                        {m}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-xs text-slate-500 uppercase font-bold tracking-wider">Background</label>
                            <select 
                                value={selectedBg}
                                onChange={(e) => setSelectedBg(e.target.value as BackgroundType)}
                                className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:ring-1 focus:ring-indigo-500"
                            >
                                <option>Studio White</option>
                                <option>Urban Street</option>
                                <option>Luxury Interior</option>
                                <option>Beach</option>
                            </select>
                        </div>

                        {tier === 'Ultra' && (
                            <div className="flex items-center justify-between p-4 bg-amber-500/10 rounded-xl border border-amber-500/20">
                                <div>
                                    <p className="text-amber-200 text-sm font-bold flex items-center gap-2">
                                        <Video className="w-4 h-4" /> Runway Video
                                    </p>
                                    <p className="text-[10px] text-amber-200/60">Generate 5s walking clip</p>
                                </div>
                                <div 
                                    onClick={() => setGenerateVideo(!generateVideo)}
                                    className={`w-12 h-6 rounded-full cursor-pointer transition-colors relative ${generateVideo ? 'bg-amber-500' : 'bg-slate-700'}`}
                                >
                                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${generateVideo ? 'left-7' : 'left-1'}`}></div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Upload Zone */}
                    <div 
                        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={handleFileSelect}
                        onClick={() => fileInputRef.current?.click()}
                        className={`border-2 border-dashed rounded-3xl p-8 text-center cursor-pointer transition-all ${
                            isDragging ? 'border-indigo-500 bg-indigo-500/10' : 'border-white/10 hover:border-white/20 hover:bg-white/5'
                        }`}
                    >
                        <input ref={fileInputRef} type="file" multiple accept="image/*" className="hidden" onChange={handleFileSelect} />
                        <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/5">
                            <Upload className="w-8 h-8 text-slate-400" />
                        </div>
                        <p className="text-white font-medium mb-1">Drop product images</p>
                        <p className="text-xs text-slate-500">Supports JPG, PNG (Batch Upload)</p>
                    </div>
                </div>

                {/* Right Panel: Results Grid */}
                <div className="lg:col-span-2">
                    {jobs.length === 0 ? (
                        <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-slate-600 border border-white/5 rounded-3xl bg-slate-900/20">
                            <Shirt className="w-16 h-16 mb-4 opacity-20" />
                            <p className="text-sm">Queue is empty. Upload items to start.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {jobs.map((job) => (
                                <div key={job.id} className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-slate-950 border border-white/10">
                                    {/* Content Switcher: Show Generated if ready, else Original */}
                                    {job.status === 'completed' ? (
                                        job.type === 'video' ? (
                                            <video 
                                                src={job.generatedVideo} 
                                                className="w-full h-full object-cover" 
                                                autoPlay loop muted playsInline 
                                            />
                                        ) : (
                                            <img src={getImageSrc(job.generatedImage!)} className="w-full h-full object-cover animate-in fade-in duration-700" alt="Generated" />
                                        )
                                    ) : (
                                        <img src={job.originalImage} className="w-full h-full object-cover opacity-50 grayscale" alt="Original" />
                                    )}

                                    {/* Overlays */}
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                                        {job.status === 'completed' && (
                                            <>
                                                {job.generatedImage && (
                                                    <a href={getImageSrc(job.generatedImage)} download="fashion-vto.jpg" className="p-2 bg-white/10 rounded-lg hover:bg-white/20 text-white backdrop-blur-md">
                                                        <Download className="w-5 h-5" />
                                                    </a>
                                                )}
                                                {job.generatedVideo && (
                                                    <a href={`${job.generatedVideo}`} download="fashion-runway.mp4" className="p-2 bg-amber-500/20 rounded-lg hover:bg-amber-500/40 text-amber-300 backdrop-blur-md">
                                                        <Video className="w-5 h-5" />
                                                    </a>
                                                )}
                                            </>
                                        )}
                                    </div>

                                    {/* Status Indicator */}
                                    <div className="absolute top-2 right-2">
                                        {job.status === 'queue' && <div className="w-2 h-2 bg-slate-500 rounded-full"></div>}
                                        {job.status === 'processing' && <Loader2 className="w-4 h-4 text-indigo-400 animate-spin" />}
                                        {job.status === 'completed' && <div className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>}
                                        {job.status === 'failed' && <div className="w-2 h-2 bg-red-500 rounded-full"></div>}
                                    </div>
                                    
                                    {job.status === 'processing' && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                                            <div className="text-center">
                                                <Sparkles className="w-6 h-6 text-indigo-400 animate-bounce mx-auto mb-2" />
                                                <p className="text-[10px] text-indigo-200 font-mono uppercase tracking-widest">Designing</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FashionStudio;
