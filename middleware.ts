import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['uk', 'ru'],
  defaultLocale: 'uk',
  localePrefix: 'as-needed',
});

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
