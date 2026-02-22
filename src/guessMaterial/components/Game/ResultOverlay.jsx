import React from 'react'
import styles from './ResultOverlay.module.css'

function ResultOverlay({ isCorrect, currentItem }) {
  if (!currentItem) {
    return null
  }

  const blockClass = isCorrect ? styles.resultBlockCorrect : styles.resultBlockIncorrect

  return (
    <div className={styles.resultOverlay}>
      <div className={`${styles.resultBlock} ${blockClass}`}>
        <span className={styles.resultIcon} aria-hidden>
          {isCorrect ? '✅' : '❌'}
        </span>
        {isCorrect ? (
          <>
            <h3 className={styles.resultTitle}>Правильно</h3>
            {currentItem.description && (
              <p className={styles.resultDescription}>{currentItem.description}</p>
            )}
          </>
        ) : (
          <>
            <h3 className={styles.resultTitle}>
              Правильный ответ: {currentItem.material ?? '—'}
            </h3>
            {currentItem.description && (
              <p className={styles.resultDescription}>{currentItem.description}</p>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default ResultOverlay