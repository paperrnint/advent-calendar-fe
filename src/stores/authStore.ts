import { atom } from 'jotai';

import { RibbonColor } from '@/constants';

export interface UserState {
  uuid: string | null;
  name: string | null;
  color: RibbonColor | null;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  uuid: null,
  name: null,
  color: null,
  isAuthenticated: false,
};

export const userAtom = atom<UserState>(initialState);

export const authLoadingAtom = atom<boolean>(false);

export const authErrorAtom = atom<string | null>(null);
