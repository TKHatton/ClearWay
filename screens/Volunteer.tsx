
import React, { useState } from 'react';
import Layout from '../components/Layout';
import ButtonPrimary from '../components/ButtonPrimary';
import Card from '../components/Card';
import { useLanguage } from '../context/LanguageContext';
import { translateForVolunteer } from '../lib/gemini';

const Volunteer: React.FC = () => {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    issue: '',
    urgency: 'Medium',
    contact: ''
  });
  const [loading, setLoading] = useState(false);
  const [translatedIssue, setTranslatedIssue] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // In background, translate for the volunteer
    if (language !== 'en') {
      try {
        const trans = await translateForVolunteer(formData.issue, language);
        setTranslatedIssue(trans);
      } catch (err) {
        console.error("Translation failed", err);
      }
    }

    setSubmitted(true);
    setLoading(false);
  };

  if (submitted) {
    return (
      <Layout title="Request Sent">
        <div className="flex flex-col items-center justify-center py-12 text-center animate-in zoom-in duration-300">
          <div className="w-20 h-20 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mb-6">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-3">Help is on the way</h2>
          <p className="text-slate-500 mb-8 max-w-[280px] mx-auto">
            A volunteer has been notified. They will contact you via <strong>{formData.contact}</strong> soon.
          </p>
          <Card className="text-left w-full max-w-sm">
             <h4 className="text-[10px] font-bold text-slate-400 uppercase mb-2 tracking-widest">Case Summary</h4>
             <p className="text-sm font-medium text-slate-700">"{formData.issue}"</p>
             {translatedIssue && (
               <div className="mt-2 pt-2 border-t border-slate-50">
                 <p className="text-[9px] text-teal-600 font-bold uppercase mb-1">Volunteer English Translation</p>
                 <p className="text-xs text-slate-500 italic">"{translatedIssue}"</p>
               </div>
             )}
          </Card>
          <ButtonPrimary label="Back to Home" variant="outline" className="mt-8" onClick={() => window.location.hash = '/'} />
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={t('volunteerTitle')}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <header>
          <h2 className="text-2xl font-bold text-slate-800">Human Assistance</h2>
          <p className="text-slate-500 text-sm">A verified volunteer can help you navigate local hurdles.</p>
        </header>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-slate-400 ml-1">What's happening?</label>
            <textarea 
              required
              className="w-full bg-white p-4 rounded-2xl border border-slate-200 outline-none focus:border-teal-500 transition-colors min-h-[120px] resize-none"
              value={formData.issue}
              onChange={(e) => setFormData({...formData, issue: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-slate-400 ml-1">Urgency</label>
            <div className="flex gap-2">
              {['Low', 'Medium', 'High'].map(level => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setFormData({...formData, urgency: level})}
                  className={`flex-1 py-3 rounded-xl border text-sm font-bold transition-all ${
                    formData.urgency === level ? 'bg-teal-600 text-white shadow-lg' : 'bg-white text-slate-400'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-slate-400 ml-1">Contact Info</label>
            <input 
              required
              type="text"
              className="w-full bg-white p-4 rounded-2xl border border-slate-200"
              value={formData.contact}
              onChange={(e) => setFormData({...formData, contact: e.target.value})}
            />
          </div>
        </div>

        <div className="pt-4">
          <ButtonPrimary label={loading ? "..." : "Send Help Request"} type="submit" disabled={loading} />
        </div>
      </form>
    </Layout>
  );
};

export default Volunteer;
