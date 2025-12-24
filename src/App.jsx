import { useState } from 'react'
import SplashScreen from './components/SplashScreen'
import Home from './pages/Home'
import styles from './App.module.css'

function App() {
  const [showSplash, setShowSplash] = useState(true)

  const handleSplashComplete = () => {
    setShowSplash(false)
  }

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />
  }

  return (
    <div className={styles.app}>
      <main className={styles.mainContent}>
        <Home />
      </main>
    </div>
  )
}

export default App

