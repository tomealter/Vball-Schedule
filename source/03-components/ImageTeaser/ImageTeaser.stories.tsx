import { Meta, StoryObj } from '@storybook/react';
import { withGlobalWrapper } from '../../../.storybook/decorators';
import ImageTeaserComponent from './ImageTeaser';
import imageTeaserArgs from './imageTeaserArgs';

const meta: Meta<typeof ImageTeaserComponent> = {
  title: 'Components/Image Teaser',
  component: ImageTeaserComponent,
  decorators: [withGlobalWrapper],
  tags: ['autodocs'],
};

type Story = StoryObj<typeof ImageTeaserComponent>;
const ImageTeaser: Story = {
  args: imageTeaserArgs,
};

export default meta;
export { ImageTeaser };
