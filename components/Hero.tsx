
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { ArrowRight, CheckCircle2, Facebook, Instagram, MessageCircle, MoreHorizontal, ArrowLeft, Phone, Video, Mail, BadgeCheck } from 'lucide-react';

interface HeroProps {
  onCta: () => void;
}

const Hero: React.FC<HeroProps> = ({ onCta }) => {
  return (
    <div className="relative min-h-[90vh] flex items-center overflow-hidden pt-10 pb-20">
      
      {/* Background Ambience Dark Mode */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-accent-600/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-accent-900/20 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Content */}
          <div className="text-left space-y-8 animate-in slide-in-from-left-8 fade-in duration-1000 order-2 lg:order-1 relative z-20">
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

          {/* Right: Live 3D Holographic Animation */}
          <div className="relative w-full h-[600px] flex items-center justify-center perspective-1000 order-1 lg:order-2">
             
             {/* 3D Core Scene Container */}
             <div className="relative w-[300px] h-[300px] transform-style-3d">
                
                {/* 1. Central 3D Badge (The Sun) */}
                <div className="absolute inset-0 flex items-center justify-center transform-style-3d animate-spin-slow">
                    {/* Front Face */}
                    <div className="absolute w-40 h-40 rounded-full bg-gradient-to-br from-accent-500 to-accent-700 flex items-center justify-center border-4 border-white/20 shadow-[0_0_80px_rgba(59,130,246,0.6)] backface-hidden translate-z-10">
                        <BadgeCheck className="w-24 h-24 text-white drop-shadow-md" />
                    </div>
                    {/* Back Face (for 3D depth) */}
                    <div className="absolute w-40 h-40 rounded-full bg-gradient-to-br from-accent-700 to-accent-900 flex items-center justify-center border-4 border-white/10 transform rotateY-180 translate-z-[-10px]">
                         <div className="w-24 h-24 rounded-full border-4 border-white/10"></div>
                    </div>
                    {/* Glow Ring */}
                    <div className="absolute inset-[-20px] rounded-full border border-accent-500/30 animate-pulse"></div>
                </div>

                {/* 2. Orbiting Platforms */}
                
                {/* Facebook Orbit */}
                <div className="absolute inset-0 flex items-center justify-center animate-orbit-1">
                    <div className="w-16 h-16 rounded-full bg-[#1877F2] flex items-center justify-center shadow-[0_0_30px_rgba(24,119,242,0.6)] border border-white/20 transform hover:scale-110 transition-transform cursor-pointer">
                        <Facebook className="w-8 h-8 text-white" />
                        <div className="absolute -top-1 -right-1 bg-white rounded-full p-0.5">
                            <CheckCircle2 className="w-3 h-3 text-blue-600 fill-white" />
                        </div>
                    </div>
                </div>

                {/* Instagram Orbit */}
                <div className="absolute inset-0 flex items-center justify-center animate-orbit-2">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center shadow-[0_0_30px_rgba(220,39,67,0.6)] border border-white/20 transform hover:scale-110 transition-transform cursor-pointer">
                        <Instagram className="w-8 h-8 text-white" />
                        <div className="absolute -top-1 -right-1 bg-white rounded-full p-0.5">
                            <CheckCircle2 className="w-3 h-3 text-blue-600 fill-white" />
                        </div>
                    </div>
                </div>

                {/* WhatsApp Orbit */}
                <div className="absolute inset-0 flex items-center justify-center animate-orbit-3">
                    <div className="w-16 h-16 rounded-full bg-[#25D366] flex items-center justify-center shadow-[0_0_30px_rgba(37,211,102,0.6)] border border-white/20 transform hover:scale-110 transition-transform cursor-pointer">
                        <MessageCircle className="w-8 h-8 text-white" />
                        <div className="absolute -top-1 -right-1 bg-white rounded-full p-0.5">
                            <CheckCircle2 className="w-3 h-3 text-green-500 fill-white" />
                        </div>
                    </div>
                </div>

             </div>

             {/* 3. Floating Background Cards (The Context) */}
             {/* These float deep in Z-space to provide depth without interfering with the main animation */}
             
             {/* IG Profile Card */}
             <div className="absolute top-0 right-0 w-[220px] bg-slate-900/80 backdrop-blur-sm border border-white/10 rounded-2xl p-4 transform rotate-6 translate-z-[-100px] animate-float opacity-60 hover:opacity-100 transition-opacity" style={{ animationDelay: '1s' }}>
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-400 to-fuchsia-600 p-[2px]">
                        <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop" className="w-full h-full rounded-full border border-black" />
                    </div>
                    <div>
                        <div className="flex items-center gap-1">
                            <span className="text-white text-xs font-bold">silvaqueen15</span>
                            <CheckCircle2 className="w-3 h-3 text-blue-500 fill-white" />
                        </div>
                        <p className="text-[10px] text-slate-400">Verified by MetaElite</p>
                    </div>
                </div>
             </div>

             {/* FB Profile Card */}
             <div className="absolute bottom-10 -left-10 w-[220px] bg-slate-900/80 backdrop-blur-sm border border-white/10 rounded-2xl p-4 transform -rotate-6 translate-z-[-150px] animate-float opacity-60 hover:opacity-100 transition-opacity" style={{ animationDelay: '3s' }}>
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-blue-600 p-[2px]">
                        <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop" className="w-full h-full rounded-full border border-black" />
                    </div>
                    <div>
                        <div className="flex items-center gap-1">
                            <span className="text-white text-xs font-bold">Patricia B.</span>
                            <CheckCircle2 className="w-3 h-3 text-blue-500 fill-white" />
                        </div>
                        <p className="text-[10px] text-slate-400">Public Figure</p>
                    </div>
                </div>
             </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
