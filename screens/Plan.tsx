
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import ButtonPrimary from '../components/ButtonPrimary';
import Card from '../components/Card';
import { TriageAnswers } from '../types';

const Plan: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const answers = location.state?.answers as TriageAnswers;

  if (!answers) {
    return (
      <Layout title="Action Plan">
        <div className="text-center py-12">
          <p className="text-slate-500">No triage data found. Please start over.</p>
          <button onClick={() => navigate('/triage')} className="mt-4 text-teal-600 font-medium underline">Start Triage</button>
        </div>
      </Layout>
    );
  }

  const urgent = [];
  const nextSteps = [];
  const reminders = [
    "Keep your digital device charged and secure.",
    "Do not share your original documents with unofficial parties.",
    "If you feel unsafe, move to a crowded public space immediately."
  ];

  if (answers.safety === 'no') urgent.push("Contact local emergency services immediately or locate the nearest police station.");
  if (answers.housing === 'no') urgent.push("Visit the nearest 'Verified Shelter' listed in our directory for tonight.");
  if (answers.food === 'no') urgent.push("Locate the nearest community kitchen or food bank.");
  
  if (answers.documents === 'no') nextSteps.push("Book an appointment with your embassy or a legal aid NGO to discuss document recovery.");
  if (answers.medical === 'no') nextSteps.push("Visit a free clinic or health checkpoint for a screening.");
  if (answers.kids === 'yes') nextSteps.push("Register children for local temporary schooling or childcare support.");

  const handleSave = () => {
    window.print();
  };

  return (
    <Layout title="Your Action Plan">
      <div id="printable-plan" className="space-y-8 pb-10">
        <header className="flex items-center justify-between no-print">
          <div className="flex-1">
             <h2 className="text-2xl font-bold text-slate-800">Ready for you</h2>
             <p className="text-slate-500 text-sm">Tailored based on your situation.</p>
          </div>
          <button onClick={handleSave} className="p-3 bg-white border border-slate-200 rounded-full text-slate-600 shadow-sm">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          </button>
        </header>

        {/* Print Header (Visible only when printing) */}
        <div className="hidden print:block mb-8">
           <h1 className="text-3xl font-bold text-teal-600">ClearWay Action Plan</h1>
           <p className="text-slate-600">Generated for you on {new Date().toLocaleDateString()}</p>
        </div>

        {urgent.length > 0 && (
          <section>
            <h3 className="text-red-600 font-bold uppercase tracking-wider text-xs mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
              Urgent Right Now
            </h3>
            {urgent.map((item, idx) => (
              <Card key={idx} className="border-l-4 border-l-red-500">
                <p className="text-slate-800 font-medium">{item}</p>
              </Card>
            ))}
          </section>
        )}

        <section>
          <h3 className="text-teal-600 font-bold uppercase tracking-wider text-xs mb-3">Next Steps</h3>
          <div className="space-y-3">
            {nextSteps.length > 0 ? nextSteps.map((item, idx) => (
              <Card key={idx}>
                <div className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-[10px] font-bold shrink-0">{idx + 1}</div>
                  <p className="text-slate-700">{item}</p>
                </div>
              </Card>
            )) : (
              <Card>
                <p className="text-slate-500 italic">No immediate next steps needed. Stay alert.</p>
              </Card>
            )}
          </div>
        </section>

        <section>
          <h3 className="text-slate-400 font-bold uppercase tracking-wider text-xs mb-3">Helpful Reminders</h3>
          <ul className="space-y-4">
            {reminders.map((r, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                <svg className="mt-1 shrink-0 text-slate-300" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                {r}
              </li>
            ))}
          </ul>
        </section>

        <div className="pt-6 no-print">
          <ButtonPrimary label="Find Verified Services" onClick={() => navigate('/help')} />
          <button 
            onClick={() => navigate('/volunteer')}
            className="w-full mt-4 text-center text-slate-500 font-medium text-sm hover:text-teal-600"
          >
            Talk to a Volunteer instead?
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Plan;
