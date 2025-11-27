import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/nextjs';

import { DeleteDialog } from './DeleteDialog';
import { QueryProvider } from '../QueryProvider/QueryProvider';

const meta = {
  title: 'Components/DeleteDialog',
  component: DeleteDialog,
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/',
        query: {},
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <QueryProvider>
        <div className="flex min-h-[400px] items-center justify-center">
          <Story />
        </div>
      </QueryProvider>
    ),
  ],
} satisfies Meta<typeof DeleteDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Omit<Story, 'args'> = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div>
        <button onClick={() => setOpen(true)} className="rounded-lg bg-neutral-100 px-4 py-2">
          탈퇴하기 버튼
        </button>
        <DeleteDialog open={open} onOpenChange={setOpen} />
      </div>
    );
  },
};
