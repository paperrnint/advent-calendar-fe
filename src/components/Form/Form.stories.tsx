import type { Meta, StoryObj } from '@storybook/react';
import { Form } from './Form';
import { useState } from 'react';
import { Palette } from '../Palette/Palette';

const meta = {
  title: 'Components/Form',
  component: Form.Container,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Form.Container>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Omit<Story, 'args'> = {
  render: () => {
    const [text, setText] = useState('');
    return (
      <Form.Container>
        <Form.Header>
          <Form.Title>제목</Form.Title>
          <Form.Subtitle>부제목</Form.Subtitle>
        </Form.Header>
        <Form.Form>
          <Form.Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onClear={() => setText('')}
          />
          <Form.Action>
            <Form.Cancel />
            <Form.Confirm />
          </Form.Action>
        </Form.Form>
      </Form.Container>
    );
  },
};

export const FixedWidth: Omit<Story, 'args'> = {
  render: () => {
    const [text, setText] = useState('');
    return (
      <div className="w-sm">
        <Form.Container>
          <Form.Header>
            <Form.Title>제목</Form.Title>
            <Form.Subtitle>부제목</Form.Subtitle>
          </Form.Header>
          <Form.Form>
            <Form.Input
              value={text}
              onChange={(e) => setText(e.target.value)}
              onClear={() => setText('')}
            />
            <Form.Action>
              <Form.Cancel />
              <Form.Confirm />
            </Form.Action>
          </Form.Form>
        </Form.Container>
      </div>
    );
  },
};

export const NameForm: Omit<Story, 'args'> = {
  render: () => {
    const [text, setText] = useState('');
    return (
      <div className="w-sm">
        <Form.Container>
          <Form.Header>
            <Form.Subtitle>
              얼마 남지 않은 크리스마스, 크리스마스를 기다리며 산타가 특별한 선물을 준비했어요 🎁
            </Form.Subtitle>
            <Form.Title>당신의 이름은?</Form.Title>
          </Form.Header>
          <Form.Form>
            <Form.InlineContainer>
              <Form.Input
                value={text}
                placeholder="이름 (1-10자)"
                onChange={(e) => setText(e.target.value)}
                onClear={() => setText('')}
              />
              <Form.Confirm></Form.Confirm>
            </Form.InlineContainer>
          </Form.Form>
        </Form.Container>
      </div>
    );
  },
};

export const ColorForm: Omit<Story, 'args'> = {
  render: () => {
    const [text, setText] = useState('');
    return (
      <div className="w-sm">
        <Form.Container>
          <Form.Header>
            <Form.Subtitle>
              얼마 남지 않은 크리스마스, 크리스마스를 기다리며 산타가 특별한 선물을 준비했어요 🎁
            </Form.Subtitle>
            <Form.Title>마음에 드는 색은?</Form.Title>
          </Form.Header>
          <Form.Form>
            <div className="mx-auto mb-8 w-68">
              <Palette />
            </div>
            <Form.Action>
              <Form.Cancel>이전</Form.Cancel>
              <Form.Confirm>확인</Form.Confirm>
            </Form.Action>
          </Form.Form>
        </Form.Container>
      </div>
    );
  },
};
