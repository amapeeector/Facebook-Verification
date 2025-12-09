
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { PackageItem } from '../types';
import { ShoppingBag, Check, Facebook, Instagram, MessageCircle, Star, Clock, Zap, Crown, Quote, User, CheckCircle2 } from 'lucide-react';

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

  const getProfileImage = (platform: string) => {
      switch(platform) {
          case 'Instagram': return "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop";
          case 'Facebook': return "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop";
          case 'WhatsApp': return "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop";
          case 'All': return "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=100&h=100&fit=crop";
          default: return "";
      }
  };

  const getPlatformColor = (platform: string) => {
      switch(platform) {
          case 'WhatsApp': return 'text-green-500';
          default: return 'text-blue-500';
      }
  };

  const getCoverGradient = (platform: string) => {
      switch(platform) {
          case 'Instagram': return 'bg-gradient-to-r from-purple-500 to-pink-500';
          case 'WhatsApp': return 'bg-gradient-to-r from-emerald-600 to-teal-500';
          case 'Facebook': return 'bg-blue-600';
          default: return 'bg-gradient-to-r from-slate-700 to-slate-800';
      }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-4xl md:text-5xl font-black text-white font-sans">
            VIP Service <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-400 to-accent-600">Packages</span>
        </h2>
        <div className="bg-accent-900/20 border border-accent-500/20 p-4 rounded-xl max-w-3xl mx-auto backdrop-blur-sm">
            <p className="text-accent-200 text-sm md:text-base leading-relaxed">
                <strong>Important:</strong> Our fee covers the professional service to bypass the waitlist, prepare documents instantly, and configure your Business Manager. <br className="hidden md:block"/>
                You will be responsible for the official Meta subscription fee (~$14/mo) directly to Meta upon activation.
            </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {PACKAGES.map((pkg) => (
            <div 
                key={pkg.id} 
                className={`group relative rounded-[32px] bg-slate-900/50 backdrop-blur-md border transition-all duration-300 flex flex-col overflow-hidden ${
                    pkg.highlight 
                    ? 'border-accent-500/50 shadow-neon transform lg:-translate-y-4 z-10' 
                    : 'border-white/5 hover:border-accent-500/30 hover:shadow-2xl'
                }`}
            >
                {/* Real Profile Header Visual */}
                <div className="relative h-28 w-full">
                    {/* Cover Photo */}
                    <div className={`absolute inset-0 ${getCoverGradient(pkg.platform)} opacity-80 group-hover:opacity-100 transition-opacity`}></div>
                    
                    {/* Platform Icon Badge */}
                    <div className="absolute top-3 right-3 p-1.5 bg-black/20 backdrop-blur-md rounded-lg text-white">
                        {pkg.platform === 'Instagram' && <Instagram className="w-4 h-4" />}
                        {pkg.platform === 'Facebook' && <Facebook className="w-4 h-4" />}
                        {pkg.platform === 'WhatsApp' && <MessageCircle className="w-4 h-4" />}
                        {pkg.platform === 'All' && <Star className="w-4 h-4" />}
                    </div>

                    {/* Profile Pic overlapping */}
                    <div className="absolute -bottom-8 left-6">
                        <div className="relative">
                            <img 
                                src={getProfileImage(pkg.platform)} 
                                alt={pkg.platform}
                                className="w-16 h-16 rounded-full border-4 border-slate-900 object-cover"
                            />
                            <div className="absolute bottom-0 right-0 bg-white rounded-full p-0.5 border border-slate-900">
                                <CheckCircle2 className={`w-4 h-4 ${getPlatformColor(pkg.platform)} fill-white`} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Body */}
                <div className="px-6 pb-6 pt-10 flex-1 flex flex-col relative">
                    {/* Badge */}
                    {pkg.highlight && (
                        <div className="absolute top-3 right-6 bg-gradient-to-r from-accent-500 to-accent-600 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg uppercase tracking-wider flex items-center gap-1 z-20 whitespace-nowrap">
                            <Crown className="w-3 h-3 fill-white" /> Best Value
                        </div>
                    )}

                    <div className="mb-6">
                        <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-1">
                            {pkg.title} 
                        </h3>
                        <p className="text-xs text-slate-400 mb-3">Professional Verification</p>
                        
                        <div className="flex items-baseline">
                            <span className="text-xl font-bold text-slate-500 align-top mr-1">$</span>
                            <span className={`text-5xl font-black tracking-tighter ${pkg.highlight ? 'text-transparent bg-clip-text bg-gradient-to-r from-accent-400 to-accent-500' : 'text-white'}`}>
                                {pkg.price}
                            </span>
                        </div>
                        <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wide mt-1">One-Time Service Fee</p>
                    </div>

                    <div className="space-y-4 mb-8 flex-1 border-t border-white/5 pt-6">
                        <div className="flex items-center gap-2 text-xs text-white bg-white/5 p-2.5 rounded-lg border border-white/10 justify-center font-bold">
                            <Clock className="w-3 h-3 text-accent-400" />
                            {pkg.turnaround}
                        </div>
                        <div className="space-y-3">
                            {pkg.features.map((feat, i) => (
                                <div key={i} className="flex items-start gap-3 text-xs text-slate-300">
                                    <div className="mt-0.5 w-4 h-4 rounded-full bg-accent-500/20 flex items-center justify-center shrink-0 border border-accent-500/30">
                                        <Check className="w-2.5 h-2.5 text-accent-400" />
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
                            ? 'bg-accent-600 text-white shadow-lg shadow-accent-500/20 hover:scale-[1.02] hover:bg-accent-500'
                            : 'bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20'
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
      <div className="mt-24 pt-16 border-t border-white/5">
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4">
            <h3 className="text-3xl font-black text-white mb-2">
                Trusted by <span className="text-accent-500">Elite</span> Creators
            </h3>
            <p className="text-slate-400 text-sm">Join 500+ verified brands and public figures.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
                <div 
                    key={t.id} 
                    className="bg-slate-900/40 backdrop-blur-md p-8 rounded-[32px] border border-white/5 shadow-xl relative group hover:-translate-y-2 transition-all duration-300 overflow-hidden"
                    style={{ animationDelay: `${i * 100}ms` }}
                >
                    {/* Decorative Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-accent-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <Quote className="absolute top-8 right-8 w-10 h-10 text-white/5 group-hover:text-accent-500/20 transition-colors fill-current" />
                    
                    <div className="relative z-10">
                        <div className="flex gap-1 mb-6">
                            {[...Array(t.rating)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                            ))}
                        </div>
                        
                        <p className="text-slate-300 text-sm leading-relaxed mb-8 font-medium italic">
                            "{t.content}"
                        </p>
                        
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 p-[2px] border border-white/10">
                                <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center text-slate-400">
                                    <User className="w-6 h-6" />
                                </div>
                            </div>
                            <div>
                                <p className="text-white font-bold text-sm">{t.name}</p>
                                <p className="text-xs text-accent-400 font-medium">{t.handle}</p>
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
