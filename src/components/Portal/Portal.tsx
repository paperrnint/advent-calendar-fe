'use client';

import { useSyncExternalStore } from 'react';
import ReactDOM from 'react-dom';

interface Props {
  children: React.ReactNode;
}

export const Portal = ({ children }: Props) => {
  const mounted = useSyncExternalStore(
    () => () => {}, // subscribe: 아무것도 구독하지 않음
    () => true, // getSnapshot (클라이언트): 항상 true
    () => false, // getServerSnapshot (서버): 항상 false
  );

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
