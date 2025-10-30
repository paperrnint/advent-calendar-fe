import type { Meta, StoryObj } from '@storybook/react';
import { NewButton } from './NewButton';

const meta = {
  title: 'Buttons/NewButton',
  component: NewButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NewButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: '내 어드벤트 캘린더 만들기',
  },
};
