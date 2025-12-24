import { useState, useEffect } from 'react'
import './ExhibitModal.css'

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
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
          
          <div className="modal-body">
            <div className="modal-image-section">
              <div className="image-container" onClick={handleImageClick}>
                <img 
                  src={images[currentImageIndex]} 
                  alt={exhibit.name}
                  className="exhibit-image"
                />
                {totalImages > 1 && (
                  <>
                    <button 
                      className="image-nav-arrow image-nav-prev"
                      onClick={handlePrevImage}
                    >
                      ←
                    </button>
                    <button 
                      className="image-nav-arrow image-nav-next"
                      onClick={handleNextImage}
                    >
                      →
                    </button>
                    <div className="image-counter">
                      {currentImageIndex + 1} / {totalImages}
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="modal-info-section">
              <h2 className="exhibit-name">{exhibit.name}</h2>
              
              <div className="exhibit-details">
                <div className="detail-item">
                  <span className="detail-label">Дата:</span>
                  <span className="detail-value">{exhibit.date}</span>
                </div>
                
                <div className="detail-item">
                  <span className="detail-label">Материал:</span>
                  <span className="detail-value">{exhibit.material}</span>
                </div>
                
                <div className="detail-item">
                  <span className="detail-label">Размер:</span>
                  <span className="detail-value">{exhibit.size}</span>
                </div>
              </div>

              <div className="exhibit-description">
                <h3>Описание</h3>
                <p>{exhibit.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isFullscreen && (
        <div className="fullscreen-overlay" onClick={handleCloseFullscreen}>
          <button className="fullscreen-close" onClick={handleCloseFullscreen}>
            ×
          </button>
          <img 
            src={images[currentImageIndex]} 
            alt={exhibit.name}
            className="fullscreen-image"
            onClick={(e) => e.stopPropagation()}
          />
          {totalImages > 1 && (
            <>
              <button 
                className="fullscreen-nav-arrow fullscreen-nav-prev"
                onClick={handlePrevImage}
              >
                ←
              </button>
              <button 
                className="fullscreen-nav-arrow fullscreen-nav-next"
                onClick={handleNextImage}
              >
                →
              </button>
              <div className="fullscreen-counter">
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

