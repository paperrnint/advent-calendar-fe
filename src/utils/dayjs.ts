import dayjs from '../lib/dayjs';

/**
 *
 * @param targetDate 타겟 날짜 (string 은 'YYYY-MM-DD', 'YYYY-MM-DD HH:mm:ss' 형식)
 * @param baseDate 없으면 오늘 기준 (string 은 'YYYY-MM-DD', 'YYYY-MM-DD HH:mm:ss' 형식)
 * @returns baseDate 로부터 targetDate 차이 (baseDate가 targetDate보다 나중이거나 같으면 null)
 */
export const getRelativeTimeFrom = (
  targetDate: string | Date | dayjs.Dayjs,
  baseDate?: string | Date | dayjs.Dayjs,
) => {
  const target = dayjs(targetDate);
  const base = baseDate ? dayjs(baseDate) : dayjs();

  if (base.isAfter(target) || base.isSame(target)) {
    return null;
  }

  return target.from(base);
};

export const isBefore = (
  targetDate: string | Date | dayjs.Dayjs,
  baseDate?: string | Date | dayjs.Dayjs,
) => {
  const target = dayjs(targetDate);
  const base = baseDate ? dayjs(baseDate) : dayjs();

  return base.isBefore(target);
};
