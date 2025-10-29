import type { Meta, StoryObj } from '@storybook/react';
import { Letter } from './Letter';
import { useState } from 'react';

const meta = {
  title: 'Components/Letter',
  component: Letter.Container,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Letter.Container>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ReadLetter: Omit<Story, 'args'> = {
  render: () => (
    <div className="w-xs">
      <Letter.Container>
        <Letter.Content>
          Merry Christmas! 🎄
          {'\n'}
          크리스마스를 맞아 따뜻한 인사를 전합니다.
          {'\n'}올 한 해도 고생 많으셨어요. 새해에는 더 좋은 일만 가득하길 바랍니다.
        </Letter.Content>
        <Letter.Footer from="산타" date="2025.12.25" />
      </Letter.Container>
    </div>
  ),
};

export const WriteLetter: Omit<Story, 'args'> = {
  render: () => {
    const [content, setContent] = useState('');
    const [from, setFrom] = useState('');

    return (
      <div className="w-xs">
        <Letter.Container>
          <Letter.Textarea value={content} onChange={(e) => setContent(e.target.value)} rows={8} />
          <Letter.FooterInput value={from} onChange={(e) => setFrom(e.target.value)} />
        </Letter.Container>
      </div>
    );
  },
};

export const FixedHeightShortContent: Omit<Story, 'args'> = {
  render: () => (
    <div className="w-xs">
      <Letter.Container>
        <Letter.Content fixedHeight>
          Merry Christmas! 🎄
          {'\n'}
          크리스마스를 맞아 따뜻한 인사를 전합니다.
          {'\n'}올 한 해도 고생 많으셨어요. 새해에는 더 좋은 일만 가득하길 바랍니다.
        </Letter.Content>
        <Letter.Footer from="산타" date="2025.12.25" />
      </Letter.Container>
    </div>
  ),
};

export const FixedHeightLongContent: Omit<Story, 'args'> = {
  render: () => (
    <div className="w-xs">
      <Letter.Container>
        <Letter.Content fixedHeight>
          Merry Christmas! 🎄
          {'\n\n'}
          크리스마스를 맞아 따뜻한 인사를 전합니다.
          {'\n\n'}올 한 해도 고생 많으셨어요. 새해에는 더 좋은 일만 가득하길 바랍니다.
          {'\n\n'}
          Merry Christmas! 🎄
          {'\n\n'}
          크리스마스를 맞아 따뜻한 인사를 전합니다.
          {'\n\n'}올 한 해도 고생 많으셨어요. 새해에는 더 좋은 일만 가득하길 바랍니다.
          {'\n\n'}
        </Letter.Content>
        <Letter.Footer from="산타" date="2025.12.25" />
      </Letter.Container>
    </div>
  ),
};
