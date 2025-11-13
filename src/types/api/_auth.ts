import { RibbonColor } from '@/constants';

export type UserRegisterRequest = {
  name: string;
  color: RibbonColor;
};

export type UserRegisterResponse = {
  uuid: string;
};
