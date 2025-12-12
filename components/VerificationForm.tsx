
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { BadgeCheck, Lock, CreditCard, ShoppingCart, Trash2, Settings, CheckCircle2, Shield, Gem, AlertCircle, Smartphone, Building2, Wallet } from 'lucide-react';
import { VerificationFormData, PackageItem } from '../types';

interface VerificationFormProps {
    selectedPackage: PackageItem | null;
    onClearPackage: () => void;
}

// Fixed: VipInput defined outside component to prevent focus loss
const VipInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
    <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-500 to-accent-700 rounded-xl opacity-0 group-focus-within:opacity-50 transition-opacity duration-500 blur-sm"></div>
        <input 
            {...props} 
            className="relative w-full bg-slate-950/80 border border-white/10 text-white placeholder:text-slate-500 rounded-xl px-5 py-4 text-sm focus:outline-none focus:ring-1 focus:ring-accent-500 focus:border-accent-500 transition-all shadow-inner"
        />
    </div>
);

type PaymentMethod = 'CARD' | 'EASYPAISA' | 'JAZZCASH' | 'BANK';

const VerificationForm: React.FC<VerificationFormProps> = ({ selectedPackage, onClearPackage }) => {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [orderId, setOrderId] = useState('');
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('CARD');
    
    const [formData, setFormData] = useState<VerificationFormData & { bmId: string, isAdmin: boolean, trxId: string }>({
        fullName: '',
        email: '',
        phone: '',
        country: '',
        targetUrl: '',
        notes: '',
        packageId: '',
        bmId: '',
        isAdmin: false,
        trxId: ''
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
        setError(null);

        const newOrderId = `VIP-${Math.floor(Math.random() * 9000) + 1000}`;
        setOrderId(newOrderId);

        // Construct data for Formspree
        // We use descriptive keys so the email table looks good
        const payload = {
            "Order ID": newOrderId,
            "Package": selectedPackage?.title || "Unknown",
            "Price": selectedPackage?.price ? `$${selectedPackage.price}` : "0",
            "Turnaround Time": selectedPackage?.turnaround,
            "--- CLIENT DETAILS ---": "----------------",
            "Client Name": formData.fullName,
            "Email": formData.email,
            "Phone / WhatsApp": formData.phone,
            "Country": formData.country,
            "--- META CONFIG ---": "----------------",
            "Target Profile": formData.targetUrl,
            "Business Manager ID": formData.bmId,
            "Admin Access Given": formData.isAdmin ? "Yes" : "No",
            "--- PAYMENT INFO ---": "----------------",
            "Payment Method": paymentMethod,
            "Transaction ID": paymentMethod !== 'CARD' ? formData.trxId : "N/A (Card Payment)",
            "Submission Date": new Date().toLocaleString()
        };

        try {
            const response = await fetch("https://formspree.io/f/meoylpzj", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                setLoading(false);
                setStep(2);
            } else {
                const data = await response.json();
                if (Object.prototype.hasOwnProperty.call(data, 'errors')) {
                    setError(data.errors.map((error: any) => error.message).join(", "));
                } else {
                    setError("Oops! There was a problem submitting your form");
                }
                setLoading(false);
            }
        } catch (error) {
            console.error("Form Submission Error:", error);
            setError("There was an issue submitting your order. Please check your connection.");
            setLoading(false);
        }
    };

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
                
                {/* Left Col: Form */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-[40px] p-6 md:p-12 shadow-2xl relative overflow-hidden">
                        
                        {/* Decorative background gradients */}
                        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent-600/10 rounded-full blur-[100px] pointer-events-none"></div>

                        {step === 1 ? (
                            <form 
                                onSubmit={handleSubmit} 
                                className="space-y-10 relative z-10"
                            >
                                <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/5 pb-8 gap-4">
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

                                {error && (
                                    <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl flex items-center gap-3 text-red-200 text-sm">
                                        <AlertCircle className="w-5 h-5 text-red-500" />
                                        {error}
                                    </div>
                                )}

                                {/* Personal Info */}
                                <div className="space-y-6">
                                    <h4 className="text-accent-400 font-bold text-xs uppercase tracking-[0.2em] flex items-center gap-2 mb-4">
                                        01 // Client Identity
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <VipInput required name="fullName" type="text" placeholder="Full Legal Name" onChange={handleChange} />
                                        <VipInput required name="email" type="email" placeholder="Business Email" onChange={handleChange} />
                                        <VipInput required name="phone" type="tel" placeholder="WhatsApp Number" onChange={handleChange} />
                                        <VipInput required name="country" type="text" placeholder="Country" onChange={handleChange} />
                                    </div>
                                </div>

                                {/* Business Manager Info */}
                                <div className="space-y-6 pt-2">
                                    <h4 className="text-accent-400 font-bold text-xs uppercase tracking-[0.2em] flex items-center gap-2 mb-4">
                                        02 // Meta Configuration
                                    </h4>
                                    
                                    <div className="bg-black/20 rounded-2xl p-6 border border-white/5 space-y-6 relative overflow-hidden">
                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center shrink-0 border border-white/10 shadow-sm">
                                                <Settings className="w-5 h-5 text-accent-500" />
                                            </div>
                                            <div>
                                                <p className="text-white font-bold text-sm">Target Asset</p>
                                                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                                                    We need your target profile and Business Manager ID to whitelist you in the Meta Media Portal.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 gap-6">
                                            <VipInput required name="targetUrl" type="url" placeholder="Target Profile Link (FB/IG)" onChange={handleChange} />
                                            <div>
                                                <VipInput required name="bmId" type="text" placeholder="Business Manager ID (e.g. 10029384857)" onChange={handleChange} />
                                                <p className="text-[10px] text-slate-500 mt-2 pl-2">Located in Business Settings {'>'} Business Info</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 pt-2 pl-1">
                                            <input 
                                                type="checkbox" 
                                                required 
                                                id="isAdmin" 
                                                name="isAdmin"
                                                className="w-4 h-4 rounded bg-slate-900 border-slate-600 text-accent-500 focus:ring-accent-500"
                                                onChange={(e) => setFormData({...formData, isAdmin: e.target.checked})}
                                            />
                                            <label htmlFor="isAdmin" className="text-xs text-slate-300 cursor-pointer select-none">
                                                I confirm I have added the provided Admin email to my BM.
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                {/* Payment Section */}
                                <div className="space-y-6 pt-2">
                                    <h4 className="text-accent-400 font-bold text-xs uppercase tracking-[0.2em] flex items-center gap-2 mb-4">
                                        03 // Payment Method
                                    </h4>
                                    
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                                        <button type="button" onClick={() => setPaymentMethod('CARD')} className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${paymentMethod === 'CARD' ? 'bg-accent-600 border-accent-500 text-white shadow-lg' : 'bg-slate-900 border-white/5 text-slate-400 hover:bg-slate-800'}`}>
                                            <CreditCard className="w-5 h-5" /> <span className="text-xs font-bold">Card</span>
                                        </button>
                                        <button type="button" onClick={() => setPaymentMethod('EASYPAISA')} className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${paymentMethod === 'EASYPAISA' ? 'bg-green-600 border-green-500 text-white shadow-lg' : 'bg-slate-900 border-white/5 text-slate-400 hover:bg-slate-800'}`}>
                                            <Smartphone className="w-5 h-5" /> <span className="text-xs font-bold">EasyPaisa</span>
                                        </button>
                                        <button type="button" onClick={() => setPaymentMethod('JAZZCASH')} className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${paymentMethod === 'JAZZCASH' ? 'bg-red-600 border-red-500 text-white shadow-lg' : 'bg-slate-900 border-white/5 text-slate-400 hover:bg-slate-800'}`}>
                                            <Wallet className="w-5 h-5" /> <span className="text-xs font-bold">JazzCash</span>
                                        </button>
                                        <button type="button" onClick={() => setPaymentMethod('BANK')} className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${paymentMethod === 'BANK' ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg' : 'bg-slate-900 border-white/5 text-slate-400 hover:bg-slate-800'}`}>
                                            <Building2 className="w-5 h-5" /> <span className="text-xs font-bold">HBL / Bank</span>
                                        </button>
                                    </div>

                                    {paymentMethod === 'CARD' ? (
                                        <div className="bg-slate-900/50 rounded-2xl p-6 border border-white/5 text-center">
                                             <p className="text-sm text-slate-300">Secure Stripe Checkout will load after details submission.</p>
                                        </div>
                                    ) : (
                                        <div className="bg-slate-900/50 rounded-2xl p-6 border border-white/5 space-y-4">
                                            <div className="flex items-start gap-4">
                                                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center shrink-0">
                                                    {paymentMethod === 'EASYPAISA' && <Smartphone className="w-5 h-5 text-green-500" />}
                                                    {paymentMethod === 'JAZZCASH' && <Wallet className="w-5 h-5 text-red-500" />}
                                                    {paymentMethod === 'BANK' && <Building2 className="w-5 h-5 text-indigo-500" />}
                                                </div>
                                                <div className="flex-1">
                                                    <h5 className="text-white font-bold text-sm mb-1">
                                                        {paymentMethod === 'EASYPAISA' && 'EasyPaisa Account Details'}
                                                        {paymentMethod === 'JAZZCASH' && 'JazzCash Account Details'}
                                                        {paymentMethod === 'BANK' && 'HBL Bank Transfer'}
                                                    </h5>
                                                    <div className="bg-black/30 p-3 rounded-lg border border-white/10 font-mono text-xs text-slate-300 space-y-1">
                                                        {paymentMethod === 'EASYPAISA' && (
                                                            <>
                                                                <p>Account Number: <span className="text-white font-bold">03XX-XXXXXXX</span></p>
                                                                <p>Account Title: <span className="text-white font-bold">MetaElite Shop</span></p>
                                                            </>
                                                        )}
                                                        {paymentMethod === 'JAZZCASH' && (
                                                            <>
                                                                <p>Account Number: <span className="text-white font-bold">03XX-XXXXXXX</span></p>
                                                                <p>Account Title: <span className="text-white font-bold">MetaElite Shop</span></p>
                                                            </>
                                                        )}
                                                        {paymentMethod === 'BANK' && (
                                                            <>
                                                                <p>Bank: <span className="text-white font-bold">HBL (Habib Bank Ltd)</span></p>
                                                                <p>Account Number: <span className="text-white font-bold">1234-5678-9012-3456</span></p>
                                                                <p>Title: <span className="text-white font-bold">MetaElite Agency</span></p>
                                                            </>
                                                        )}
                                                    </div>
                                                    <p className="text-[10px] text-slate-500 mt-2">
                                                        Total Amount: <span className="text-accent-400 font-bold">PKR {(selectedPackage.price * 280).toLocaleString()}</span> (Approx. rate)
                                                    </p>
                                                </div>
                                            </div>
                                            
                                            <div className="pt-2">
                                                <VipInput 
                                                    required 
                                                    name="trxId" 
                                                    type="text" 
                                                    placeholder="Enter Transaction ID (Trx ID)" 
                                                    value={formData.trxId}
                                                    onChange={handleChange}
                                                />
                                                <p className="text-[10px] text-slate-500 mt-2 pl-2">Proof of payment required to process order.</p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <button 
                                    type="submit" 
                                    disabled={loading}
                                    className="w-full py-5 bg-gradient-to-r from-accent-600 to-accent-700 hover:from-accent-500 hover:to-accent-600 text-white rounded-2xl font-black text-lg shadow-neon transition-all transform hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-3 relative overflow-hidden group"
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        {loading ? "Submitting Order..." : <>Complete Verification Order <CreditCard className="w-5 h-5" /></>}
                                    </span>
                                </button>
                                
                                <p className="text-center text-[10px] text-slate-500">
                                    By clicking above, you agree to the Terms of Service. Processing time: 30 Mins - 24 Hours.
                                </p>
                            </form>
                        ) : (
                            <div className="text-center py-20 space-y-8 animate-in fade-in zoom-in-95">
                                <div className="relative w-28 h-28 mx-auto">
                                    <div className="absolute inset-0 bg-accent-500 blur-2xl opacity-20 animate-pulse"></div>
                                    <div className="relative w-full h-full bg-slate-900 rounded-full flex items-center justify-center border-2 border-accent-500 shadow-2xl">
                                        <BadgeCheck className="w-14 h-14 text-accent-500" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-4xl font-black text-white mb-4 tracking-tight">Order Received</h3>
                                    <p className="text-slate-400 max-w-md mx-auto text-lg">
                                        We have received your verification request for <span className="text-white font-mono bg-white/5 px-2 py-0.5 rounded border border-white/10">{formData.bmId}</span>.
                                    </p>
                                </div>
                                <div className="bg-slate-950/50 p-8 rounded-2xl border border-white/10 max-w-sm mx-auto text-left space-y-4 shadow-lg">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-400">Order ID</span>
                                        <span className="text-accent-400 font-mono font-bold">#{orderId}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-400">Status</span>
                                        <span className="text-yellow-400 font-bold">Pending Review</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-400">Payment</span>
                                        <span className="text-white font-bold">{paymentMethod}</span>
                                    </div>
                                </div>
                                <div className="p-4 bg-accent-500/10 rounded-xl text-sm text-accent-200">
                                    Check your email ({formData.email}) for the confirmation receipt.
                                </div>
                                <button onClick={() => window.location.reload()} className="px-10 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full font-bold transition-colors">
                                    Return to Home
                                </button>
                            </div>
                        )}
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
                               