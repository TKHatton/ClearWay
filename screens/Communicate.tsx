
import React, { useState } from 'react';
import Layout from '../components/Layout';
import ButtonPrimary from '../components/ButtonPrimary';
import Card from '../components/Card';
import { useLanguage } from '../context/LanguageContext';
import { smartTranslate } from '../lib/gemini';

const scenarios = [
  { id: 'hospital', label: 'Hospital', icon: '🏥' },
  { id: 'police', label: 'Police', icon: '👮' },
  { id: 'immigration', label: 'Immigration', icon: '🛂' },
  { id: 'transport', label: 'Transport', icon: '🚌' },
  { id: 'grocery', label: 'Groceries', icon: '🛒' },
  { id: 'school', label: 'School', icon: '🏫' },
  { id: 'housing', label: 'Housing', icon: '🏠' },
  { id: 'employment', label: 'Work', icon: '💼' },
  { id: 'legal', label: 'Legal', icon: '⚖️' }
];

const Communicate: React.FC = () => {
  const { t, language, isRTL } = useLanguage();
  const [selectedScenario, setSelectedScenario] = useState('hospital');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ translatedText: string; originalRefined: string; pronunciation?: string } | null>(null);

  const handleTranslate = async () => {
    if (!message) return;
    setLoading(true);
    try {
      const data = await smartTranslate(message, language, 'English', selectedScenario);
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  return (
    <Layout title={t('communicateTitle')}>
      <div className="space-y-6">
        <section>
          <div className="flex items-center justify-between mb-3 px-1">
            <label className="text-xs font-bold uppercase text-slate-400 block">{t('scenarioLabel')}</label>
            <span className="text-[10px] text-teal-600 font-medium animate-pulse">Swipe →</span>
          </div>
          
          <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar -mx-6 px-6 snap-x snap-mandatory">
            {scenarios.map(s => (
              <button
                key={s.id}
                onClick={() => setSelectedScenario(s.id)}
                className={`flex flex-col items-center justify-center gap-2 p-4 min-w-[96px] h-[96px] rounded-2xl border transition-all snap-center ${
                  selectedScenario === s.id 
                    ? 'bg-teal-600 border-teal-600 text-white shadow-lg shadow-teal-100' 
                    : 'bg-white border-slate-100 text-slate-500 hover:border-teal-200'
                }`}
              >
                <span className="text-2xl">{s.icon}</span>
                <span className="text-[10px] font-bold uppercase tracking-tight text-center">{s.label}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <label className="text-xs font-bold uppercase text-slate-400 block ml-1">{t('typeMessage')}</label>
          <div className="relative">
            <textarea
              className="w-full bg-white p-5 rounded-3xl border border-slate-200 outline-none focus:border-teal-500 transition-colors min-h-[120px] shadow-sm text-slate-700 leading-relaxed"
              placeholder="e.g. I need help..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            {message && (
              <button 
                onClick={() => setMessage('')}
                className="absolute top-4 right-4 p-1 rounded-full bg-slate-100 text-slate-400 hover:text-slate-600"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            )}
          </div>
          <ButtonPrimary 
            label={loading ? "Translating..." : t('translateBtn')} 
            onClick={handleTranslate} 
            disabled={!message || loading} 
          />
        </section>

        {result && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
            <h3 className="text-xs font-bold uppercase text-slate-400 flex items-center gap-2 ml-1">
              <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
              {t('sayThis')}
            </h3>
            
            <Card className="bg-teal-50 border-teal-100 relative overflow-hidden ring-4 ring-teal-50/50">
               <div className="absolute top-0 right-0 p-4 opacity-[0.03] pointer-events-none">
                 <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
               </div>
               <div className="relative z-10">
                 <p className="text-3xl font-bold text-teal-900 leading-tight mb-6">
                   {result.translatedText}
                 </p>
                 <div className="flex items-center justify-between border-t border-teal-100 pt-4">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black text-teal-600 uppercase tracking-widest bg-teal-100/50 px-2 py-1 rounded">English</span>
                      {result.pronunciation && <span className="text-[9px] text-teal-500 font-medium italic">Read aloud</span>}
                    </div>
                    <button 
                      onClick={() => speak(result.translatedText)}
                      className="p-3 bg-white rounded-2xl text-teal-600 shadow-sm active:scale-95 transition-all hover:bg-teal-600 hover:text-white"
                      title="Play Audio"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M11 5L6 9H2v6h4l5 4V5zM19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
                    </button>
                 </div>
               </div>
            </Card>

            <div className="grid grid-cols-1 gap-3">
              <div className="p-5 bg-white rounded-3xl border border-slate-100 shadow-sm">
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-2 tracking-widest">Original (Polished)</p>
                <p className={`text-sm text-slate-700 leading-relaxed ${isRTL ? 'text-right font-medium' : 'text-left'}`}>{result.originalRefined}</p>
              </div>
              {result.pronunciation && (
                <div className="p-5 bg-white rounded-3xl border border-slate-100 shadow-sm border-l-4 border-l-teal-500">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-2 tracking-widest">Pronunciation Guide</p>
                  <p className="text-sm text-slate-600 italic font-medium">"{result.pronunciation}"</p>
                </div>
              )}
            </div>

            <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100 flex gap-3 items-start">
               <svg className="text-orange-400 mt-0.5 shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
               <p className="text-[10px] text-orange-800 leading-relaxed font-medium">
                {t('safetyNotice')}
               </p>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Communicate;
