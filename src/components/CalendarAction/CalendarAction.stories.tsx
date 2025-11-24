import type { Meta, StoryObj } from '@storybook/nextjs';

import { CalendarAction } from './CalendarAction';

const meta = {
  title: 'Components/CalendarAction',
  component: CalendarAction,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CalendarAction>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NotLoggedIn: Story = {
  args: {
    isLoading: false,
    isLoggedIn: false,
    isOwner: false,
    userUuid: null,
  },
};

export const Owner: Story = {
  args: {
    isLoading: false,
    isLoggedIn: true,
    isOwner: true,
    userUuid: 'user-123',
  },
};

export const Visitor: Story = {
  args: {
    isLoading: false,
    isLoggedIn: true,
    isOwner: false,
    userUuid: 'user-123',
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
    isLoggedIn: false,
    isOwner: false,
    userUuid: null,
  },
};
