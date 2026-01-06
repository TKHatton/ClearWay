
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import ButtonPrimary from '../components/ButtonPrimary';
import Card from '../components/Card';
import { TriageAnswers } from '../types';
import { useLanguage } from '../context/LanguageContext';

const Triage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [answers, setAnswers] = useState<TriageAnswers>({
    housing: '',
    safety: '',
    documents: '',
    kids: '',
    medical: '',
    food: ''
  });

  const questions = [
    { id: 'housing', text: t('yes'), icon: '🏠' }, // Using keys as proxies for full question objects in real apps
    { id: 'safety', text: 'Safety Question', icon: '🛡️' },
    { id: 'documents', text: 'Docs Question', icon: '📄' },
    { id: 'medical', text: 'Meds Question', icon: '💊' },
    { id: 'kids', text: 'Kids Question', icon: '👧' },
    { id: 'food', text: 'Food Question', icon: '🍲' }
  ];

  // In a real localized app, these would come from the translation map
  const localizedQuestions = [
    { id: 'housing', label: 'housing' },
    { id: 'safety', label: 'safety' },
    { id: 'documents', label: 'documents' },
    { id: 'medical', label: 'medical' },
    { id: 'kids', label: 'kids' },
    { id: 'food', label: 'food' }
  ];

  const handleSelect = (id: string, value: string) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
  };

  const isComplete = Object.values(answers).every(v => v !== '');

  return (
    <Layout title={t('triageTitle')}>
      <div className="space-y-6">
        <header>
          <p className="text-slate-500 text-sm">{t('triageDesc')}</p>
        </header>

        {localizedQuestions.map((q) => (
          <Card key={q.id}>
            <div className="flex items-start gap-4">
              <span className="text-2xl mt-1">{questions.find(x => x.id === q.id)?.icon}</span>
              <div className="flex-1">
                <p className="font-medium text-slate-800 mb-4">Question about {q.label}?</p>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleSelect(q.id, 'yes')}
                    className={`flex-1 py-2 rounded-xl border-2 transition-all font-medium ${
                      answers[q.id as keyof TriageAnswers] === 'yes'
                        ? 'bg-teal-50 border-teal-500 text-teal-700'
                        : 'bg-white border-slate-100 text-slate-500 hover:border-slate-200'
                    }`}
                  >
                    {t('yes')}
                  </button>
                  <button
                    onClick={() => handleSelect(q.id, 'no')}
                    className={`flex-1 py-2 rounded-xl border-2 transition-all font-medium ${
                      answers[q.id as keyof TriageAnswers] === 'no'
                        ? 'bg-red-50 border-red-500 text-red-700'
                        : 'bg-white border-slate-100 text-slate-500 hover:border-slate-200'
                    }`}
                  >
                    {t('no')}
                  </button>
                </div>
              </div>
            </div>
          </Card>
        ))}

        <div className="pt-4 sticky bottom-6 bg-slate-50 pb-4">
          <ButtonPrimary 
            label={t('generatePlan')} 
            onClick={() => navigate('/plan', { state: { answers } })}
            disabled={!isComplete}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Triage;
