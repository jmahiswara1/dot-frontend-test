import { create } from 'zustand';
import { storage } from '../utils/storage';

const initialAuth = storage.getAuth();

export const useAuthStore = create((set) => ({
  username: initialAuth?.username || null,
  language: initialAuth?.language || 'id',
  isLoggedIn: !!initialAuth,

  loadFromStorage: () => {
    const auth = storage.getAuth();
    if (auth) {
      set({
        username: auth.username,
        language: auth.language,
        isLoggedIn: true
      });
    }
  },

  login: (username) => {
    const auth = storage.getAuth();
    const lang = auth?.language || 'id';
    const authData = { username, language: lang };
    storage.setAuth(authData);
    set({ username, isLoggedIn: true, language: lang });
  },

  logout: () => {
    storage.clearAuth();
    set({ username: null, isLoggedIn: false });
  },

  setLanguage: (language) => {
    const auth = storage.getAuth();
    if (auth) {
      storage.setAuth({ ...auth, language });
    }
    set({ language });
  }
}));
