import { useState, useEffect } from 'react';
import DesignSystem from './pages/DesignSystem';
import { ROUTES } from './config/routes';

function navigate(to: string) {
  window.history.pushState({}, '', to);
  window.dispatchEvent(new PopStateEvent('popstate'));
}

function App() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePop = () => setPath(window.location.pathname);
    window.addEventListener('popstate', handlePop);
    return () => window.removeEventListener('popstate', handlePop);
  }, []);

  if (path === ROUTES.DESIGN_SYSTEM) {
    return <DesignSystem />;
  }

  return (
    <div className="min-h-screen bg-bg text-content flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2">
          Brève
        </h1>
        <p className="text-content-muted text-base mb-8">
          App de news agrégée, synthétisée et filtrée — RSS + IA + Supabase
        </p>
        <button className="btn btn--ghost" onClick={() => navigate(ROUTES.DESIGN_SYSTEM)}>
          Design System →
        </button>
      </div>
    </div>
  );
}

export default App;
