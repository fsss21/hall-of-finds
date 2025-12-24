import { useState, useEffect } from 'react'
import './SplashScreen.css'

function SplashScreen({ onComplete }) {
  const [showSkip, setShowSkip] = useState(false)
  const [isAnimating, setIsAnimating] = useState(true)

  useEffect(() => {
    // Показываем кнопку пропустить через 2 секунды
    const skipTimer = setTimeout(() => {
      setShowSkip(true)
    }, 2000)

    // Автоматически завершаем заставку через 5 секунд
    const completeTimer = setTimeout(() => {
      handleComplete()
    }, 5000)

    return () => {
      clearTimeout(skipTimer)
      clearTimeout(completeTimer)
    }
  }, [])

  const handleComplete = () => {
    setIsAnimating(false)
    setTimeout(() => {
      onComplete()
    }, 500)
  }

  return (
    <div className={`splash-screen ${isAnimating ? 'active' : 'fade-out'}`}>
      <div className="splash-content">
        <div className="splash-logo">
          <h1>Hall of Finds</h1>
          <div className="splash-subtitle">Коллекция археологических находок</div>
        </div>
        {showSkip && (
          <button className="skip-button" onClick={handleComplete}>
            Пропустить
          </button>
        )}
      </div>
    </div>
  )
}

export default SplashScreen

