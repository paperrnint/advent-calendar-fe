import { RibbonColor } from '@/constants';

export type LetterData = {
  content: string;
  from: string;
  date: string;
};

export type UserData = {
  uuid: string;
  email: string;
  name: string;
  color: RibbonColor;
};
