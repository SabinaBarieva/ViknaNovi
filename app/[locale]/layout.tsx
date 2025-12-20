import { NextIntlClientProvider } from 'next-intl';
import Header from '@/components/Header';
import '../globals.css';
import Footer from '@/components/Footer';
import { Montserrat, Open_Sans } from "next/font/google";
import Script from 'next/script';

export const metadata = {
  title: 'ViknaNovі',
  description: 'Металопластикові вікна та двері',
  icons: {
    icon: '/favicon.ico',
  },
};

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
      <head>
        {/* ✅ Google Tag Manager */}
        <Script
          id="gtm-head"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];
              w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
              var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
              j.async=true;
              j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
              f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-NP73DF68');
            `,
          }}
        />
      </head>

      <body className="flex flex-col min-h-screen relative">

        {/* ✅ Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NP73DF68"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header />

          <main>{children}</main>

          <Footer />
        </NextIntlClientProvider>

        <div id="modal-root"></div>
      </body>
    </html>
  );
}
