import { Meta, StoryObj } from '@storybook/react';
import { withGlobalWrapper } from '../../../.storybook/decorators';
import TagComponent from './Tag';
import tagArgs from './tagArgs';

const meta: Meta<typeof TagComponent> = {
  title: 'Components/Tag',
  component: TagComponent,
  decorators: [withGlobalWrapper],
  tags: ['autodocs'],
};

type Story = StoryObj<typeof TagComponent>;
const Tag: Story = {
  args: tagArgs,
};

export default meta;
export { Tag };
