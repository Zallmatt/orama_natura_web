import { createContext, useContext, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(() => {
    const token = sessionStorage.getItem('authToken');
    if (token) {
      const user = jwtDecode(token);
      return { token, user };
    }
    return { token: null, user: null };
  });

  const login = (token) => {
    const user = jwtDecode(token);
    sessionStorage.setItem('authToken', token);
    setAuthState({ token, user });
  };

  const logout = () => {
    sessionStorage.removeItem('authToken');
    setAuthState({ token: null, user: null });
  };

  const isAuthenticated = !!authState.token;

  return (
    <AuthContext.Provider value={{ ...authState, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
