/** Базовый путь к данным игры (public/gameData/guessMaterial) */
export const DATA_BASE_URL = '/gameData/guessMaterial'

/** Подставляет базовый путь для изображений из JSON. Пути /data/ — из родительского проекта (как есть). */
export function getMaterialImageUrl(image) {
  if (!image) return null
  if (image.startsWith('http') || image.startsWith('data:')) return image
  if (image.startsWith('/gameData/') || image.startsWith('/data/')) return image
  if (image.startsWith('/')) return DATA_BASE_URL + image
  return DATA_BASE_URL + '/' + image
}

/** URL картинки из public/gameData/guessMaterial/images (по имени файла). Если там есть фото — используем его, иначе placeholder при ошибке загрузки. */
export function getGameDataImageUrl(image) {
  if (!image || typeof image !== 'string') return null
  const basename = image.replace(/^.*\//, '')
  if (!basename) return null
  return `${DATA_BASE_URL}/images/${basename}`
}

/** 4 основные категории + Стекло (вопрос 23). Кость/рог объединены с деревом в одну кнопку. */
export const ANSWER_OPTIONS = [
  'Керамика/глина',
  'Кость/рог/дерево',
  'Металл',
  'Камень/кирпич',
  'Стекло'
]

export const MAX_QUESTIONS = 10

export const MATERIAL_OPTIONS = [
  'Керамика/глина',
  'Кость/рог/дерево',
  'Металл',
  'Камень/кирпич',
  'Стекло'
]