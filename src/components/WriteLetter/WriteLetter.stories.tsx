import type { Meta, StoryObj } from '@storybook/react';
import { WriteLetter } from './WriteLetter';

const meta = {
  title: 'Components/WriteLetter',
  component: WriteLetter,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof WriteLetter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    to: '산타',
    onClose: () => {},
  },
  render: (args) => (
    <div className="w-2xs">
      <WriteLetter {...args} />
    </div>
  ),
};
