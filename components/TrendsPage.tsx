
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect, useRef } from 'react';
import { Calendar, User, ArrowRight, TrendingUp, Search, Tag, ArrowLeft, Play, Pause, Volume2, Globe, ChevronDown, StopCircle } from 'lucide-react';

// --- Types ---
interface Article {
    id: number;
    title: string;
    excerpt: string;
    content: string[]; // Array of paragraphs
    category: string;
    date: string;
    author: string;
    tags: string[];
    image: string;
}

// --- Data ---
const ARTICLES: Article[] = [
    {
        id: 7,
        title: "How do I connect the Facebook Messenger with Superchat",
        excerpt: "A comprehensive guide on integrating your Facebook Page messages directly into the Superchat dashboard for unified customer support.",
        content: [
            "Connecting Facebook Messenger to Superchat allows you to manage all your customer conversations in one place. This integration streamlines your support workflow and ensures no message goes unanswered.",
            "## Prerequisites",
            "You must be an admin of the Facebook Page you wish to connect. Ensure you have the necessary permissions in Meta Business Suite before attempting the connection.",
            "## Step-by-Step Integration",
            "1. **Log in to Superchat:** Navigate to your dashboard and go to 'Settings' > 'Channels'.",
            "2. **Select Facebook Messenger:** Click on the 'Add Channel' button and select 'Facebook Messenger' from the list of available integrations.",
            "3. **Authorize Permissions:** You will be redirected to Facebook. Log in and grant Superchat permission to manage your pages and messages.",
            "4. **Select Page:** Choose the specific Facebook Page you want to connect and click 'Save'.",
            "## Troubleshooting",
            "If messages aren't appearing, check your Page settings in Facebook to ensure 'Handover Protocol' is correctly configured."
        ],
        category: "Integrations",
        date: "Dec 12, 2025",
        author: "Superchat Help",
        tags: ["Facebook Messenger", "Superchat", "Integration", "Customer Support"],
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&h=800&fit=crop"
    },
    {
        id: 1,
        title: "How to Get Meta Verified on Instagram in 2025: The Ultimate Guide",
        excerpt: "Step-by-step instructions on securing the blue tick for your Instagram profile using the new Meta Verified subscription model versus legacy verification.",
        content: [
            "The landscape of social media verification has fundamentally changed. Gone are the days when the elusive 'blue tick' was reserved solely for celebrities and global brands. With the introduction of the Meta Verified subscription model, creators and businesses can now build trust and authority more easily.",
            "## What is Meta Verified?",
            "Meta Verified is a subscription bundle for Instagram and Facebook that includes a verified badge, proactive account protection, and access to account support. Unlike the legacy verification (which was based on press notability), this new model is based on identity verification.",
            "## Requirements for 2025",
            "Before applying, ensure your account meets the following criteria: You must be at least 18 years old, have a profile that meets minimum activity requirements (posting history), and have Two-Factor Authentication enabled. Crucially, your profile name and photo must match your government-issued ID exactly.",
            "## Step-by-Step Application Process",
            "1. **Go to Settings:** Open your Instagram profile, tap the hamburger menu, and select 'Meta Verified'. If it's available in your region, you will see a prompt to subscribe.",
            "2. **Select Profile:** Choose the profile you wish to verify. Note that you need separate subscriptions for Instagram and Facebook.",
            "3. **Confirm Payment:** The cost is approximately $11.99 USD on the web and $14.99 USD on iOS/Android. Complete the payment via your app store or credit card.",
            "4. **Identity Verification:** This is the most critical step. You will be asked to take a photo of your government ID (Passport, Driver's License, or National ID). The name and photo must match your profile *exactly*.",
            "5. **Submit a Selfie Video:** To prevent identity theft, Meta may ask for a selfie video to confirm you are a real person.",
            "## Common Rejection Reasons",
            "The number one reason for rejection is a mismatch between the profile name and the ID name. If your profile says 'John's Bakery' but your ID says 'John Smith', you will be rejected. You must change your profile name to 'John Smith' to get verified, or register as a Business (which requires different documentation like Articles of Incorporation).",
            "## Conclusion",
            "Getting Meta Verified is the fastest way to secure your digital presence in 2025. It stops impersonators in their tracks and signals to your audience that you are the authentic voice behind the brand."
        ],
        category: "Instagram",
        date: "Oct 24, 2024",
        author: "MetaElite Team",
        tags: ["Instagram Verification", "Blue Tick", "Social Media Strategy"],
        image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=1200&h=800&fit=crop"
    },
    {
        id: 2,
        title: "Facebook Blue Tick Verification: Requirements and Application Process",
        excerpt: "Understanding the eligibility criteria for Facebook Page verification. Learn why having a complete profile and press coverage matters more than follower count.",
        content: [
            "Facebook Pages representing businesses require a different approach than personal profiles. While individuals can use the subscription model, recognized brands often seek the 'Legacy' badge or the new 'Verified for Business' tier.",
            "## The Business Verification Difference",
            "For a business page to be verified, Meta looks for authenticity, uniqueness, completeness, and notability. Unlike personal profiles, you cannot just upload a driver's license. You must prove the business exists.",
            "## Required Documents",
            "Prepare these documents before you start: Articles of Incorporation, Tax ID or VAT registration, and utility bills showing the business address and phone number.",
            "## The 'Notability' Factor",
            "Even with the subscription, Meta often checks if the business is 'notable'. This usually means having a few news articles written about your brand. Press releases do not count; these must be organic news features.",
            "## Configuration Tips",
            "Ensure your 'About' section is 100% complete. Link your website, add your email, and verify your domain within Business Manager. An incomplete profile is an automatic rejection."
        ],
        category: "Facebook",
        date: "Oct 22, 2024",
        author: "Sarah Jenkins",
        tags: ["Facebook", "Business Manager", "Branding"],
        image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&h=800&fit=crop"
    },
    {
        id: 3,
        title: "WhatsApp Business Green Tick: Official API Verification Steps",
        excerpt: "A complete guide for businesses to get the Official Business Account (OBA) green badge on WhatsApp API. Stop using standard business accounts and build trust.",
        content: [
            "The WhatsApp Green Tick is the gold standard for business communication. It signifies that Meta has verified that an authentic, notable brand owns this account.",
            "## API vs. App",
            "You cannot get a Green Tick on the standard WhatsApp Business App installed on your phone. You MUST be using the WhatsApp Business API (WABA) through a provider (BSP) or Meta's Cloud API.",
            "## Verification Criteria",
            "1. **Verified Business Manager:** Your Meta Business Manager must be verified with legal documents.",
            "2. **2FA:** Two-step verification must be enabled.",
            "3. **Display Name:** Your display name must match your external branding exactly and not violate WhatsApp commerce policies.",
            "4. **Notability:** This is the hardest part. WhatsApp requires significant press coverage (Tier 1 news sites) to grant the Green Tick.",
            "## How to Apply",
            "Go to WhatsApp Manager inside your Meta Business Suite. Select the phone number, click on 'Settings', and submit a request for an 'Official Business Account'. If rejected, you can re-apply after 30 days."
        ],
        category: "WhatsApp",
        date: "Oct 20, 2024",
        author: "Tech Support",
        tags: ["WhatsApp API", "Green Tick", "Business Automation"],
        image: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=1200&h=800&fit=crop"
    },
    {
        id: 4,
        title: "Is Meta Verified Worth It? Benefits for Creators and Brands",
        excerpt: "An honest breakdown of the costs versus benefits. From impersonation protection to increased reach—is the monthly fee justified for your personal brand?",
        content: [
             "At roughly $15 a month, many creators ask: Is Meta Verified actually worth the cost? Let's break down the tangible benefits beyond just the cosmetic blue checkmark.",
             "## Impersonation Protection",
             "This is the biggest selling point. Meta actively monitors the platform for accounts pretending to be you. For creators who face constant copycat accounts scamming their followers, this feature alone is worth the subscription.",
             "## Direct Support Access",
             "Anyone who has tried to contact Instagram support knows it is nearly impossible. Meta Verified promises access to live chat support. While results vary, having *any* line of communication is better than none.",
             "## Increased Reach?",
             "Meta has gone back and forth on this. Initially, they promised increased visibility in search and comments. They have since rolled this back slightly to ensure fairness, but verified accounts still tend to appear higher in search results simply due to the authority signal.",
             "## The Verdict",
             "If you rely on social media for income or have a reputation to protect, the $15/month is a necessary insurance policy for your digital identity."
        ],
        category: "Analysis",
        date: "Oct 18, 2024",
        author: "Marketing Desk",
        tags: ["Review", "Subscription", "Creator Economy"],
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&h=800&fit=crop"
    },
    // ... kept other articles for list view (simulated content for demo)
    {
        id: 5,
        title: "Solving the 'Not Eligible' for Meta Verification Error",
        excerpt: "Stuck on the waitlist? Seeing the 'Not Eligible' grayed-out button? Here are the top 5 reasons why your account is blocked and how to fix them instantly.",
        content: ["Detailed troubleshooting steps would go here..."],
        category: "Troubleshooting",
        date: "Oct 15, 2024",
        author: "MetaElite Team",
        tags: ["Support", "Fixes", "Waitlist"],
        image: "https://images.unsplash.com/photo-1555421689-d68471e189f2?w=1200&h=800&fit=crop"
    },
    {
        id: 6,
        title: "Protecting Your Brand: Why Verification Stops Impersonation",
        excerpt: "Fake profiles can destroy your reputation. Discover how the blue checkmark acts as a shield against scams and identity theft on social platforms.",
        content: ["Detailed security analysis would go here..."],
        category: "Security",
        date: "Oct 12, 2024",
        author: "Security Analyst",
        tags: ["Cybersecurity", "Brand Safety", "Trust"],
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&h=800&fit=crop"
    }
];

// --- Languages for Translation Simulation ---
const LANGUAGES = [
    { code: 'en-US', label: 'English (US)', flag: '🇺🇸' },
    { code: 'es-ES', label: 'Español (Spanish)', flag: '🇪🇸' },
    { code: 'fr-FR', label: 'Français (French)', flag: '🇫🇷' },
    { code: 'de-DE', label: 'Deutsch (German)', flag: '🇩🇪' },
    { code: 'hi-IN', label: 'हिन्दी (Hindi)', flag: '🇮🇳' },
    { code: 'ja-JP', label: '日本語 (Japanese)', flag: '🇯🇵' },
];

const TrendsPage: React.FC = () => {
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

                  {/* Featured Image */}
                  <div className="w-full aspect-video rounded-3xl overflow-hidden mb-12 border border-white/10 shadow-2xl relative">
                      <img src={selectedArticle.image} alt={selectedArticle.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>
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

                      {selectedArticle.content.map((paragraph, idx) => {
                          if (paragraph.startsWith('## ')) {
                              return <h2 key={idx} className="text-2xl font-bold text-white mt-10 mb-4">{paragraph.replace('## ', '')}</h2>
                          }
                          if (paragraph.startsWith('1. ') || paragraph.startsWith('2. ') || paragraph.startsWith('3. ')) {
                              return <p key={idx} className="text-slate-300 mb-6 pl-4 border-l-2 border-accent-500/30 leading-relaxed font-medium">{paragraph}</p>
                          }
                          return (
                            <p key={idx} className="text-slate-300 mb-6 leading-relaxed text-lg">
                                {paragraph}
                            </p>
                          );
                      })}
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
        {!searchQuery && (
            <div className="mb-16">
                <div onClick={() => setSelectedArticle(ARTICLES[0])} className="bg-slate-900/40 border border-white/10 rounded-[32px] overflow-hidden hover:border-accent-500/30 transition-all group cursor-pointer relative shadow-2xl">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="h-64 md:h-auto overflow-hidden relative">
                             <div className="absolute inset-0 bg-accent-600/20 mix-blend-overlay z-10"></div>
                             <img 
                                src={ARTICLES[0].image} 
                                alt={ARTICLES[0].title} 
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                             />
                        </div>
                        <div className="p-8 md:p-12 flex flex-col justify-center">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="px-3 py-1 rounded-full bg-accent-500 text-white text-xs font-bold">Featured</span>
                                <span className="text-slate-400 text-sm flex items-center gap-1"><Calendar className="w-3 h-3" /> {ARTICLES[0].date}</span>
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-4 group-hover:text-accent-400 transition-colors">
                                {ARTICLES[0].title}
                            </h2>
                            <p className="text-slate-400 mb-6 leading-relaxed">
                                {ARTICLES[0].excerpt}
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
            {ARTICLES.slice(!searchQuery ? 1 : 0).filter(a => a.title.toLowerCase().includes(searchQuery.toLowerCase())).map((article) => (
                <div key={article.id} onClick={() => setSelectedArticle(article)} className="bg-slate-900/20 border border-white/5 rounded-3xl p-6 hover:bg-slate-900/60 hover:border-accent-500/20 transition-all group cursor-pointer flex flex-col h-full hover:shadow-xl hover:-translate-y-1">
                    <div className="mb-4 flex items-center justify-between">
                         <span className="text-xs font-bold text-accent-400 bg-accent-500/10 px-2 py-1 rounded-lg uppercase tracking-wide">
                            {article.category}
                         </span>
                         <span className="text-[10px] text-slate-500 flex items-center gap-1">
                            <Volume2 className="w-3 h-3" /> Audio Available
                         </span>
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
