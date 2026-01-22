import styles from './MenuButtons.module.css'

function MenuButtons({ onCategorySelect, selectedCategory }) {
  return (
    <div className={styles.menuButtons}>
      <div className={styles.menuBlock}>
        <button
          className={`${styles.menuButton} ${selectedCategory === 'ceramics' ? styles.active : ''}`}
          onClick={() => onCategorySelect('ceramics')}
        >
          Керамика и изразцы
        </button>
        <div className={styles.divider}></div>
        <button
          className={`${styles.menuButton} ${selectedCategory === 'metal' ? styles.active : ''}`}
          onClick={() => onCategorySelect('metal')}
        >
          Металлические изделия
        </button>
        <div className={styles.divider}></div>
        <button
          className={`${styles.menuButton} ${selectedCategory === 'construction' ? styles.active : ''}`}
          onClick={() => onCategorySelect('construction')}
        >
          Строительные материалы
        </button>
      </div>

      <div className={styles.menuBlock}>
        <button className={`${styles.menuButton} ${styles.menuButtonQuiz}`}>
          Квиз &quot;Угадай материал&quot;
        </button>
        <button className={`${styles.menuButton} ${styles.menuButtonQuiz}`}>
          Угадай что делает предмет
        </button>
      </div>
    </div>
  )
}

export default MenuButtons

