import type { Meta, StoryObj } from '@storybook/react';
import { Palette } from './Palette';

const meta = {
  title: 'Components/Palette',
  component: Palette,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Palette>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
