import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['uk', 'ru'],
  defaultLocale: 'uk',
  localePrefix: 'as-needed',
  localeDetection: false, 
});

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
