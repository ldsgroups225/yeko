import { ColorSchemeName } from 'react-native';
import { atomWithMMKV } from './atomWithMMKV';

export interface ProfileCompletion {
  currentStep: number;
  theme: string;
  language: string;
  avatar: string;
  gender: string;
  country: string;
  city: string;
  grade: string;
  referral: string;
}

export const isSignedInAtom = atomWithMMKV('isSignedIn', false);
export const userColorSchemeAtom = atomWithMMKV<ColorSchemeName>('userColorScheme', 'light');
export const isLoadingAtom = atomWithMMKV('isLoading', false);
export const userAtom = atomWithMMKV<any | undefined>('user', undefined);
export const authTokenAtom = atomWithMMKV<string | undefined>('authToken', undefined);
export const expoTokenAtom = atomWithMMKV<string | undefined>('expoToken', undefined);
export const profileCompletionAtom = atomWithMMKV<ProfileCompletion>('profileCompletion', {
  currentStep: 0,
  theme: 'auto',
  language: 'english',
  avatar: '',
  gender: '',
  country: '',
  city: '',
  grade: '',
  referral: '',
});
