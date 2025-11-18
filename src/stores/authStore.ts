import { atom } from 'jotai';

import { RibbonColor } from '@/constants';

export type UserState =
  | {
      isAuthenticated: false;
      uuid: null;
      name: null;
      color: null;
    }
  | {
      isAuthenticated: true;
      uuid: string;
      name: string;
      color: RibbonColor;
    };

const initialState: UserState = {
  uuid: null,
  name: null,
  color: null,
  isAuthenticated: false,
};

export const userAtom = atom<UserState>(initialState);

export const authLoadingAtom = atom<boolean>(false);

export const authErrorAtom = atom<string | null>(null);
