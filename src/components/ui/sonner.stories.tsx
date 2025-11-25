import { toast } from 'sonner';

import type { Meta, StoryObj } from '@storybook/nextjs';

import { Toaster } from './sonner';

const meta = {
  title: 'UI/Toaster',
  component: Toaster,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Toaster>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div>
      <Toaster />

      <div className="flex gap-2">
        <button onClick={() => toast.success('작업 성공!')}>Success</button>
        <button onClick={() => toast.error('오류가 발생했어요')}>Error</button>
        <button onClick={() => toast.info('설명글을 작성할 수 있어요')}>Info</button>
        <button onClick={() => toast.warning('위험한 작업에 사용할 수 있어요')}>Warning</button>
        <button
          onClick={() =>
            toast.promise(new Promise((resolve) => setTimeout(() => resolve('Loaded!'), 1500)), {
              loading: 'Loading...',
              success: 'Done!',
              error: 'Something went wrong',
            })
          }
        >
          Loading
        </button>
      </div>
    </div>
  ),
};
