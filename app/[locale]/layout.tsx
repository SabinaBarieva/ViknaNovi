import { NextIntlClientProvider } from 'next-intl';
import Header from '@/components/Header';
import '../globals.css';
import Footer from '@/components/Footer';
import { Montserrat, Open_Sans } from "next/font/google";
import Script from 'next/script';
import { Metadata } from 'next';

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const locale = (await params)?.locale || 'uk';
  const baseUrl = 'https://www.viknanovi.shop';
  
  const canonicalUrl = locale === 'uk' ? baseUrl : `${baseUrl}/${locale}`;
  const isRu = locale === 'ru';

  return {
    title: isRu ? 'ViknaNovі | Пластиковые окна и двери' : 'ViknaNovі | Металопластикові вікна та двері',
    description: isRu ? 'Продажа и монтаж металлопластиковых окон и дверей' : 'Металопластикові вікна та двері — продаж і монтаж',
    icons: {
      icon: '/favicon.ico',
    },
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'uk': baseUrl,
        'ru': `${baseUrl}/ru`,
      },
    },
  };
}

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
        {/* ✅ Google Tag Manager с отложенной загрузкой */}
        <Script
          id="gtm-head"
          strategy="lazyOnload"
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

        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NP73DF68"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        {/* ✅ Meta Pixel с отложенной загрузкой и исправленным URL библиотеки */}
        <Script
          id="meta-pixel"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://facebook.net');
              fbq('init', 'ВАШ_ID_ПИКСЕЛЯ');
              fbq('track', 'PageView');
            `,
          }}
        />
      </head>

      <body className="flex flex-col min-h-screen relative">
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
