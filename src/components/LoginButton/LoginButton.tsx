import Image from 'next/image';
import { loginConfig } from './LoginButton.constants';

interface Props {
  type: 'naver' | 'kakao';
}

export const LoginButton = ({ type }: Props) => {
  const { icon, text, style } = loginConfig[type];

  const handleLogin = () => {
    // @todo: 실제 로그인 구현 로직
    console.log('로그인');
  };

  return (
    <button
      onClick={handleLogin}
      className={`flex w-60 cursor-pointer items-center justify-center rounded-full px-5 py-3 ${style} `}
    >
      <Image src={icon} alt={`${type} 로고`} width={16} height={16} className="h-4 w-4 shrink-0" />
      <span className="flex-1 font-medium">{text}</span>
    </button>
  );
};
