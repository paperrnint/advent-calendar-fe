'use client';

import { useRefreshFailed } from '@/hooks/useRefreshFailed';
import { useRestoreAuth } from '@/hooks/useRestoreAuth';

interface Props {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const { isLoading } = useRestoreAuth();
  useRefreshFailed();

  if (isLoading) {
    console.log('유저 로그인 정보 가져오는 중..');
  }

  return <>{children}</>;
};
