import React from 'react'
import styles from './AnswerButtons.module.css'
import { ANSWER_OPTIONS } from '../../constants/gameConstants'
import clayTexture from '../../assets/clay_texture_img.png'
import metalTexture from '../../assets/metal_texture_img.png'
import woodTexture from '../../assets/wood_texture_img.png'
import stoneTexture from '../../assets/stone_texture_img.png'

const TEXTURE_IMAGE_MAP = {
  'Керамика/глина': clayTexture,
  'Кость/рог/дерево': woodTexture,
  'Металл': metalTexture,
  'Камень/кирпич': stoneTexture,
  'Стекло': undefined,
}

function AnswerButtons({ currentItem, selectedAnswer, isCorrect, showResult, onAnswer }) {
  return (
    <div className={styles.answersContainer}>
      {ANSWER_OPTIONS.map((option) => {
        const isSelected = selectedAnswer === option
        const isCorrectAnswer = option === currentItem?.material
        const textureImage = TEXTURE_IMAGE_MAP[option]
        let buttonClass = styles.answerButton

        if (showResult) {
          if (isCorrectAnswer) {
            buttonClass = `${styles.answerButton} ${styles.answerCorrect}`
          } else if (isSelected && !isCorrect) {
            buttonClass = `${styles.answerButton} ${styles.answerIncorrect}`
          }
        }

        return (
          <button
            key={option}
            className={buttonClass}
            style={{ backgroundImage: textureImage ? `url(${textureImage})` : undefined }}
            onClick={() => onAnswer(option)}
            disabled={showResult}
          >
            <span>{option}</span>
          </button>
        )
      })}
    </div>
  )
}

export default AnswerButtons