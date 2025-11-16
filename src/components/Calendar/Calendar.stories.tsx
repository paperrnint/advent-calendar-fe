import type { Meta, StoryObj } from '@storybook/nextjs';

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
    uuid: 'test-uuid',
    isOwner: true,
    ownerName: '산타',
  },
};

export const GuestCalendar: Story = {
  args: {
    today: '2025-12-09',
    uuid: 'test-uuid',
    isOwner: false,
    ownerName: '산타',
  },
};

export const HideInfo: Story = {
  args: {
    today: '2025-11-01',
    uuid: 'test-uuid',
    isOwner: false,
    ownerName: '산타',
    hideInfo: true,
  },
};

export const HideDay: Story = {
  args: {
    today: '2025-11-01',
    isOwner: false,
    ownerName: '산타',
    uuid: 'test-uuid',
    hideDay: true,
  },
};

export const DisplayOnly: Story = {
  args: {
    today: '2025-11-01',
    isOwner: false,
    ownerName: '산타',
    hideInfo: true,
    hideDay: true,
  },
};
