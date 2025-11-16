'use client';

import { useAtomValue } from 'jotai';

import { Calendar } from '../Calendar/Calendar';
import { CalendarAction } from '../CalendarAction/CalendarAction';
import { NavigationBar } from '../NavigationBar/NavigationBar';
import { Ribbon } from '../Ribbon/Ribbon';
import { userAtom } from '@/stores/authStore';
import { UserData } from '@/types/data';

interface Props {
  owner: UserData;
  pageUuid: string;
}

export const AdventCalendar = ({ owner, pageUuid }: Props) => {
  const curUser = useAtomValue(userAtom);
  const isLoggedIn = curUser.isAuthenticated;
  const isOwner = isLoggedIn && curUser.uuid === pageUuid;

  console.log(curUser);

  return (
    <div className="h-dvh max-w-md">
      <NavigationBar isAuthenticated={isLoggedIn} />

      {/* 어드벤트 캘린더 */}
      <div className="mb-4 px-4 py-2 pt-15">
        <Ribbon name={owner.name} color={owner.color} />
        <Calendar uuid={pageUuid} today="2025-12-09" isOwner={isOwner} ownerName={owner.name} />
      </div>

      {/* actions */}
      <div className="flex items-center justify-center p-4">
        <CalendarAction isLoggedIn={isLoggedIn} isOwner={isOwner} userUuid={curUser.uuid} />
      </div>
    </div>
  );
};
