import { StoreEnum } from '@helpers/storage/storeEnum';
import { IAccountInfoDTO } from '@modules/app/types/IAccountInfoDTO';
import { removeStoreDataAsync } from '@src/helpers/storage';
import {
  account,
  APPWRITE_DATABASE_ID,
  databases,
  PARENT_COLLECTION_ID,
} from '@src/network/appwrite';
import { ID, Models } from 'appwrite';
import { useSetAtom } from 'jotai';
import { authTokenAtom, isSignedInAtom, userAtom } from '../states/atoms';

/**
 * @module auth
 * This module provides functions for user authentication and account management.
 */
export const auth = {
  /**
   * Clears the user data by removing the token from the store and resetting Jotai atoms.
   * @returns {void} A promise that resolves once the user data is cleared.
   */
  clearUser(): void {
    removeStoreDataAsync(StoreEnum.Token);

    const setIsSignedIn = useSetAtom(isSignedInAtom);
    const setUser = useSetAtom(userAtom);
    const setAuthToken = useSetAtom(authTokenAtom);

    setIsSignedIn(false);
    setUser(undefined);
    setAuthToken(undefined);
  },

  /**
   * Creates a new user account.
   *
   * This function creates a new user account with the provided email, password, and name.
   * It uses the `account.create` method from the Appwrite SDK to interact with the authentication system.
   * A unique ID is generated for the user using `ID.unique()`.
   *
   * @param {string} email - The email address of the new user.
   * @param {string} password - The password for the new user.
   * @param {string} name - The name of the new user.
   * @returns {Promise<any>} A promise that resolves to the response from the Appwrite API.
   * @throws {Error} If there is an error creating the account.
   *
   * @example
   * ```
   * try {
   *   await auth.createAccount('john.doe@example.com', 'password123', 'John Doe');
   *   console.log('Account created successfully!');
   * } catch (error) {
   *   console.error('Error creating account:', error);
   * }
   * ```
   */
  async createAccount(email: string, password: string, name: string): Promise<any> {
    try {
      return await account.create(ID.unique(), email, password, name);
    } catch (error) {
      console.error('Error creating account:', error);
      throw error;
    }
  },

  /**
   * Creates a new user session.
   *
   * This function creates a new user session by authenticating the user with the provided email and password.
   * It uses the `account.loginWithEmailAndPassword` method from the Appwrite SDK.
   *
   * @param {string} email - The email address of the user.
   * @param {string} password - The password of the user.
   * @returns {Promise<any>} A promise that resolves to the response from the Appwrite API.
   * @throws {Error} If there is an error creating the session.
   *
   * @example
   * ```
   * try {
   *   await auth.loginWithEmailAndPassword('john.doe@example.com', 'password123');
   *   console.log('Session created successfully!');
   * } catch (error) {
   *   console.error('Error creating session:', error);
   * }
   * ```
   */
  async loginWithEmailAndPassword(email: string, password: string): Promise<Models.Session> {
    try {
      return await account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.error('Error creating session:', error);
      throw error;
    }
  },

  /**
   * Gets the currently logged-in user's account information.
   *
   * This function retrieves the account information of the currently logged-in user.
   * It uses the `account.get` method from the Appwrite SDK.
   *
   * @returns {Promise<IAccountInfoDTO>} A promise that resolves to the user's account information.
   * @throws {Error} If there is an error getting the account information.
   *
   * @example
   * ```
   * try {
   *   const account = await auth.getAccount();
   *   console.log('Account information:', account);
   * } catch (error) {
   *   console.error('Error getting account information:', error);
   * }
   * ```
   */
  async getAccount(): Promise<IAccountInfoDTO | null> {
    try {
      const session = await account.getSession('current');

      if (session.userId && session.userId.length) {
        const user = await databases.getDocument(
          APPWRITE_DATABASE_ID,
          PARENT_COLLECTION_ID,
          session.userId
        );

        if (user) {
          return {
            id: user.$id,
            fullName: user.full_name,
            email: user.email,
            phone: user.phone,
            studentIDs: user.student_ids,
          };
        }
      }

      return null;
    } catch (error) {
      console.error('Error getting account information:', error);
      throw error;
    }
  },

  /**
   * Deletes a user session.
   *
   * This function deletes the specified user session, effectively logging out the user.
   * It uses the `account.deleteSession` method from the Appwrite SDK.
   *
   * @param {string} sessionId - The ID of the session to delete.
   * @returns {Promise<any>} A promise that resolves to the response from the Appwrite API.
   * @throws {Error} If there is an error deleting the session.
   *
   * @example
   * ```
   * try {
   *   await auth.deleteSession('session123');
   *   console.log('Session deleted successfully!');
   * } catch (error) {
   *   console.error('Error deleting session:', error);
   * }
   * ```
   */
  async deleteSession(sessionId: string): Promise<any> {
    try {
      await account.deleteSession(sessionId);
      this.clearUser();
    } catch (error) {
      console.error('Error deleting session:', error);
      throw error;
    }
  },
};
