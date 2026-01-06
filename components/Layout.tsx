
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Language } from '../data/translations';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  showBack?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, title, showBack = true }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, language, setLanguage, isRTL } = useLanguage();
  const isHome = location.pathname === '/';

  return (
    <div className={`max-w-md mx-auto min-h-screen bg-slate-50 flex flex-col relative pb-20 no-print ${isRTL ? 'rtl' : 'ltr'}`}>
      <header className="px-6 pt-8 pb-4 bg-white sticky top-0 z-50 border-b border-slate-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {showBack && !isHome && (
              <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-slate-100">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ transform: isRTL ? 'rotate(180deg)' : 'none' }}><path d="m15 18-6-6 6-6"/></svg>
              </button>
            )}
            {title && <h1 className="text-xl font-bold text-slate-800">{title}</h1>}
          </div>
          <select 
            value={language} 
            onChange={(e) => setLanguage(e.target.value as Language)}
            className="text-[10px] font-bold uppercase text-slate-400 bg-slate-50 p-1 rounded border border-slate-100"
          >
            <option value="en">EN</option>
            <option value="es">ES</option>
            <option value="fr">FR</option>
            <option value="ar">AR</option>
          </select>
        </div>
      </header>

      <main className="flex-1 px-6 pt-6 overflow-y-auto">
        {children}
      </main>

      {!isHome && (
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-slate-100 flex justify-around items-center py-3 px-6 shadow-[0_-4px_10px_rgba(0,0,0,0.02)] z-50 no-print">
           <NavItem icon="list" label={t('navHelp')} active={location.pathname === '/help'} onClick={() => navigate('/help')} />
           <NavItem icon="shield" label={t('navRights')} active={location.pathname === '/rights'} onClick={() => navigate('/rights')} />
           <NavItem icon="talk" label={t('navComm')} active={location.pathname === '/communicate'} onClick={() => navigate('/communicate')} />
           <NavItem icon="user" label={t('navVol')} active={location.pathname === '/volunteer'} onClick={() => navigate('/volunteer')} />
        </nav>
      )}
    </div>
  );
};

interface NavItemProps {
  icon: string;
  label: string;
  active: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, active, onClick }) => {
  const icons: Record<string, React.ReactElement> = {
    list: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><circle cx="3" cy="6" r=".5"/><circle cx="3" cy="12" r=".5"/><circle cx="3" cy="18" r=".5"/></svg>,
    shield: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    talk: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
    user: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
  };

  return (
    <button onClick={onClick} className={`flex flex-col items-center gap-1 transition-colors ${active ? 'text-teal-600' : 'text-slate-400'}`}>
      {icons[icon]}
      <span className="text-[10px] font-medium uppercase tracking-wider">{label}</span>
    </button>
  );
};

export default Layout;
