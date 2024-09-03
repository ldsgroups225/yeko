import { auth } from '@modules/app/services/appService';
import { IAccountInfoDTO } from '@modules/app/types/IAccountInfoDTO';
import { ILoginDTO } from '@modules/app/types/ILoginDTO';
import { userAtom } from '@store/index';
import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { Models } from 'appwrite';

/**
 * Return type for the `useAuth` hook.
 */

interface useAuthReturn {
  account: IAccountInfoDTO | null;
  loading: boolean;
  login: (loginDTO: ILoginDTO) => Promise<Models.Session>;
  logout: () => Promise<void>;
}

/**
 * Custom React hook for managing user authentication and authorization.
 *
 * This hook provides functions for checking authentication status, logging in,
 * logging out, and accessing the current user's data. It interacts with the
 * `auth` service to perform authentication-related operations.
 *
 * @returns {useAuthReturn} An object containing the user object, loading state,
 * and functions for login and logout.
 *
 * @example
 * ```
 * const { user, loading, login, logout } = useAuth();
 *
 * if (loading) {
 *   return <div>Loading...</div>;
 * }
 *
 * if (!user) {
 *   return <Login />;
 * }
 *
 * // User is authenticated, show protected content
 * return <Profile user={user} />;
 * ```
 */
export const useAuth = (): useAuthReturn => {
  const account = useAtomValue(userAtom);
  const setAccount = useSetAtom(userAtom);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth().then((r) => r);
  }, []);

  /**
   * Checks the authentication status and fetches user data if authenticated.
   *
   * This function is called when the component mounts and attempts to retrieve
   * the current user's information using the `auth.getAccount` service. If
   * successful, it updates the `user` state with the retrieved user data. If
   * an error occurs during authentication, the `user` state remains null.
   */
  const checkAuth = async () => {
    try {
      const account = await auth.getAccount();

      if (account) setAccount(account);
    } catch (err) {
      console.error('[E_AUTH_CHECK]:', err);
      setAccount(null);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Logs in a user with the provided email and password.
   *
   * This function calls the `auth.loginWithEmailAndPassword` service to authenticate the
   * user. If successful, it updates the user state by calling `checkAuth`.
   *
   * @param {string} email - The user's email address.
   * @param {string} password - The user's password.
   * @throws {Error} If an error occurs during login.
   */
  const login = async (loginDTO: ILoginDTO) => {
    try {
      const session = await auth.loginWithEmailAndPassword(loginDTO.email, loginDTO.password);
      await checkAuth();
      return session;
    } catch (error) {
      throw error;
    }
  };

  /**
   * Logs out the current user.
   *
   * This function calls the `auth.deleteSession` service to end the current
   * session. It then sets the `user` state to null.
   *
   * @throws {Error} If an error occurs during logout.
   */
  const logout = async () => {
    try {
      await auth.deleteSession('current');
      setAccount(null);
    } catch (error) {
      throw error;
    }
  };

  return { account, loading, login, logout };
};
