import { useState } from 'react'
import SplashScreen from './components/SplashScreen'
import Home from './pages/Home'
import './App.css'

function App() {
  const [showSplash, setShowSplash] = useState(true)

  const handleSplashComplete = () => {
    setShowSplash(false)
  }

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />
  }

  return (
    <div className="app">
      <main className="main-content">
        <Home />
      </main>
    </div>
  )
}

export default App

