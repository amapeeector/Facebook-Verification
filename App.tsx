
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import Services from './components/Services';
import VerificationForm from './components/VerificationForm';
import ProcessTimeline from './components/ProcessTimeline';
import WhyChooseUs from './components/WhyChooseUs';
import Footer from './components/Footer';
import { BadgeCheck, Menu, X, ShoppingBag, Palette } from 'lucide-react';
import { PackageItem } from './types';

// Theme Definitions
const THEMES = [
  { name: 'Blue',   primary: '59 130 246',  secondary: '37 99 235' }, // Blue-500
  { name: 'Purple', primary: '168 85 247',  secondary: '147 51 234' }, // Purple-500
  { name: 'Emerald',primary: '16 185 129',  secondary: '5 150 105' }, // Emerald-500
  { name: 'Rose',   primary: '244 63 94',   secondary: '225 29 72' }, // Rose-500
  { name: 'Amber',  primary: '245 158 11',  secondary: '217 119 6' }, // Amber-500
];

const App: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<PackageItem | null>(null);
  const [currentTheme, setCurrentTheme] = useState(THEMES[0]);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);

  // Apply Theme Variables
  useEffect(() => {
    const root = document.documentElement;
    // We map the selected theme RGB values to Tailwind's CSS variable structure
    root.style.setProperty('--accent-500', currentTheme.primary);
    root.style.setProperty('--accent-600', currentTheme.secondary);
    
    // Create lighter/darker shades roughly based on the primary (simplified for demo)
    // In a full app, you'd map all shades 50-900 accurately.
    root.style.setProperty('--accent-100', currentTheme.primary); 
    root.style.setProperty('--accent-900', currentTheme.secondary); 
  }, [currentTheme]);

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
    <div className="min-h-screen flex flex-col overflow-x-hidden font-sans selection:bg-accent-500/30 selection:text-white">
      
      {/* Theme Switcher Widget */}
      <div className="fixed bottom-6 right-6 z-[100]">
        <div className={`absolute bottom-full right-0 mb-4 bg-slate-900 border border-white/10 rounded-2xl p-3 shadow-2xl transition-all duration-300 origin-bottom-right ${themeMenuOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}>
           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3 px-1">Select Theme</p>
           <div className="flex flex-col gap-2">
              {THEMES.map((theme) => (
                <button 
                  key={theme.name}
                  onClick={() => { setCurrentTheme(theme); setThemeMenuOpen(false); }}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors w-32"
                >
                  <div className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: `rgb(${theme.primary})` }}></div>
                  <span className={`text-xs font-medium ${currentTheme.name === theme.name ? 'text-white' : 'text-slate-400'}`}>{theme.name}</span>
                </button>
              ))}
           </div>
        </div>
        <button 
          onClick={() => setThemeMenuOpen(!themeMenuOpen)}
          className="w-12 h-12 bg-slate-900 border border-white/10 rounded-full flex items-center justify-center text-white shadow-neon hover:bg-accent-600 transition-all hover:scale-110"
        >
           <Palette className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation - VIP Dark Glass */}
      <nav className="sticky top-0 z-50 transition-all duration-300">
        <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl border-b border-white/5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex justify-between items-center h-24">
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer group" onClick={() => scrollToSection('hero')}>
              <div className="relative">
                 <div className="absolute inset-0 bg-accent-500 blur-lg opacity-20 group-hover:opacity-40 transition-opacity"></div>
                 <div className="bg-gradient-to-br from-accent-500 to-accent-600 p-2.5 rounded-xl border border-white/20 relative z-10 shadow-lg shadow-accent-500/20">
                    <BadgeCheck className="w-7 h-7 text-white" />
                 </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-white leading-none">
                  MetaElite
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-accent-500 font-bold mt-1">
                  Verification
                </span>
              </div>
            </div>
            
            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-1">
              <div className="flex items-center bg-slate-900/50 p-1.5 rounded-full border border-white/5 mr-4 backdrop-blur-md">
                  <button onClick={() => scrollToSection('services')} className="px-5 py-2 rounded-full text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-all">VIP Packages</button>
                  <button onClick={() => scrollToSection('process')} className="px-5 py-2 rounded-full text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-all">Process</button>
                  <button onClick={() => scrollToSection('why-us')} className="px-5 py-2 rounded-full text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-all">Why Us</button>
              </div>

              <button 
                onClick={() => scrollToSection('verification')}
                className="group relative px-6 py-3 bg-accent-600 text-white rounded-full font-bold text-sm transition-all hover:scale-105 active:scale-95 shadow-lg shadow-accent-500/25 flex items-center gap-2 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-accent-400 to-accent-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10 flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4" />
                    {selectedPackage ? 'Complete Order' : 'Checkout'}
                </div>
              </button>
            </div>

            {/* Mobile Toggle */}
            <div className="md:hidden">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-slate-300 hover:text-white">
                {mobileMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden glass-panel border-t border-white/10 animate-in slide-in-from-top-2 absolute w-full bg-slate-900">
            <div className="px-4 pt-2 pb-4 space-y-1">
              <button onClick={() => scrollToSection('services')} className="block w-full text-left px-4 py-4 text-slate-300 hover:bg-white/5 rounded-lg border-b border-white/5">Packages</button>
              <button onClick={() => scrollToSection('process')} className="block w-full text-left px-4 py-4 text-slate-300 hover:bg-white/5 rounded-lg border-b border-white/5">How It Works</button>
              <button onClick={() => scrollToSection('verification')} className="block w-full text-left px-4 py-4 text-accent-500 font-bold hover:bg-white/5 rounded-lg">Checkout Now</button>
            </div>
          </div>
        )}
      </nav>

      <main className="flex-1">
        <section id="hero">
          <Hero onCta={() => scrollToSection('services')} />
        </section>

        <section id="services" className="relative">
           {/* Dark Mode Glow */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[800px] bg-accent-900/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen"></div>
          <Services onSelectPackage={handlePackageSelect} />
        </section>

        <section id="process" className="relative overflow-hidden border-y border-white/5">
            <ProcessTimeline />
        </section>
        
        <section id="why-us">
            <WhyChooseUs />
        </section>

        <section id="verification" className="py-24 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent-900/10 via-slate-950 to-slate-950 pointer-events-none" />
          <VerificationForm selectedPackage={selectedPackage} onClearPackage={() => setSelectedPackage(null)} />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default App;
