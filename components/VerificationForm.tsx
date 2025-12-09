
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { BadgeCheck, Lock, CreditCard, ShoppingCart, Trash2, Settings, CheckCircle2, Shield, Gem } from 'lucide-react';
import { VerificationFormData, PackageItem } from '../types';

interface VerificationFormProps {
    selectedPackage: PackageItem | null;
    onClearPackage: () => void;
}

// Fixed: VipInput defined outside component to prevent focus loss
const VipInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
    <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl opacity-0 group-focus-within:opacity-30 transition-opacity duration-500 blur-sm"></div>
        <input 
            {...props} 
            className="relative w-full bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 rounded-xl px-5 py-4 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
        />
    </div>
);

const VerificationForm: React.FC<VerificationFormProps> = ({ selectedPackage, onClearPackage }) => {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<VerificationFormData & { bmId: string, isAdmin: boolean }>({
        fullName: '',
        email: '',
        phone: '',
        country: '',
        targetUrl: '',
        notes: '',
        packageId: '',
        bmId: '',
        isAdmin: false
    });

    useEffect(() => {
        if (selectedPackage) {
            setFormData(prev => ({ ...prev, packageId: selectedPackage.id }));
        }
    }, [selectedPackage]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate payment process
        await new Promise(resolve => setTimeout(resolve, 2000));
        setLoading(false);
        setStep(2); 
    };

    if (!selectedPackage) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center animate-pulse border border-slate-200 shadow-xl">
                    <ShoppingCart className="w-10 h-10 text-slate-400" />
                </div>
                <h3 className="text-3xl font-bold text-slate-900 tracking-tight">Your Cart is Empty</h3>
                <p className="text-slate-500 max-w-md mx-auto">Select a VIP package from the shop above to begin your instant verification process.</p>
                <a href="#services" className="px-10 py-4 bg-slate-900 text-white rounded-full font-bold hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl">
                    View Packages
                </a>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 relative z-10 py-12">
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                
                {/* Left Col: Form */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white border border-slate-200 rounded-[40px] p-6 md:p-12 shadow-2xl shadow-slate-200/50 relative overflow-hidden">
                        
                        {/* Decorative background gradients */}
                        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-50 rounded-full blur-[100px] pointer-events-none"></div>

                        {step === 1 ? (
                            <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
                                <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-100 pb-8 gap-4">
                                    <div>
                                        <h3 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                                            <Gem className="w-6 h-6 text-purple-600" />
                                            VIP Checkout
                                        </h3>
                                        <p className="text-sm text-slate-500 mt-2">Secure encrypted portal for instant processing.</p>
                                    </div>
                                    <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50 px-4 py-2 rounded-full text-xs font-bold border border-emerald-100">
                                        <Lock className="w-3 h-3" /> 256-Bit SSL Secured
                                    </div>
                                </div>

                                {/* Personal Info */}
                                <div className="space-y-6">
                                    <h4 className="text-blue-600 font-bold text-xs uppercase tracking-[0.2em] flex items-center gap-2 mb-4">
                                        01 // Client Identity
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <VipInput required name="fullName" type="text" placeholder="Full Legal Name" onChange={handleChange} />
                                        <VipInput required name="email" type="email" placeholder="Business Email" onChange={handleChange} />
                                        <VipInput required name="phone" type="tel" placeholder="WhatsApp Number (with Country Code)" onChange={handleChange} />
                                        <VipInput required name="country" type="text" placeholder="Country of Residence" onChange={handleChange} />
                                    </div>
                                </div>

                                {/* Business Manager Info */}
                                <div className="space-y-6 pt-2">
                                    <h4 className="text-purple-600 font-bold text-xs uppercase tracking-[0.2em] flex items-center gap-2 mb-4">
                                        02 // Meta Configuration
                                    </h4>
                                    
                                    <div className="bg-slate-50/80 rounded-2xl p-6 border border-slate-200 space-y-6 relative overflow-hidden">
                                        <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500"></div>
                                        
                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 border border-slate-200 shadow-sm">
                                                <Settings className="w-5 h-5 text-purple-600" />
                                            </div>
                                            <div>
                                                <p className="text-slate-900 font-bold text-sm">Instant Doc Submission</p>
                                                <p className="text-xs text-slate-500 mt-1 leading-relaxed max-w-lg">
                                                    Our system auto-generates the required legal documents. We only need your Business Manager ID to whitelist you in the Meta Media Portal.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 gap-6">
                                            <VipInput required name="targetUrl" type="url" placeholder="Paste Target Profile Link (FB/IG)" onChange={handleChange} />
                                            <div>
                                                <VipInput required name="bmId" type="text" placeholder="Business Manager ID (e.g. 10029384857)" onChange={handleChange} />
                                                <p className="text-[10px] text-slate-400 mt-2 pl-2">Located in Business Settings {'>'} Business Info</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 pt-2 pl-1">
                                            <input 
                                                type="checkbox" 
                                                required 
                                                id="isAdmin" 
                                                className="w-4 h-4 rounded bg-white border-slate-300 text-blue-600 focus:ring-blue-500"
                                                onChange={(e) => setFormData({...formData, isAdmin: e.target.checked})}
                                            />
                                            <label htmlFor="isAdmin" className="text-xs text-slate-600 cursor-pointer select-none">
                                                I confirm I have added the provided Admin email to my BM.
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <button 
                                    type="submit" 
                                    disabled={loading}
                                    className="w-full py-5 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-black text-lg shadow-xl shadow-slate-900/20 transition-all transform hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-3 relative overflow-hidden group"
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        {loading ? "Initializing Secure Gateway..." : <>Start Verification Now <CreditCard className="w-5 h-5" /></>}
                                    </span>
                                </button>
                                
                                <p className="text-center text-[10px] text-slate-400">
                                    By clicking above, you agree to the Terms of Service. Processing time: 30 Mins - 24 Hours.
                                </p>
                            </form>
                        ) : (
                            <div className="text-center py-20 space-y-8 animate-in fade-in zoom-in-95">
                                <div className="relative w-28 h-28 mx-auto">
                                    <div className="absolute inset-0 bg-emerald-500 blur-2xl opacity-20 animate-pulse"></div>
                                    <div className="relative w-full h-full bg-white rounded-full flex items-center justify-center border-2 border-emerald-500 shadow-2xl">
                                        <BadgeCheck className="w-14 h-14 text-emerald-500" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Order Confirmed</h3>
                                    <p className="text-slate-500 max-w-md mx-auto text-lg">
                                        Your fast-track request for <span className="text-slate-900 font-mono bg-slate-100 px-2 py-0.5 rounded border border-slate-200">{formData.bmId}</span> has been queued.
                                    </p>
                                </div>
                                <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 max-w-sm mx-auto text-left space-y-4 shadow-lg">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500">Order ID</span>
                                        <span className="text-blue-600 font-mono font-bold">#VIP-{Math.floor(Math.random() * 9000) + 1000}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500">Est. Completion</span>
                                        <span className="text-slate-900 font-bold">~ 24 Hours</span>
                                    </div>
                                </div>
                                <button onClick={() => window.location.reload()} className="px-10 py-3 bg-slate-900 text-white rounded-full font-bold hover:bg-slate-800 transition-colors">
                                    Return to Home
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Col: Summary */}
                <div className="lg:col-span-1 sticky top-32">
                    <div className="bg-white border border-slate-200 rounded-[32px] p-6 shadow-2xl shadow-slate-200/50 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-[50px] pointer-events-none"></div>
                        
                        <h3 className="text-slate-900 font-bold mb-8 flex items-center gap-2 text-lg border-b border-slate-100 pb-4">
                            <ShoppingCart className="w-5 h-5 text-blue-600" /> Order Summary
                        </h3>
                        
                        <div className="space-y-6">
                            <div className="flex gap-4 items-start">
                                <div className="w-16 h-16 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100 shrink-0">
                                    <CheckCircle2 className="w-8 h-8 text-blue-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-slate-900 font-bold text-sm truncate leading-tight">{selectedPackage.title}</h4>
                                    <p className="text-[11px] text-slate-500 mt-1 uppercase tracking-wider">{selectedPackage.turnaround}</p>
                                    <button onClick={onClearPackage} className="text-red-500 text-[10px] mt-3 hover:text-red-600 flex items-center gap-1 font-bold uppercase tracking-wide transition-colors">
                                        <Trash2 className="w-3 h-3" /> Remove Item
                                    </button>
                                </div>
                            </div>

                            <div className="bg-slate-50 rounded-xl p-4 space-y-3 border border-slate-100">
                                <div className="flex justify-between text-sm text-slate-500">
                                    <span>Subtotal</span>
                                    <span className="font-mono text-slate-900">${selectedPackage.price.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm text-slate-500">
                                    <span>Service Fee</span>
                                    <span className="text-emerald-600 font-mono font-bold">INCLUDED</span>
                                </div>
                                <div className="flex justify-between text-lg font-black text-slate-900 pt-3 border-t border-slate-200">
                                    <span>Total Due</span>
                                    <span className="text-blue-600">${selectedPackage.price.toFixed(2)}</span>
                                </div>
                            </div>
                            
                            <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-start gap-3">
                                <Shield className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                                <p className="text-[11px] text-blue-800 leading-relaxed">
                                    <strong>Safe & Secure:</strong> We do not ask for passwords. Admin access allows us to legally whitelist your asset.
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
