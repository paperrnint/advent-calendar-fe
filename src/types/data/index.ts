import { RibbonColor } from '@/constants';

export type LetterData = {
  content: string;
  from: string;
  date: string;
};

export type UserData = {
  uuid: string;
  name: string;
  color: RibbonColor;
};
