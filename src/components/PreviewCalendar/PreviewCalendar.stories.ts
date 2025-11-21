import type { Meta, StoryObj } from '@storybook/nextjs';

import { PreviewCalendar } from './PreviewCalendar';

const meta = {
  title: 'Components/PreviewCalendar',
  component: PreviewCalendar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PreviewCalendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
