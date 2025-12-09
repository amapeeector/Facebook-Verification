
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { ShieldCheck, ArrowRight, CheckCircle2, Zap, HelpCircle } from 'lucide-react';

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

          {/* Right: Visual Construction (Meta UI Replication) */}
          <div className="relative w-full flex items-center justify-center perspective-1000 order-1 lg:order-2 h-[500px]">
             
             {/* The Card */}
             <div className="w-full max-w-md bg-slate-950/80 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl animate-float transform-style-3d rotate-y-6 rotate-x-6 ring-1 ring-white/5 relative z-20">
                {/* Header */}
                <div className="p-6 border-b border-white/5 bg-white/5">
                   <h3 className="text-white font-bold text-lg">Meta Verified Business Standard</h3>
                   <p className="text-slate-400 text-xs mt-1">Help your brand get discovered and build confidence.</p>
                </div>

                {/* Body */}
                <div className="p-6 space-y-6">
                   
                   {/* Profile Section */}
                   <div>
                      <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-3">Subscribed profiles</p>
                      <div className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/5">
                         <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-accent-500 to-accent-300 p-[2px] shadow-lg shadow-accent-500/20">
                            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" alt="Profile" className="w-full h-full rounded-full object-cover border-2 border-slate-900" />
                         </div>
                         <div>
                            <div className="flex items-center gap-1.5">
                               <p className="text-white font-bold text-sm">Patricia Brahampbs</p>
                               {/* The Verified Tick */}
                               <div className="bg-blue-500 rounded-full w-4 h-4 flex items-center justify-center">
                                   <CheckCircle2 className="w-3 h-3 text-white stroke-[3]" />
                               </div>
                            </div>
                            <p className="text-slate-400 text-xs mt-0.5">Facebook Page</p>
                         </div>
                      </div>
                   </div>

                   {/* Benefits Section */}
                   <div>
                       <div className="flex justify-between items-center mb-3">
                            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Benefits</p>
                            <p className="text-accent-400 text-[10px] font-medium cursor-pointer">Contact support</p>
                       </div>
                       
                       <p className="text-slate-400 text-[10px] mb-4">All Meta Verified subscriptions come with a verified badge.</p>

                       <div className="space-y-3">
                           {/* Active Benefit */}
                           <div className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-accent-500/20 to-transparent border border-accent-500/30 relative overflow-hidden group shadow-[0_0_20px_rgba(var(--accent-500),0.15)]">
                               <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent-500 shadow-[0_0_10px_currentColor]"></div>
                               <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/30">
                                   <CheckCircle2 className="w-5 h-5 text-white stroke-[3]" />
                               </div>
                               <div>
                                   <p className="text-white font-bold text-sm">Verified badge</p>
                                   <p className="text-slate-300 text-xs mt-1 leading-relaxed">Let people know your business is real with a verified badge on your profile.</p>
                               </div>
                           </div>

                           {/* Secondary Benefit */}
                           <div className="flex items-start gap-4 p-4 rounded-xl opacity-50 hover:opacity-100 transition-opacity">
                               <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center shrink-0 border border-white/10">
                                   <HelpCircle className="w-4 h-4 text-slate-400" />
                               </div>
                               <div>
                                   <p className="text-slate-300 font-bold text-sm">Enhanced support</p>
                                   <p className="text-slate-500 text-xs mt-1">Find answers to your questions and get help troubleshooting.</p>
                                </div>
                           </div>
                       </div>
                   </div>

                </div>
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
