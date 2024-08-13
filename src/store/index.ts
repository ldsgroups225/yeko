import { useAtomValue } from 'jotai';
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
 * The type representing the state of the root store.
 */
export type RootState = {
  AppReducer: {
    isSignedIn: boolean;
    userColorScheme: ColorSchemeName;
    isLoading: boolean;
    user: {
        id: string
    };
    authToken: string | undefined;
    expoToken: string | undefined;
    profileCompletion: ProfileCompletion;
  };
};

/**
 * A custom selector hook that allows you to select values from the Jotai store.
 *
 * @template T - The type of the selected value.
 * @param selector - A selector function that takes the root state and returns the selected value.
 * @returns The selected value from the Jotai store.
 */
export const useAppSelector = <T>(selector: (state: RootState) => T): T => {
  const isSignedIn = useAtomValue(isSignedInAtom);
  const userColorScheme = useAtomValue(userColorSchemeAtom);
  const isLoading = useAtomValue(isLoadingAtom);
  const user = useAtomValue(userAtom);
  const authToken = useAtomValue(authTokenAtom);
  const expoToken = useAtomValue(expoTokenAtom);
  const profileCompletion = useAtomValue(profileCompletionAtom);

  const state: RootState = {
    AppReducer: {
      isSignedIn,
      userColorScheme,
      isLoading,
      user,
      authToken,
      expoToken,
      profileCompletion,
    },
  };

  return selector(state);
};

// Export all atoms for direct use if needed
export {
  isSignedInAtom,
  userColorSchemeAtom,
  isLoadingAtom,
  userAtom,
  authTokenAtom,
  expoTokenAtom,
  profileCompletionAtom,
};
