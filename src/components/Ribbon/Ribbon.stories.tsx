import { RibbonColor } from '@/constants';
import type { Meta, StoryObj } from '@storybook/react';
import { Ribbon } from './Ribbon';

const meta = {
  title: 'Components/Ribbon',
  component: Ribbon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: { type: 'select' },
      options: [
        'brown',
        'red',
        'orange',
        'yellow',
        'green',
        'blue',
        'navy',
        'violet',
        'pink',
      ] as RibbonColor[],
      description: '리본 색상',
    },
    name: {
      control: { type: 'text' },
      description: '사용자 이름 (1-12자)',
    },
  },
} satisfies Meta<typeof Ribbon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    color: 'green',
    name: 'username',
  },
};
