import { RibbonColor } from '@/constants';

export type UserDataResponse = {
  uuid: string;
  email: string;
  name: string;
  color: RibbonColor;
};
