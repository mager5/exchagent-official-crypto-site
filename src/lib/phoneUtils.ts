/**
 * Утилиты для работы с телефонными номерами
 */

/**
 * Форматирует телефонный номер в российском формате +7 (999) 123-45-67
 * @param value - введенное значение
 * @returns отформатированный номер телефона
 */
export const formatPhoneNumber = (value: string): string => {
  // Удаляем все символы кроме цифр
  const phoneNumber = value.replace(/\D/g, '');
  
  // Если номер начинается с 8, заменяем на 7
  // Если номер начинается с 9, добавляем префикс 7
  let normalizedNumber;
  if (phoneNumber.startsWith('8')) {
    normalizedNumber = '7' + phoneNumber.slice(1);
  } else if (phoneNumber.startsWith('9')) {
    normalizedNumber = '7' + phoneNumber;
  } else {
    normalizedNumber = phoneNumber;
  }
  
  // Форматируем номер
  if (normalizedNumber.length === 0) return '';
  if (normalizedNumber.length <= 1) return '+' + normalizedNumber;
  if (normalizedNumber.length <= 4) return `+${normalizedNumber.slice(0, 1)} (${normalizedNumber.slice(1)}`;
  if (normalizedNumber.length <= 7) return `+${normalizedNumber.slice(0, 1)} (${normalizedNumber.slice(1, 4)}) ${normalizedNumber.slice(4)}`;
  if (normalizedNumber.length <= 9) return `+${normalizedNumber.slice(0, 1)} (${normalizedNumber.slice(1, 4)}) ${normalizedNumber.slice(4, 7)}-${normalizedNumber.slice(7)}`;
  return `+${normalizedNumber.slice(0, 1)} (${normalizedNumber.slice(1, 4)}) ${normalizedNumber.slice(4, 7)}-${normalizedNumber.slice(7, 9)}-${normalizedNumber.slice(9, 11)}`;
};

/**
 * Извлекает только цифры из отформатированного номера телефона
 * @param formattedPhone - отформатированный номер
 * @returns строка только с цифрами
 */
export const extractPhoneDigits = (formattedPhone: string): string => {
  return formattedPhone.replace(/\D/g, '');
};

/**
 * Проверяет, является ли номер телефона валидным российским номером
 * @param phone - номер телефона
 * @returns true если номер валидный
 */
export const isValidRussianPhone = (phone: string): boolean => {
  const digits = extractPhoneDigits(phone);
  // Российский номер должен начинаться с 7 и содержать 11 цифр
  return digits.length === 11 && digits.startsWith('7');
};