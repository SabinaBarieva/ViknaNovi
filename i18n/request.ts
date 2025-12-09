import {getRequestConfig} from 'next-intl/server';

export default getRequestConfig(async ({requestLocale}) => {
  // Получаем текущий язык запроса или задаём 'uk' по умолчанию
  const locale = (await requestLocale) || 'uk';

  return {
    locale, // 👈 обязательно нужно вернуть язык!
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
