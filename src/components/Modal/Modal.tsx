import { useEffect } from 'react';

import { Portal } from '../Portal/Portal';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal = ({ isOpen, onClose, children }: Props) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <Portal>
      <div className="fixed inset-0 z-10 flex items-center justify-center">
        <div className="absolute inset-0 bg-neutral-900/50 backdrop-blur-sm" onClick={onClose} />
        <div className="z-20 w-xs">{children}</div>
      </div>
    </Portal>
  );
};
