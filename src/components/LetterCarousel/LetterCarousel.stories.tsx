import type { Meta, StoryObj } from '@storybook/nextjs';

import { LetterCarousel } from './LetterCarousel';

const meta = {
  title: 'Components/LetterCarousel',
  component: LetterCarousel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof LetterCarousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MultipleLetter: Story = {
  args: {
    letters: [
      {
        content: '메리크리스마스! 🎄 첫 번째 편지입니다',
        from: '산타',
        date: '2025.12.25',
      },
      {
        content: '메리크리스마스! 🎄 두 번째 편지입니다',
        from: '산타',
        date: '2025.12.25',
      },
      {
        content: '메리크리스마스! 🎄 세 번째 편지입니다',
        from: '산타',
        date: '2025.12.25',
      },
      {
        content: '메리크리스마스! 🎄 네 번째 편지입니다',
        from: '산타',
        date: '2025.12.25',
      },
      {
        content: '메리크리스마스! 🎄 다섯 번째 편지입니다',
        from: '산타',
        date: '2025.12.25',
      },
    ],
  },
};

export const SingleLetter: Story = {
  args: {
    letters: [
      {
        content:
          'Merry Christmas! 🎄\n\n크리스마스를 맞아 따뜻한 인사를 전합니다.\n올 한 해도 고생 많으셨어요. 새해에는 더 좋은 일만 가득하길 바랍니다.\n\n크리스마스를 맞아 따뜻한 인사를 전합니다.\n올 한 해도 고생 많으셨어요. 새해에는 더 좋은 일만 가득하길 바랍니다.',
        from: '산타',
        date: '2025.12.25',
      },
    ],
  },
};

export const EmptyLetter: Story = {
  args: {
    letters: [],
  },
};

export const LoadingLetter: Story = {
  args: {
    letters: [],
    isLoading: true,
  },
};
