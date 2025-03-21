import { CardProps } from '@/source/03-components/Card/Card';

const cardArgs = {
  title: 'Card title',
  url: '#0',
  footer: '',
  date: 'September 28, 2018',
  readMore: true,
  media: (
    <img
      src="https://picsum.photos/id/1015/800/600"
      alt="Placeholder card image"
    />
  ),
  tags: [
    { url: '#0', title: 'Tag 1' },
    { url: '#0', title: 'Tag 2' },
    { url: '#0', title: 'Tag 3' },
    { url: '#0', title: 'Tag 4' },
  ],
  children: (
    <p>
      {' '}
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam et
      accumsan augue. Morbi non laoreet lorem.
    </p>
  ),
} satisfies CardProps;

export default cardArgs;
