import type { Meta, StoryObj } from '@storybook/react';
import { Calendar } from './Calendar';

const meta = {
  title: 'Components/Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OwnerCalendar: Story = {
  args: {
    today: '2025-12-09',
    isOwner: true,
    ownerName: '산타',
  },
};

export const GuestCalendar: Story = {
  args: {
    today: '2025-12-09',
    isOwner: false,
    ownerName: '산타',
  },
};
