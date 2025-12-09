
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { ArrowRight, CheckCircle2, Facebook, Instagram, MessageCircle, MoreHorizontal } from 'lucide-react';

interface HeroProps {
  onCta: () => void;
}

const Hero: React.FC<HeroProps> = ({ onCta }) => {
  return (
    <div className="relative min-h-[85vh] flex items-center overflow-hidden pt-10 pb-20">
      
      {/* Background Ambience Dark Mode */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-accent-600/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-accent-900/20 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Content */}
          <div className="text-left space-y-8 animate-in slide-in-from-left-8 fade-in duration-1000 order-2 lg:order-1">
             <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 shadow-sm backdrop-blur-sm">
                <div className="w-2 h-2 rounded-full bg-accent-500 animate-pulse"></div>
                <span className="text-xs font-bold text-accent-400 tracking-wide uppercase">Instantly Available</span>
             </div>

             <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.05] tracking-tight">
                <span className="text-white">Instant</span> <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-400 via-accent-500 to-accent-600">Verification</span> <br />
                Services.
             </h1>

             <p className="text-lg text-slate-400 max-w-lg leading-relaxed border-l-2 border-accent-500/30 pl-6">
                Skip the waitlist. We provide end-to-end Business Manager configuration and verification submission for Brands & Public Figures. <strong className="text-white">30 Min - 24 Hour Turnaround.</strong>
             </p>

             <div className="flex flex-col sm:flex-row gap-5 pt-4">
                <button 
                  onClick={onCta}
                  className="px-8 py-4 bg-accent-600 hover:bg-accent-500 text-white rounded-2xl font-black text-lg shadow-neon hover:scale-105 transition-all flex items-center justify-center gap-2 group"
                >
                  Start Verification <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <div className="flex items-center gap-4 px-4 py-2 bg-white/5 rounded-2xl border border-white/10 shadow-sm backdrop-blur-md">
                   <div className="flex -space-x-3">
                        {[1,2,3].map(i => (
                            <div key={i} className="w-10 h-10 rounded-full bg-slate-900 border-2 border-slate-800 flex items-center justify-center text-xs text-slate-700 font-bold">
                                <CheckCircle2 className="w-5 h-5 text-accent-500" />
                            </div>
                        ))}
                    </div>
                    <div className="text-xs">
                        <p className="text-white font-bold">500+ Verified</p>
                        <p className="text-slate-500">This Week</p>
                    </div>
                </div>
             </div>
          </div>

          {/* Right: Visual Construction (3D Cards) */}
          <div className="relative w-full h-[600px] flex items-center justify-center perspective-1000 order-1 lg:order-2">
             
             {/* 1. Facebook Card (Background Left) */}
             <div className="absolute left-0 lg:-left-4 top-20 w-[280px] bg-slate-950/90 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl transform -rotate-y-12 -rotate-z-6 scale-90 hover:scale-100 hover:z-30 hover:rotate-0 transition-all duration-500 group border-b-4 border-b-blue-600">
                {/* Header */}
                <div className="p-4 bg-slate-900/50 flex items-center justify-between border-b border-white/5">
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-blue-600 rounded-lg">
                            <Facebook className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-xs font-bold text-white">Facebook</span>
                    </div>
                    <MoreHorizontal className="w-4 h-4 text-slate-500" />
                </div>
                {/* Content */}
                <div className="p-5 text-center space-y-4">
                    <div className="relative w-16 h-16 mx-auto">
                        <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop" alt="Profile" className="w-full h-full rounded-full object-cover border-2 border-slate-800 p-0.5" />
                        <div className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full border-2 border-slate-950">
                            <CheckCircle2 className="w-3 h-3 stroke-[3]" />
                        </div>
                    </div>
                    <div>
                        <h3 className="text-white font-bold text-sm">Patricia B.</h3>
                        <p className="text-slate-400 text-[10px]">Public Figure</p>
                    </div>
                    <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
                         <div className="flex items-center gap-2 justify-center text-blue-400 text-xs font-bold">
                             <CheckCircle2 className="w-4 h-4" /> Meta Verified
                         </div>
                    </div>
                </div>
             </div>

             {/* 2. Instagram Card (Background Right) */}
             <div className="absolute right-0 lg:-right-4 top-20 w-[280px] bg-slate-950/90 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl transform rotate-y-12 rotate-z-6 scale-90 hover:scale-100 hover:z-30 hover:rotate-0 transition-all duration-500 group border-b-4 border-b-pink-500">
                {/* Header */}
                <div className="p-4 bg-slate-900/50 flex items-center justify-between border-b border-white/5">
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 rounded-lg">
                            <Instagram className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-xs font-bold text-white">Instagram</span>
                    </div>
                    <MoreHorizontal className="w-4 h-4 text-slate-500" />
                </div>
                {/* Content */}
                <div className="p-5 text-center space-y-4">
                    <div className="relative w-16 h-16 mx-auto">
                        <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop" alt="Profile" className="w-full h-full rounded-full object-cover border-2 border-slate-800 p-0.5" />
                        <div className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full border-2 border-slate-950">
                            <CheckCircle2 className="w-3 h-3 stroke-[3]" />
                        </div>
                    </div>
                    <div>
                        <h3 className="text-white font-bold text-sm">@tomie.official</h3>
                        <p className="text-slate-400 text-[10px]">Entrepreneur</p>
                    </div>
                    <div className="p-3 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl border border-pink-500/20">
                         <div className="flex items-center gap-2 justify-center text-pink-400 text-xs font-bold">
                             <CheckCircle2 className="w-4 h-4" /> Meta Verified
                         </div>
                    </div>
                </div>
             </div>

             {/* 3. WhatsApp Card (Foreground Center) - The "Hero" Card */}
             <div className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] bg-slate-900 border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(16,185,129,0.15)] hover:scale-105 transition-transform duration-500 ring-1 ring-white/5">
                 {/* Header */}
                 <div className="bg-[#075E54] p-4 flex items-center justify-between relative overflow-hidden">
                     <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                     <div className="flex items-center gap-3 relative z-10">
                         <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm">
                             <MessageCircle className="w-6 h-6 text-white" />
                         </div>
                         <div>
                             <h3 className="text-white font-bold text-sm">WhatsApp Business</h3>
                             <p className="text-emerald-100 text-[10px]">Official API Account</p>
                         </div>
                     </div>
                     <div className="px-2 py-1 bg-white/20 rounded text-[10px] font-bold text-white uppercase backdrop-blur-md">
                         Active
                     </div>
                 </div>

                 {/* Body */}
                 <div className="p-6 bg-slate-950/80 backdrop-blur-xl">
                     <div className="flex items-center gap-4 mb-6">
                         <div className="relative">
                            <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop" alt="Business" className="w-14 h-14 rounded-full object-cover border-2 border-emerald-500" />
                            <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1 rounded-full border-2 border-slate-900 shadow-sm">
                                <CheckCircle2 className="w-3 h-3 stroke-[3]" />
                            </div>
                         </div>
                         <div>
                             <h4 className="text-white font-bold text-base flex items-center gap-2">
                                 Honey World <span className="text-emerald-500 text-xs bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">Official</span>
                             </h4>
                             <p className="text-slate-400 text-xs">Business Account</p>
                         </div>
                     </div>

                     <div className="space-y-3">
                         <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                             <div className="flex items-center gap-3">
                                 <div className="p-2 bg-emerald-500/20 rounded-full">
                                     <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                 </div>
                                 <div>
                                     <p className="text-white font-bold text-xs">Green Tick Active</p>
                                     <p className="text-emerald-400/70 text-[10px]">Verified Business</p>
                                 </div>
                             </div>
                             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                         </div>

                         <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 opacity-60">
                             <div className="p-2 bg-white/5 rounded-full">
                                 <MessageCircle className="w-4 h-4 text-slate-400" />
                             </div>
                             <div>
                                 <p className="text-slate-300 font-bold text-xs">High Limit Messaging</p>
                                 <p className="text-slate-500 text-[10px]">Tier 1 Access</p>
                             </div>
                         </div>
                     </div>
                 </div>
                 
                 {/* Footer Shine */}
                 <div className="h-1.5 w-full bg-gradient-to-r from-emerald-600 via-emerald-400 to-emerald-600"></div>
             </div>

             {/* Glows */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-600/20 rounded-full blur-[120px] -z-10 animate-pulse pointer-events-none"></div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
