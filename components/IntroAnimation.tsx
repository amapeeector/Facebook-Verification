
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useEffect, useState } from 'react';
import { BadgeCheck } from 'lucide-react';

interface IntroAnimationProps {
  onComplete: () => void;
}

const IntroAnimation: React.FC<IntroAnimationProps> = ({ onComplete }) => {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    // Total duration ~2.5s for quick entry
    const timer = setTimeout(() => {
      setExiting(true);
      setTimeout(onComplete, 800); // Wait for exit transition
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-[9999] bg-[#020617] flex items-center justify-center overflow-hidden transition-all duration-700 ${exiting ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100'}`}>
      
      {/* 3D Scene Container */}
      <div className="relative flex flex-col items-center justify-center perspective-1000">
        
        {/* Floating 3D Badge */}
        <div className="relative w-32 h-32 mb-12 transform-style-3d animate-[float_4s_ease-in-out_infinite]">
            
            {/* Center Logo Box */}
            <div className="absolute inset-0 flex items-center justify-center animate-[spin-3d-slow_8s_linear_infinite]">
                 <div className="relative z-20 bg-accent-600 p-5 rounded-3xl shadow-[0_0_60px_rgba(59,130,246,0.6)] border border-white/20">
                    <BadgeCheck className="w-16 h-16 text-white drop-shadow-lg" />
                 </div>
                 {/* Back Glow */}
                 <div className="absolute inset-0 bg-accent-500 blur-3xl opacity-40 animate-pulse"></div>
            </div>

            {/* Orbiting Ring 1 */}
            <div className="absolute inset-[-20px] rounded-full border border-accent-400/30 border-t-accent-400 animate-[spin-3d-1_3s_linear_infinite]"></div>
            
            {/* Orbiting Ring 2 */}
            <div className="absolute inset-[-40px] rounded-full border border-fuchsia-500/20 border-b-fuchsia-500 animate-[spin-3d-2_4s_linear_infinite]"></div>
        </div>

        {/* 3D Text Reveal */}
        <div className="text-center relative z-10 transform-style-3d">
            <h1 className="text-6xl font-black text-white tracking-tighter mb-4 overflow-hidden perspective-1000">
                <span className="inline-block animate-[text-reveal_0.8s_cubic-bezier(0.16,1,0.3,1)_forwards] opacity-0 translate-y-[100px] rotate-x-90 origin-bottom">
                    MetaElite
                </span>
                <span className="inline-block text-accent-500 animate-[text-reveal_0.8s_cubic-bezier(0.16,1,0.3,1)_forwards_0.1s] opacity-0 translate-y-[100px] rotate-x-90 origin-bottom">
                    Shop
                </span>
            </h1>
            <div className="h-1 w-0 mx-auto bg-gradient-to-r from-transparent via-accent-500 to-transparent animate-[expand-width_0.8s_ease-out_forwards_0.6s]"></div>
            <p className="text-slate-500 text-sm font-mono tracking-[0.5em] uppercase mt-4 animate-[fade-in_1s_ease-out_forwards_0.8s] opacity-0">
                Official Verification Service
            </p>
        </div>

      </div>

      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .rotate-x-90 { transform: rotateX(90deg); }
        .origin-bottom { transform-origin: bottom; }
        
        @keyframes spin-3d-slow {
             0% { transform: rotateY(0deg) rotateX(10deg); }
             100% { transform: rotateY(360deg) rotateX(10deg); }
        }
        @keyframes spin-3d-1 {
            0% { transform: rotateX(60deg) rotateY(0deg); }
            100% { transform: rotateX(60deg) rotateY(360deg); }
        }
        @keyframes spin-3d-2 {
            0% { transform: rotateX(-30deg) rotateY(0deg); }
            100% { transform: rotateX(-30deg) rotateY(-360deg); }
        }
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-15px); }
        }
        @keyframes text-reveal {
            to { opacity: 1; transform: translateY(0) rotateX(0); }
        }
        @keyframes expand-width {
            to { width: 100px; }
        }
        @keyframes fade-in {
            to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default IntroAnimation;
