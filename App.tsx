
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import Footer from './components/Footer';
import RepoAnalyzer from './components/RepoAnalyzer';
import ArticleToInfographic from './components/ArticleToInfographic';
import DevStudio from './components/DevStudio';
import ImageEditor from './components/ImageEditor';
import IntroAnimation from './components/IntroAnimation';
import Home from './components/Home';
import FashionStudio from './components/FashionStudio';
import ToolsDashboard from './components/ToolsDashboard';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import TrendsPage from './components/TrendsPage';
import { BadgeCheck, Menu, X, Palette, Sparkles, Home as HomeIcon, TrendingUp } from 'lucide-react';
import { PackageItem, ViewMode, ArticleHistoryItem, RepoHistoryItem, DevStudioState } from './types';

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
  const [currentTheme, setCurrentTheme] = useState(THEMES[0]);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.HOME);
  const [showIntro, setShowIntro] = useState(true);

  // App State persistence for switching views
  const [repoHistory, setRepoHistory] = useState<RepoHistoryItem[]>([]);
  const [articleHistory, setArticleHistory] = useState<ArticleHistoryItem[]>([]);
  const [devStudioState, setDevStudioState] = useState<DevStudioState | null>(null);
  const [editorInitialState, setEditorInitialState] = useState<{data: string, mimeType: string} | null>(null);

  // Apply Theme Variables
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--accent-500', currentTheme.primary);
    root.style.setProperty('--accent-600', currentTheme.secondary);
    root.style.setProperty('--accent-100', currentTheme.primary); 
    root.style.setProperty('--accent-900', currentTheme.secondary); 
  }, [currentTheme]);

  const handleNavigate = (mode: ViewMode, data?: any) => {
      if (mode === ViewMode.DEV_STUDIO && data) {
          setDevStudioState(data);
      }
      if (mode === ViewMode.IMAGE_EDITOR && data) {
          setEditorInitialState(data);
      }
      setViewMode(mode);
      window.scrollTo(0, 0);
      setMobileMenuOpen(false);
  };

  if (showIntro) {
    return <IntroAnimation onComplete={() => setShowIntro(false)} />;
  }

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
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer group" onClick={() => handleNavigate(ViewMode.HOME)}>
              <div className="relative">
                 <div className="absolute inset-0 bg-accent-500 blur-lg opacity-20 group-hover:opacity-40 transition-opacity"></div>
                 <div className="bg-gradient-to-br from-accent-500 to-accent-600 p-2 rounded-xl border border-white/20 relative z-10 shadow-lg shadow-accent-500/20">
                    <BadgeCheck className="w-6 h-6 text-white" />
                 </div>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight text-white leading-none">
                  MetaElite
                </span>
                <span className="text-[9px] uppercase tracking-[0.2em] text-accent-500 font-bold mt-1">
                  Shop
                </span>
              </div>
            </div>
            
            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-4">
              <button 
                onClick={() => handleNavigate(ViewMode.HOME)}
                className={`text-sm font-medium transition-colors flex items-center gap-2 ${viewMode === ViewMode.HOME ? 'text-white' : 'text-slate-400 hover:text-white'}`}
              >
                  <HomeIcon className="w-4 h-4" /> Services
              </button>
              
              <button 
                onClick={() => handleNavigate(ViewMode.TRENDS)}
                className={`text-sm font-medium transition-colors flex items-center gap-2 ${viewMode === ViewMode.TRENDS ? 'text-white' : 'text-slate-400 hover:text-white'}`}
              >
                  <TrendingUp className="w-4 h-4" /> Trends & News
              </button>

              <div className="h-4 w-px bg-white/10"></div>
              
              <button 
                onClick={() => handleNavigate(ViewMode.TOOLS_DASHBOARD)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 border ${
                    [ViewMode.TOOLS_DASHBOARD, ViewMode.REPO_ANALYZER, ViewMode.ARTICLE_INFOGRAPHIC, ViewMode.IMAGE_EDITOR, ViewMode.FASHION_STUDIO, ViewMode.DEV_STUDIO].includes(viewMode)
                    ? 'bg-fuchsia-500/10 border-fuchsia-500/50 text-fuchsia-300' 
                    : 'border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                }`}
              >
                  <Sparkles className="w-3.5 h-3.5" /> AI Tools
              </button>
            </div>

            {/* Mobile Toggle */}
            <div className="md:hidden">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-slate-300 hover:text-white">
                {mobileMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
          
          {/* Mobile Menu */}
          {mobileMenuOpen && (
              <div className="md:hidden py-4 border-t border-white/5 space-y-2 animate-in slide-in-from-top-4">
                  <button 
                    onClick={() => handleNavigate(ViewMode.HOME)}
                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 ${viewMode === ViewMode.HOME ? 'bg-white/10 text-white' : 'text-slate-400'}`}
                  >
                      <HomeIcon className="w-5 h-5" /> Services
                  </button>
                  <button 
                    onClick={() => handleNavigate(ViewMode.TRENDS)}
                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 ${viewMode === ViewMode.TRENDS ? 'bg-white/10 text-white' : 'text-slate-400'}`}
                  >
                      <TrendingUp className="w-5 h-5" /> Trends
                  </button>
                  <button 
                    onClick={() => handleNavigate(ViewMode.TOOLS_DASHBOARD)}
                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 ${viewMode === ViewMode.TOOLS_DASHBOARD ? 'bg-fuchsia-500/10 text-fuchsia-300' : 'text-slate-400'}`}
                  >
                      <Sparkles className="w-5 h-5" /> AI Tools
                  </button>
              </div>
          )}
        </div>
      </nav>

      <main className="flex-1 relative pt-8 px-4">
        {viewMode === ViewMode.HOME && (
             <Home onNavigate={handleNavigate} />
        )}
        {viewMode === ViewMode.TRENDS && (
             <TrendsPage />
        )}
        {viewMode === ViewMode.TOOLS_DASHBOARD && (
             <ToolsDashboard onNavigate={handleNavigate} />
        )}
        {viewMode === ViewMode.REPO_ANALYZER && (
            <RepoAnalyzer 
                onNavigate={handleNavigate} 
                history={repoHistory} 
                onAddToHistory={(item) => setRepoHistory([item, ...repoHistory])} 
            />
        )}
        {viewMode === ViewMode.ARTICLE_INFOGRAPHIC && (
            <ArticleToInfographic 
                history={articleHistory} 
                onAddToHistory={(item) => setArticleHistory([item, ...articleHistory])} 
            />
        )}
        {viewMode === ViewMode.DEV_STUDIO && (
            <DevStudio 
                initialState={devStudioState} 
                onNavigate={(mode) => setViewMode(mode)} 
            />
        )}
        {viewMode === ViewMode.IMAGE_EDITOR && (
             <ImageEditor 
                initialState={editorInitialState} 
                onNavigate={(mode) => setViewMode(mode)}
             />
        )}
        {viewMode === ViewMode.FASHION_STUDIO && (
             <FashionStudio />
        )}
        {viewMode === ViewMode.ANALYTICS && (
             <AnalyticsDashboard />
        )}
      </main>

      <Footer onNavigate={(mode) => handleNavigate(mode as ViewMode)} />
    </div>
  );
};

export default App;
