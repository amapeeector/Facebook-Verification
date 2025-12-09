
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { PackageItem } from '../types';
import { ShoppingBag, Check, Facebook, Instagram, MessageCircle, Star, Clock, Zap } from 'lucide-react';

interface ServicesProps {
  onSelectPackage: (pkg: PackageItem) => void;
}

const PACKAGES: PackageItem[] = [
  {
    id: 'fb-std',
    title: 'Facebook Verification',
    price: 30,
    turnaround: '30 Mins - 24 Hours',
    platform: 'Facebook',
    features: ['Instant Doc Submission', 'Waitlist Bypass', 'Admin Configuration', 'Subscription Setup'],
    highlight: false,
  },
  {
    id: 'ig-std',
    title: 'Instagram Verification',
    price: 130,
    turnaround: '30 Mins - 24 Hours',
    platform: 'Instagram',
    features: ['Profile Audit', 'Manual Submission', 'Fast-Track Queue', 'Subscription Setup'],
    highlight: true,
  },
  {
    id: 'wa-biz',
    title: 'WhatsApp Business',
    price: 200,
    turnaround: '24 - 48 Hours',
    platform: 'WhatsApp',
    features: ['Green Tick Setup', 'API Approval', 'Display Name Fix', 'Business Catalog'],
    highlight: false,
  },
  {
    id: 'vip-bundle',
    title: 'VIP All-Access Bundle',
    price: 350,
    turnaround: 'Priority (30 Mins)',
    platform: 'All',
    features: ['Instagram, FB & WhatsApp', 'Dedicated Manager', '24/7 VIP Support', 'Guaranteed Submission'],
    highlight: true,
  },
];

const Services: React.FC<ServicesProps> = ({ onSelectPackage }) => {
  
  const getIcon = (platform: string) => {
      switch(platform) {
          case 'Instagram': return <Instagram className="w-10 h-10 text-white" />;
          case 'Facebook': return <Facebook className="w-10 h-10 text-white" />;
          case 'WhatsApp': return <MessageCircle className="w-10 h-10 text-white" />;
          case 'Bundle': return <div className="flex -space-x-2"><Instagram className="w-8 h-8 text-white"/><Facebook className="w-8 h-8 text-white"/></div>;
          case 'All': return <Star className="w-10 h-10 text-white fill-white" />;
          default: return <Zap className="w-10 h-10 text-white" />;
      }
  };

  const getGradient = (platform: string) => {
      switch(platform) {
          case 'Instagram': return 'from-pink-600 via-red-500 to-yellow-500';
          case 'Facebook': return 'from-blue-600 to-indigo-600';
          case 'WhatsApp': return 'from-emerald-600 to-green-500';
          case 'All': return 'from-amber-300 via-yellow-500 to-orange-500';
          default: return 'from-slate-700 to-slate-600';
      }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-4xl md:text-5xl font-black text-white font-sans">
            VIP Service <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Packages</span>
        </h2>
        <div className="bg-blue-900/30 border border-blue-500/30 p-4 rounded-xl max-w-3xl mx-auto">
            <p className="text-blue-200 text-sm md:text-base leading-relaxed">
                <strong>Important:</strong> Our fee covers the professional service to bypass the waitlist, prepare documents instantly, and configure your Business Manager. <br className="hidden md:block"/>
                You will be responsible for the official Meta subscription fee (~$14/mo) directly to Meta upon activation.
            </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {PACKAGES.map((pkg) => (
            <div 
                key={pkg.id} 
                className={`group relative rounded-[32px] bg-slate-900 border transition-all duration-300 flex flex-col overflow-hidden ${
                    pkg.highlight 
                    ? 'border-yellow-500/50 shadow-[0_0_40px_-10px_rgba(234,179,8,0.2)] transform lg:-translate-y-4 z-10' 
                    : 'border-white/10 hover:border-blue-500/30 hover:shadow-2xl'
                }`}
            >
                {/* 3D Visual Header */}
                <div className="relative h-40 w-full bg-slate-950 overflow-hidden flex items-center justify-center">
                    <div className={`absolute inset-0 bg-gradient-to-b ${getGradient(pkg.platform)} opacity-20 group-hover:opacity-40 transition-opacity`}></div>
                    
                    {/* The 3D Icon Object */}
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${getGradient(pkg.platform)} shadow-lg flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 relative z-10 border-t border-white/20`}>
                         <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/30 rounded-2xl pointer-events-none"></div>
                         {getIcon(pkg.platform)}
                    </div>
                </div>

                {/* Content Body */}
                <div className="p-6 flex-1 flex flex-col">
                    <div className="mb-4 text-center">
                        <h3 className="text-lg font-bold text-white mb-2">{pkg.title}</h3>
                        <div className="flex items-center justify-center gap-1">
                            <span className="text-4xl font-black text-white tracking-tight">${pkg.price}</span>
                        </div>
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">One-Time Service Fee</p>
                    </div>

                    <div className="space-y-3 mb-6 flex-1">
                        <div className="flex items-center gap-2 text-xs text-white bg-slate-800/80 p-2.5 rounded-lg border border-white/10 justify-center font-bold">
                            <Clock className="w-3 h-3 text-yellow-400" />
                            {pkg.turnaround}
                        </div>
                        <div className="pt-2 space-y-2">
                            {pkg.features.map((feat, i) => (
                                <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                                    <div className="mt-0.5 w-4 h-4 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                                        <Check className="w-2.5 h-2.5 text-blue-400" />
                                    </div>
                                    <span>{feat}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button 
                        onClick={() => onSelectPackage(pkg)}
                        className={`w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                            pkg.highlight 
                            ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black shadow-lg hover:shadow-yellow-400/20 hover:scale-[1.02]'
                            : 'bg-white text-slate-900 hover:bg-blue-50'
                        }`}
                    >
                        <ShoppingBag className="w-4 h-4" />
                        {pkg.highlight ? 'Get VIP Access' : 'Select Package'}
                    </button>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
