import { LinkButton } from '../LinkButton/LinkButton';
import { ShareButton } from '../ShareButton/ShareButton';

interface Props {
  isLoggedIn: boolean;
  isOwner: boolean;
  userUuid: string | null;
}

export const CalendarAction = ({ isLoggedIn, isOwner, userUuid }: Props) => {
  // 로그인 되어 있지 않음 -> 회원가입/로그인 페이지로
  if (!isLoggedIn) {
    return <LinkButton href="/">내 어드벤트 캘린더 만들기</LinkButton>;
  }

  // 로그인 되어 있는 캘린더 주인 -> 공유 버튼
  if (isOwner) {
    return <ShareButton />;
  }

  // 로그인 되어 있는 캘린더 손님 -> 본인 페이지로
  return <LinkButton href={`/${userUuid}`}>내 어드벤트 캘린더로 이동</LinkButton>;
};
