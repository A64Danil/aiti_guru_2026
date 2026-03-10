export const MESSAGES = {
  // Auth
  AUTH_LOGIN_SUCCESS: 'Успешная авторизация',
  AUTH_LOGIN_ERROR: 'Неверный логин или пароль',
  AUTH_LOGOUT: 'Вы вышли из системы',

  // Products
  PRODUCTS_LOAD_ERROR: 'Не удалось загрузить товары',
  PRODUCTS_SEARCH_ERROR: 'Ошибка при поиске товаров',
  PRODUCTS_ADD_SUCCESS: 'Товар успешно добавлен',

  // Validation
  VALIDATION_USERNAME_REQUIRED: 'Логин обязателен',
  VALIDATION_PASSWORD_REQUIRED: 'Пароль обязателен',
  VALIDATION_TITLE_REQUIRED: 'Наименование обязательно',
  VALIDATION_PRICE_REQUIRED: 'Цена обязательна',
  VALIDATION_BRAND_REQUIRED: 'Вендор обязателен',
  VALIDATION_SKU_REQUIRED: 'Артикул обязателен',

  // Placeholders
  PLACEHOLDER_USERNAME: 'Введите логин',
  PLACEHOLDER_PASSWORD: 'Введите пароль',
  PLACEHOLDER_SEARCH: 'Поиск...',
  PLACEHOLDER_TITLE: 'Введите наименование',
  PLACEHOLDER_PRICE: 'Введите цену',
  PLACEHOLDER_BRAND: 'Введите вендора',
  PLACEHOLDER_SKU: 'Введите артикул',
} as const;
