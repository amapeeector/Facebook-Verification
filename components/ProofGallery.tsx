
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { LayoutDashboard, Mail, Smartphone, CheckCircle2, Globe, ShieldCheck, MousePointerClick } from 'lucide-react';

const ProofGallery: React.FC = () => {
  return (
    <section className="py-24 relative z-10 border-t border-white/5 bg-slate-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-500/10 border border-accent-500/20 text-accent-400 text-xs font-bold uppercase tracking-wider mb-4">
              <ShieldCheck className="w-4 h-4" /> Official Results
           </div>
           <h2 className="text-3xl md:text-5xl font-black text-white font-sans mb-4">
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-400 to-accent-600">Proof</span> is in the Portal.
           </h2>
           <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              Don't just take our word for it. See what the official Meta Verified confirmation looks like when you work with MetaElite.
           </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[300px]">
           
           {/* Item 1: Main Dashboard (Large - Top Left) */}
           <div className="md:col-span-8 md:row-span-2 group relative rounded-[32px] overflow-hidden border border-white/10 bg-slate-950 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950/90 z-10"></div>
              {/* PLACEHOLDER: Replace src with your Dashboard Screenshot */}
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=1000&fit=crop" 
                alt="Meta Business Dashboard" 
                className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
              />
              
              {/* Floating UI Badge */}
              <div className="absolute top-6 left-6 z-20 bg-white/10 backdrop-blur-md border border-white/10 px-4 py-2 rounded-xl flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-white font-mono text-xs font-bold uppercase tracking-wider">Status: Active</span>
              </div>

              <div className="absolute bottom-0 left-0 p-8 z-20 w-full">
                 <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-blue-600 rounded-lg text-white shadow-lg shadow-blue-500/20">
                        <LayoutDashboard className="w-5 h-5" />
                    </div>
                    <span className="text-blue-300 font-mono text-xs uppercase tracking-wider">Business Standard</span>
                 </div>
                 <h3 className="text-3xl font-bold text-white mb-2">Meta Business Suite Dashboard</h3>
                 <p className="text-slate-300 text-sm max-w-lg leading-relaxed">
                    The ultimate confirmation. Once verified, your Business Manager displays the "Active" subscription status, unlocking premium support and impersonation protection.
                 </p>
              </div>
           </div>

           {/* Item 2: Email Confirmation (Tall - Top Right) */}
           <div className="md:col-span-4 md:row-span-1 group relative rounded-[32px] overflow-hidden border border-white/10 bg-slate-950 shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 to-transparent z-10"></div>
              {/* PLACEHOLDER: Replace src with your Email Screenshot */}
              <img 
                src="https://images.unsplash.com/photo-1557200134-90327ee9fafa?w=600&h=800&fit=crop" 
                alt="Email Confirmation" 
                className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-0 left-0 p-6 z-20">
                 <div className="flex items-center gap-2 mb-2">
                    <div className="p-1.5 bg-accent-600 rounded-lg text-white">
                        <Mail className="w-4 h-4" />
                    </div>
                    <span className="text-accent-300 text-xs font-bold uppercase">Official Notification</span>
                 </div>
                 <p className="text-white font-bold text-lg leading-tight">"We confirmed your business"</p>
              </div>
           </div>

           {/* Item 3: Mobile Profile (Square - Middle Right) */}
           <div className="md:col-span-4 md:row-span-1 group relative rounded-[32px] overflow-hidden border border-white/10 bg-slate-950 shadow-xl">
               <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/20 to-blue-900/20 z-10"></div>
               <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 to-transparent z-10"></div>
               
               {/* PLACEHOLDER: Replace src with your Profile Screenshot */}
               <img 
                src="https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=600&h=600&fit=crop" 
                alt="Mobile Profile Verified" 
                className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-700"
              />
              
              <div className="absolute bottom-0 left-0 p-6 z-20 w-full">
                 <div className="flex items-center justify-between mb-2">
                     <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-purple-600 rounded-lg text-white">
                            <Smartphone className="w-4 h-4" />
                        </div>
                        <span className="text-purple-300 text-xs font-bold uppercase">Live Profile</span>
                     </div>
                 </div>
                 <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/5">
                    <div className="w-8 h-8 rounded-full bg-slate-800 border border-white/10"></div>
                    <div>
                        <div className="flex items-center gap-1">
                            <span className="text-white font-bold text-sm">silvaqueen15</span>
                            <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 fill-white" />
                        </div>
                        <div className="text-[10px] text-slate-400">Instagram • Public Figure</div>
                    </div>
                 </div>
              </div>
           </div>

           {/* Item 4: Live Page / Public View (Wide - Bottom) */}
           <div className="md:col-span-12 md:row-span-1 group relative rounded-[32px] overflow-hidden border border-white/10 bg-slate-950 shadow-2xl flex items-center">
              <div className="absolute inset-0 bg-slate-950/60 z-10"></div>
              {/* PLACEHOLDER: Replace src with your Live Page Screenshot */}
              <img 
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1600&h=600&fit=crop" 
                alt="Live Facebook Page" 
                className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700"
              />
              
              <div className="relative z-20 p-8 md:p-12 w-full flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="max-w-xl">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-indigo-500 rounded-lg text-white">
                            <Globe className="w-5 h-5" />
                        </div>
                        <span className="text-indigo-300 font-mono text-xs uppercase tracking-wider">Public Visibility</span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Global Authenticity</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">
                          Your verified status is visible worldwide immediately upon approval. It appears in search results, comments, and on your profile, distinguishing you from impersonators.
                      </p>
                  </div>
                  
                  <div className="shrink-0">
                      <a href="#services" className="px-8 py-4 bg-white text-slate-950 rounded-full font-bold hover:bg-slate-200 transition-colors flex items-center gap-2 shadow-lg shadow-white/10">
                          Get Verified Now <MousePointerClick className="w-4 h-4" />
                      </a>
                  </div>
              </div>
           </div>

        </div>
      </div>
    </section>
  );
};

export default ProofGallery;
