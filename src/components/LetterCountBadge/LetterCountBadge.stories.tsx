import type { Meta, StoryObj } from '@storybook/nextjs';

import { LetterCountBadge } from './LetterCountBadge';

const meta = {
  title: 'Components/LetterCountBadge',
  component: LetterCountBadge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LetterCountBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    count: 1,
  },
};

export const ManyLetters: Story = {
  args: {
    count: 100,
  },
};
