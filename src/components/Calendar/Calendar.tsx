'use client';

import { useState } from 'react';

import { Flap } from '../Flap/Flap';
import { Icon } from '../Icon/Icon';
import { Info } from '../Info/Info';
import { Modal } from '../Modal/Modal';
import { WriteLetter } from '../WriteLetter/WriteLetter';
import { isBefore } from '@/utils/dayjs';
import { CALENDAR_INFO_MESSAGES } from './Calendar.constants';
import { Envelope } from '../Envelope/Envelope';
import { LetterCarousel } from '../LetterCarousel/LetterCarousel';
import { LETTERS } from '@/constants';

interface Props {
  uuid: string;
  today: string;
  isOwner: boolean;
  ownerName: string;
  hideInfo?: boolean;
  hideDay?: boolean;
}

export const Calendar = ({
  uuid,
  today,
  isOwner,
  ownerName,
  hideInfo = false,
  hideDay = false,
}: Props) => {
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
      {!hideInfo && (
        <div className="mb-4">
          <Info>
            <p className="text-center">{messages.title}</p>
            <p className="text-center">{messages.subtitle}</p>
          </Info>
        </div>
      )}

      <div className="grid grid-cols-5 gap-2">
        {days.map(({ date, day }) => (
          <Flap key={day} disabled={isDayDisabled(date)} onClick={() => onClickDay(day)}>
            <Icon number={day} />
            {!hideDay && <span className="font-jeju absolute right-1 bottom-1 text-xs">{day}</span>}
          </Flap>
        ))}

        <Modal isOpen={openDay !== null} onClose={onCloseModal}>
          {isOwner ? (
            <Envelope.Container>
              <Envelope.Content>
                {/* 여러 편지가 있는 경우 */}
                <LetterCarousel letters={LETTERS} />
              </Envelope.Content>
              <Envelope.Envelope />
              <Envelope.Seal day={openDay || 1} />
            </Envelope.Container>
          ) : (
            <WriteLetter to={ownerName} day={openDay || 1} uuid={uuid} onClose={onCloseModal} />
          )}
        </Modal>
      </div>
    </div>
  );
};
