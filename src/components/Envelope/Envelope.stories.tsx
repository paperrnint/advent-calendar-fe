import type { Meta, StoryObj } from '@storybook/nextjs';

import { Envelope } from './Envelope';
import { Letter } from '../Letter/Letter';

const meta = {
  title: 'Components/Envelope',
  component: Envelope.Container,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Envelope.Container>;

export default meta;
type Story = StoryObj<typeof meta>;

const SHORT_LETTER_TEXT = `Merry Christmas! 🎄

크리스마스를 맞아 따뜻한 인사를 전합니다.
올 한 해도 고생 많으셨어요. 새해에는 더 좋은 일만 가득하길 바랍니다.`;

const LONG_LETTER_TEXT = `크리스마스를 맞아 따뜻한 인사를 전합니다.
올 한 해도 고생 많으셨어요. 새해에는 더 좋은 일만 가득하길 바랍니다. Merry Christmas! 🎄

크리스마스를 맞아 따뜻한 인사를 전합니다.
올 한 해도 고생 많으셨어요. 새해에는 더 좋은 일만 가득하길 바랍니다. Merry Christmas! 🎄

크리스마스를 맞아 따뜻한 인사를 전합니다.
올 한 해도 고생 많으셨어요. 새해에는 더 좋은 일만 가득하길 바랍니다. Merry Christmas! 🎄`;

export const Default: Omit<Story, 'args'> = {
  render: () => (
    <div className="w-xs py-50">
      <Envelope.Container>
        <Envelope.Content>
          <div className="h-80 bg-white" />
        </Envelope.Content>
        <Envelope.Envelope />
        <Envelope.Seal day={1} />
      </Envelope.Container>
    </div>
  ),
};

export const WithLetter: Omit<Story, 'args'> = {
  render: () => (
    <div className="w-xs py-50">
      <Envelope.Container>
        <Envelope.Content>
          <Letter.Container>
            <Letter.Content fixedHeight>{SHORT_LETTER_TEXT}</Letter.Content>
            <Letter.Footer from="산타" date="2025.12.25" />
          </Letter.Container>
        </Envelope.Content>
        <Envelope.Envelope />
        <Envelope.Seal day={9} />
      </Envelope.Container>
    </div>
  ),
};

export const WithLongLetter: Omit<Story, 'args'> = {
  render: () => (
    <div className="w-xs py-50">
      <Envelope.Container>
        <Envelope.Content>
          <Letter.Container>
            <Letter.Content fixedHeight>{LONG_LETTER_TEXT}</Letter.Content>
            <Letter.Footer from="산타" date="2025.12.25" />
          </Letter.Container>
        </Envelope.Content>
        <Envelope.Envelope />
        <Envelope.Seal day={9} />
      </Envelope.Container>
    </div>
  ),
};
