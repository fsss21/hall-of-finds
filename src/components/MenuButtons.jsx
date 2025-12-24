import './MenuButtons.css'

function MenuButtons({ onCategorySelect, selectedCategory }) {
  return (
    <div className="menu-buttons">
      <div className="menu-block">
        <button
          className={`menu-button ${selectedCategory === 'ceramics' ? 'active' : ''}`}
          onClick={() => onCategorySelect('ceramics')}
        >
          Керамика и изразцы
        </button>
        <button
          className={`menu-button ${selectedCategory === 'metal' ? 'active' : ''}`}
          onClick={() => onCategorySelect('metal')}
        >
          Металлические изделия
        </button>
        <button
          className={`menu-button ${selectedCategory === 'construction' ? 'active' : ''}`}
          onClick={() => onCategorySelect('construction')}
        >
          Строительные материалы
        </button>
      </div>

      <div className="menu-block">
        <button className="menu-button menu-button-quiz">
          Квиз "Угадай материал"
        </button>
        <button className="menu-button menu-button-quiz">
          Угадай что делает предмет
        </button>
      </div>

      <button className="back-button-menu">
        Назад
      </button>
    </div>
  )
}

export default MenuButtons

