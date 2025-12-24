import { useState } from 'react'
import MenuButtons from '../components/MenuButtons'
import Gallery from '../components/Gallery'
import './Home.css'

function Home() {
  const [selectedCategory, setSelectedCategory] = useState('ceramics')

  const handleCategorySelect = (category) => {
    setSelectedCategory(category)
  }

  return (
    <div className="home">
      <MenuButtons 
        onCategorySelect={handleCategorySelect}
        selectedCategory={selectedCategory}
      />
      <div className="gallery-container">
        <Gallery category={selectedCategory} />
      </div>
    </div>
  )
}

export default Home

