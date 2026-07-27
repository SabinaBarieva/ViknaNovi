type Locale = 'uk' | 'ru';

export default function SeoJsonLd({ locale }: { locale: Locale }) {
  const baseUrl = 'https://www.viknanovi.shop'; 

  const isRu = locale === 'ru';


  const businessData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'ViknaNovі',
    url: isRu ? `${baseUrl}/ru` : baseUrl,
    logo: `${baseUrl}/logo.svg`,
    image: `${baseUrl}/og-image.jpg`, 
    description: isRu
      ? 'Продажа и установка металлопластиковых окон, дверей и раздвижных систем в Днепре и по Украине.'
      : 'Продаж та встановлення металопластикових вікон, дверей і розсувних систем у Дніпрі та по Україні.',
    telephone: '+380674000202',
    priceRange: '$$',
    sameAs: [
      'https://www.facebook.com/viknanovi.official',
      'https://www.instagram.com/viknanovi_original/',
      'https://www.youtube.com/@viknanovi_original'
    ],


    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '154',
      bestRating: '5',
      worstRating: '1'
    },


    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday'],
        opens: '09:00',
        closes: '15:00',
      }
    ],

    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+380674000202',
      contactType: 'customer service',
      availableLanguage: ['uk', 'ru'],
    },

    address: {
      '@type': 'PostalAddress',
      streetAddress: isRu ? 'проспект Богдана Хмельницкого, 222В' : 'проспект Богдана Хмельницького, 222В',
      addressLocality: isRu ? 'Днепр' : 'Дніро',
      addressRegion: isRu ? 'Днепропетровская область' : 'Дніпропетровська область',
      postalCode: '49000',
      addressCountry: 'UA',
    },

    areaServed: {
      '@type': 'Country',
      name: 'Ukraine',
    },

    makesOffer: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: isRu ? 'Металлопластиковые окна' : 'Металопластикові вікна',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: isRu ? 'Металлопластиковые двери' : 'Металопластикові двері',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: isRu ? 'Монтаж окон и дверей' : 'Монтаж вікон і дверей',
        },
      },
    ],
  };


  const faqData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: isRu ? 'Каков срок изготовления окон ViknaNovi?' : 'Який строк виготовлення вікон ViknaNovi?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: isRu 
            ? 'Собственное автоматизированное производство позволяет изготавливать стандартные конструкции за 5-7 рабочих дней.' 
            : 'Власне автоматизоване виробництво дозволяє виготовляти стандартні конструкції за 5-7 робочих днів.'
        }
      },
      {
        '@type': 'Question',
        name: isRu ? 'Предоставляется ли гарантия на профиль и монтаж?' : 'Чи надається гарантія на профіль та монтаж?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: isRu 
            ? 'Да, как завод-производитель мы предоставляем официальную комплексную гарантию качества на профильные системы, фурнитуру и монтажные работы до 10 лет.' 
            : 'Так, як завод-виробник ми надаємо офіційну комплексну гарантію якості на профільні системи, фурнітуру та монтажні роботи до 10 років.'
        }
      }
    ]
  };

  return (
    <>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessData) }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
      />
    </>
  );
}
