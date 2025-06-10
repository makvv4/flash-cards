/**
 * Возвращает **случайное целое число** в диапазоне **[min, max]** — обе
 * границы включаются.
 *
 * > Функция безопасна для любых целых `min ≤ max`;
 * > при равных границах всегда вернёт это значение.
 *
 * @param min — нижняя граница диапазона (включительно).
 * @param max — верхняя граница диапазона (включительно).
 * @returns Случайное целое число от `min` до `max`.
 *
 * @example
 * ```ts
 * const dice = getRandomInt(1, 6) // 1 … 6
 * ```
 */
export function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * Генерирует **случайный шестизначный HEX-код цвета** в формате `#rrggbb`.
 *
 * Используется диапазон `0x000000 … 0xFFFFFF`, после чего значение
 * приводится к шестнадцатеричной строке и дополняется ведущими нулями
 * до 6 символов.
 *
 * @returns Строка вида `#a1b2c3` — всегда 7 символов, первая — «#».
 *
 * @example
 * ```ts
 * const bg = getRandomHexColor() // → "#3fa7c2"
 * element.style.backgroundColor = bg
 * ```
 */
export function getRandomHexColor(): string {
  const hex = Math.floor(Math.random() * 0xFFFFFF).toString(16)
  return `#${hex.padStart(6, '0')}`
}
