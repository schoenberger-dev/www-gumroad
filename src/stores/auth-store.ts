import { createStore } from 'zustand/vanilla';
import { persist } from 'zustand/middleware';
import Cookies from 'js-cookie';

export type AuthState = {
  token: string | null;
};

export type AuthActions = {
  saveToken: (query: string) => void;
  deleteToken: () => void;
};

export type AuthStore = AuthState & AuthActions;

export const initAuthStore = (): AuthState => {
  return { token: null };
};

export const defaultInitState: AuthState = {
  token: null,
};

const updateTokenCookie = (token?: string) => {
  if (!token) Cookies.remove('token');
  else Cookies.set('token', JSON.stringify(token), { expires: 7 });
};

export const createAuthStore = (initState: AuthState = defaultInitState) => {
  return createStore<AuthStore>()(
    persist(
      (set) => ({
        ...initState,
        saveToken: (token) =>
          set(() => {
            updateTokenCookie(token);
            return { token };
          }),
        deleteToken: () =>
          set(() => {
            updateTokenCookie();
            return { token: null };
          }),
      }),
      { name: 'auth-store' },
    ),
  );
};
