import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
  return {
    locale: locale ?? 'ua', 
    messages: require(`./messages/${locale ?? 'ua'}.json`)
  };
});
