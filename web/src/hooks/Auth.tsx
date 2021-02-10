import React, { createContext, useCallback, useContext, useState } from 'react';
import api from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
}
interface AuthState {
  token: string;
  userWithoutPassword: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signInCustomer(credentials: SignInCredentials): Promise<void>;
  signInProvider(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  updateUser(user: User): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  // starta a variável com base no localStorage
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@Agendamento-tatuagem:token');
    const userWithoutPassword = localStorage.getItem(
      '@Agendamento-tatuagem:user',
    );

    if (token && userWithoutPassword) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      return {
        token,
        userWithoutPassword: JSON.parse(userWithoutPassword),
      };
    }
    return {} as AuthState;
  });

  const signInCustomer = useCallback(async ({ email, password }) => {
    const response = await api.post('/customers/sessions', {
      email,
      password,
    });

    const { token, userWithoutPassword } = response.data;
    localStorage.setItem('@Agendamento-tatuagem:token', token);
    localStorage.setItem(
      '@Agendamento-tatuagem:user',
      JSON.stringify(userWithoutPassword),
    );

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, userWithoutPassword });
  }, []);

  const signInProvider = useCallback(async ({ email, password }) => {
    const response = await api.post('/providers/sessions', {
      email,
      password,
    });

    const { token, userWithoutPassword } = response.data;
    localStorage.setItem('@Agendamento-tatuagem:token', token);
    localStorage.setItem(
      '@Agendamento-tatuagem:user',
      JSON.stringify(userWithoutPassword),
    );

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, userWithoutPassword });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@Agendamento-tatuagem:token');
    localStorage.removeItem('@Agendamento-tatuagem:user');

    setData({} as AuthState);
  }, []);

  const updateUser = useCallback(
    (user: User) => {
      localStorage.setItem('@Agendamento-tatuagem:user', JSON.stringify(user));
      setData({
        token: data.token,
        userWithoutPassword: user,
      });
    },
    [setData, data.token],
  );

  return (
    <AuthContext.Provider
      value={{
        user: data.userWithoutPassword,
        signInCustomer,
        signInProvider,
        signOut,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an  AuthProvider');
  }
  return context;
}

export { AuthProvider, useAuth };
