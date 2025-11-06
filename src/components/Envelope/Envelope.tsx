'use client';

import { createContext, useContext, useState } from 'react';
import { Icon } from '../Icon/Icon';
import Image from 'next/image';
import { envelopeContentStyles } from './Envelope.constants';

interface EnvelopeContextType {
  isOpen: boolean;
  isExpanded: boolean;
  toggleOpen: () => void;
  expand: () => void;
  close: () => void;
}

const EnvelopeContext = createContext<EnvelopeContextType | undefined>(undefined);

const useEnvelope = () => {
  const context = useContext(EnvelopeContext);
  if (!context) {
    throw new Error('Envelope components must be used within EnvelopeContainer');
  }
  return context;
};

interface Props {
  children: React.ReactNode;
}

const EnvelopeContainer = ({ children }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleOpen = () => {
    setIsOpen((prev) => {
      if (prev) {
        setIsExpanded(false);
        return false;
      } else {
        return true;
      }
    });
  };

  const expand = () => {
    setIsExpanded(true);
  };

  const close = () => {
    setIsExpanded(false);
    setIsOpen(false);
  };

  return (
    <EnvelopeContext.Provider value={{ isOpen, isExpanded, toggleOpen, expand, close }}>
      <div className="bg-letter-300 relative h-56 w-80 shadow-lg" style={{ perspective: '1000px' }}>
        {children}
      </div>
    </EnvelopeContext.Provider>
  );
};

const EnvelopeContent = ({ children }: { children: React.ReactNode }) => {
  const { isExpanded } = useEnvelope();

  return (
    <span
      className="absolute left-1/2 w-72"
      style={isExpanded ? envelopeContentStyles.expanded : envelopeContentStyles.collapsed}
    >
      {children}
    </span>
  );
};

const EnvelopeEnvelope = () => {
  const { isOpen, isExpanded, toggleOpen, close, expand } = useEnvelope();

  const clickHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isOpen) {
      toggleOpen();
    } else if (!isExpanded) {
      expand();
    } else {
      close();
    }
  };

  const toggle = (e: React.MouseEvent) => {
    toggleOpen();
  };

  return (
    <div className="relative" style={{ zIndex: 10 }}>
      {/* 봉투 body */}
      <button className="relative" style={{ zIndex: 15 }} onClick={clickHandler}>
        <Image priority src="/svg/envelope-body.svg" alt="편지봉투" width={320} height={224} />
      </button>
      {/* 뚜껑 */}
      <button
        className="absolute transition-all duration-400 ease-out"
        style={{
          top: 0,
          left: 0,
          transformOrigin: '160px 0px',
          transform: isOpen ? 'rotateX(180deg)' : 'rotateX(0deg)',
          transformStyle: 'preserve-3d',
          zIndex: 15,
        }}
        onClick={toggle}
      >
        <Image priority src="/svg/envelope-top.svg" alt="편지봉투" width={320} height={224} />
      </button>
    </div>
  );
};

const EnvelopeSeal = ({ day }: { day: number }) => {
  return (
    <span className="absolute top-24 left-1/2 -translate-x-1/2" style={{ zIndex: 30 }}>
      <Icon number={day} size={68} />
    </span>
  );
};

export const Envelope = {
  Container: EnvelopeContainer,
  Content: EnvelopeContent,
  Envelope: EnvelopeEnvelope,
  Seal: EnvelopeSeal,
};
