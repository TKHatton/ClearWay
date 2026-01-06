
import React, { useState } from 'react';
import Layout from '../components/Layout';
import Card from '../components/Card';
import { organizations } from '../data/resources';
import { Resource } from '../types';

const HelpList: React.FC = () => {
  const [filter, setFilter] = useState('All');
  
  const categories = ['All', 'Legal', 'Housing', 'Medical', 'Food', 'Kids'];

  const filteredOrgs = filter === 'All' 
    ? organizations 
    : organizations.filter(org => org.category.includes(filter));

  return (
    <Layout title="Support Services">
      <div className="space-y-6">
        <div className="overflow-x-auto -mx-6 px-6 no-scrollbar pb-2">
          <div className="flex gap-2 min-w-max">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  filter === cat 
                  ? 'bg-teal-600 text-white shadow-md' 
                  : 'bg-white text-slate-500 border border-slate-100 hover:border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {filteredOrgs.map(org => (
            <Card key={org.id}>
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-slate-800">{org.name}</h3>
                  {org.verified && (
                    <div className="flex items-center text-[10px] bg-blue-50 text-blue-600 font-bold px-1.5 py-0.5 rounded-md uppercase tracking-tighter">
                      <svg className="mr-0.5" width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                      Verified
                    </div>
                  )}
                </div>
                <span className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-500 rounded-md font-bold uppercase">{org.type}</span>
              </div>
              <p className="text-sm text-slate-600 mb-4">{org.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {org.category.map(c => (
                  <span key={c} className="text-[10px] text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full font-medium">#{c}</span>
                ))}
              </div>

              <a 
                href={`tel:${org.contact.replace(/[^0-9+]/g, '')}`} 
                className="w-full flex items-center justify-center gap-2 py-3 bg-slate-50 text-slate-700 font-bold rounded-xl hover:bg-slate-100 transition-colors border border-slate-100"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                {org.contact}
              </a>
            </Card>
          ))}
        </div>

        <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100">
           <p className="text-xs text-blue-800 leading-relaxed italic">
             <strong>Safe Contact Tip:</strong> Organizations with a verified badge have been physically vetted by the ClearWay team for your security.
           </p>
        </div>
      </div>
    </Layout>
  );
};

export default HelpList;
