import { renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { useBodyBackground } from './useBodyBackground';

describe('useBodyBackground', () => {
  afterEach(() => {
    document.body.style.backgroundColor = '';
  });

  it('body의 배경색을 설정하고 언마운트 시 초기화한다', () => {
    const { unmount } = renderHook(() => useBodyBackground('red'));

    expect(document.body.style.backgroundColor).toBe('red');

    unmount();

    expect(document.body.style.backgroundColor).toBe('');
  });
});
