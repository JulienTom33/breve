import DesignSystem from './pages/DesignSystem'

function App() {
  if (window.location.pathname === '/design-system') {
    return <DesignSystem />
  }

  return (
    <div className="min-h-screen bg-bg text-text flex items-center justify-center font-body">
      <div className="text-center">
        <h1 className="text-xl font-display font-bold mb-2">Brève</h1>
        <p className="text-text-muted text-base">App de news agrégée, synthétisée et filtrée</p>
      </div>
    </div>
  )
}

export default App
