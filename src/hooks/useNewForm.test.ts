import { renderHook, act } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { useNewForm } from './useNewForm';
import { MAX_NAME_LENGTH } from '@/constants';

describe('useNewForm', () => {
  describe('이름 입력', () => {
    it('한글, 영문, 숫자, 공백만 입력 가능하다', () => {
      const { result } = renderHook(() => useNewForm());

      // 유효한 입력 (한글)
      act(() => {
        result.current.updateName({
          target: { value: '홍길동' },
        } as React.ChangeEvent<HTMLInputElement>);
      });
      expect(result.current.name).toBe('홍길동');

      // 특수문자는 무시
      act(() => {
        result.current.updateName({
          target: { value: '홍길동@#$' },
        } as React.ChangeEvent<HTMLInputElement>);
      });
      expect(result.current.name).toBe('홍길동'); // 변경 안 됨
    });

    it('최대 길이를 초과하면 입력되지 않는다', () => {
      const { result } = renderHook(() => useNewForm());

      const longName = 'a'.repeat(MAX_NAME_LENGTH + 1);

      act(() => {
        result.current.updateName({
          target: { value: longName },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      expect(result.current.name).toBe(''); // 입력 안 됨
    });

    it('이름을 초기화할 수 있다', () => {
      const { result } = renderHook(() => useNewForm());

      act(() => {
        result.current.updateName({
          target: { value: '홍길동' },
        } as React.ChangeEvent<HTMLInputElement>);
      });
      expect(result.current.name).toBe('홍길동');

      act(() => {
        result.current.resetName();
      });
      expect(result.current.name).toBe('');
    });
  });

  describe('색상 선택', () => {
    it('색상을 선택할 수 있다', () => {
      const { result } = renderHook(() => useNewForm());

      act(() => {
        result.current.updateColor('green');
      });

      expect(result.current.color).toBe('green');
    });
  });

  describe('단계 이동', () => {
    it('이름이 유효하면 다음 단계로 이동한다', () => {
      const { result } = renderHook(() => useNewForm());

      act(() => {
        result.current.updateName({
          target: { value: '홍길동' },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      expect(result.current.step).toBe(0);

      act(() => {
        result.current.goToNextStep();
      });

      expect(result.current.step).toBe(1);
    });

    it('이름이 비어있으면 다음 단계로 이동하지 않는다', () => {
      const { result } = renderHook(() => useNewForm());

      act(() => {
        result.current.goToNextStep();
      });

      expect(result.current.step).toBe(0); // 그대로
    });

    it('공백만 있는 이름은 유효하지 않다', () => {
      const { result } = renderHook(() => useNewForm());

      act(() => {
        result.current.updateName({
          target: { value: '   ' },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      expect(result.current.isNameValid).toBe(false);

      act(() => {
        result.current.goToNextStep();
      });

      expect(result.current.step).toBe(0);
    });

    it('이전 단계로 돌아갈 수 있다', () => {
      const { result } = renderHook(() => useNewForm());

      act(() => {
        result.current.updateName({
          target: { value: '홍길동' },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      act(() => {
        result.current.goToNextStep();
      });

      expect(result.current.step).toBe(1);

      act(() => {
        result.current.goToPrevStep();
      });

      expect(result.current.step).toBe(0);
    });
  });

  describe('유효성 검사', () => {
    it('이름과 색상이 모두 있으면 유효하다', () => {
      const { result } = renderHook(() => useNewForm());

      act(() => {
        result.current.updateName({
          target: { value: '홍길동' },
        } as React.ChangeEvent<HTMLInputElement>);
        result.current.updateColor('green');
      });

      expect(result.current.isNameValid).toBe(true);
      expect(result.current.isColorValid).toBe(true);
    });

    it('초기 상태는 유효하지 않다', () => {
      const { result } = renderHook(() => useNewForm());

      expect(result.current.isNameValid).toBe(false);
      expect(result.current.isColorValid).toBe(false);
    });
  });

  describe('사용자 데이터', () => {
    it('trim된 이름과 색상을 반환한다', () => {
      const { result } = renderHook(() => useNewForm());

      act(() => {
        result.current.updateName({
          target: { value: '  홍길동  ' },
        } as React.ChangeEvent<HTMLInputElement>);
        result.current.updateColor('green');
      });

      const userData = result.current.getUserData();

      expect(userData).toEqual({
        name: '홍길동',
        color: 'green',
      });
    });
  });
});
