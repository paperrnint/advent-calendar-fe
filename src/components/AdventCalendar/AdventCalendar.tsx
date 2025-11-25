'use client';

import { useAtomValue } from 'jotai';

import { getCalendarActionProps } from './AdventCalendar.helpers';
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
  const isAuthLoading = curUser.isAuthenticated === 'unknown';
  const isOwner = curUser.isAuthenticated && curUser.uuid === pageUuid;
  const calendarActionProps = getCalendarActionProps(curUser, pageUuid);

  return (
    <div className="h-dvh max-w-md">
      <NavigationBar isAuthenticated={curUser.isAuthenticated} />

      {/* 어드벤트 캘린더 */}
      <div className="mb-4 px-4 py-2 pt-15">
        <Ribbon name={owner.name} color={owner.color} />
        <Calendar
          isDev={process.env.NODE_ENV === 'development'}
          uuid={pageUuid}
          isAuthLoading={isAuthLoading}
          isOwner={isOwner}
          ownerName={owner.name}
        />
      </div>

      {/* actions */}
      <div className="flex items-center justify-center p-4">
        <CalendarAction {...calendarActionProps} />
      </div>
    </div>
  );
};
