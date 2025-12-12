
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { BadgeCheck, Lock, CreditCard, ShoppingCart, Trash2, Settings, CheckCircle2, Shield, Gem, AlertCircle, Smartphone, Building2, Wallet, Bitcoin, ExternalLink, Loader2 } from 'lucide-react';
import { VerificationFormData, PackageItem } from '../types';

interface VerificationFormProps {
    selectedPackage: PackageItem | null;
    onClearPackage: () => void;
}

// Fixed: VipInput defined outside component to prevent focus loss
const VipInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
    <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-500 to-accent-600 rounded-xl opacity-20 group-hover:opacity-50 group-focus-within:opacity-100 transition-opacity duration-300 blur-sm"></div>
        <input 
            {...props} 
            className="relative w-full bg-slate-950 border border-accent-500/30 text-white placeholder:text-slate-500 focus:placeholder:text-accent-200/40 rounded-xl px-5 py-4 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-accent-400 focus:border-accent-400 transition-all shadow-xl backdrop-blur-sm tracking-wide"
        />
    </div>
);

type PaymentMethod = 'CARD' | 'EASYPAISA' | 'JAZZCASH' | 'BANK' | 'CRYPTO';

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
    
        const newOrderId = `VIP-${Date.now().toString().slice(-6)}`;
        setOrderId(newOrderId);
    
        // Construct Professional HTML Table Email Body
        const emailTable = `
<!DOCTYPE html>
<html>
<head>
<style>
  body { font-family: 'Arial', sans-serif; background-color: #f4f4f4; padding: 20px; }
  .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
  .header { background: #1e293b; color: #ffffff; padding: 20px; text-align: center; }
  .header h1 { margin: 0; font-size: 24px; text-transform: uppercase; letter-spacing: 2px; }
  .content { padding: 30px; }
  .order-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
  .order-table th { text-align: left; padding: 12px; background: #f8fafc; color: #64748b; font-size: 12px; text-transform: uppercase; border-bottom: 1px solid #e2e8f0; }
  .order-table td { padding: 12px; border-bottom: 1px solid #e2e8f0; color: #334155; font-weight: 500; }
  .order-table tr:last-child td { border-bottom: none; }
  .badge { display: inline-block; padding: 4px 8px; border-radius: 4px; font-size: 11px; font-weight: bold; background: #e0f2fe; color: #0284c7; }
  .footer { background: #f8fafc; padding: 15px; text-align: center; color: #94a3b8; font-size: 12px; }
</style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New VIP Order</h1>
      <p>Order #${newOrderId}</p>
    </div>
    <div class="content">
      <table class="order-table">
        <tr>
          <th width="35%">Client Details</th>
          <th>Information</th>
        </tr>
        <tr>
          <td>Full Name</td>
          <td>${formData.fullName}</td>
        </tr>
        <tr>
          <td>Email</td>
          <td><a href="mailto:${formData.email}">${formData.email}</a></td>
        </tr>
        <tr>
          <td>Phone</td>
          <td>${formData.phone}</td>
        </tr>
        <tr>
          <td>Country</td>
          <td>${formData.country}</td>
        </tr>
      </table>

      <table class="order-table">
        <tr>
          <th width="35%">Order Details</th>
          <th>Configuration</th>
        </tr>
        <tr>
          <td>Package</td>
          <td><span class="badge">${selectedPackage?.title}</span></td>
        </tr>
        <tr>
          <td>Price</td>
          <td>$${selectedPackage?.price}</td>
        </tr>
        <tr>
          <td>Target Profile</td>
          <td><a href="${formData.targetUrl}">${formData.targetUrl}</a></td>
        </tr>
        <tr>
          <td>Business Manager ID</td>
          <td>${formData.bmId}</td>
        </tr>
        <tr>
          <td>Admin Access</td>
          <td>${formData.isAdmin ? '✅ Confirmed' : '❌ Pending'}</td>
        </tr>
        <tr>
          <td>Payment Method</td>
          <td>${paymentMethod}</td>
        </tr>
        ${formData.trxId ? `<tr><td>Transaction ID</td><td><code>${formData.trxId}</code></td></tr>` : ''}
      </table>
    </div>
    <div class="footer">
      <p>Received: ${new Date().toLocaleString()}</p>
      <p>MetaElite Automation System</p>
    </div>
  </div>
</body>
</html>
        `.trim();

        // Prepare form data for submission (simulated or real backend)
        const formBody = new FormData();
        formBody.append("order_id", newOrderId);
        formBody.append("email", formData.email);
        formBody.append("subject", `New Order #${newOrderId} - ${formData.fullName}`);
        formBody.append("html_body", emailTable); // Sending the HTML table

        try {
            // Simulate processing time
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // In a real scenario, you would fetch to your backend or form service here.
            // e.g., await fetch("https://formsubmit.co/your-email", { method: "POST", body: formBody });

            // Redirect logic to JotForm as requested
            // "link this link up with my payment form"
            const jotformUrl = "https://form.jotform.com/243513800201036";
            
            // We set the step to 2 to show success briefly, then redirect
            setStep(2);
            
            // Auto-redirect to JotForm for payment completion after a short delay
            setTimeout(() => {
                window.location.href = jotformUrl;
            }, 3000);

        } catch (err) {
            setError("Network failed. Redirecting to backup form...");
            setTimeout(() => {
                 window.location.href = "https://form.jotform.com/243513800201036";
            }, 1000);
        } finally {
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

    const renderPaymentButton = (method: PaymentMethod, icon: React.ReactNode, label: string) => (
        <button 
            type="button" 
            onClick={() => setPaymentMethod(method)} 
            className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all duration-300 group ${
                paymentMethod === method 
                ? 'bg-accent-600 border-accent-400 text-white shadow-[0_0_20px_rgba(59,130,246,0.3)] scale-[1.02]' 
                : 'bg-slate-900/50 border-accent-500/10 text-slate-400 hover:bg-accent-900/20 hover:border-accent-500/30 hover:text-accent-200'
            }`}
        >
            <div className={`${paymentMethod === method ? 'text-white' : 'text-slate-500 group-hover:text-accent-400'}`}>
                {icon}
            </div>
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider">{label}</span>
        </button>
    );

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
                                    <div className="flex flex-col items-end gap-2">
                                        <div className="flex items-center gap-2 text-accent-400 bg-accent-500/10 px-4 py-2 rounded-full text-xs font-bold border border-accent-500/20">
                                            <Lock className="w-3 h-3" /> Encrypted & Secure
                                        </div>
                                        <a href="https://form.jotform.com/243513800201036" target="_blank" rel="noreferrer" className="text-[10px] text-slate-500 hover:text-white flex items-center gap-1 transition-colors">
                                            Open Alternative Form <ExternalLink className="w-3 h-3" />
                                        </a>
                                    </div>
                                </div>

                                {error && (
                                    <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl flex items-center gap-3 text-red-200 text-sm animate-in fade-in">
                                        <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                                        <span>{error}</span>
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
                                    
                                    <div className="bg-slate-950/40 rounded-2xl p-6 border border-white/5 space-y-6 relative overflow-hidden">
                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center shrink-0 border border-accent-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
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

                                        <div className="flex items-center gap-3 pt-2 pl-1 group cursor-pointer">
                                            <input 
                                                type="checkbox" 
                                                required 
                                                id="isAdmin" 
                                                name="isAdmin"
                                                className="w-5 h-5 rounded bg-slate-950 border-accent-500/30 text-accent-600 focus:ring-accent-500 focus:ring-offset-slate-950 cursor-pointer"
                                                onChange={(e) => setFormData({...formData, isAdmin: e.target.checked})}
                                            />
                                            <label htmlFor="isAdmin" className="text-xs text-slate-300 cursor-pointer select-none group-hover:text-accent-400 transition-colors">
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
                                    
                                    {/* Payment Method Selector */}
                                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
                                        {renderPaymentButton('CARD', <CreditCard className="w-6 h-6" />, 'Card')}
                                        {renderPaymentButton('EASYPAISA', <Smartphone className="w-6 h-6" />, 'EasyPaisa')}
                                        {renderPaymentButton('JAZZCASH', <Wallet className="w-6 h-6" />, 'JazzCash')}
                                        {renderPaymentButton('BANK', <Building2 className="w-6 h-6" />, 'Bank')}
                                        {renderPaymentButton('CRYPTO', <Bitcoin className="w-6 h-6" />, 'Crypto')}
                                    </div>

                                    {/* Detailed Payment Info Views */}
                                    {paymentMethod === 'CARD' && (
                                        <div className="bg-slate-900/50 rounded-2xl p-6 border border-white/5 text-center">
                                             <p className="text-sm text-slate-300">Secure Payment Form will open after submission.</p>
                                        </div>
                                    )}

                                    {/* ... (Other payment methods remain the same) ... */}
                                    {['EASYPAISA', 'JAZZCASH', 'BANK', 'CRYPTO'].includes(paymentMethod) && (
                                        <div className="bg-slate-900/50 rounded-2xl p-6 border border-white/5 text-center">
                                            <p className="text-sm text-slate-300">Please complete the payment and attach proof in the next step.</p>
                                        </div>
                                    )}
                                </div>

                                <button 
                                    type="submit" 
                                    disabled={loading}
                                    className="w-full py-5 bg-gradient-to-r from-accent-600 to-accent-700 hover:from-accent-500 hover:to-accent-600 border border-accent-400/20 text-white rounded-2xl font-black text-lg shadow-[0_0_30px_rgba(59,130,246,0.4)] hover:shadow-[0_0_50px_rgba(59,130,246,0.6)] transition-all transform hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-3 relative overflow-hidden group"
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        {loading ? "Processing..." : <>Complete Verification Order <CreditCard className="w-5 h-5" /></>}
                                    </span>
                                </button>
                                
                                <p className="text-center text-[10px] text-slate-500">
                                    You will be redirected to our secure payment gateway (JotForm) to finalize.
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
                                    <h3 className="text-4xl font-black text-white mb-4 tracking-tight">Order Initiated</h3>
                                    <p className="text-slate-400 max-w-md mx-auto text-lg">
                                        Redirecting you to the secure payment form...
                                    </p>
                                </div>
                                <div className="flex justify-center">
                                    <Loader2 className="w-8 h-8 animate-spin text-white" />
                                </div>
                                <button onClick={() => window.location.href = "https://form.jotform.com/243513800201036"} className="px-10 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full font-bold transition-colors">
                                    Click here if not redirected
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
