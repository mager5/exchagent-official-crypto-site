import emailjs from '@emailjs/browser';

// Конфигурация из переменных окружения
export const emailjsConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID', 
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY',
};

// Проверка конфигурации EmailJS
export const isEmailJSConfigured = (): boolean => {
  return (
    emailjsConfig.serviceId !== 'YOUR_SERVICE_ID' &&
    emailjsConfig.templateId !== 'YOUR_TEMPLATE_ID' &&
    emailjsConfig.publicKey !== 'YOUR_PUBLIC_KEY' &&
    emailjsConfig.serviceId !== undefined &&
    emailjsConfig.templateId !== undefined &&
    emailjsConfig.publicKey !== undefined
  );
};

// Интерфейс для данных формы
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

// Функция отправки email через EmailJS
export const sendContactEmail = async (formData: ContactFormData): Promise<boolean> => {
  // Проверяем конфигурацию
  if (!isEmailJSConfigured()) {
    console.warn('EmailJS не настроен. Работаем в демо-режиме.');
    // Имитируем отправку
    await new Promise(resolve => setTimeout(resolve, 1000));
    return true;
  }

  try {
    // Подготавливаем данные для шаблона
    const templateParams = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone || 'Не указан',
      message: formData.message,
      time: new Date().toLocaleString('ru-RU', {
        timeZone: 'Europe/Moscow',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }),
      to_email: 'info@exchagent.com',
      // Контактные данные компании для автоответа
      company_name: 'Exchagent',
      company_email: 'office@exchagent.com',
      company_phone: '+7 (499) 325-71-45',
      company_telegram: '@exchagent',
      company_telegram_link: 'tme://resolve?domain=exchagent',
      company_address: '123317, Россия, Москва, Пресненская наб., 12',
      company_description: 'Официальный партнёр в покупке и продаже цифровых активов. Договор, прозрачные условия, сопровождение на каждом этапе.',
      website_url: window.location.origin,
    };

    // Отправляем email
    const result = await emailjs.send(
      emailjsConfig.serviceId!,
      emailjsConfig.templateId!,
      templateParams,
      emailjsConfig.publicKey!
    );

    console.log('Email успешно отправлен:', result);
    return true;
  } catch (error) {
    console.error('Ошибка отправки email:', error);
    return false;
  }
};

// Инициализация EmailJS
if (isEmailJSConfigured()) {
  emailjs.init(emailjsConfig.publicKey!);
}