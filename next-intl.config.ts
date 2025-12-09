import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
  return {
    locale: locale ?? 'uk', 
    messages: require(`./messages/${locale ?? 'uk'}.json`)
  };
});
