
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect, useRef } from 'react';
import { Calendar, User, ArrowRight, TrendingUp, Search, Tag, ArrowLeft, Play, Pause, Volume2, Globe, ChevronDown, StopCircle, Mic } from 'lucide-react';
import { Article } from '../types';

interface TrendsPageProps {
    articles: Article[];
}

// --- Languages for Translation Simulation ---
const LANGUAGES = [
    { code: 'en-US', label: 'English (US)', flag: '🇺🇸' },
    { code: 'es-ES', label: 'Español (Spanish)', flag: '🇪🇸' },
    { code: 'fr-FR', label: 'Français (French)', flag: '🇫🇷' },
    { code: 'de-DE', label: 'Deutsch (German)', flag: '🇩🇪' },
    { code: 'hi-IN', label: 'हिन्दी (Hindi)', flag: '🇮🇳' },
    { code: 'ja-JP', label: '日本語 (Japanese)', flag: '🇯🇵' },
];

const TrendsPage: React.FC<TrendsPageProps> = ({ articles }) => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Reading State
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentLang, setCurrentLang] = useState(LANGUAGES[0]);
  const [scrollInterval, setScrollInterval] = useState<number | null>(null);
  
  const articleContentRef = useRef<HTMLDivElement>(null);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

  // --- TTS Functions ---

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
    stopAutoScroll();
  };

  const startAutoScroll = () => {
      if (scrollInterval) return;
      const interval = window.setInterval(() => {
          window.scrollBy({ top: 1, behavior: 'auto' });
          // Stop if we hit bottom
          if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
              stopSpeaking();
          }
      }, 50); // Adjust speed here
      setScrollInterval(interval);
  };

  const stopAutoScroll = () => {
      if (scrollInterval) {
          clearInterval(scrollInterval);
          setScrollInterval(null);
      }
  };

  const toggleSpeech = () => {
    if (!selectedArticle) return;

    if (isSpeaking && !isPaused) {
        // Pause
        window.speechSynthesis.pause();
        setIsPaused(true);
        stopAutoScroll();
    } else if (isSpeaking && isPaused) {
        // Resume
        window.speechSynthesis.resume();
        setIsPaused(false);
        startAutoScroll();
    } else {
        // Start New
        const textToRead = `${selectedArticle.title}. by ${selectedArticle.author}. ${selectedArticle.content.join(' ')}`;
        
        const utterance = new SpeechSynthesisUtterance(textToRead);
        utterance.lang = currentLang.code;
        utterance.rate = 0.9; // Slightly slower for readability
        utterance.pitch = 1;
        
        // Try to find a voice that matches the language
        const voices = window.speechSynthesis.getVoices();
        const voice = voices.find(v => v.lang.includes(currentLang.code));
        if (voice) utterance.voice = voice;

        utterance.onend = () => {
            stopSpeaking();
        };

        speechRef.current = utterance;
        window.speechSynthesis.speak(utterance);
        setIsSpeaking(true);
        setIsPaused(false);
        startAutoScroll();
    }
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newLangCode = e.target.value;
      const lang = LANGUAGES.find(l => l.code === newLangCode) || LANGUAGES[0];
      setCurrentLang(lang);
      
      // If speaking, restart with new language
      if (isSpeaking) {
          stopSpeaking();
          // Small timeout to allow cancel to process
          setTimeout(() => {
              // We need to trigger the speech toggle manually/programmatically if we want instant restart
              // But for UX, let's just stop and let user press play again to hear new voice
          }, 200);
      }
  };

  // Cleanup on unmount or article change
  useEffect(() => {
      return () => {
          stopSpeaking();
      };
  }, [selectedArticle]);

  // Load voices (sometimes async in browsers)
  useEffect(() => {
      window.speechSynthesis.getVoices();
  }, []);

  // Helper to render markdown-like content
  const renderParagraph = (text: string, idx: number) => {
      // 1. Headers
      if (text.startsWith('## ')) {
          return <h2 key={idx} className="text-2xl font-bold text-white mt-10 mb-4">{text.replace('## ', '')}</h2>;
      }
      // 2. Images inside text: ![Alt](url)
      const imgMatch = text.match(/!\[(.*?)\]\((.*?)\)/);
      if (imgMatch) {
          const alt = imgMatch[1];
          const src = imgMatch[2];
          return (
              <div key={idx} className="my-8 rounded-2xl overflow-hidden border border-white/10 shadow-xl">
                  <img src={src} alt={alt} className="w-full h-auto" />
                  {alt && <p className="text-center text-xs text-slate-500 mt-2 p-2">{alt}</p>}
              </div>
          );
      }
      // 3. Lists
      if (text.startsWith('- ') || text.startsWith('1. ') || text.startsWith('2. ')) {
          return (
            <p key={idx} className="text-slate-300 mb-4 pl-4 border-l-2 border-accent-500/30 leading-relaxed font-medium">
                {text.replace(/^[-*12.]\s/, '')}
            </p>
          );
      }

      // 4. Bold Text parsing (simple regex replacement for display)
      const parts = text.split(/(\*\*.*?\*\*)/g);
      return (
        <p key={idx} className="text-slate-300 mb-6 leading-relaxed text-lg">
            {parts.map((part, i) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                    return <strong key={i} className="text-white font-bold">{part.slice(2, -2)}</strong>;
                }
                return part;
            })}
        </p>
      );
  };


  // --- Render Views ---

  // 1. Full Article View
  if (selectedArticle) {
      return (
          <div className="min-h-screen bg-slate-950 pb-20 animate-in fade-in slide-in-from-right-8">
              {/* Sticky Reader Bar */}
              <div className="sticky top-20 z-40 bg-slate-900/90 backdrop-blur-md border-b border-white/10 px-4 py-3 shadow-2xl">
                  <div className="max-w-4xl mx-auto flex items-center justify-between">
                      <button 
                        onClick={() => setSelectedArticle(null)}
                        className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-wider"
                      >
                          <ArrowLeft className="w-4 h-4" /> Back
                      </button>

                      <div className="flex items-center gap-4">
                          {/* Language Selector */}
                          <div className="relative hidden sm:block">
                              <div className="flex items-center gap-2 bg-slate-800 border border-white/10 px-3 py-1.5 rounded-lg">
                                  <Globe className="w-4 h-4 text-slate-400" />
                                  <select 
                                    value={currentLang.code}
                                    onChange={handleLanguageChange}
                                    className="bg-transparent border-none text-white text-xs font-medium focus:ring-0 cursor-pointer appearance-none pr-6"
                                  >
                                      {LANGUAGES.map(l => (
                                          <option key={l.code} value={l.code} className="bg-slate-900 text-white">
                                              {l.flag} {l.label}
                                          </option>
                                      ))}
                                  </select>
                                  <ChevronDown className="w-3 h-3 text-slate-500 absolute right-3 pointer-events-none" />
                              </div>
                          </div>

                          <div className="h-6 w-px bg-white/10 hidden sm:block"></div>

                          {/* Player Controls */}
                          <div className="flex items-center gap-2">
                              {isSpeaking && (
                                  <button onClick={stopSpeaking} className="p-2 hover:bg-red-500/20 text-slate-400 hover:text-red-400 rounded-full transition-colors" title="Stop">
                                      <StopCircle className="w-5 h-5" />
                                  </button>
                              )}
                              <button 
                                onClick={toggleSpeech}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-lg ${
                                    isSpeaking && !isPaused 
                                    ? 'bg-accent-500/20 text-accent-400 border border-accent-500/50' 
                                    : 'bg-white text-black hover:bg-slate-200'
                                }`}
                              >
                                  {isSpeaking && !isPaused ? (
                                      <><Pause className="w-4 h-4 fill-current" /> Pause Reading</>
                                  ) : (
                                      <><Play className="w-4 h-4 fill-current" /> Listen to Article</>
                                  )}
                              </button>
                          </div>
                      </div>
                  </div>
              </div>

              {/* Content Container */}
              <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
                  <div className="text-center mb-10">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-500/10 text-accent-400 text-xs font-bold uppercase tracking-wider mb-6">
                          {selectedArticle.category}
                      </div>
                      <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-6">
                          {selectedArticle.title}
                      </h1>
                      <div className="flex items-center justify-center gap-6 text-sm text-slate-400">
                          <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-white/10">
                                  <User className="w-4 h-4" />
                              </div>
                              <span>{selectedArticle.author}</span>
                          </div>
                          <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              <span>{selectedArticle.date}</span>
                          </div>
                      </div>
                  </div>

                  {/* Featured Image or Audio Player */}
                  <div className="w-full rounded-3xl overflow-hidden mb-12 border border-white/10 shadow-2xl relative bg-slate-900">
                      {selectedArticle.type === 'voice' ? (
                          <div className="aspect-[2/1] flex flex-col items-center justify-center bg-gradient-to-br from-emerald-900 to-slate-900 relative">
                              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                              <div className="w-24 h-24 rounded-full bg-emerald-500 flex items-center justify-center shadow-[0_0_50px_rgba(16,185,129,0.4)] animate-pulse mb-6 relative z-10">
                                  <Mic className="w-10 h-10 text-slate-900" />
                              </div>
                              <h3 className="text-2xl font-bold text-white relative z-10">Cricket Voice Update</h3>
                              <p className="text-emerald-300/80 text-sm mt-2 relative z-10">Audio Analysis by {selectedArticle.author}</p>
                              
                              {selectedArticle.audioUrl && (
                                  <div className="w-full max-w-md px-8 mt-8 relative z-10">
                                      <audio controls className="w-full">
                                          <source src={selectedArticle.audioUrl} type="audio/mpeg" />
                                          Your browser does not support the audio element.
                                      </audio>
                                  </div>
                              )}
                          </div>
                      ) : (
                          <div className="aspect-video relative">
                              <img src={selectedArticle.image} alt={selectedArticle.title} className="w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>
                          </div>
                      )}
                  </div>

                  {/* Body Text */}
                  <div ref={articleContentRef} className="prose prose-invert prose-lg max-w-none">
                      {/* Simulating translation visual effect if language is not English */}
                      {currentLang.code !== 'en-US' && (
                          <div className="bg-indigo-500/10 border border-indigo-500/30 p-4 rounded-xl mb-8 flex items-center gap-3 text-indigo-200 text-sm">
                              <Globe className="w-5 h-5" />
                              <p>
                                  <strong>Translator Active:</strong> Audio playback will use {currentLang.label} accent. 
                                  Visual text remains in original English for accuracy.
                              </p>
                          </div>
                      )}

                      {selectedArticle.content.map((paragraph, idx) => renderParagraph(paragraph, idx))}
                  </div>
                  
                  {/* Tags */}
                  <div className="mt-12 pt-8 border-t border-white/10">
                      <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                          <Tag className="w-4 h-4" /> Related Topics
                      </h4>
                      <div className="flex flex-wrap gap-2">
                          {selectedArticle.tags.map(tag => (
                              <span key={tag} className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded-full text-xs text-slate-300 transition-colors cursor-pointer">
                                  #{tag.replace(/\s+/g, '')}
                              </span>
                          ))}
                      </div>
                  </div>
              </div>
          </div>
      );
  }

  // 2. Main List View
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-in fade-in">
        
        {/* Header */}
        <div className="text-center mb-16 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-900/30 border border-accent-500/30 text-accent-400 text-sm font-bold uppercase tracking-widest">
                <TrendingUp className="w-4 h-4" />
                Latest Insights
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight">
                Social Media <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-400 to-accent-600">Trends & News</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                Expert guides on Meta Verification, platform updates, and digital authority. Stay ahead of the algorithm.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-xl mx-auto relative group">
                <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search articles (e.g. 'Blue Tick Requirements')" 
                    className="w-full bg-slate-900/80 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-600 focus:ring-1 focus:ring-accent-500 transition-all group-hover:border-white/20"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            </div>
        </div>

        {/* Featured Article (Top 1) */}
        {!searchQuery && articles.length > 0 && (
            <div className="mb-16">
                <div onClick={() => setSelectedArticle(articles[0])} className="bg-slate-900/40 border border-white/10 rounded-[32px] overflow-hidden hover:border-accent-500/30 transition-all group cursor-pointer relative shadow-2xl">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="h-64 md:h-auto overflow-hidden relative bg-slate-950">
                             <div className="absolute inset-0 bg-accent-600/20 mix-blend-overlay z-10"></div>
                             {articles[0].type === 'voice' ? (
                                <div className="w-full h-full flex items-center justify-center bg-emerald-900/50">
                                    <Mic className="w-20 h-20 text-emerald-400 opacity-80" />
                                </div>
                             ) : (
                                <img 
                                    src={articles[0].image} 
                                    alt={articles[0].title} 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                             )}
                        </div>
                        <div className="p-8 md:p-12 flex flex-col justify-center">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="px-3 py-1 rounded-full bg-accent-500 text-white text-xs font-bold">Featured</span>
                                <span className="text-slate-400 text-sm flex items-center gap-1"><Calendar className="w-3 h-3" /> {articles[0].date}</span>
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-4 group-hover:text-accent-400 transition-colors">
                                {articles[0].title}
                            </h2>
                            <p className="text-slate-400 mb-6 leading-relaxed">
                                {articles[0].excerpt}
                            </p>
                            <button className="text-white font-bold flex items-center gap-2 hover:gap-4 transition-all uppercase tracking-wider text-sm">
                                Read Full Article <ArrowRight className="w-4 h-4 text-accent-500" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )}

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.slice(!searchQuery && articles.length > 0 ? 1 : 0).filter(a => a.title.toLowerCase().includes(searchQuery.toLowerCase())).map((article) => (
                <div key={article.id} onClick={() => setSelectedArticle(article)} className="bg-slate-900/20 border border-white/5 rounded-3xl p-6 hover:bg-slate-900/60 hover:border-accent-500/20 transition-all group cursor-pointer flex flex-col h-full hover:shadow-xl hover:-translate-y-1">
                    <div className="mb-4 flex items-center justify-between">
                         <span className={`text-xs font-bold px-2 py-1 rounded-lg uppercase tracking-wide ${article.category === 'Cricket' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-accent-500/10 text-accent-400'}`}>
                            {article.category}
                         </span>
                         {article.type === 'voice' ? (
                             <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-bold">
                                <Mic className="w-3 h-3" /> Voice Post
                             </span>
                         ) : (
                             <span className="text-[10px] text-slate-500 flex items-center gap-1">
                                <Volume2 className="w-3 h-3" /> Audio Available
                             </span>
                         )}
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-accent-300 transition-colors leading-tight">
                        {article.title}
                    </h3>
                    
                    <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
                        {article.excerpt}
                    </p>
                    
                    <div className="pt-6 border-t border-white/5 flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-2">
                             <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-slate-400">
                                <User className="w-3 h-3" />
                             </div>
                             <span className="text-xs text-slate-500">{article.author}</span>
                        </div>
                        <span className="text-xs text-slate-600">{article.date}</span>
                    </div>
                </div>
            ))}
        </div>
        
        {/* SEO Keywords Footer Block */}
        <div className="mt-20 pt-10 border-t border-white/5">
             <h4 className="text-slate-500 font-bold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                <Tag className="w-4 h-4" /> Trending Topics
             </h4>
             <div className="flex flex-wrap gap-2">
                {["Meta Verified Cost", "Buy Instagram Blue Tick", "Facebook Verification Service", "WhatsApp Business API Pricing", "Remove Fake Accounts", "Social Media Legal Support", "Instagram Account Recovery", "Meta Portal Login", "Business Manager Verification"].map((tag, i) => (
                    <span key={i} className="px-3 py-1 bg-white/5 rounded-lg text-xs text-slate-400 hover:text-white hover:bg-white/10 cursor-pointer transition-colors">
                        {tag}
                    </span>
                ))}
             </div>
        </div>

    </div>
  );
};

export default TrendsPage;
