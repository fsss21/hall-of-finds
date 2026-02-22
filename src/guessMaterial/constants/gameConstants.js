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

export const ANSWER_OPTIONS = [
  'Керамика/глина',
  'Металл (железо/медь)',
  'Дерево',
  'Камень/кирпич'
]

export const MAX_QUESTIONS = 10

export const MATERIAL_OPTIONS = [
  'Керамика/глина',
  'Металл (железо/медь)',
  'Дерево',
  'Камень/кирпич',
  'Стекло'
]