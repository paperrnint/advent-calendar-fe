'use client';

import { useState } from 'react';

import { Flap } from '../Flap/Flap';
import { Icon } from '../Icon/Icon';
import { Info } from '../Info/Info';
import { Modal } from '../Modal/Modal';
import { WriteLetter } from '../WriteLetter/WriteLetter';
import { isBefore } from '@/utils/dayjs';
import { CALENDAR_INFO_MESSAGES } from './Calendar.constants';

interface Props {
  today: string;
  isOwner: boolean;
  ownerName: string;
}

export const Calendar = ({ today, isOwner, ownerName }: Props) => {
  const [openDay, setOpenDay] = useState<number | null>(null);

  const days = Array.from({ length: 25 }, (_, i) => ({
    date: `2025-12-${i + 1}`,
    day: i + 1,
  }));

  const messages = isOwner ? CALENDAR_INFO_MESSAGES.owner : CALENDAR_INFO_MESSAGES.guest;

  const isDayDisabled = (date: string) => {
    const isDateFuture = isBefore(date, today);
    return isOwner ? isDateFuture : !isDateFuture;
  };

  const onClickDay = (day: number) => {
    setOpenDay(day);
  };

  const onCloseModal = () => {
    setOpenDay(null);
  };

  return (
    <div className="bg-background-beige rounded-lg p-4">
      <div className="mb-4">
        <Info>
          <p className="text-center">{messages.title}</p>
          <p className="text-center">{messages.subtitle}</p>
        </Info>
      </div>

      <div className="grid grid-cols-5 gap-2">
        {days.map(({ date, day }) => (
          <Flap key={day} disabled={isDayDisabled(date)} onClick={() => onClickDay(day)}>
            <Icon number={day} />
            <span className="font-jeju absolute right-1 bottom-1 text-xs">{day}</span>
          </Flap>
        ))}

        <Modal isOpen={openDay !== null} onClose={onCloseModal}>
          {isOwner ? (
            <div className="bg-white">@todo: 받은 편지 보기</div>
          ) : (
            <WriteLetter to={ownerName} onClose={onCloseModal} />
          )}
        </Modal>
      </div>
    </div>
  );
};
