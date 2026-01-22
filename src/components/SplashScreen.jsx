import { useState } from 'react'
import styles from './SplashScreen.module.css'
import mainImg from '../assets/main-img.png'

function SplashScreen({ onComplete }) {
  const [isAnimating, setIsAnimating] = useState(true)

  const handleImageClick = () => {
    setIsAnimating(false)
    setTimeout(() => {
      onComplete()
    }, 500)
  }

  return (
    <div className={`${styles.splashScreen} ${isAnimating ? '' : styles.fadeOut}`}>
      <div className={styles.splashContent}>
        <img 
          src={mainImg} 
          alt="Археологические находки"
          className={styles.splashImage}
          onClick={handleImageClick}
        />
      </div>
    </div>
  )
}

export default SplashScreen

