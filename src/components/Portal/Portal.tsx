'use client';

import ReactDOM from 'react-dom';
import { useEffect, useState } from 'react';

interface Props {
  children: React.ReactNode;
}

export const Portal = ({ children }: Props) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 마운트되기 전에는 렌더링하지 않음
  if (!mounted) {
    return null;
  }

  // 브라우저 환경
  const element = document.getElementById('portal');

  if (!element) {
    console.error('Portal element (#portal) not found');
    return null;
  }

  return ReactDOM.createPortal(children, element);
};
