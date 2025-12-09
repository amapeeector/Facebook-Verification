
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { ArrowRight, CheckCircle2, Facebook, Instagram, MessageCircle, MoreHorizontal, ArrowLeft, Phone, Video, Mail, Heart, MessageCircle as Comment } from 'lucide-react';

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

          {/* Right: Realistic Mobile Profiles Composition */}
          <div className="relative w-full h-[600px] flex items-center justify-center perspective-1000 order-1 lg:order-2">
             
             {/* 1. Facebook Card (Background Left) */}
             <div className="absolute top-10 left-0 lg:-left-4 w-[280px] bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl transform -rotate-12 scale-90 opacity-80 z-10 animate-float" style={{ animationDuration: '7s' }}>
                {/* Cover Photo */}
                <div className="h-24 bg-gradient-to-r from-blue-900 to-slate-900 relative">
                   <div className="absolute top-4 left-4 p-1 bg-black/30 rounded-full">
                      <ArrowLeft className="w-4 h-4 text-white" />
                   </div>
                </div>
                {/* Profile Section */}
                <div className="px-4 pb-6 -mt-10 relative">
                    <div className="relative inline-block">
                        <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop" className="w-20 h-20 rounded-full border-4 border-slate-900" alt="FB Profile" />
                        <div className="absolute bottom-1 right-1 bg-white rounded-full p-0.5">
                           <div className="bg-blue-500 rounded-full p-0.5">
                             <CheckCircle2 className="w-3 h-3 text-white fill-blue-500" />
                           </div>
                        </div>
                    </div>
                    <h3 className="text-white font-bold text-lg mt-2 flex items-center gap-1">
                        Patricia B. <CheckCircle2 className="w-4 h-4 text-blue-500 fill-white" />
                    </h3>
                    <p className="text-slate-400 text-xs font-medium">Public Figure</p>
                    
                    {/* Bio */}
                    <div className="mt-3 text-sm text-slate-300">
                        <p>Verified by MetaEliteShop</p>
                    </div>

                    <div className="mt-4 flex gap-2">
                        <button className="flex-1 bg-blue-600 text-white text-xs font-bold py-2 rounded-lg flex items-center justify-center gap-1">
                            <MessageCircle className="w-3 h-3" /> Message
                        </button>
                        <button className="flex-1 bg-slate-800 text-slate-300 text-xs font-bold py-2 rounded-lg">
                            Like
                        </button>
                    </div>
                </div>
             </div>

             {/* 2. Instagram Card (Center - Hero) */}
             <div className="relative w-[300px] bg-black border border-slate-800 rounded-[35px] overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] z-30 animate-float" style={{ animationDuration: '6s' }}>
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 text-white border-b border-white/5">
                    <ArrowLeft className="w-5 h-5" />
                    <span className="font-bold text-sm">tomie.official</span>
                    <MoreHorizontal className="w-5 h-5" />
                </div>
                
                {/* Profile Stats */}
                <div className="px-5 py-4 flex items-center justify-between">
                    <div className="relative">
                        <div className="w-20 h-20 rounded-full p-[2px] bg-gradient-to-tr from-yellow-400 to-fuchsia-600">
                            <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop" className="w-full h-full rounded-full border-2 border-black object-cover" alt="IG Profile" />
                        </div>
                    </div>
                    <div className="flex-1 flex justify-around text-center text-white ml-2">
                        <div>
                            <div className="font-bold text-lg">1.2M</div>
                            <div className="text-[10px] text-slate-400">Followers</div>
                        </div>
                        <div>
                            <div className="font-bold text-lg">248</div>
                            <div className="text-[10px] text-slate-400">Following</div>
                        </div>
                    </div>
                </div>

                {/* Bio Section */}
                <div className="px-5 pb-4">
                    <div className="flex items-center gap-1 mb-1">
                        <span className="text-white font-bold text-sm">Tomie Official</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 fill-white" />
                    </div>
                    <p className="text-slate-400 text-xs">Digital Creator</p>
                    <p className="text-slate-200 text-xs mt-2 leading-relaxed">
                        Verified by MetaEliteShop 🚀 <br />
                        Helping brands scale on social media.
                    </p>
                    <p className="text-blue-400 text-xs mt-1 font-medium">metaeliteshop.com</p>
                </div>

                {/* Buttons */}
                <div className="px-5 flex gap-2 mb-4">
                    <button className="flex-1 bg-blue-500 text-white text-xs font-bold py-1.5 rounded-lg">Follow</button>
                    <button className="flex-1 bg-slate-800 text-white text-xs font-bold py-1.5 rounded-lg">Message</button>
                </div>

                {/* Posts Grid */}
                <div className="grid grid-cols-3 gap-0.5">
                    <div className="aspect-square bg-slate-800"><img src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=150&h=150&fit=crop" className="w-full h-full object-cover" /></div>
                    <div className="aspect-square bg-slate-800"><img src="https://images.unsplash.com/photo-1604881991720-f91add269ed8?w=150&h=150&fit=crop" className="w-full h-full object-cover" /></div>
                    <div className="aspect-square bg-slate-800"><img src="https://images.unsplash.com/photo-1595039838779-f3780873afdd?w=150&h=150&fit=crop" className="w-full h-full object-cover" /></div>
                </div>
             </div>

             {/* 3. WhatsApp Card (Foreground Right) */}
             <div className="absolute -bottom-4 right-0 lg:right-4 w-[280px] bg-white rounded-3xl overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] transform rotate-6 scale-95 z-40 animate-float" style={{ animationDuration: '8s', animationDelay: '1s' }}>
                  {/* WA Header */}
                  <div className="bg-[#075E54] px-4 py-3 flex items-center gap-3">
                      <ArrowLeft className="w-5 h-5 text-white" />
                      <div className="flex-1">
                          <h4 className="text-white font-bold text-sm">Business Info</h4>
                      </div>
                      <MoreHorizontal className="w-5 h-5 text-white" />
                  </div>

                  {/* Profile Info */}
                  <div className="p-4 text-center border-b border-slate-100">
                      <div className="w-20 h-20 mx-auto rounded-full p-1 bg-slate-100 mb-2">
                         <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop" className="w-full h-full rounded-full object-cover" alt="WA Profile" />
                      </div>
                      <h3 className="text-slate-900 font-bold text-lg flex items-center justify-center gap-1">
                          Honey World <CheckCircle2 className="w-4 h-4 text-green-500 fill-white" />
                      </h3>
                      <p className="text-slate-500 text-xs">Shopping & Retail</p>
                  </div>

                  {/* Verified Bio */}
                  <div className="p-4 bg-slate-50">
                      <p className="text-[10px] uppercase text-slate-400 font-bold tracking-wider mb-1">About</p>
                      <p className="text-slate-800 text-sm font-medium">Verified by MetaEliteShop</p>
                      <p className="text-slate-400 text-[10px] mt-1">Official Business Account</p>
                  </div>
                  
                  <div className="p-4 grid grid-cols-3 gap-4 text-center text-[#075E54]">
                        <div className="flex flex-col items-center gap-1">
                            <Phone className="w-5 h-5" />
                            <span className="text-[10px]">Audio</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <Video className="w-5 h-5" />
                            <span className="text-[10px]">Video</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <Mail className="w-5 h-5" />
                            <span className="text-[10px]">Email</span>
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
