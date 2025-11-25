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
    isAuthLoading: false,
    isOwner: true,
    ownerName: '산타',
  },
  parameters: {
    docs: {
      description: {
        story:
          '**캘린더 주인이 보는 화면** - 오늘 날짜까지만 활성화되어 미래 날짜의 편지는 볼 수 없습니다. (*NOTE: 스토리북 테스트 용으로 오늘 날짜를 2025-12-09로 지정함*)',
      },
    },
  },
};

export const GuestCalendar: Story = {
  args: {
    today: '2025-12-09',
    uuid: 'test-uuid',
    isAuthLoading: false,
    isOwner: false,
    ownerName: '산타',
  },
  parameters: {
    docs: {
      description: {
        story:
          '**게스트가 보는 화면** - 미래 날짜만 활성화되어, 오늘을 포함한 과거 날짜에는 편지를 작성할 수 없습니다. (*NOTE: 스토리북 테스트 용으로 오늘 날짜를 2025-12-09로 지정함*)',
      },
    },
  },
};

export const DevOwnerCalendar: Story = {
  args: {
    isDev: true,
    today: '2025-12-09',
    uuid: 'test-uuid',
    isAuthLoading: false,
    isOwner: true,
    ownerName: '산타',
  },
  parameters: {
    docs: {
      description: {
        story:
          '**캘린더 주인이 보는 화면 (Dev 환경)** - 개발 환경에서는 모든 날짜를 활성화하여 테스트할 수 있습니다.',
      },
    },
  },
};

export const DevGuestCalendar: Story = {
  args: {
    isDev: true,
    today: '2025-12-09',
    uuid: 'test-uuid',
    isAuthLoading: false,
    isOwner: false,
    ownerName: '산타',
  },
  parameters: {
    docs: {
      description: {
        story:
          '**게스트가 보는 화면 (Dev 환경)** - 개발 환경에서는 모든 날짜를 활성화하여 테스트할 수 있습니다.',
      },
    },
  },
};

export const RealDateOwnerCalendar: Story = {
  args: {
    uuid: 'test-uuid',
    isAuthLoading: false,
    isOwner: true,
    ownerName: '산타',
  },
  parameters: {
    docs: {
      description: {
        story:
          '**캘린더 주인이 보는 화면 (실제 날짜)** - 실제 날짜를 적용한 캘린더 주인이 보는 화면입니다.',
      },
    },
  },
};

export const RealDateGuestCalendar: Story = {
  args: {
    uuid: 'test-uuid',
    isAuthLoading: false,
    isOwner: false,
    ownerName: '산타',
  },
  parameters: {
    docs: {
      description: {
        story: '**게스트가 보는 화면 (실제 날짜)** - 실제 날짜를 적용한 게스트가 보는 화면입니다.',
      },
    },
  },
};

export const LoadingCalendar: Story = {
  args: {
    uuid: 'test-uuid',
    isAuthLoading: true,
    isOwner: false,
    ownerName: '산타',
  },
};
