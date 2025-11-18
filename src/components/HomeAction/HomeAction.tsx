'use client';

import { useAtomValue } from 'jotai';

import { LinkButton } from '../LinkButton/LinkButton';
import { LoginButton } from '../LoginButton/LoginButton';
import { userAtom } from '@/stores/authStore';

export const HomeAction = () => {
  const { uuid, isAuthenticated } = useAtomValue(userAtom);

  if (isAuthenticated && uuid) {
    return (
      <div className="flex items-center justify-center pb-10">
        <LinkButton href={`/${uuid}`}>내 어드벤트 캘린더로 이동</LinkButton>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3" aria-label="로그인 버튼">
      <LoginButton type="naver" />
      <LoginButton type="kakao" />
    </div>
  );
};
