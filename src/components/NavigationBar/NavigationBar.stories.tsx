import type { Meta, StoryObj } from '@storybook/nextjs';

import { NavigationBar } from './NavigationBar';

const meta = {
  title: 'Components/NavigationBar',
  component: NavigationBar,
  parameters: {
    layout: 'padded',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/',
        query: {},
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="p-20">
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof NavigationBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AuthenticatedMode: Story = {
  args: {
    isAuthenticated: true,
  },
  parameters: {
    nextjs: {
      navigation: {
        push: () => console.log('Navigate to calendar'),
      },
    },
  },
};

export const UnauthenticatedMode: Story = {
  args: {
    isAuthenticated: false,
  },
  parameters: {
    nextjs: {
      navigation: {
        push: () => console.log('Navigate to home'),
      },
    },
  },
};
