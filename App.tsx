
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import Welcome from './screens/Welcome';
import Triage from './screens/Triage';
import Plan from './screens/Plan';
import Rights from './screens/Rights';
import HelpList from './screens/HelpList';
import Volunteer from './screens/Volunteer';
import Communicate from './screens/Communicate';

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-slate-50 font-sans antialiased">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/triage" element={<Triage />} />
          <Route path="/plan" element={<Plan />} />
          <Route path="/rights" element={<Rights />} />
          <Route path="/help" element={<HelpList />} />
          <Route path="/volunteer" element={<Volunteer />} />
          <Route path="/communicate" element={<Communicate />} />
        </Routes>
      </div>
    </LanguageProvider>
  );
};

export default App;
