
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { Shield, Zap, Globe, Lock } from 'lucide-react';

const WhyChooseUs: React.FC = () => {
    const features = [
        {
            icon: Shield,
            title: "Guaranteed Submission",
            desc: "We use official Media Partner portals, not public forms.",
        },
        {
            icon: Zap,
            title: "72-Hour Turnaround",
            desc: "Express packages get reviewed by Meta within 3 days.",
        },
        {
            icon: Lock,
            title: "No Password Needed",
            desc: "We only need Business Manager Admin access. Keep your account safe.",
        },
        {
            icon: Globe,
            title: "Global Coverage",
            desc: "We verify accounts in over 150+ countries worldwide.",
        }
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-white/5 bg-slate-900/30">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((feat, i) => (
                    <div key={i} className="group h-full bg-slate-900/50 backdrop-blur border border-white/5 p-6 rounded-3xl hover:bg-slate-900 hover:border-accent-500/30 transition-all hover:shadow-neon">
                        <div className="w-12 h-12 rounded-xl bg-accent-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border border-accent-500/20">
                            <feat.icon className="w-6 h-6 text-accent-400" />
                        </div>
                        <h4 className="text-white font-bold text-lg mb-2">{feat.title}</h4>
                        <p className="text-slate-400 text-sm leading-relaxed">{feat.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WhyChooseUs;
