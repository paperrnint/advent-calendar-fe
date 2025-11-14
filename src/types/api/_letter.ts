export type WriteLetterRequest = {
  day: number;
  content: string;
  fromName: string;
};

export type LetterResponse = {
  day: number;
  content: string;
  fromName: string;
  createdAt: string;
};

export type LettersResponse = LetterResponse[];
