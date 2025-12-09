
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
            color: "blue"
        },
        {
            icon: Zap,
            title: "72-Hour Turnaround",
            desc: "Express packages get reviewed by Meta within 3 days.",
            color: "yellow"
        },
        {
            icon: Lock,
            title: "No Password Needed",
            desc: "We only need Business Manager Admin access. Keep your account safe.",
            color: "emerald"
        },
        {
            icon: Globe,
            title: "Global Coverage",
            desc: "We verify accounts in over 150+ countries worldwide.",
            color: "purple"
        }
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-200 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((feat, i) => (
                    <div key={i} className="group h-full bg-slate-50 border border-slate-200 p-6 rounded-3xl hover:bg-white hover:shadow-xl transition-all">
                        <div className={`w-12 h-12 rounded-xl bg-${feat.color}-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border border-${feat.color}-200`}>
                            <feat.icon className={`w-6 h-6 text-${feat.color}-600`} />
                        </div>
                        <h4 className="text-slate-900 font-bold text-lg mb-2">{feat.title}</h4>
                        <p className="text-slate-500 text-sm leading-relaxed">{feat.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WhyChooseUs;
