
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { Twitter, Instagram, Facebook, Linkedin, Mail, MapPin, Phone, BarChart2 } from 'lucide-react';

interface FooterProps {
    onNavigate?: (mode: any) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
    return (
        <footer className="border-t border-white/5 bg-slate-950 pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-2 space-y-4">
                        <span className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                            MetaElite<span className="text-accent-500">Shop</span>
                        </span>
                        <p className="text-slate-400 max-w-sm text-sm leading-relaxed">
                            The #1 agency for social media verification. We help brands build authority and trust through official Meta verification services.
                        </p>
                        <div className="flex gap-4 mt-6">
                            <a href="#" className="p-2 bg-white/5 rounded-lg hover:bg-accent-600 hover:text-white transition-colors text-slate-400"><Instagram className="w-5 h-5" /></a>
                            <a href="#" className="p-2 bg-white/5 rounded-lg hover:bg-accent-600 hover:text-white transition-colors text-slate-400"><Twitter className="w-5 h-5" /></a>
                            <a href="#" className="p-2 bg-white/5 rounded-lg hover:bg-accent-600 hover:text-white transition-colors text-slate-400"><Linkedin className="w-5 h-5" /></a>
                        </div>
                    </div>
                    
                    <div>
                        <h4 className="text-white font-bold mb-4">Shop</h4>
                        <ul className="space-y-2 text-slate-400 text-sm">
                            <li><a href="#" className="hover:text-accent-400 transition-colors">Instagram Verification</a></li>
                            <li><a href="#" className="hover:text-accent-400 transition-colors">Facebook Page Verify</a></li>
                            <li><a href="#" className="hover:text-accent-400 transition-colors">WhatsApp Business</a></li>
                            <li><a href="#" className="hover:text-accent-400 transition-colors">VIP Bundle</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-4">Contact</h4>
                        <ul className="space-y-3 text-slate-400 text-sm">
                            <li className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-accent-500" /> support@metaeliteshop.com
                            </li>
                            <li className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-accent-500" /> +1 (555) 123-4567
                            </li>
                            <li className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-accent-500" /> Los Angeles, CA
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 gap-4">
                    <p>&copy; {new Date().getFullYear()} MetaEliteShop. All rights reserved.</p>
                    <div className="flex gap-6 items-center">
                        <a href="#" className="hover:text-slate-300">Privacy Policy</a>
                        <a href="#" className="hover:text-slate-300">Terms of Service</a>
                        {onNavigate && (
                             <button onClick={() => onNavigate('ANALYTICS')} className="hover:text-accent-400 flex items-center gap-1">
                                <BarChart2 className="w-3 h-3" /> Site Analytics
                             </button>
                        )}
                    </div>
                </div>
                <p className="text-center text-[10px] text-slate-600 mt-8">
                    MetaEliteShop is a consulting agency and is not directly affiliated with Meta Platforms, Inc. The "Blue Tick" is a registered trademark of Meta Platforms, Inc.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
