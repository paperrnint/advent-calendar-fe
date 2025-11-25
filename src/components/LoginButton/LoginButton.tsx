import Image from 'next/image';

import { loginConfig } from './LoginButton.constants';

interface Props {
  type: 'naver' | 'kakao';
}

export const LoginButton = ({ type }: Props) => {
  const { icon, text, style } = loginConfig[type];

  const handleLogin = () => {
    // oauth provider 로그인 화면으로 이동
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/${type}`;
  };

  return (
    <button
      onClick={handleLogin}
      className={`flex w-full cursor-pointer items-center justify-center rounded-2xl px-5 py-2 ${style} `}
    >
      <Image src={icon} alt={`${type} 로고`} width={24} height={24} className="h-6 w-6 shrink-0" />
      <span className="flex-1 p-2 text-lg font-medium">{text}</span>
    </button>
  );
};
