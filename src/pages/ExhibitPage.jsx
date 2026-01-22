import { useState, useEffect } from 'react'
import styles from './ExhibitPage.module.css'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import WestIcon from '@mui/icons-material/West';
import EastIcon from '@mui/icons-material/East';
import FullscreenIcon from '@mui/icons-material/Fullscreen';

function ExhibitPage({ exhibit, category, subcategory, allExhibits, currentIndex, onClose, onNavigate }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [currentTextPage, setCurrentTextPage] = useState(0)
  const [textPages, setTextPages] = useState([])
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    setCurrentImageIndex(0)
    setCurrentTextPage(0)
  }, [exhibit])

  useEffect(() => {
    if (exhibit && exhibit.description) {
      // Разбиваем описание на страницы (примерно 800 символов на страницу)
      const charsPerPage = 800
      const text = exhibit.description
      const pages = []
      
      if (text.length <= charsPerPage) {
        pages.push(text)
      } else {
        let currentIndex = 0
        while (currentIndex < text.length) {
          let endIndex = currentIndex + charsPerPage
          
          // Если не конец текста, ищем ближайший пробел или точку
          if (endIndex < text.length) {
            const lastSpace = text.lastIndexOf(' ', endIndex)
            const lastDot = text.lastIndexOf('.', endIndex)
            const lastBreak = Math.max(lastSpace, lastDot)
            
            if (lastBreak > currentIndex) {
              endIndex = lastBreak + 1
            }
          }
          
          pages.push(text.slice(currentIndex, endIndex).trim())
          currentIndex = endIndex
        }
      }
      
      setTextPages(pages)
      setCurrentTextPage(0)
    }
  }, [exhibit])

  if (!exhibit) return null

  const images = exhibit.images || []
  const totalImages = images.length
  const totalTextPages = textPages.length

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : totalImages - 1))
  }

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev < totalImages - 1 ? prev + 1 : 0))
  }

  const handlePrevTextPage = () => {
    setCurrentTextPage((prev) => (prev > 0 ? prev - 1 : totalTextPages - 1))
  }

  const handleNextTextPage = () => {
    setCurrentTextPage((prev) => (prev < totalTextPages - 1 ? prev + 1 : 0))
  }

  const handleImageClick = () => {
    setIsFullscreen(true)
  }

  const handleCloseFullscreen = () => {
    setIsFullscreen(false)
  }

  const handlePrevExhibit = () => {
    if (allExhibits && currentIndex !== undefined) {
      const prevIndex = currentIndex > 0 ? currentIndex - 1 : allExhibits.length - 1
      onNavigate(prevIndex)
    }
  }

  const handleNextExhibit = () => {
    if (allExhibits && currentIndex !== undefined) {
      const nextIndex = currentIndex < allExhibits.length - 1 ? currentIndex + 1 : 0
      onNavigate(nextIndex)
    }
  }

  const headerTitle = category && subcategory 
    ? `${category.toUpperCase()}. ${subcategory.toUpperCase()}`
    : ''

  return (
    <div className={styles.exhibitPage}>
      <div className={styles.mainContainer}>
        <div className={styles.header}>
          <h2 className={styles.headerTitle}>{headerTitle}</h2>
          <div className={styles.headerControls}>
            {allExhibits && allExhibits.length > 1 && (
              <>
                <button 
                  className={styles.headerNavArrow}
                  onClick={handlePrevExhibit}
                >
                 <ArrowBackIosIcon/>
                </button>
                <button 
                  className={styles.headerNavArrow}
                  onClick={handleNextExhibit}
                >
                <ArrowForwardIosIcon/>
                </button>
              </>
            )}
            <button className={styles.closeButton} onClick={onClose}>
              ×
            </button>
          </div>
        </div>
        
        <div className={styles.exhibitContainer}>
        <div className={styles.textSection}>
          <h1 className={styles.exhibitName}>{exhibit.name}</h1>
          
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

          <div className={styles.descriptionSection}>
            <div className={styles.descriptionText}>
              {textPages[currentTextPage] || exhibit.description}
            </div>
            
            {totalTextPages > 1 && (
              <div className={styles.textPagination}>
                <span className={styles.textPageIndicator}>
                  {currentTextPage + 1} / {totalTextPages}
                </span>
                <div className={styles.textPaginationArrows}>
                  <button 
                    className={styles.textNavArrow}
                    onClick={handlePrevTextPage}
                    title="Предыдущая страница"
                  >
                   <WestIcon/>
                  </button>
                  <button 
                    className={styles.textNavArrow}
                    onClick={handleNextTextPage}
                    title="Следующая страница"
                  >
                  <EastIcon/>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className={styles.imageSection}>
          <div className={styles.imageBlock}>
            <div className={styles.imageContainer}>
              <img 
                src={images[currentImageIndex]} 
                alt={exhibit.name}
                className={styles.exhibitImage}
                onClick={handleImageClick}
              />
            </div>
            <div className={styles.imageControls}>
            {totalImages > 1 ? (
              <>
                <button 
                  className={styles.imageNavArrow}
                  onClick={handlePrevImage}
                >
                  <ArrowBackIosIcon/>
                </button>
                <div className={styles.imageCounter}>
                  {currentImageIndex + 1} / {totalImages}
                </div>
                <button 
                  className={styles.imageNavArrow}
                  onClick={handleNextImage}
                >
                  <ArrowForwardIosIcon/>
                </button>
              </>
            ) : (
              <div className={styles.imageCounter}>
                {totalImages > 0 ? '1 / 1' : '0 / 0'}
              </div>
            )}
            <button 
              className={styles.fullscreenButton}
              onClick={handleImageClick}
              title="Полноэкранный режим"
            >
              <FullscreenIcon/>
            </button>
            </div>
          </div>
        </div>
      </div>
      </div>

      {isFullscreen && (
        <div className={styles.fullscreenOverlay} onClick={handleCloseFullscreen}>
          <button className={styles.fullscreenClose} onClick={(e) => { e.stopPropagation(); handleCloseFullscreen(); }}>
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
                onClick={(e) => { e.stopPropagation(); handlePrevImage(); }}
              >
                ←
              </button>
              <button 
                className={`${styles.fullscreenNavArrow} ${styles.fullscreenNavNext}`}
                onClick={(e) => { e.stopPropagation(); handleNextImage(); }}
              >
                →
              </button>
              <div className={styles.fullscreenCounter} onClick={(e) => e.stopPropagation()}>
                {currentImageIndex + 1} / {totalImages}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default ExhibitPage
