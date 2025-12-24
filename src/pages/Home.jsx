import { useState } from 'react'
import MenuButtons from '../components/MenuButtons'
import Gallery from '../components/Gallery'
import styles from './Home.module.css'

function Home() {
  const [selectedCategory, setSelectedCategory] = useState('ceramics')

  const handleCategorySelect = (category) => {
    setSelectedCategory(category)
  }

  return (
    <div className={styles.home}>
      <MenuButtons 
        onCategorySelect={handleCategorySelect}
        selectedCategory={selectedCategory}
      />
      <div className={styles.galleryContainer}>
        <Gallery category={selectedCategory} />
      </div>
    </div>
  )
}

export default Home

