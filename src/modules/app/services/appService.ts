import { StoreEnum } from '@helpers/storage/storeEnum';
import { removeStoreDataAsync } from '@src/helpers/storage';
import { useSetAtom } from 'jotai';
import { authTokenAtom, isSignedInAtom, userAtom } from '../states/atoms';
import { ILoginDTO } from '../types/ILoginDTO';

/**
 * Signs in the user.
 * @param loginDto - The login data transfer object.
 */
export async function signIn(loginDto: ILoginDTO) {
  console.log(loginDto);
  // Implement your sign-in logic here
}

/**
 * Clears the user data by removing the token from the store and resetting Jotai atoms.
 * @returns {void} A promise that resolves once the user data is cleared.
 */
export function clearUser(): void {
  removeStoreDataAsync(StoreEnum.Token);

  const setIsSignedIn = useSetAtom(isSignedInAtom);
  const setUser = useSetAtom(userAtom);
  const setAuthToken = useSetAtom(authTokenAtom);

  setIsSignedIn(false);
  setUser(undefined);
  setAuthToken(undefined);
}

/**
 * Signs out the user by clearing user data.
 */
export function signOut() {
  clearUser();
}
