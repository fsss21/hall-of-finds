import React from 'react'
import styles from './StartScreen.module.css'
import mainImg from '../../assets/main_img.png'

function StartScreen({ onStart }) {
  return (
    <div
      className={styles.startScreen}
      style={{ backgroundImage: `url(${mainImg})` }}
    >
      <p className={styles.startTitle}>Угадай материал</p>
      <p className={styles.startSubtitle}>из чего сделан предмет?</p>
      <button className={styles.startButton} onClick={onStart}>
        Начать игру
      </button>
    </div>
  )
}

export default StartScreen