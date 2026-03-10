/**
 * Форматирование цены в рублях
 */
export function formatPrice(price: number, currency: string = '₽'): string {
  return `${price.toFixed(2)} ${currency}`;
}

/**
 * Форматирование рейтинга
 */
export function formatRating(rating: number, maxRating: number = 5): string {
  return `${rating.toFixed(1)}/${maxRating}`;
}

/**
 * Форматирование ID с ведущими нулями
 */
export function formatId(id: number, length: number = 6): string {
  return id.toString().padStart(length, '0');
}

/**
 * Форматирование даты
 */
export function formatDate(date: Date | string | number): string {
  const d = new Date(date);
  return d.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}
