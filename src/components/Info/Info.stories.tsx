import type { Meta, StoryObj } from '@storybook/nextjs';

import { Info } from './Info';

const meta = {
  title: 'Components/Info',
  component: Info,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Info>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: '내 링크를 공유하고 더 많은 편지를 받아보세요 💌',
  },
};
