
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { ShieldCheck, ArrowRight, CheckCircle2, Star, Zap } from 'lucide-react';

interface HeroProps {
  onCta: () => void;
}

const Hero: React.FC<HeroProps> = ({ onCta }) => {
  return (
    <div className="relative min-h-[85vh] flex items-center overflow-hidden pt-10 pb-20">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Content */}
          <div className="text-left space-y-8 animate-in slide-in-from-left-8 fade-in duration-1000 order-2 lg:order-1">
             <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-blue-500/30 backdrop-blur-md shadow-neon-blue">
                <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
                <span className="text-xs font-bold text-blue-200 tracking-wide uppercase">Instantly Available</span>
             </div>

             <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.05] tracking-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">Instant</span> <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">Verification</span> <br />
                Services.
             </h1>

             <p className="text-lg text-slate-400 max-w-lg leading-relaxed border-l-2 border-blue-500/30 pl-6">
                Skip the waitlist. We provide end-to-end Business Manager configuration and verification submission for Brands & Public Figures. <strong className="text-white">30 Min - 24 Hour Turnaround.</strong>
             </p>

             <div className="flex flex-col sm:flex-row gap-5 pt-4">
                <button 
                  onClick={onCta}
                  className="px-8 py-4 bg-white text-slate-950 hover:bg-blue-50 rounded-2xl font-black text-lg shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-105 transition-all flex items-center justify-center gap-2 group"
                >
                  Start Verification <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <div className="flex items-center gap-4 px-4 py-2 bg-slate-900/50 rounded-2xl border border-white/5">
                   <div className="flex -space-x-3">
                        {[1,2,3].map(i => (
                            <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 border-2 border-slate-950 flex items-center justify-center text-xs text-white font-bold">
                                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
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

          {/* Right: 3D Visual Construction */}
          <div className="relative h-[600px] w-full flex items-center justify-center perspective-1000 order-1 lg:order-2">
             {/* Central Floating Card */}
             <div className="w-[340px] h-[500px] bg-[#0A0F1E] rounded-[48px] border-[6px] border-slate-800 shadow-[0_0_80px_-20px_rgba(37,99,235,0.3)] relative z-20 animate-float transform-style-3d rotate-y-12 rotate-x-12 flex flex-col overflow-hidden">
                
                {/* Screen Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-slate-950 rounded-b-2xl z-30"></div>
                
                {/* Content inside Phone */}
                <div className="flex-1 flex flex-col items-center pt-20 px-6 relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-transparent pointer-events-none"></div>

                    {/* Animated Check */}
                    <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-400 flex items-center justify-center shadow-[0_0_40px_rgba(59,130,246,0.5)] mb-8 relative">
                         <div className="absolute inset-0 border-4 border-white/20 rounded-full animate-ping opacity-20"></div>
                         <CheckCircle2 className="w-14 h-14 text-white drop-shadow-md" />
                    </div>
                    
                    <h3 className="text-3xl font-bold text-white mb-2 tracking-tight">Verified</h3>
                    <p className="text-blue-200/60 text-sm mb-10 font-medium tracking-wide">MetaElite VIP</p>
                    
                    {/* Mock Content Lines */}
                    <div className="w-full space-y-4 px-4">
                        <div className="h-3 w-full bg-slate-800/80 rounded-full"></div>
                        <div className="h-3 w-5/6 bg-slate-800/80 rounded-full mx-auto"></div>
                        <div className="h-3 w-4/6 bg-slate-800/80 rounded-full mx-auto"></div>
                    </div>

                    <div className="mt-auto w-full pb-8">
                        <div className="bg-slate-900/80 backdrop-blur border border-white/5 rounded-2xl p-4 flex items-center justify-between">
                             <div className="flex items-center gap-2">
                                <Zap className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                <span className="text-xs text-white font-bold">Fast Lane</span>
                             </div>
                             <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-2 py-1 rounded">ACTIVE</span>
                        </div>
                    </div>
                </div>
             </div>

             {/* Floating Elements Behind */}
             <div className="absolute top-1/2 right-0 w-64 h-64 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full blur-[80px] opacity-20 animate-pulse pointer-events-none"></div>
             
             {/* Floating Badge Left */}
             <div className="absolute top-1/3 left-0 -translate-x-8 bg-slate-900/90 backdrop-blur-xl p-4 pr-8 rounded-2xl border border-white/10 shadow-2xl animate-float-delayed z-30 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg">
                    <ShieldCheck className="w-6 h-6 text-white" />
                </div>
                <div>
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Security</p>
                    <p className="text-lg text-white font-bold">Encrypted</p>
                </div>
             </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
