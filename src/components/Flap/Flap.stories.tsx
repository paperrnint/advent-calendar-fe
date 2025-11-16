import type { Meta, StoryObj } from '@storybook/nextjs';

import { Flap } from './Flap';
import { Icon } from '../Icon/Icon';

const meta = {
  title: 'Components/Flap',
  component: Flap,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'clicked' },
  },
} satisfies Meta<typeof Flap>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 Flap (아이콘 + 날짜)
export const Default: Story = {
  args: {
    children: (
      <>
        <Icon number={1} />
        <span className="font-jeju absolute right-1 bottom-1 text-xs text-gray-700">1</span>
      </>
    ),
  },
};

// 모든 Flap 보기 (1-25)
export const AllFlaps: Omit<Story, 'args'> = {
  render: () => (
    <div className="grid grid-cols-5 gap-4 p-8">
      {Array.from({ length: 25 }, (_, i) => i + 1).map((day) => (
        <Flap key={day} onClick={() => console.log(`Day ${day} clicked`)}>
          <Icon number={day} />
          <span className="font-jeju absolute right-1 bottom-1 text-xs text-gray-700">{day}</span>
        </Flap>
      ))}
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

// 클릭 인터랙션 테스트
export const Interactive: Omit<Story, 'args'> = {
  render: () => {
    const handleClick = (day: number) => {
      alert(`Day ${day} clicked!`);
    };

    return (
      <div className="flex gap-4">
        {[1, 12, 25].map((day) => (
          <Flap key={day} onClick={() => handleClick(day)}>
            <Icon number={day} />
            <span className="font-jeju absolute right-1 bottom-1 text-xs text-gray-700">{day}</span>
          </Flap>
        ))}
      </div>
    );
  },
};

// 그리드 레이아웃 (실제 사용 예시)
export const GridLayout: Omit<Story, 'args'> = {
  render: () => (
    <div className="grid max-w-xl grid-cols-5 gap-2">
      {Array.from({ length: 25 }, (_, i) => i + 1).map((day) => (
        <Flap key={day} onClick={() => console.log(`Day ${day} clicked`)}>
          <Icon number={day} size={60} />
          <span className="font-jeju absolute right-1 bottom-1 text-xs text-gray-700">{day}</span>
        </Flap>
      ))}
    </div>
  ),
  parameters: {
    layout: 'centered',
  },
};

// 다양한 상태
export const States: Omit<Story, 'args'> = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <p className="mb-2 text-sm text-gray-600">Normal</p>
        <Flap onClick={() => {}}>
          <Icon number={1} />
          <span className="font-jeju absolute right-1 bottom-1 text-xs text-gray-700">1</span>
        </Flap>
      </div>
      <div>
        <p className="mb-2 text-sm text-gray-600">Disabled</p>
        <Flap disabled onClick={() => {}}>
          <Icon number={2} />
          <span className="font-jeju absolute right-1 bottom-1 text-xs text-gray-700">2</span>
        </Flap>
      </div>
    </div>
  ),
};
