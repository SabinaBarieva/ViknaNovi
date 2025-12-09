import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["uk", "ru"],
  defaultLocale: "uk",
});

export const config = {
  matcher: [
    // исключить api, _next, файлы и т.п.
    "/((?!api|_next|.*\\..*).*)",
  ],
};
