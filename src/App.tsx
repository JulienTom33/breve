import DesignSystem from './pages/DesignSystem'
import { t } from '@/lib/i18n'

function App() {
  if (window.location.pathname === '/design-system') {
    return <DesignSystem />
  }

  return (
    <div className="min-h-screen bg-bg text-text flex items-center justify-center font-body">
      <div className="text-center">
        <h1 className="mb-2">{t.app.title}</h1>
        <p className="text-text-muted text-base">{t.app.tagline}</p>
      </div>
    </div>
  )
}

export default App
