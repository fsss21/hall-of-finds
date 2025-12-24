import { useState, useEffect } from 'react'
import styles from './ExhibitModal.module.css'

function ExhibitModal({ exhibit, onClose }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    setCurrentImageIndex(0)
  }, [exhibit])

  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isFullscreen])

  if (!exhibit) return null

  const images = exhibit.images || []
  const totalImages = images.length

  const handlePrevImage = (e) => {
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : totalImages - 1))
  }

  const handleNextImage = (e) => {
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev < totalImages - 1 ? prev + 1 : 0))
  }

  const handleImageClick = () => {
    setIsFullscreen(true)
  }

  const handleCloseFullscreen = () => {
    setIsFullscreen(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      if (isFullscreen) {
        setIsFullscreen(false)
      } else {
        onClose()
      }
    } else if (e.key === 'ArrowLeft') {
      handlePrevImage(e)
    } else if (e.key === 'ArrowRight') {
      handleNextImage(e)
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isFullscreen, totalImages])

  return (
    <>
      <div className={styles.modalOverlay} onClick={onClose}>
        <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
          <button className={styles.modalClose} onClick={onClose}>
            ×
          </button>
          
          <div className={styles.modalBody}>
            <div className={styles.modalImageSection}>
              <div className={styles.imageContainer} onClick={handleImageClick}>
                <img 
                  src={images[currentImageIndex]} 
                  alt={exhibit.name}
                  className={styles.exhibitImage}
                />
                {totalImages > 1 && (
                  <>
                    <button 
                      className={`${styles.imageNavArrow} ${styles.imageNavPrev}`}
                      onClick={handlePrevImage}
                    >
                      ←
                    </button>
                    <button 
                      className={`${styles.imageNavArrow} ${styles.imageNavNext}`}
                      onClick={handleNextImage}
                    >
                      →
                    </button>
                    <div className={styles.imageCounter}>
                      {currentImageIndex + 1} / {totalImages}
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className={styles.modalInfoSection}>
              <h2 className={styles.exhibitName}>{exhibit.name}</h2>
              
              <div className={styles.exhibitDetails}>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Дата:</span>
                  <span className={styles.detailValue}>{exhibit.date}</span>
                </div>
                
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Материал:</span>
                  <span className={styles.detailValue}>{exhibit.material}</span>
                </div>
                
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Размер:</span>
                  <span className={styles.detailValue}>{exhibit.size}</span>
                </div>
              </div>

              <div className={styles.exhibitDescription}>
                <h3>Описание</h3>
                <p>{exhibit.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isFullscreen && (
        <div className={styles.fullscreenOverlay} onClick={handleCloseFullscreen}>
          <button className={styles.fullscreenClose} onClick={handleCloseFullscreen}>
            ×
          </button>
          <img 
            src={images[currentImageIndex]} 
            alt={exhibit.name}
            className={styles.fullscreenImage}
            onClick={(e) => e.stopPropagation()}
          />
          {totalImages > 1 && (
            <>
              <button 
                className={`${styles.fullscreenNavArrow} ${styles.fullscreenNavPrev}`}
                onClick={handlePrevImage}
              >
                ←
              </button>
              <button 
                className={`${styles.fullscreenNavArrow} ${styles.fullscreenNavNext}`}
                onClick={handleNextImage}
              >
                →
              </button>
              <div className={styles.fullscreenCounter}>
                {currentImageIndex + 1} / {totalImages}
              </div>
            </>
          )}
        </div>
      )}
    </>
  )
}

export default ExhibitModal

