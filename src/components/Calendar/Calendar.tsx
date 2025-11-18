'use client';

import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { CALENDAR_INFO_MESSAGES } from './Calendar.constants';
import { Envelope } from '../Envelope/Envelope';
import { Flap } from '../Flap/Flap';
import { Icon } from '../Icon/Icon';
import { Info } from '../Info/Info';
import { LetterCarousel } from '../LetterCarousel/LetterCarousel';
import { Modal } from '../Modal/Modal';
import { WriteLetter } from '../WriteLetter/WriteLetter';
import { useLetters } from '@/hooks/useLetters';
import { isBefore } from '@/utils/dayjs';

type BaseProps = {
  today?: string;
  isOwner: boolean;
  ownerName: string;
  isDev?: boolean;
};

type PreviewProps = BaseProps & {
  hideInfo: true;
  hideDay: true;
  uuid?: never;
};

type RealProps = BaseProps & {
  uuid: string;
  hideInfo?: boolean;
  hideDay?: boolean;
};

type Props = PreviewProps | RealProps;

export const Calendar = (props: Props) => {
  const { isOwner, ownerName } = props;
  const isDev = props.isDev || false;
  const today = props.today || dayjs().format('YYYY-MM-DD');
  const hideInfo = 'hideInfo' in props ? props.hideInfo : false;
  const hideDay = 'hideDay' in props ? props.hideDay : false;
  const uuid = 'uuid' in props ? props.uuid : undefined;

  const [openDay, setOpenDay] = useState<number | null>(null);
  const {
    data: letters,
    isLoading,
    isError,
    error,
  } = useLetters({
    uuid: uuid || '',
    day: openDay || 1,
    enabled: !!uuid && isOwner && openDay !== null,
  });

  const days = Array.from({ length: 25 }, (_, i) => ({
    date: `2025-12-${i + 1}`,
    day: i + 1,
  }));

  const messages = isOwner ? CALENDAR_INFO_MESSAGES.owner : CALENDAR_INFO_MESSAGES.guest;

  const isDayDisabled = (date: string) => {
    // dev 환경에서는 항상 enabled
    if (isDev) {
      return false;
    }

    const isDateFuture = isBefore(date, today);
    return isOwner ? isDateFuture : !isDateFuture;
  };

  const onClickDay = (day: number) => {
    if (!uuid) return;
    setOpenDay(day);
  };

  const onCloseModal = () => {
    setOpenDay(null);
  };

  useEffect(() => {
    if (isError && error) {
      toast.error('편지를 불러오는데 실패했습니다');
    }
  }, [isError, error]);

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
                <LetterCarousel letters={letters} isLoading={isLoading} />
              </Envelope.Content>
              <Envelope.Envelope />
              <Envelope.Seal day={openDay || 1} />
            </Envelope.Container>
          ) : (
            uuid && (
              <WriteLetter to={ownerName} day={openDay || 1} uuid={uuid} onClose={onCloseModal} />
            )
          )}
        </Modal>
      </div>
    </div>
  );
};
