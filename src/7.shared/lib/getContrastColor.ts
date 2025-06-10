/**
 * Возвращает контрастный цвет текста (чёрный или белый) на фоне заданного цвета в формате HEX.
 *
 * Поддерживаются как 3-символьные (`#fff`), так и 6-символьные (`#ffffff`) HEX-форматы.
 * Использует цветовую модель YIQ для оценки яркости цвета фона и определения оптимального контрастного цвета текста.
 *
 * @param hexColor - Цвет фона в формате HEX (например, "#fff", "#ffffff", "fff" или "ffffff").
 * @returns Цвет текста в формате HEX: `#000000` для светлого фона, `#ffffff` для тёмного.
 */
export function getContrastColor(hexColor: string): '#000000' | '#ffffff' {
  const defaultColor = '#000000'
  let cleanHex = hexColor.replace(/^#/, '').toLowerCase()

  // Преобразуем 3-символьный HEX в 6-символьный
  if (cleanHex.length === 3) {
    cleanHex = cleanHex.split('').map(char => char + char).join('')
  }

  // Проверяем, что строка — валидный 6-символьный HEX-код (только символы 0-9 и a-f)
  // Если не проходит валидацию — возвращаем дефолтное значение
  if (!/^[0-9a-f]{6}$/.test(cleanHex)) {
    return defaultColor
  }

  const r = Number.parseInt(cleanHex.slice(0, 2), 16)
  const g = Number.parseInt(cleanHex.slice(2, 4), 16)
  const b = Number.parseInt(cleanHex.slice(4, 6), 16)

  const yiq = (r * 299 + g * 587 + b * 114) / 1000

  return yiq >= 128 ? defaultColor : '#ffffff'
}
