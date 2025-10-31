'use client';

import { Calendar } from '@/components/Calendar/Calendar';
import { NewButton } from '@/components/NewButton/NewButton';
import { Ribbon } from '@/components/Ribbon/Ribbon';
import { ShareButton } from '@/components/ShareButton/ShareButton';
import { USERNAME } from '@/constants';

export default function AdventCalendarPage() {
  return (
    <div className="h-dvh max-w-md">
      {/* 어드벤트 캘린더 */}
      <div className="mb-4 px-4">
        <Ribbon name={USERNAME} color="green" />
        <Calendar today="2025-12-09" isOwner={true} ownerName="산타" />
      </div>

      {/* 본인 페이지 아닐 때 */}
      <div className="flex items-center justify-center p-4">
        <NewButton>내 어드벤트 캘린더 만들기</NewButton>
      </div>

      {/* 본인 페이지 일 때 */}
      <div className="flex items-center justify-center p-4">
        <ShareButton />
      </div>
    </div>
  );
}
