import type { Meta, StoryObj } from '@storybook/nextjs';

import { Logo } from './Logo';

const meta = {
  title: 'Components/Logo',
  component: Logo,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
