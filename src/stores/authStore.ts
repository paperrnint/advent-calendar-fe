import { atom } from 'jotai';

import { RibbonColor } from '@/constants';

export type UserState =
  | {
      isAuthenticated: 'unknown';
      uuid: null;
      email: null;
      name: null;
      color: null;
    }
  | {
      isAuthenticated: false;
      uuid: null;
      email: null;
      name: null;
      color: null;
    }
  | {
      isAuthenticated: true;
      uuid: string;
      email: string;
      name: string;
      color: RibbonColor;
    };

const initialState: UserState = {
  uuid: null,
  email: null,
  name: null,
  color: null,
  isAuthenticated: 'unknown',
};

export const userAtom = atom<UserState>(initialState);
