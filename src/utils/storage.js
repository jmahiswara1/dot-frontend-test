const AUTH_KEY = 'dot-quiz-auth';
const SESSION_KEY = 'dot-quiz-session';

export const storage = {
  getAuth: () => {
    const data = localStorage.getItem(AUTH_KEY);
    return data ? JSON.parse(data) : null;
  },

  setAuth: (authData) => {
    localStorage.setItem(AUTH_KEY, JSON.stringify(authData));
  },

  clearAuth: () => {
    localStorage.removeItem(AUTH_KEY);
  },

  getSession: () => {
    const data = localStorage.getItem(SESSION_KEY);
    return data ? JSON.parse(data) : null;
  },

  setSession: (sessionData) => {
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
  },

  clearSession: () => {
    localStorage.removeItem(SESSION_KEY);
  }
};
