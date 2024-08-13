import { atom } from 'jotai';
import { ColorSchemeName } from 'react-native';
import {
  isSignedInAtom,
  userColorSchemeAtom,
  isLoadingAtom,
  userAtom,
  authTokenAtom,
  expoTokenAtom,
  profileCompletionAtom,
  ProfileCompletion
} from '@modules/app/states/atoms';

/**
 * Root state object that combines all the atoms.
 */
export const rootStateAtom = atom((get) => ({
  AppReducer: {
    isSignedIn: get(isSignedInAtom),
    userColorScheme: get(userColorSchemeAtom),
    isLoading: get(isLoadingAtom),
    user: get(userAtom),
    authToken: get(authTokenAtom),
    expoToken: get(expoTokenAtom),
    profileCompletion: get(profileCompletionAtom),
  }
}));

export type RootState = {
  AppReducer: {
    isSignedIn: boolean;
    userColorScheme: ColorSchemeName;
    isLoading: boolean;
    user: { id: string };
    authToken: string | undefined;
    expoToken: string | undefined;
    profileCompletion: ProfileCompletion;
  };
};

export default rootStateAtom;
