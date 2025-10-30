import type { Meta, StoryObj } from '@storybook/react';
import { LoginButton } from './LoginButton';

const meta = {
  title: 'Buttons/LoginButton',
  component: LoginButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LoginButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: 'naver',
  },
};

export const AllButtons: Omit<Story, 'args'> = {
  render: () => (
    <div className="flex flex-col gap-3">
      <LoginButton type="naver" />
      <LoginButton type="kakao" />
    </div>
  ),
};
