import { atom, useAtom } from 'jotai';
import { authTokenAtom, isSignedInAtom } from '@modules/app/states/atoms';
import { BaseQueryFn, fetchBaseQuery } from '@reduxjs/toolkit/query';
import type { FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/dist/query/fetchBaseQuery';

// Type for the configuration object
type CustomFetchBaseQueryArgs = {
  baseUrl: string;
  prepareHeaders?: (headers: Headers, token: string | undefined) => Headers;
  responseHandler?: (response: Response) => Promise<any>;
};

/**
 * Configuration object for the base query used in network requests.
 */
const customFetchBaseQueryArgs: CustomFetchBaseQueryArgs = {
  baseUrl: '/',
  prepareHeaders: (headers, token) => {
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
  responseHandler: async (response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  },
};

// Function to get the current auth token
let getAuthToken: () => string | undefined;

/**
 * A function that represents the base query for network requests.
 *
 * @param args - The arguments for the base query.
 * @returns The result of the base query.
 */
export const baseQuery = fetchBaseQuery({
  baseUrl: customFetchBaseQueryArgs.baseUrl,
  prepareHeaders: (headers) => {
    const token = getAuthToken();
    return customFetchBaseQueryArgs.prepareHeaders?.(headers, token) ?? headers;
  },
});

/**
 * A custom base query function that automatically handles reauthentication.
 *
 * @param args - The query arguments.
 * @param api - The API object provided by RTK Query.
 * @param extraOptions - Extra options for the base query.
 * @returns The result of the base query.
 */
export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // try to get a new token
    const refreshResult = await baseQuery('/refreshToken', api, extraOptions);
    if (refreshResult.data) {
      // store the new token
      setAuthToken(refreshResult.data as string);
      // retry the initial query
      result = await baseQuery(args, api, extraOptions);
    } else {
      // Log out the user
      logOut();
    }
  }
  return result;
};

// Hook to get and set the auth token
export const useAuthToken = () => {
  const [token, setToken] = useAtom(authTokenAtom);
  if (typeof getAuthToken === 'undefined') {
    getAuthToken = () => token;
  }
  return [token, setToken] as const;
};

// Hook to get and set the signed-in state
export const useIsSignedIn = () => useAtom(isSignedInAtom);

// Function to set the auth token
export const setAuthToken = (token: string | undefined) => {
  if (typeof setAuthTokenAtom !== 'undefined') {
    setAuthTokenAtom(token);
  }
};

let setAuthTokenAtom: (token: string | undefined) => void;
let setIsSignedInAtom: (isSignedIn: boolean) => void;

// Function to log out
export const logOut = () => {
  if (typeof setAuthTokenAtom !== 'undefined' && typeof setIsSignedInAtom !== 'undefined') {
    setAuthTokenAtom(undefined);
    setIsSignedInAtom(false);
  }
};

// Initialize the setters
export const initializeAuthSetters = (
  setAuthToken: (token: string | undefined) => void,
  setIsSignedIn: (isSignedIn: boolean) => void
) => {
  setAuthTokenAtom = setAuthToken;
  setIsSignedInAtom = setIsSignedIn;
};
