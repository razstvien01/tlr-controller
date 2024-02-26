import { atom, useAtom } from 'jotai';
import { UserDataProps } from '../types/types';
import { UserDataInit } from '../types/init';

export const userDataAtom = atom<UserDataProps>(UserDataInit);

export function useUserDataAtom() {
  return useAtom(userDataAtom);
}
