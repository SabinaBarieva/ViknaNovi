type Locale = 'uk' | 'ru';

export default function SeoJsonLd({ locale }: { locale: Locale }) {
  const baseUrl = 'https://viknanovi.shop';

  const data = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',

    // 🔹 Название бизнеса
    name: 'ViknaNovі',

    // 🔹 Канонический URL бизнеса
    url: locale === 'uk'
      ? baseUrl
      : `${baseUrl}/ru`,

    // 🔹 Логотип
    logo: `${baseUrl}/logo.svg`,

    // 🔹 Описание
    description:
      locale === 'uk'
        ? 'Продаж та встановлення металопластикових вікон, дверей і розсувних систем у Дніпрі та по Україні.'
        : 'Продажа и установка металлопластиковых окон, дверей и раздвижных систем в Днепре и по Украине.',

    // 🔹 Телефон
    telephone: '+380674000202',
    sameAs: [
  'https://www.facebook.com/viknanovi.official',
  'https://www.instagram.com/viknanovi_original/',
  'https://www.youtube.com/@viknanovi_original'
],


    // 🔹 Контактная точка
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+380674000202',
      contactType: 'customer service',
      availableLanguage: ['uk', 'ru'],
    },

    // 🔹 Адрес
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'проспект Богдана Хмельницького, 222В',
      addressLocality: 'Дніпро',
      addressRegion: 'Дніпропетровська область',
      postalCode: '49000',
      addressCountry: 'UA',
    },

    // 🔹 Регион работы
    areaServed: {
      '@type': 'Country',
      name: 'Ukraine',
    },

    // 🔹 Услуги
    makesOffer: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: locale === 'uk'
            ? 'Металопластикові вікна'
            : 'Металлопластиковые окна',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: locale === 'uk'
            ? 'Металопластикові двері'
            : 'Металлопластиковые двери',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: locale === 'uk'
            ? 'Монтаж вікон і дверей'
            : 'Монтаж окон и дверей',
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
