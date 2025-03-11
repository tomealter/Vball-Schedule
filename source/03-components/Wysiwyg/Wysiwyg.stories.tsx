import { Meta, StoryObj } from '@storybook/react';
import { withGlobalWrapper } from '../../../.storybook/decorators';
import WysiwygComponent from './Wysiwyg';
import wysiwygArgs from './wysiwygArgs';

const meta: Meta<typeof WysiwygComponent> = {
  title: 'Components/WYSIWYG',
  component: WysiwygComponent,
  decorators: [withGlobalWrapper],
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: false,
    },
  },
};

type Story = StoryObj<typeof WysiwygComponent>;
const WYSIWYG: Story = {
  // Workaround to allow story to be imported elsewhere.
  // See https://github.com/storybookjs/storybook/issues/22278
  render: args => <WysiwygComponent {...args} />,
  args: wysiwygArgs,
};

export default meta;
export { WYSIWYG };
