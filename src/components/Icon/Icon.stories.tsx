import type { Meta, StoryObj } from '@storybook/nextjs';

import { Icon } from './Icon';

const meta = {
  title: 'Components/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    number: {
      control: { type: 'number', min: 1, max: 25, step: 1 },
      description: '표시할 아이콘 번호 (1-25)',
    },
    size: {
      control: { type: 'number', min: 20, max: 100, step: 10 },
      description: '아이콘 크기 (픽셀)',
    },
    className: {
      control: 'text',
      description: '추가 CSS 클래스',
    },
    alt: {
      control: 'text',
      description: '이미지 대체 텍스트',
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    number: 1,
  },
};

export const AllIcons: Omit<Story, 'args'> = {
  render: () => (
    <div className="grid grid-cols-5 gap-4">
      {Array.from({ length: 25 }, (_, i) => i + 1).map((num) => (
        <div key={num} className="flex flex-col items-center gap-2">
          <Icon number={num} size={60} />
          <span className="text-sm text-gray-600">{num}</span>
        </div>
      ))}
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};
