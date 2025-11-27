import { RibbonColor } from '@/constants';

export type UserRegisterRequest = {
  name: string;
  color: RibbonColor;
};

export type UserRegisterResponse = {
  uuid: string;
  email: string;
  name: string;
  color: RibbonColor;
};

export type CurrentUserResponse = {
  uuid: string;
  email: string;
  name: string;
  color: RibbonColor;
};
