import { useState } from 'react'
import MenuButtons from '../components/MenuButtons'
import Gallery from '../components/Gallery'
import ExhibitPage from './ExhibitPage'
import styles from './Home.module.css'

function Home() {
  const [selectedCategory, setSelectedCategory] = useState('ceramics')
  const [selectedExhibit, setSelectedExhibit] = useState(null)
  const [exhibitContext, setExhibitContext] = useState(null)

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

