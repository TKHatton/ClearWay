
import React, { useState } from 'react';
import Layout from '../components/Layout';
import ButtonPrimary from '../components/ButtonPrimary';
import Card from '../components/Card';

const Rights: React.FC = () => {
  const [country, setCountry] = useState('');
  const [situation, setSituation] = useState('');
  const [showResult, setShowResult] = useState(false);

  const countries = ["Germany", "United Kingdom", "France", "United States", "Poland"];
  const situations = [
    { id: 'asylum', label: 'Seeking Asylum' },
    { id: 'refugee', label: 'Refugee Status' },
    { id: 'student', label: 'International Student' },
    { id: 'worker', label: 'Temporary Worker' }
  ];

  const handleShowRights = () => {
    if (country && situation) {
      setShowResult(true);
    }
  };

  return (
    <Layout title="Your Rights">
      <div className="space-y-6">
        <header>
          <h2 className="text-2xl font-bold text-slate-800">Know Your Law</h2>
          <p className="text-slate-500 text-sm">Understand your legal protections based on your current location and status.</p>
        </header>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-slate-400 ml-1">Current Country</label>
            <select 
              value={country}
              onChange={(e) => { setCountry(e.target.value); setShowResult(false); }}
              className="w-full bg-white p-4 rounded-2xl border border-slate-200 outline-none focus:border-teal-500 transition-colors"
            >
              <option value="">Select a country...</option>
              {countries.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-slate-400 ml-1">Legal Situation</label>
            <div className="grid grid-cols-2 gap-2">
              {situations.map(s => (
                <button
                  key={s.id}
                  onClick={() => { setSituation(s.id); setShowResult(false); }}
                  className={`p-3 rounded-xl border text-left text-sm font-medium transition-all ${
                    situation === s.id 
                      ? 'bg-teal-50 border-teal-500 text-teal-700' 
                      : 'bg-white border-slate-100 text-slate-500 hover:border-slate-200'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <ButtonPrimary 
            label="Show My Rights" 
            onClick={handleShowRights}
            disabled={!country || !situation}
          />
        </div>

        {showResult && (
          <div className="pt-4 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white p-6 rounded-3xl border border-teal-100 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-teal-100 text-teal-700 rounded-lg">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </div>
                <h3 className="font-bold text-slate-800">Legal Summary</h3>
              </div>
              
              <ul className="space-y-4">
                <li className="flex gap-3 text-slate-600 text-sm leading-relaxed">
                  <span className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2 shrink-0"></span>
                  You have the right to a fair hearing and translation services if needed.
                </li>
                <li className="flex gap-3 text-slate-600 text-sm leading-relaxed">
                  <span className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2 shrink-0"></span>
                  In {country}, you are legally protected against immediate deportation until your initial interview.
                </li>
                <li className="flex gap-3 text-slate-600 text-sm leading-relaxed">
                  <span className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2 shrink-0"></span>
                  You are entitled to emergency medical care regardless of your current paperwork status.
                </li>
                <li className="flex gap-3 text-slate-600 text-sm leading-relaxed">
                  <span className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2 shrink-0"></span>
                  Confidentiality: Authorities cannot share your status with third parties without legal cause.
                </li>
              </ul>

              <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-[10px] text-slate-400 leading-tight uppercase font-bold tracking-widest mb-1">Important Disclaimer</p>
                <p className="text-[10px] text-slate-400 leading-tight">This summary is for informational purposes and does not constitute legal advice. Always consult a verified lawyer.</p>
              </div>
            </div>
            
            <ButtonPrimary 
              label="Talk to a Legal Aid NGO" 
              variant="outline" 
              onClick={() => {}} 
            />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Rights;
