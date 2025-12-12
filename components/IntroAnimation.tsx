
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useEffect, useState } from 'react';
import { BadgeCheck, Hexagon } from 'lucide-react';

interface IntroAnimationProps {
  onComplete: () => void;
}

const IntroAnimation: React.FC<IntroAnimationProps> = ({ onComplete }) => {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    // Total animation duration approx 3.5s
    const timer = setTimeout(() => {
      setExiting(true);
      setTimeout(onComplete, 800); // Wait for exit transition
    }, 3500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-[9999] bg-[#020617] flex items-center justify-center overflow-hidden transition-all duration-700 ${exiting ? 'opacity-0 scale-110 pointer-events-none' : 'opacity-100'}`}>
      
      {/* Background Ambience */}
      <div className="absolute inset-0 overflow-hidden">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-500/20 rounded-full blur-[120px] animate-pulse"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center perspective-1000">
        
        {/* 3D Logo Assembly */}
        <div className="relative w-32 h-32 mb-8 transform-style-3d animate-[spin-3d_3s_ease-out_forwards]">
            {/* Core Logo */}
            <div className="absolute inset-0 flex items-center justify-center bg-slate-950/80 backdrop-blur-xl border border-white/20 rounded-3xl shadow-[0_0_50px_rgba(59,130,246,0.5)] transform translate-z-10">
                <BadgeCheck className="w-16 h-16 text-white" />
            </div>
            
            {/* Floating Elements (Layers) */}
            <div className="absolute inset-0 border-2 border-accent-500 rounded-3xl transform translate-z-[-20px] opacity-50"></div>
            <div className="absolute inset-0 border border-white/10 rounded-3xl transform translate-z-[-40px] opacity-30 bg-accent-900/20"></div>
            
            {/* Orbiting Ring */}
            <div className="absolute -inset-8 border border-dashed border-accent-400/30 rounded-full animate-[spin_4s_linear_infinite]"></div>
        </div>

        {/* Text Reveal */}
        <div className="text-center space-y-2 overflow-hidden">
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter animate-[slide-up_0.8s_ease-out_forwards_0.5s] opacity-0 translate-y-10">
                MetaElite<span className="text-accent-500">Shop</span>
            </h1>
            <div className="h-1 w-24 mx-auto bg-gradient-to-r from-transparent via-accent-500 to-transparent rounded-full animate-[width-expand_1s_ease-out_forwards_1s] opacity-0"></div>
            <p className="text-slate-400 text-sm font-mono tracking-[0.3em] uppercase animate-[fade-in_1s_ease-out_forwards_1.2s] opacity-0">
                Official Verification
            </p>
        </div>

      </div>

      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .translate-z-10 { transform: translateZ(20px); }
        .translate-z--20 { transform: translateZ(-20px); }
        
        @keyframes spin-3d {
            0% { transform: rotateY(180deg) rotateX(45deg) scale(0.5); opacity: 0; }
            60% { transform: rotateY(-10deg) rotateX(5deg) scale(1.1); opacity: 1; }
            100% { transform: rotateY(0deg) rotateX(0deg) scale(1); }
        }
        @keyframes slide-up {
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes width-expand {
            from { width: 0; opacity: 0; }
            to { width: 6rem; opacity: 1; }
        }
        @keyframes fade-in {
            to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default IntroAnimation;
