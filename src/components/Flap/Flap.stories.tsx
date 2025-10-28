import type { Meta, StoryObj } from '@storybook/react';
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
        <div className="font-jeju absolute right-1 bottom-1 text-xs text-gray-700">1</div>
      </>
    ),
  },
};

// 모든 Flap 보기 (1-25)
export const AllFlaps: Story = {
  render: () => (
    <div className="grid grid-cols-5 gap-4 p-8">
      {Array.from({ length: 25 }, (_, i) => i + 1).map((day) => (
        <Flap key={day} onClick={() => console.log(`Day ${day} clicked`)}>
          <Icon number={day} />
          <div className="font-jeju absolute right-1 bottom-1 text-xs text-gray-700">{day}</div>
        </Flap>
      ))}
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

// 클릭 인터랙션 테스트
export const Interactive: Story = {
  render: () => {
    const handleClick = (day: number) => {
      alert(`Day ${day} clicked!`);
    };

    return (
      <div className="flex gap-4">
        {[1, 12, 25].map((day) => (
          <Flap key={day} onClick={() => handleClick(day)}>
            <Icon number={day} />
            <div className="font-jeju absolute right-1 bottom-1 text-xs text-gray-700">{day}</div>
          </Flap>
        ))}
      </div>
    );
  },
};

// 그리드 레이아웃 (실제 사용 예시)
export const GridLayout: Story = {
  render: () => (
    <div className="grid max-w-xl grid-cols-5 gap-2">
      {Array.from({ length: 25 }, (_, i) => i + 1).map((day) => (
        <Flap key={day} onClick={() => console.log(`Day ${day} clicked`)}>
          <Icon number={day} size={60} />
          <div className="font-jeju absolute right-1 bottom-1 text-xs text-gray-700">{day}</div>
        </Flap>
      ))}
    </div>
  ),
  parameters: {
    layout: 'centered',
  },
};

// 다양한 상태 (hover, active 등 확인용)
export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <p className="mb-2 text-sm text-gray-600">Normal</p>
        <Flap onClick={() => {}}>
          <Icon number={1} />
          <div className="font-jeju absolute right-1 bottom-1 text-xs text-gray-700">1</div>
        </Flap>
      </div>
      <div>
        <p className="mb-2 text-sm text-gray-600">Opened</p>
        <Flap isOpened onClick={() => {}}>
          <Icon number={2} />
          <div className="font-jeju absolute right-1 bottom-1 text-xs text-gray-700">2</div>
        </Flap>
      </div>
    </div>
  ),
};
