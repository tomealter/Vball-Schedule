import { HeroInlineImageProps } from '@/source/03-components/HeroInlineImage/HeroInlineImage';

const heroInlineImageArgs = {
  hasOverlay: true,
  title: 'Hero Title',
  summary: <p>Hero summary text.</p>,
  button: {
    label: 'Hero Button',
    href: '#0',
  },
  heroImage: (
    <picture>
      <source
        srcSet="https://picsum.photos/1600/800?image=11"
        media="(min-width: 1024px)"
        type="image/jpeg"
      />
      <source
        srcSet="https://picsum.photos/1200/600?image=11"
        media="(min-width: 760px)"
        type="image/jpeg"
      />
      <source
        srcSet="https://picsum.photos/800/400?image=11"
        type="image/jpeg"
      />
      <img
        srcSet="https://picsum.photos/1600/800?image=11"
        alt="Hero Image Alt Text"
      />
    </picture>
  ),
} satisfies HeroInlineImageProps;

export default heroInlineImageArgs;
