import React from 'react'
import styles from './GameScreen.module.css'
import AnswerButtons from './AnswerButtons'
import ResultOverlay from './ResultOverlay'
import { getMaterialImageUrl, getGameDataImageUrl } from '../../constants/gameConstants'
import gameScreenBg from '../../assets/game_screen_img.png'
import placeHolderImg from '../../assets/place_holder_img.png'

function GameScreen({
  currentItem,
  selectedAnswer,
  isCorrect,
  showResult,
  onAnswer
}) {
  const imageUrl = currentItem
    ? (getMaterialImageUrl(currentItem.image) || getGameDataImageUrl(currentItem.image) || placeHolderImg)
    : placeHolderImg

  return (
    <div
      className={styles.gameScreen}
      style={{ backgroundImage: `url(${gameScreenBg})` }}
    >
      <div className={styles.imageContainer}>
        <img
          src={imageUrl}
          alt={currentItem?.name || 'Изображение находки'}
          className={styles.itemImage}
          onError={(e) => {
            e.target.onerror = null
            e.target.src = placeHolderImg
          }}
        />
      </div>

      <AnswerButtons
        currentItem={currentItem}
        selectedAnswer={selectedAnswer}
        isCorrect={isCorrect}
        showResult={showResult}
        onAnswer={onAnswer}
      />

      {showResult && (
        <ResultOverlay
          isCorrect={isCorrect}
          currentItem={currentItem}
        />
      )}
    </div>
  )
}

export default GameScreen