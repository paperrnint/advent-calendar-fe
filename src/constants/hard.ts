import { LetterData } from '@/types/data';

export const USERNAME = '산타';

export const LETTERS: LetterData[] = [
  {
    content:
      'Merry Christmas! 🎄\n\n크리스마스를 맞아 따뜻한 인사를 전합니다.\n올 한 해도 고생 많으셨어요. 새해에는 더 좋은 일만 가득하길 바랍니다.\n\n크리스마스를 맞아 따뜻한 인사를 전합니다.\n올 한 해도 고생 많으셨어요. 새해에는 더 좋은 일만 가득하길 바랍니다.',
    from: '산타',
    date: '2025.12.25',
  },
  {
    content: '두 번째 편지 내용입니다.\n\n즐거운 크리스마스 되세요!',
    from: '루돌프',
    date: '2025.12.25',
  },
] as const;
