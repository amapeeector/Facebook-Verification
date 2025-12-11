
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { BarChart3, Users, Globe, ArrowUpRight, Smartphone, Monitor } from 'lucide-react';

const AnalyticsDashboard: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 animate-in fade-in">
      <div className="flex items-center justify-between">
        <div>
           <h2 className="text-3xl font-black text-white">Traffic Analytics</h2>
           <p className="text-slate-400">Real-time visitor insights and conversion tracking.</p>
        </div>
        <div className="flex gap-2">
            <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-bold rounded-full border border-emerald-500/20 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Live
            </span>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
              { label: "Total Visitors", value: "12,405", change: "+14%", icon: Users, color: "text-blue-400" },
              { label: "Avg. Duration", value: "4m 32s", change: "+5%", icon: ClockIcon, color: "text-purple-400" },
              { label: "Bounce Rate", value: "32.5%", change: "-2%", icon: ArrowUpRight, color: "text-emerald-400" },
              { label: "Conversions", value: "854", change: "+21%", icon: BarChart3, color: "text-amber-400" },
          ].map((stat, i) => (
              <div key={i} className="bg-slate-900/50 border border-white/5 p-6 rounded-2xl">
                  <div className="flex items-center justify-between mb-4">
                      <div className={`p-2 bg-white/5 rounded-lg ${stat.color}`}>
                          <stat.icon className="w-5 h-5" />
                      </div>
                      <span className={`text-xs font-bold ${stat.change.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}>
                          {stat.change}
                      </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mt-1">{stat.label}</p>
              </div>
          ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Traffic Source */}
          <div className="bg-slate-900/50 border border-white/5 p-6 rounded-2xl">
              <h3 className="text-white font-bold mb-6 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-slate-400" /> Traffic Sources
              </h3>
              <div className="space-y-4">
                  {[
                      { source: "Google Search", percent: 45, color: "bg-blue-500" },
                      { source: "Direct", percent: 25, color: "bg-purple-500" },
                      { source: "Social (Instagram)", percent: 20, color: "bg-pink-500" },
                      { source: "Referral", percent: 10, color: "bg-slate-500" },
                  ].map((item, i) => (
                      <div key={i}>
                          <div className="flex justify-between text-sm mb-1">
                              <span className="text-slate-300">{item.source}</span>
                              <span className="text-slate-400">{item.percent}%</span>
                          </div>
                          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                              <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.percent}%` }}></div>
                          </div>
                      </div>
                  ))}
              </div>
          </div>

          {/* Device Breakdown */}
           <div className="bg-slate-900/50 border border-white/5 p-6 rounded-2xl">
              <h3 className="text-white font-bold mb-6 flex items-center gap-2">
                  <Monitor className="w-4 h-4 text-slate-400" /> Device Type
              </h3>
              <div className="flex items-center justify-center h-48 gap-8">
                  <div className="text-center">
                      <div className="w-16 h-16 rounded-full border-4 border-indigo-500 flex items-center justify-center mx-auto mb-2 text-indigo-400">
                          <Smartphone className="w-6 h-6" />
                      </div>
                      <p className="text-xl font-bold text-white">65%</p>
                      <p className="text-xs text-slate-500">Mobile</p>
                  </div>
                  <div className="text-center">
                      <div className="w-16 h-16 rounded-full border-4 border-slate-700 flex items-center justify-center mx-auto mb-2 text-slate-500">
                          <Monitor className="w-6 h-6" />
                      </div>
                      <p className="text-xl font-bold text-white">35%</p>
                      <p className="text-xs text-slate-500">Desktop</p>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};

// Helper Icon
const ClockIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
);

export default AnalyticsDashboard;
