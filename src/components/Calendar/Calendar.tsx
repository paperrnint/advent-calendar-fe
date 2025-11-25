'use client';

import dayjs from 'dayjs';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';

import { CALENDAR_INFO_MESSAGES } from './Calendar.constants';
import { CalendarProps } from './Calendar.types';
import { CalendarDay } from '../CalendarDay/CalendarDay';
import { Envelope } from '../Envelope/Envelope';
import { Info } from '../Info/Info';
import { LetterCarousel } from '../LetterCarousel/LetterCarousel';
import { Modal } from '../Modal/Modal';
import { WriteLetter } from '../WriteLetter/WriteLetter';
import { useLetterCount } from '@/hooks/useLetterCount';
import { useLetters } from '@/hooks/useLetters';
import { generateCalendarDays, isDayDisabled } from '@/utils';

export const Calendar = ({
  uuid,
  isAuthLoading,
  isOwner,
  ownerName,
  today = dayjs().format('YYYY-MM-DD'),
  isDev = false,
}: CalendarProps) => {
  const [openDay, setOpenDay] = useState<number | null>(null);
  const { data: countData } = useLetterCount({ uuid });
  const {
    data: letters,
    isLoading,
    isError,
    error,
  } = useLetters({
    uuid,
    day: openDay || 1,
    enabled: isOwner && openDay !== null,
  });

  const letterCounts = countData?.data.counts || {};
  const messages = isOwner ? CALENDAR_INFO_MESSAGES.owner : CALENDAR_INFO_MESSAGES.guest;
  const days = useMemo(() => generateCalendarDays(), []);

  const onClickDay = useCallback((day: number) => {
    setOpenDay(day);
  }, []);

  const onCloseModal = useCallback(() => {
    setOpenDay(null);
  }, []);

  useEffect(() => {
    if (isError && error) {
      toast.error('편지를 불러오는데 실패했습니다');
    }
  }, [isError, error]);

  return (
    <div className="bg-background-beige rounded-lg p-4">
      {/* info */}
      <div className="mb-4">
        <Info isLoading={isAuthLoading}>
          <p className="text-center">{messages.title}</p>
          <p className="text-center">{messages.subtitle}</p>
        </Info>
      </div>

      <div className="grid grid-cols-5 gap-2">
        {days.map(({ date, day }) => {
          const count = letterCounts[String(day)] || 0;
          const isDisabled = isDayDisabled(date, today, isOwner, isDev);
          const shouldShowBadge = !isAuthLoading && !isOwner && !isDisabled;

          return (
            <CalendarDay
              key={day}
              day={day}
              isDisabled={isDisabled}
              letterCount={count}
              showBadge={shouldShowBadge}
              onDayClick={onClickDay}
            />
          );
        })}

        <Modal isOpen={openDay !== null} onClose={onCloseModal}>
          {isOwner ? (
            <Envelope.Container>
              <Envelope.Content>
                <LetterCarousel letters={letters} isLoading={isLoading} />
              </Envelope.Content>
              <Envelope.Envelope />
              <Envelope.Seal day={openDay || 1} />
            </Envelope.Container>
          ) : (
            <WriteLetter to={ownerName} day={openDay ?? 1} uuid={uuid} onClose={onCloseModal} />
          )}
        </Modal>
      </div>
    </div>
  );
};
