import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Modal } from './Modal';
import { Flap } from '../Flap/Flap';
import { Icon } from '../Icon/Icon';
import { WriteLetter } from '../WriteLetter/WriteLetter';

const meta = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: '모달 열림/닫힘 상태',
    },
    onClose: {
      action: 'closed',
      description: '모달 닫기 함수',
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 모달
export const Default: Omit<Story, 'args'> = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    const btnClass = 'rounded-xl bg-neutral-100 px-3 py-2 text-sm hover:bg-neutral-200';

    return (
      <div className="p-8">
        {/* Trigger */}
        <button onClick={() => setIsOpen(true)} className={btnClass}>
          모달 열기
        </button>
        {/* Modal */}
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <div className="rounded-lg bg-white p-6">
            <h2 className="pb-2">테스트 용 기본 모달</h2>
            <button onClick={() => setIsOpen(false)} className={btnClass}>
              닫기
            </button>
          </div>
        </Modal>
      </div>
    );
  },
};

export const LetterModal: Omit<Story, 'args'> = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="p-8">
        {/* Trigger */}
        <Flap onClick={() => setIsOpen(true)}>
          <Icon number={15} />
        </Flap>
        {/* Modal */}
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <WriteLetter to="산타" onClose={() => setIsOpen(false)} />
        </Modal>
      </div>
    );
  },
};
