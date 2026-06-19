import { useState, useEffect } from 'react';
import DesignSystem from './pages/DesignSystem';

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

  if (path === '/design-system') {
    return <DesignSystem />;
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--color-bg)',
        color: 'var(--color-text)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <h1
          style={{
            fontSize: 'var(--text-xl)',
            fontWeight: 700,
            marginBottom: 'var(--space-2)',
          }}
        >
          Brève
        </h1>
        <p
          style={{
            color: 'var(--color-text-muted)',
            fontSize: 'var(--text-base)',
            marginBottom: 'var(--space-8)',
          }}
        >
          App de news agrégée, synthétisée et filtrée — RSS + IA + Supabase
        </p>
        <button className="btn btn--ghost" onClick={() => navigate('/design-system')}>
          Design System →
        </button>
      </div>
    </div>
  );
}

export default App;
