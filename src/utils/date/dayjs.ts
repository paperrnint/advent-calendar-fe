import dayjs from '../../lib/dayjs';

export const isBefore = (
  targetDate: string | Date | dayjs.Dayjs,
  baseDate?: string | Date | dayjs.Dayjs,
) => {
  const target = dayjs(targetDate);
  const base = baseDate ? dayjs(baseDate) : dayjs();

  return base.isBefore(target);
};

export const isDayDisabled = (
  date: string,
  today: string,
  isOwner: boolean,
  isDev: boolean = false,
): boolean => {
  if (isDev) {
    return false;
  }

  const isDateFuture = isBefore(date, today);
  return isOwner ? isDateFuture : !isDateFuture;
};
