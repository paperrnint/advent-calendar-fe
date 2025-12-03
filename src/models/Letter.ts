import { decode } from 'html-entities';

import { LetterResponse } from '@/types/api';
import { LetterData } from '@/types/data';

export class LetterModel {
  static fromApiResponse(apiLetter: LetterResponse): LetterData {
    return {
      date: `2025년 12월 ${apiLetter.day}일`,
      content: decode(apiLetter.content),
      from: decode(apiLetter.fromName),
    };
  }

  static fromApiResponseList(apiLetters: LetterResponse[]): LetterData[] {
    return apiLetters.map(this.fromApiResponse);
  }
}
