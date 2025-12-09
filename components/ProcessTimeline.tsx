
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { MousePointerClick, FileCheck2, BadgeCheck } from 'lucide-react';

const ProcessTimeline: React.FC = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
            <div className="text-center mb-20">
                <div className="inline-block px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-600 text-xs font-bold uppercase tracking-widest mb-4">
                    The Blueprint
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-slate-900 font-sans mb-4">
                    How It Works
                </h2>
                <p className="text-slate-500 max-w-lg mx-auto">Three simple steps to your Blue Badge. We handle the paperwork instantly.</p>
            </div>

            <div className="relative">
                {/* Connecting Line */}
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-200 hidden md:block"></div>

                <div className="space-y-16 md:space-y-28">
                    {/* Step 1 */}
                    <div className="relative flex flex-col md:flex-row items-center gap-8 md:gap-20 group">
                        <div className="flex-1 text-center md:text-right order-2 md:order-1">
                            <h3 className="text-2xl font-bold text-slate-900 mb-2">1. Link & Admin Access</h3>
                            <p className="text-slate-500 text-sm leading-relaxed max-w-sm ml-auto">
                                Provide your profile link and add our agency email as an Admin to your Business Manager.
                            </p>
                        </div>
                        <div className="w-20 h-20 rounded-3xl bg-white border border-blue-200 flex items-center justify-center relative z-10 shadow-xl order-1 md:order-2 group-hover:scale-110 transition-transform duration-500">
                            <MousePointerClick className="w-8 h-8 text-blue-600" />
                            <div className="absolute -inset-2 rounded-3xl border border-blue-100 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                        <div className="flex-1 order-3 hidden md:block"></div>
                    </div>

                    {/* Step 2 */}
                    <div className="relative flex flex-col md:flex-row items-center gap-8 md:gap-20 group">
                        <div className="flex-1 hidden md:block order-1"></div>
                        <div className="w-20 h-20 rounded-3xl bg-white border border-purple-200 flex items-center justify-center relative z-10 shadow-xl order-1 md:order-2 group-hover:scale-110 transition-transform duration-500">
                            <FileCheck2 className="w-8 h-8 text-purple-600" />
                            <div className="absolute -inset-2 rounded-3xl border border-purple-100 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                        <div className="flex-1 text-center md:text-left order-2 md:order-3">
                             <h3 className="text-2xl font-bold text-slate-900 mb-2">2. Instant Processing</h3>
                            <p className="text-slate-500 text-sm leading-relaxed max-w-sm mr-auto">
                                We instantly generate and submit the required legal documents to Meta. You then add your card to BM for the monthly subscription.
                            </p>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="relative flex flex-col md:flex-row items-center gap-8 md:gap-20 group">
                        <div className="flex-1 text-center md:text-right order-2 md:order-1">
                             <h3 className="text-2xl font-bold text-slate-900 mb-2">3. Verification Active</h3>
                            <p className="text-slate-500 text-sm leading-relaxed max-w-sm ml-auto">
                                Meta reviews the prioritized submission (30 mins - 24 hours). Once approved, the blue tick appears instantly.
                            </p>
                        </div>
                        <div className="w-20 h-20 rounded-3xl bg-white border border-emerald-200 flex items-center justify-center relative z-10 shadow-xl order-1 md:order-2 group-hover:scale-110 transition-transform duration-500">
                            <BadgeCheck className="w-8 h-8 text-emerald-600" />
                            <div className="absolute -inset-2 rounded-3xl border border-emerald-100 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                        <div className="flex-1 order-3 hidden md:block"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProcessTimeline;
