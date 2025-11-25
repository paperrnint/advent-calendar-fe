import dayjs from 'dayjs';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { isBefore, isDayDisabled } from './dayjs';

describe('dayjs utils', () => {
  describe('isBefore', () => {
    beforeEach(() => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date('2025-12-15'));
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('baseDate가 targetDate보다 이전이면 true를 반환한다', () => {
      const result = isBefore('2025-12-20', '2025-12-15');
      expect(result).toBe(true);
    });

    it('baseDate가 targetDate보다 나중이면 false를 반환한다', () => {
      const result = isBefore('2025-12-10', '2025-12-15');
      expect(result).toBe(false);
    });

    it('baseDate와 targetDate가 같으면 false를 반환한다', () => {
      const result = isBefore('2025-12-15', '2025-12-15');
      expect(result).toBe(false);
    });

    it('baseDate가 없으면 오늘 기준으로 비교한다', () => {
      const futureResult = isBefore('2025-12-20');
      const pastResult = isBefore('2025-12-10');
      const todayResult = isBefore('2025-12-15');

      expect(futureResult).toBe(true);
      expect(pastResult).toBe(false);
      expect(todayResult).toBe(false);
    });

    it('Date 객체를 인자로 받을 수 있다', () => {
      const targetDate = new Date('2025-12-20');
      const baseDate = new Date('2025-12-15');
      const result = isBefore(targetDate, baseDate);
      expect(result).toBe(true);
    });

    it('dayjs 객체를 인자로 받을 수 있다', () => {
      const targetDate = dayjs('2025-12-20');
      const baseDate = dayjs('2025-12-15');
      const result = isBefore(targetDate, baseDate);
      expect(result).toBe(true);
    });
  });

  describe('isDayDisabled', () => {
    it('dev 환경에서는 항상 false를 반환한다', () => {
      expect(isDayDisabled('2025-12-25', '2025-12-01', true, true)).toBe(false);
      expect(isDayDisabled('2025-12-01', '2025-12-25', true, true)).toBe(false);
      expect(isDayDisabled('2025-12-25', '2025-12-01', false, true)).toBe(false);
      expect(isDayDisabled('2025-12-01', '2025-12-25', false, true)).toBe(false);
    });

    describe('owner인 경우', () => {
      it('미래 날짜는 disabled (true)를 반환한다', () => {
        const result = isDayDisabled('2025-12-25', '2025-12-20', true, false);
        expect(result).toBe(true);
      });

      it('과거 날짜는 enabled (false)를 반환한다', () => {
        const result = isDayDisabled('2025-12-15', '2025-12-20', true, false);
        expect(result).toBe(false);
      });

      it('같은 날짜는 enabled (false)를 반환한다', () => {
        const result = isDayDisabled('2025-12-20', '2025-12-20', true, false);
        expect(result).toBe(false);
      });
    });

    describe('guest인 경우', () => {
      it('과거 날짜는 disabled (true)를 반환한다', () => {
        const result = isDayDisabled('2025-12-15', '2025-12-20', false, false);
        expect(result).toBe(true);
      });

      it('미래 날짜는 enabled (false)를 반환한다', () => {
        const result = isDayDisabled('2025-12-25', '2025-12-20', false, false);
        expect(result).toBe(false);
      });

      it('같은 날짜는 disabled (true)를 반환한다', () => {
        const result = isDayDisabled('2025-12-20', '2025-12-20', false, false);
        expect(result).toBe(true);
      });
    });

    it('isDev 파라미터가 없으면 기본값 false로 동작한다', () => {
      const result = isDayDisabled('2025-12-25', '2025-12-20', true);
      expect(result).toBe(true);
    });
  });
});
