import { useState } from 'react'
import MenuButtons from '../components/MenuButtons'
import Gallery from '../components/Gallery'
import ExhibitPage from './ExhibitPage'
import GuessMaterialApp from '../guessMaterial/App'
import DetermineGameApp from '../determineGame/App'
import styles from './Home.module.css'

function Home() {
  const [selectedCategory, setSelectedCategory] = useState('ceramics')
  const [selectedExhibit, setSelectedExhibit] = useState(null)
  const [exhibitContext, setExhibitContext] = useState(null)
  const [activeGame, setActiveGame] = useState(null)

  const handleCategorySelect = (category) => {
    setSelectedCategory(category)
    setSelectedExhibit(null)
    setExhibitContext(null)
  }

  const handleExhibitSelect = (exhibit, context) => {
    setSelectedExhibit(exhibit)
    setExhibitContext(context)
  }

  const handleExhibitClose = () => {
    setSelectedExhibit(null)
    setExhibitContext(null)
  }

  /** Закрыть игру и вернуться на Home. category — опционально: 'ceramics' | 'metal' | 'construction' для выбора раздела каталога. */
  const goToCatalog = (category) => {
    if (category) handleCategorySelect(category)
    setActiveGame(null)
  }

  if (activeGame === 'guessMaterial') {
    return (
      <div className={styles.gameWrapper}>
        <button type="button" className={styles.backButton} onClick={() => goToCatalog()}>
          ← Назад
        </button>
        <GuessMaterialApp onGoToCatalog={() => goToCatalog()} />
      </div>
    )
  }

  if (activeGame === 'determineGame') {
    return (
      <div className={styles.gameWrapper}>
        <button type="button" className={styles.backButton} onClick={() => goToCatalog()}>
          ← Назад
        </button>
        <DetermineGameApp onGoToCatalog={goToCatalog} />
      </div>
    )
  }

  if (selectedExhibit && exhibitContext) {
    return (
      <ExhibitPage 
        exhibit={selectedExhibit}
        category={exhibitContext.category}
        subcategory={exhibitContext.subcategory}
        allExhibits={exhibitContext.allExhibits}
        currentIndex={exhibitContext.currentIndex}
        onClose={handleExhibitClose}
        onNavigate={(index) => {
          if (exhibitContext.allExhibits[index]) {
            setSelectedExhibit(exhibitContext.allExhibits[index])
            setExhibitContext({
              ...exhibitContext,
              currentIndex: index
            })
          }
        }}
      />
    )
  }

  return (
    <div className={styles.home}>
      <MenuButtons 
        onCategorySelect={handleCategorySelect}
        selectedCategory={selectedCategory}
        onGuessMaterialClick={() => setActiveGame('guessMaterial')}
        onDetermineGameClick={() => setActiveGame('determineGame')}
      />
      <div className={styles.galleryContainer}>
        <Gallery 
          category={selectedCategory}
          onExhibitSelect={handleExhibitSelect}
          onCategoryChange={handleCategorySelect}
        />
      </div>
    </div>
  )
}

export default Home

