
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import Hero from './Hero';
import Services from './Services';
import VerificationForm from './VerificationForm';
import ProcessTimeline from './ProcessTimeline';
import WhyChooseUs from './WhyChooseUs';
import ProofGallery from './ProofGallery';
import { PackageItem, ViewMode } from '../types';
import { TrendingUp, ArrowRight } from 'lucide-react';

interface HomeProps {
  onNavigate: (mode: ViewMode) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
    const [selectedPackage, setSelectedPackage] = useState<PackageItem | null>(null);

    const handleCta = () => {
        document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
    };

    const handlePackageSelect = (pkg: PackageItem) => {
        setSelectedPackage(pkg);
        setTimeout(() => {
            document.getElementById('verification')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    return (
        <div className="space-y-0 animate-in fade-in">
            <Hero onCta={handleCta} />
            
            {/* Social Media Trends Section for SEO */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex items-center gap-2 mb-6 text-accent-500 font-bold uppercase tracking-wider text-xs">
                    <TrendingUp className="w-4 h-4" />
                    Trending Now
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { title: "Meta Verified Subscription Updates 2024", desc: "Learn how the new subscription model affects legacy verified badges and brand accounts." },
                        { title: "Instagram Algorithm Secrets", desc: "Why verified accounts are getting priority ranking in the new 2025 feed update." },
                        { title: "WhatsApp Business Green Tick", desc: "The ultimate guide to securing the green badge for API business numbers." }
                    ].map((trend, i) => (
                        <div key={i} className="bg-slate-900/40 border border-white/5 p-6 rounded-2xl hover:bg-slate-900 hover:border-accent-500/20 transition-all cursor-pointer group">
                            <h3 className="text-white font-bold text-lg mb-2 group-hover:text-accent-400 transition-colors">{trend.title}</h3>
                            <p className="text-slate-400 text-sm mb-4 leading-relaxed">{trend.desc}</p>
                            <span className="text-xs font-mono text-accent-500 flex items-center gap-1">
                                Read Article <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <div id="services">
                <Services onSelectPackage={handlePackageSelect} />
            </div>
            <div id="verification" className="scroll-mt-24">
                <VerificationForm selectedPackage={selectedPackage} onClearPackage={() => setSelectedPackage(null)} />
            </div>
            <ProcessTimeline />
            <ProofGallery />
            <WhyChooseUs />
        </div>
    );
};

export default Home;
