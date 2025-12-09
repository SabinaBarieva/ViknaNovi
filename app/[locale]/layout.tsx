import { NextIntlClientProvider } from 'next-intl';
import Header from '@/components/Header';
import '../globals.css';
import Footer from '@/components/Footer';
import { Montserrat, Open_Sans } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-openSans",
  display: "swap",
});

export default async function LocaleLayout({ children, params }: any) {
  const locale = (await params)?.locale || 'uk';
  const messages = (await import(`../../messages/${locale}.json`)).default;

  return (
    <html lang={locale} className={`${montserrat.variable} ${openSans.variable}`}>
      <body className="flex flex-col min-h-screen relative">

        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header />

          <main>{children}</main>

          <Footer />
        </NextIntlClientProvider>

        {/* 🔥 ПОРТАЛ ДЛЯ МОДАЛЬНИХ ВІКОН */}
        <div id="modal-root"></div>

      </body>
    </html>
  );
}
