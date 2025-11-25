import { CALENDAR_CONFIG } from '@/components/Calendar/Calendar.constants';
import { CalendarDay } from '@/components/Calendar/Calendar.types';

export const generateCalendarDays = (): CalendarDay[] => {
  return Array.from({ length: CALENDAR_CONFIG.TOTAL_DAYS }, (_, i) => {
    const day = i + 1;
    const paddedMonth = String(CALENDAR_CONFIG.MONTH).padStart(2, '0');
    const paddedDay = String(day).padStart(2, '0');

    return {
      date: `${CALENDAR_CONFIG.YEAR}-${paddedMonth}-${paddedDay}`,
      day,
    };
  });
};
