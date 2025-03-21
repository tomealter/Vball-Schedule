import { ImageTeaserProps } from '@/source/03-components/ImageTeaser/ImageTeaser';

const imageTeaserArgs = {
  url: '#0',
  image: (
    <img
      src="http://fpoimg.com/140x105?text=Thumbnail 4:3"
      alt="Thumbnail placeholder"
    />
  ),
  title: 'Title',
  date: 'Teaser Date',
  summary: (
    <p>
      This is the summary, which can contain
      <abbr title="Hyper Text Markup Language">HTML</abbr> markup. It should be
      600 characters or less.
    </p>
  ),
} satisfies ImageTeaserProps;

export default imageTeaserArgs;
