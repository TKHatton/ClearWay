
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonPrimary from '../components/ButtonPrimary';
import { useLanguage } from '../context/LanguageContext';
import { Language } from '../data/translations';

const Welcome: React.FC = () => {
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();

  const langs: { id: Language; label: string }[] = [
    { id: 'en', label: 'English' },
    { id: 'es', label: 'Español' },
    { id: 'fr', label: 'Français' },
    { id: 'ar', label: 'العربية' }
  ];

  return (
    <div className="max-w-md mx-auto min-h-screen bg-teal-600 flex flex-col justify-between p-8 text-white relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-teal-500 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-[-5%] left-[-10%] w-80 h-80 bg-teal-700 rounded-full blur-3xl opacity-50"></div>

      <div className="relative z-10 flex justify-end">
        <select 
          value={language} 
          onChange={(e) => setLanguage(e.target.value as Language)}
          className="bg-white/10 text-white text-xs font-bold py-2 px-3 rounded-full border border-white/20 outline-none backdrop-blur-sm"
        >
          {langs.map(l => <option key={l.id} value={l.id} className="text-slate-900">{l.label}</option>)}
        </select>
      </div>

      <div className="mt-16 relative z-10">
        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-xl">
           <svg className="text-teal-600" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-4">ClearWay</h1>
        <p className="text-xl text-teal-50 opacity-90 leading-relaxed font-light">
          {t('tagline')}
        </p>
      </div>

      <div className="mb-8 space-y-4 relative z-10">
        <ButtonPrimary 
          label={t('getHelp')} 
          onClick={() => navigate('/triage')} 
          variant="secondary"
        />
        <div className="flex gap-4">
          <button 
            onClick={() => navigate('/rights')}
            className="flex-1 py-4 text-center text-teal-50 font-medium border border-teal-500/30 rounded-2xl hover:bg-white/10 transition-colors"
          >
            {t('checkRights')}
          </button>
          <button 
             onClick={() => navigate('/help')}
             className="flex-1 py-4 text-center text-teal-50 font-medium border border-teal-500/30 rounded-2xl hover:bg-white/10 transition-colors"
          >
            {t('localServices')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
