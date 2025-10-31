import type { Meta, StoryObj } from '@storybook/react';
import { Form } from './Form';
import { useState } from 'react';
import { Palette } from '../Palette/Palette';
import { RibbonColor } from '@/constants';

const meta = {
  title: 'Components/Form',
  component: Form.Container,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-sm">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Form.Container>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 폼
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
            placeholder="입력해주세요"
          />
          <Form.Action>
            <Form.Cancel />
            <Form.Confirm disabled={text.trim().length === 0} />
          </Form.Action>
        </Form.Form>
      </Form.Container>
    );
  },
};

// 인라인 입력 폼
export const InlineInput: Omit<Story, 'args'> = {
  render: () => {
    const [text, setText] = useState('');
    return (
      <Form.Container>
        <Form.Header>
          <Form.Title>인라인 입력 폼</Form.Title>
          <Form.Subtitle>입력창과 버튼이 한 줄에 있습니다</Form.Subtitle>
        </Form.Header>
        <Form.Form>
          <Form.InlineContainer>
            <Form.Input
              value={text}
              placeholder="텍스트 입력"
              onChange={(e) => setText(e.target.value)}
              onClear={() => setText('')}
            />
            <Form.Confirm disabled={text.trim().length === 0} />
          </Form.InlineContainer>
        </Form.Form>
      </Form.Container>
    );
  },
};

// 이름 입력 폼 (실제 사용 케이스)
export const NameForm: Omit<Story, 'args'> = {
  render: () => {
    const [name, setName] = useState('');
    const MAX_NAME_LENGTH = 10;

    const updateName = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newName = e.target.value;
      const regex = /^[ㄱ-ㅎ가-힣a-zA-Z0-9\s]*$/;

      if (regex.test(newName) && newName.length <= MAX_NAME_LENGTH) {
        setName(newName);
      }
    };

    return (
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
              value={name}
              placeholder="이름 (1-10자)"
              onChange={updateName}
              onClear={() => setName('')}
            />
            <Form.Confirm disabled={name.trim().length === 0} />
          </Form.InlineContainer>
        </Form.Form>
      </Form.Container>
    );
  },
};

// 색상 선택 폼
export const ColorForm: Omit<Story, 'args'> = {
  render: () => {
    const [color, setColor] = useState<RibbonColor | null>(null);

    return (
      <Form.Container>
        <Form.Header>
          <Form.Subtitle>
            얼마 남지 않은 크리스마스, 크리스마스를 기다리며 산타가 특별한 선물을 준비했어요 🎁
          </Form.Subtitle>
          <Form.Title>마음에 드는 색은?</Form.Title>
        </Form.Header>
        <Form.Form>
          <div className="mx-auto mb-8 w-68">
            <Palette onUpdate={setColor} initialColor={color || undefined} />
          </div>
          <Form.Action>
            <Form.Cancel>이전</Form.Cancel>
            <Form.Confirm disabled={!color}>확인</Form.Confirm>
          </Form.Action>
        </Form.Form>
      </Form.Container>
    );
  },
};

// 비활성화 상태
export const DisabledState: Omit<Story, 'args'> = {
  render: () => (
    <Form.Container>
      <Form.Header>
        <Form.Title>비활성화 상태</Form.Title>
        <Form.Subtitle>버튼이 비활성화된 상태입니다</Form.Subtitle>
      </Form.Header>
      <Form.Form>
        <Form.Input value="" onChange={() => {}} placeholder="입력 불가" disabled />
        <Form.Action>
          <Form.Cancel disabled>이전</Form.Cancel>
          <Form.Confirm disabled>확인</Form.Confirm>
        </Form.Action>
      </Form.Form>
    </Form.Container>
  ),
};

// 개별 컴포넌트 테스트
export const OnlyButtons: Omit<Story, 'args'> = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <Form.Confirm />
        <Form.Cancel />
      </div>
      <div className="flex gap-2">
        <Form.Confirm disabled />
        <Form.Cancel disabled />
      </div>
    </div>
  ),
};

// 입력창만
export const OnlyInput: Omit<Story, 'args'> = {
  render: () => {
    const [text, setText] = useState('');
    return (
      <Form.Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onClear={() => setText('')}
        placeholder="입력창만 표시"
      />
    );
  },
};
