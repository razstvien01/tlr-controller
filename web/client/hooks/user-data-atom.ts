import { atom, useAtom } from 'jotai';
import { UserDataProps } from '@/configs/types';
import { UserDataInit } from '@/configs/init';

export const userDataAtom = atom<UserDataProps>(UserDataInit);

export function useUserDataAtom() {
  return useAtom(userDataAtom);
}
