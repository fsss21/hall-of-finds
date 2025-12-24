import { useState, useEffect } from 'react'
import ExhibitModal from './ExhibitModal'
import './Gallery.css'

const categories = {
  ceramics: {
    name: 'Керамика и изразцы',
    subcategories: [
      { id: 'tiles', name: 'Печные изразцы XVIII-XIX вв' },
      { id: 'household', name: 'Бытовая керамика' },
      { id: 'tableware', name: 'Столовая посуда' }
    ]
  },
  metal: {
    name: 'Металлические изделия',
    subcategories: [
      { id: 'forged', name: 'Кованные элементы' },
      { id: 'copper', name: 'Медные изделия' },
      { id: 'coins', name: 'Монеты и декоративные элементы' }
    ]
  },
  construction: {
    name: 'Строительные материалы',
    subcategories: [
      { id: 'brick', name: 'Кирпич и камень' },
      { id: 'wood', name: 'Деревянные элементы' },
      { id: 'roofing', name: 'Кровельные элементы' }
    ]
  }
}

function Gallery({ category }) {
  const [activeSubcategory, setActiveSubcategory] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)
  const [selectedExhibit, setSelectedExhibit] = useState(null)
  const [exhibitsData, setExhibitsData] = useState(null)
  const [loading, setLoading] = useState(true)
  const itemsPerPage = 9

  const categoryData = categories[category]
  if (!categoryData) return null

  // Загружаем данные из JSON файла
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/data/${category}.json`)
        if (!response.ok) {
          throw new Error('Failed to load data')
        }
        const data = await response.json()
        setExhibitsData(data)
      } catch (error) {
        console.error('Error loading exhibits data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [category])

  if (loading || !exhibitsData) {
    return (
      <div className="gallery">
        <div className="gallery-categories">
          {categoryData.subcategories.map((sub, index) => (
            <button
              key={sub.id}
              className="category-button"
              disabled
            >
              {sub.name}
            </button>
          ))}
        </div>
        <div className="gallery-grid">
          {Array.from({ length: 9 }).map((_, index) => (
            <div key={index} className="gallery-item" style={{ opacity: 0.3 }}>
              <div style={{ width: '100%', height: '140px', background: '#f0f0f0' }}></div>
              <div className="gallery-item-title" style={{ background: '#f5f5f5' }}></div>
            </div>
          ))}
        </div>
        <div className="gallery-navigation" style={{ opacity: 0.3 }}>
          <div className="nav-arrow" style={{ pointerEvents: 'none' }}>←</div>
          <div className="page-indicator">Загрузка...</div>
          <div className="nav-arrow" style={{ pointerEvents: 'none' }}>→</div>
        </div>
      </div>
    )
  }

  const currentSubcategory = categoryData.subcategories[activeSubcategory]
  
  // Получаем экспонаты для текущей подкатегории
  const exhibits = getExhibitsForSubcategory(exhibitsData, currentSubcategory.id)
  
  const totalPages = Math.ceil(exhibits.length / itemsPerPage)
  const currentExhibits = exhibits.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  )

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1))
  }

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0))
  }

  const handleExhibitClick = (exhibit) => {
    setSelectedExhibit(exhibit)
  }

  const handleCloseModal = () => {
    setSelectedExhibit(null)
  }

  return (
    <>
      <div className="gallery">
        <div className="gallery-categories">
          {categoryData.subcategories.map((sub, index) => (
            <button
              key={sub.id}
              className={`category-button ${activeSubcategory === index ? 'active' : ''}`}
              onClick={() => {
                setActiveSubcategory(index)
                setCurrentPage(0)
              }}
            >
              {sub.name}
            </button>
          ))}
        </div>

        <div className="gallery-grid">
          {currentExhibits.map((exhibit, index) => (
            <div 
              key={exhibit.id} 
              className="gallery-item"
              onClick={() => handleExhibitClick(exhibit)}
            >
              <img 
                src={exhibit.images[0]} 
                alt={exhibit.name}
                loading="lazy"
              />
              <p className="gallery-item-title">{exhibit.name}</p>
            </div>
          ))}
        </div>

        <div className="gallery-navigation" style={{ opacity: totalPages > 1 ? 1 : 0.3 }}>
          <button 
            className="nav-arrow" 
            onClick={handlePrevPage}
            disabled={totalPages <= 1}
            style={{ opacity: totalPages > 1 ? 1 : 0.5, cursor: totalPages > 1 ? 'pointer' : 'not-allowed' }}
          >
            ←
          </button>
          <span className="page-indicator">
            {totalPages > 0 ? `${currentPage + 1} / ${totalPages}` : '0 / 0'}
          </span>
          <button 
            className="nav-arrow" 
            onClick={handleNextPage}
            disabled={totalPages <= 1}
            style={{ opacity: totalPages > 1 ? 1 : 0.5, cursor: totalPages > 1 ? 'pointer' : 'not-allowed' }}
          >
            →
          </button>
        </div>
      </div>

      {selectedExhibit && (
        <ExhibitModal 
          exhibit={selectedExhibit} 
          onClose={handleCloseModal}
        />
      )}
    </>
  )
}

// Функция для получения всех экспонатов подкатегории
function getExhibitsForSubcategory(exhibitsData, subcategoryId) {
  if (!exhibitsData) return []
  
  const subcategoryData = exhibitsData[subcategoryId]
  if (!subcategoryData) return []
  
  return subcategoryData
}

export default Gallery

