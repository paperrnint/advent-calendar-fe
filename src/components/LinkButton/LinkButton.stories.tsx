import type { Meta, StoryObj } from '@storybook/nextjs';

import { LinkButton } from './LinkButton';

const meta = {
  title: 'Buttons/LinkButton',
  component: LinkButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LinkButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: '내 어드벤트 캘린더 만들기',
    href: '/',
  },
};
