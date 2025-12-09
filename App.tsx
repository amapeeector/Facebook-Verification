
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import Hero from './components/Hero';
import Services from './components/Services';
import VerificationForm from './components/VerificationForm';
import ProcessTimeline from './components/ProcessTimeline';
import WhyChooseUs from './components/WhyChooseUs';
import Footer from './components/Footer';
import { BadgeCheck, Menu, X, ShoppingBag } from 'lucide-react';
import { PackageItem } from './types';

const App: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<PackageItem | null>(null);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const handlePackageSelect = (pkg: PackageItem) => {
    setSelectedPackage(pkg);
    scrollToSection('verification');
  };

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden font-sans selection:bg-blue-100 selection:text-blue-900">
      
      {/* Navigation - VIP Redesign Light */}
      <nav className="sticky top-0 z-50 transition-all duration-300">
        <div className="absolute inset-0 bg-white/80 backdrop-blur-xl border-b border-slate-200"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex justify-between items-center h-24">
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer group" onClick={() => scrollToSection('hero')}>
              <div className="relative">
                 <div className="absolute inset-0 bg-blue-500 blur-lg opacity-10 group-hover:opacity-20 transition-opacity"></div>
                 <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2.5 rounded-xl border border-white/20 relative z-10 shadow-lg shadow-blue-500/20">
                    <BadgeCheck className="w-7 h-7 text-white" />
                 </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-slate-900 leading-none">
                  MetaElite
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-blue-600 font-bold mt-1">
                  Verification
                </span>
              </div>
            </div>
            
            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-1">
              <div className="flex items-center bg-slate-100/80 p-1.5 rounded-full border border-slate-200 mr-4">
                  <button onClick={() => scrollToSection('services')} className="px-5 py-2 rounded-full text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-white hover:shadow-sm transition-all">VIP Packages</button>
                  <button onClick={() => scrollToSection('process')} className="px-5 py-2 rounded-full text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-white hover:shadow-sm transition-all">Process</button>
                  <button onClick={() => scrollToSection('why-us')} className="px-5 py-2 rounded-full text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-white hover:shadow-sm transition-all">Why Us</button>
              </div>

              <button 
                onClick={() => scrollToSection('verification')}
                className="group relative px-6 py-3 bg-slate-900 text-white rounded-full font-bold text-sm transition-all hover:scale-105 active:scale-95 shadow-xl flex items-center gap-2 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10 flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4" />
                    {selectedPackage ? 'Complete Order' : 'Checkout'}
                </div>
              </button>
            </div>

            {/* Mobile Toggle */}
            <div className="md:hidden">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-slate-600">
                {mobileMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden glass-panel border-t border-slate-200 animate-in slide-in-from-top-2 absolute w-full bg-white">
            <div className="px-4 pt-2 pb-4 space-y-1">
              <button onClick={() => scrollToSection('services')} className="block w-full text-left px-4 py-4 text-slate-600 hover:bg-slate-50 rounded-lg border-b border-slate-100">Packages</button>
              <button onClick={() => scrollToSection('process')} className="block w-full text-left px-4 py-4 text-slate-600 hover:bg-slate-50 rounded-lg border-b border-slate-100">How It Works</button>
              <button onClick={() => scrollToSection('verification')} className="block w-full text-left px-4 py-4 text-blue-600 font-bold hover:bg-blue-50 rounded-lg">Checkout Now</button>
            </div>
          </div>
        )}
      </nav>

      <main className="flex-1">
        <section id="hero">
          <Hero onCta={() => scrollToSection('services')} />
        </section>

        <section id="services" className="relative">
           {/* Light Mode Glow */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[800px] bg-blue-100/50 rounded-full blur-[120px] pointer-events-none mix-blend-multiply"></div>
          <Services onSelectPackage={handlePackageSelect} />
        </section>

        <section id="process" className="bg-slate-50 border-y border-slate-200 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-100/60 rounded-full blur-[100px] pointer-events-none mix-blend-multiply"></div>
            <ProcessTimeline />
        </section>
        
        <section id="why-us">
            <WhyChooseUs />
        </section>

        <section id="verification" className="py-24 relative overflow-hidden bg-white">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-50 via-white to-white pointer-events-none" />
          <VerificationForm selectedPackage={selectedPackage} onClearPackage={() => setSelectedPackage(null)} />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default App;
