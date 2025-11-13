'use client';

import { userAtom } from '@/stores/authStore';
import { UserData } from '@/types/data';
import { useAtomValue } from 'jotai';
import { Ribbon } from '../Ribbon/Ribbon';
import { Calendar } from '../Calendar/Calendar';
import { ShareButton } from '../ShareButton/ShareButton';
import { LinkButton } from '../LinkButton/LinkButton';

interface Props {
  owner: UserData;
  pageUuid: string;
}

export const AdventCalendar = ({ owner, pageUuid }: Props) => {
  const curUser = useAtomValue(userAtom);
  const isOwner = curUser.isAuthenticated && curUser.uuid === pageUuid;

  console.log(curUser);

  return (
    <div className="h-dvh max-w-md">
      {/* 어드벤트 캘린더 */}
      <div className="mb-4 px-4">
        <Ribbon name={owner.name} color={owner.color} />
        <Calendar today="2025-12-09" isOwner={isOwner} ownerName={owner.name} />
      </div>

      {/* actions */}
      <div className="flex items-center justify-center p-4">
        {isOwner ? <ShareButton /> : <LinkButton href="/">내 어드벤트 캘린더 만들기</LinkButton>}
      </div>
    </div>
  );
};
