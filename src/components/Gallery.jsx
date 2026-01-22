import { useState, useEffect } from 'react'
import styles from './Gallery.module.css'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

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

function Gallery({ category, onExhibitSelect, onBack, onCategoryChange }) {
  const [activeSubcategory, setActiveSubcategory] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)
  const [exhibitsData, setExhibitsData] = useState(null)
  const [loading, setLoading] = useState(true)
  const itemsPerPage = 8
  const categoryData = categories[category]

  useEffect(() => {
    if (!categoryData) return
    const loadData = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/data/${category}.json`)
        if (!response.ok) throw new Error('Failed to load data')
        const data = await response.json()
        setExhibitsData(data)
      } catch (error) {
        console.error('Error loading exhibits data:', error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [category, categoryData])

  if (!categoryData) return null

  if (loading || !exhibitsData) {
    return (
      <div className={styles.gallery}>
        <div className={styles.galleryCategories}>
          {categoryData.subcategories.map((sub) => (
            <button
              key={sub.id}
              className={styles.categoryButton}
              disabled
            >
              {sub.name}
            </button>
          ))}
        </div>
        <div className={styles.divider}></div>
        <div className={styles.galleryGrid}>
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className={styles.galleryItem} style={{ opacity: 0.3 }}>
              <div className={styles.galleryItemInner}>
                <div style={{ width: '100%', height: '140px', background: '#f0f0f0' }}></div>
                <div className={styles.galleryItemContent}>
                  <div className={styles.galleryItemTitle} style={{ background: '#f5f5f5', height: '20px', marginBottom: '8px' }}></div>
                  <div className={styles.galleryItemDescription} style={{ background: '#f5f5f5', height: '40px' }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.galleryNavigation} style={{ opacity: 0.3 }}>
          <button 
            className={styles.backButton}
            disabled
            style={{ pointerEvents: 'none', opacity: 0.5 }}
          >
            ← Назад
          </button>
          <div className={styles.navArrow} style={{ pointerEvents: 'none' }}>←</div>
          <div className={styles.pageIndicator}>Загрузка...</div>
          <div className={styles.navArrow} style={{ pointerEvents: 'none' }}>→</div>
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
    if (onExhibitSelect) {
      const currentSubcategory = categoryData.subcategories[activeSubcategory]
      const allExhibits = getExhibitsForSubcategory(exhibitsData, currentSubcategory.id)
      const currentIndex = allExhibits.findIndex(e => e.id === exhibit.id)
      
      onExhibitSelect(exhibit, {
        category: categoryData.name,
        subcategory: currentSubcategory.name,
        allExhibits: allExhibits,
        currentIndex: currentIndex >= 0 ? currentIndex : 0
      })
    }
  }

  return (
    <div className={styles.gallery}>
        <div className={styles.galleryCategories}>
          {categoryData.subcategories.map((sub, index) => (
            <button
              key={sub.id}
              className={`${styles.categoryButton} ${activeSubcategory === index ? styles.active : ''}`}
              onClick={() => {
                setActiveSubcategory(index)
                setCurrentPage(0)
              }}
            >
              {sub.name}
            </button>
          ))}
        </div>
        <div className={styles.divider}></div>
        <div className={styles.galleryGrid}>
          {currentExhibits.map((exhibit) => (
            <div 
              key={exhibit.id} 
              className={styles.galleryItem}
              onClick={() => handleExhibitClick(exhibit)}
            >
              <div className={styles.galleryItemInner}>
                <img 
                  src={exhibit.images[0]} 
                  alt={exhibit.name}
                  loading="lazy"
                />
                <div className={styles.galleryItemContent}>
                  <h3 className={styles.galleryItemTitle}>
                    {exhibit.name} →
                  </h3>
                  <p className={styles.galleryItemDescription}>
                    {exhibit.description || 'Описание предмета описание предмета описание предмета описание предмета описание предмета описание описание предмета...'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.galleryNavigation} style={{ opacity: totalPages > 1 ? 1 : 0.3 }}>
          <button 
            className={styles.backButton}
            onClick={() => {
              if (onBack) {
                onBack()
              } else if (onCategoryChange) {
                // Переключение между категориями
                const categoryKeys = Object.keys(categories)
                const currentIndex = categoryKeys.indexOf(category)
                const prevIndex = currentIndex > 0 ? currentIndex - 1 : categoryKeys.length - 1
                onCategoryChange(categoryKeys[prevIndex])
              }
            }}
          >
            Назад
          </button>
          <button 
            className={styles.navArrow} 
            onClick={handlePrevPage}
            disabled={totalPages <= 1}
            style={{ opacity: totalPages > 1 ? 1 : 0.5, cursor: totalPages > 1 ? 'pointer' : 'not-allowed' }}
          >
            <ArrowBackIosIcon/>
          </button>
          <button 
            className={styles.navArrow} 
            onClick={handleNextPage}
            disabled={totalPages <= 1}
            style={{ opacity: totalPages > 1 ? 1 : 0.5, cursor: totalPages > 1 ? 'pointer' : 'not-allowed' }}
          >
            <ArrowForwardIosIcon/>
          </button>
        </div>
      </div>
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

