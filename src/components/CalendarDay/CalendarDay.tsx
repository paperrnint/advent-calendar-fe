import { memo } from 'react';

import { Flap } from '../Flap/Flap';
import { Icon } from '../Icon/Icon';
import { LetterCountBadge } from '../LetterCountBadge/LetterCountBadge';

interface Props {
  day: number;
  isDisabled: boolean;
  letterCount: number;
  showBadge: boolean;
  onDayClick: (day: number) => void;
}

export const CalendarDay = memo(
  ({ day, isDisabled, letterCount, showBadge, onDayClick }: Props) => {
    return (
      <Flap disabled={isDisabled} onClick={() => onDayClick(day)} aria-label={`12월 ${day}일`}>
        <Icon number={day} />
        <span className="font-jeju absolute right-1 bottom-1 text-xs">{day}</span>
        {showBadge && <LetterCountBadge count={letterCount} />}
      </Flap>
    );
  },
);

CalendarDay.displayName = 'CalendarDay';
