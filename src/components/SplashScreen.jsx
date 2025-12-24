import { useState, useEffect } from 'react'
import styles from './SplashScreen.module.css'

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
    <div className={`${styles.splashScreen} ${isAnimating ? '' : styles.fadeOut}`}>
      <div className={styles.splashContent}>
        <div className={styles.splashLogo}>
          <h1>Hall of Finds</h1>
          <div className={styles.splashSubtitle}>Коллекция археологических находок</div>
        </div>
        {showSkip && (
          <button className={styles.skipButton} onClick={handleComplete}>
            Пропустить
          </button>
        )}
      </div>
    </div>
  )
}

export default SplashScreen

