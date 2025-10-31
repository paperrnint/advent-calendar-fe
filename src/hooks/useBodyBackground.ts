import { useEffect } from 'react';

export const useBodyBackground = (color: string) => {
  useEffect(() => {
    document.body.style.backgroundColor = color;

    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);
};
