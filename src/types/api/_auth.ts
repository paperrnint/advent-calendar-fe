import { RibbonColor } from '@/constants';

export type UserRegisterRequest = {
  name: string;
  color: RibbonColor;
};

export type UserRegisterResponse = {
  uuid: string;
};

export type CurrentUserResponse = {
  name: string;
  color: RibbonColor;
  uuid: string;
};
