
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
