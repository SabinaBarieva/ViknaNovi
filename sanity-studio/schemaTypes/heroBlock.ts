const heroBlock = {
  name: 'heroBlock',
  type: 'document',
  title: 'Hero Block (слайдер)',
  fields: [
    {
      name: 'slides',
      type: 'array',
      title: 'Слайды',
      of: [
        {
          type: 'object',
          title: 'Слайд',
          fields: [
            {
              name: 'backgroundImage',
              type: 'image',
              title: 'Фоновое изображение',
              options: { hotspot: true },
            },
            {
              name: 'title',
              type: 'object',
              title: 'Заголовок',
              fields: [
                { name: 'uk', type: 'string', title: 'UK' },
                { name: 'ru', type: 'string', title: 'RU' },
              ],
            },
            {
              name: 'description',
              type: 'object',
              title: 'Описание',
              fields: [
                { name: 'uk', type: 'text', title: 'UK' },
                { name: 'ru', type: 'text', title: 'RU' },
              ],
            },
            {
              name: 'buttonText',
              type: 'object',
              title: 'Текст кнопки',
              fields: [
                { name: 'uk', type: 'string', title: 'UK' },
                { name: 'ru', type: 'string', title: 'RU' },
              ],
            },
            {
              name: 'buttonUrl',
              type: 'url',
              title: 'Ссылка кнопки',
            },
          ],
        },
      ],
    },
  ],
};

export default heroBlock;
