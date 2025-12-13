
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useEffect } from 'react';
import { ShoppingCart, Trash2, CheckCircle2, Shield, Gem, Lock } from 'lucide-react';
import { PackageItem } from '../types';

interface VerificationFormProps {
    selectedPackage: PackageItem | null;
    onClearPackage: () => void;
}

const VerificationForm: React.FC<VerificationFormProps> = ({ selectedPackage, onClearPackage }) => {

    useEffect(() => {
        if (selectedPackage) {
            // Check if script is already present to avoid duplicates
            const scriptId = 'typeform-embed-script';
            if (!document.getElementById(scriptId)) {
                const script = document.createElement('script');
                script.id = scriptId;
                script.src = "//embed.typeform.com/next/embed.js";
                script.async = true;
                document.body.appendChild(script);
            }
        }
    }, [selectedPackage]);

    if (!selectedPackage) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
                <div className="w-24 h-24 bg-slate-900/50 rounded-full flex items-center justify-center animate-pulse border border-white/10 shadow-xl">
                    <ShoppingCart className="w-10 h-10 text-slate-500" />
                </div>
                <h3 className="text-3xl font-bold text-white tracking-tight">Your Cart is Empty</h3>
                <p className="text-slate-400 max-w-md mx-auto">Select a VIP package from the shop above to begin your instant verification process.</p>
                <a href="#services" className="px-10 py-4 bg-accent-600 text-white rounded-full font-bold hover:bg-accent-500 transition-all shadow-neon">
                    View Packages
                </a>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 relative z-10 py-12">
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                
                {/* Left Col: Typeform Embed */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-[40px] p-6 md:p-8 shadow-2xl relative overflow-hidden min-h-[600px]">
                        
                        {/* Header */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/5 pb-6 gap-4 mb-4">
                            <div>
                                <h3 className="text-2xl font-black text-white tracking-tight flex items-center gap-3">
                                    <Gem className="w-6 h-6 text-accent-500" />
                                    VIP Checkout
                                </h3>
                                <p className="text-sm text-slate-400 mt-2">Secure portal for verification orders.</p>
                            </div>
                            <div className="flex items-center gap-2 text-accent-400 bg-accent-500/10 px-4 py-2 rounded-full text-xs font-bold border border-accent-500/20">
                                <Lock className="w-3 h-3" /> Encrypted & Secure
                            </div>
                        </div>

                        {/* Typeform Container */}
                        <div className="w-full h-full min-h-[500px]">
                             <div data-tf-live="01KCBT2CXYRCZVYWABEPS2JYRQ"></div>
                        </div>
                        
                    </div>
                </div>

                {/* Right Col: Summary */}
                <div className="lg:col-span-1 sticky top-32">
                    <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-[32px] p-6 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-accent-500/20 rounded-full blur-[50px] pointer-events-none"></div>
                        
                        <h3 className="text-white font-bold mb-8 flex items-center gap-2 text-lg border-b border-white/5 pb-4">
                            <ShoppingCart className="w-5 h-5 text-accent-500" /> Order Summary
                        </h3>
                        
                        <div className="space-y-6">
                            <div className="flex gap-4 items-start">
                                <div className="w-16 h-16 bg-white/5 rounded-xl flex items-center justify-center border border-white/5 shrink-0">
                                    <CheckCircle2 className="w-8 h-8 text-accent-500" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-white font-bold text-sm truncate leading-tight">{selectedPackage.title}</h4>
                                    <p className="text-[11px] text-slate-500 mt-1 uppercase tracking-wider">{selectedPackage.turnaround}</p>
                                    <button onClick={onClearPackage} className="text-red-400 text-[10px] mt-3 hover:text-red-300 flex items-center gap-1 font-bold uppercase tracking-wide transition-colors">
                                        <Trash2 className="w-3 h-3" /> Remove Item
                                    </button>
                                </div>
                            </div>

                            <div className="bg-black/20 rounded-xl p-4 space-y-3 border border-white/5">
                                <div className="flex justify-between text-sm text-slate-400">
                                    <span>Subtotal</span>
                                    <span className="font-mono text-white">${selectedPackage.price.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm text-slate-400">
                                    <span>Service Fee</span>
                                    <span className="text-accent-400 font-mono font-bold">INCLUDED</span>
                                </div>
                                <div className="flex justify-between text-lg font-black text-white pt-3 border-t border-white/10">
                                    <span>Total Due</span>
                                    <span className="text-accent-400">${selectedPackage.price.toFixed(2)}</span>
                                </div>
                            </div>
                            
                            <div className="bg-accent-900/20 border border-accent-500/20 p-4 rounded-xl flex items-start gap-3">
                                <Shield className="w-5 h-5 text-accent-500 shrink-0 mt-0.5" />
                                <p className="text-[11px] text-accent-200 leading-relaxed">
                                    <strong>Safe & Secure:</strong> Please fill out the form on the left to complete your order.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerificationForm;
