
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { PackageItem } from '../types';
import { ShoppingBag, Check, Facebook, Instagram, MessageCircle, Star, Clock, Zap, Crown, Quote, User } from 'lucide-react';

interface ServicesProps {
  onSelectPackage: (pkg: PackageItem) => void;
}

const PACKAGES: PackageItem[] = [
  {
    id: 'fb-std',
    title: 'Facebook Verification',
    price: 130,
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

const TESTIMONIALS = [
    {
        id: 1,
        name: "Sarah Jenkins",
        role: "Fashion Influencer",
        handle: "@sarah.style",
        content: "I was stuck on the waitlist for 6 months. MetaElite got my Instagram verified in literally 4 hours. The dashboard made it so easy to track.",
        rating: 5,
        platform: "Instagram"
    },
    {
        id: 2,
        name: "Marcus Chen",
        role: "Tech Founder",
        handle: "@marcus.tech",
        content: "Professional handling of our Business Manager. They fixed the 'Not Eligible' error we kept getting. Worth every penny for the peace of mind.",
        rating: 5,
        platform: "Facebook"
    },
    {
        id: 3,
        name: "Elena Rodriguez",
        role: "Public Figure",
        handle: "@elena.official",
        content: "The VIP bundle is a game changer. Got both FB and IG done. The team walked me through every step of the subscription setup.",
        rating: 5,
        platform: "Bundle"
    }
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
        <h2 className="text-4xl md:text-5xl font-black text-slate-900 font-sans">
            VIP Service <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Packages</span>
        </h2>
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl max-w-3xl mx-auto">
            <p className="text-blue-900 text-sm md:text-base leading-relaxed">
                <strong>Important:</strong> Our fee covers the professional service to bypass the waitlist, prepare documents instantly, and configure your Business Manager. <br className="hidden md:block"/>
                You will be responsible for the official Meta subscription fee (~$14/mo) directly to Meta upon activation.
            </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {PACKAGES.map((pkg) => (
            <div 
                key={pkg.id} 
                className={`group relative rounded-[32px] bg-white border transition-all duration-300 flex flex-col overflow-hidden shadow-xl ${
                    pkg.highlight 
                    ? 'border-yellow-400 shadow-[0_10px_40px_-10px_rgba(234,179,8,0.2)] transform lg:-translate-y-4 z-10' 
                    : 'border-slate-100 hover:border-blue-200 hover:shadow-2xl'
                }`}
            >
                {/* 3D Visual Header */}
                <div className="relative h-32 w-full bg-slate-50 overflow-hidden flex items-center justify-center">
                    <div className={`absolute inset-0 bg-gradient-to-b ${getGradient(pkg.platform)} opacity-5 group-hover:opacity-10 transition-opacity`}></div>
                    
                    {/* The 3D Icon Object */}
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${getGradient(pkg.platform)} shadow-lg flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 relative z-10`}>
                         <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/30 rounded-2xl pointer-events-none"></div>
                         {getIcon(pkg.platform)}
                    </div>
                </div>

                {/* Content Body */}
                <div className="p-6 flex-1 flex flex-col relative">
                    {/* Badge */}
                    {pkg.highlight && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg uppercase tracking-wider flex items-center gap-1 z-20 whitespace-nowrap">
                            <Crown className="w-3 h-3 fill-white" /> Best Value
                        </div>
                    )}

                    <div className="mb-6 text-center">
                        <h3 className="text-lg font-bold text-slate-900 mb-3">{pkg.title}</h3>
                        
                        <div className="flex items-baseline justify-center">
                            <span className="text-2xl font-bold text-slate-400 align-top mr-1">$</span>
                            <span className={`text-6xl font-black tracking-tighter ${pkg.highlight ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600' : 'text-slate-900'}`}>
                                {pkg.price}
                            </span>
                        </div>
                        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mt-2">One-Time Service Fee</p>
                    </div>

                    <div className="space-y-4 mb-8 flex-1 border-t border-slate-100 pt-6">
                        <div className="flex items-center gap-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-200 justify-center font-bold">
                            <Clock className="w-3 h-3 text-yellow-600" />
                            {pkg.turnaround}
                        </div>
                        <div className="space-y-3">
                            {pkg.features.map((feat, i) => (
                                <div key={i} className="flex items-start gap-3 text-xs text-slate-600">
                                    <div className="mt-0.5 w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 border border-emerald-200">
                                        <Check className="w-2.5 h-2.5 text-emerald-600" />
                                    </div>
                                    <span className="font-medium">{feat}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button 
                        onClick={() => onSelectPackage(pkg)}
                        className={`w-full py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                            pkg.highlight 
                            ? 'bg-slate-900 text-white shadow-lg hover:shadow-xl hover:scale-[1.02] hover:bg-slate-800'
                            : 'bg-white border-2 border-slate-200 text-slate-900 hover:bg-slate-50 hover:border-slate-300'
                        }`}
                    >
                        <ShoppingBag className="w-4 h-4" />
                        {pkg.highlight ? 'Get VIP Access' : 'Select Package'}
                    </button>
                </div>
            </div>
        ))}
      </div>

      {/* Testimonials Section */}
      <div className="mt-24 pt-16 border-t border-slate-200">
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4">
            <h3 className="text-3xl font-black text-slate-900 mb-2">
                Trusted by <span className="text-blue-600">Elite</span> Creators
            </h3>
            <p className="text-slate-500 text-sm">Join 500+ verified brands and public figures.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
                <div 
                    key={t.id} 
                    className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-lg relative group hover:-translate-y-2 transition-all duration-300 overflow-hidden"
                    style={{ animationDelay: `${i * 100}ms` }}
                >
                    {/* Decorative Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <Quote className="absolute top-8 right-8 w-10 h-10 text-slate-100 group-hover:text-blue-100 transition-colors fill-current" />
                    
                    <div className="relative z-10">
                        <div className="flex gap-1 mb-6">
                            {[...Array(t.rating)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                            ))}
                        </div>
                        
                        <p className="text-slate-600 text-sm leading-relaxed mb-8 font-medium italic">
                            "{t.content}"
                        </p>
                        
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 p-[2px]">
                                <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-slate-400">
                                    <User className="w-6 h-6" />
                                </div>
                            </div>
                            <div>
                                <p className="text-slate-900 font-bold text-sm">{t.name}</p>
                                <p className="text-xs text-blue-600 font-medium">{t.handle}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>

    </div>
  );
};

export default Services;
