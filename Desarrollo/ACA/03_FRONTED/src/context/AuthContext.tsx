import React, { createContext, useContext, useState } from 'react';
import { authApi, setAuthToken, ApiUser } from '../services/api';

interface AuthContextType {
  usuario: ApiUser | null;
  token: string | null;
  isAuthenticated: boolean;
  /** Token de recuperación recibido en forgot-password (sin servicio de correo). */
  recoveryToken: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (nombre: string, email: string, password: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (password: string, token?: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  usuario: null,
  token: null,
  isAuthenticated: false,
  recoveryToken: null,
  login: async () => {},
  register: async () => {},
  forgotPassword: async () => {},
  resetPassword: async () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [usuario, setUsuario] = useState<ApiUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [recoveryToken, setRecoveryToken] = useState<string | null>(null);

  const applySession = (newToken: string, user: ApiUser) => {
    setToken(newToken);
    setUsuario(user);
    setAuthToken(newToken);
  };

  const login = async (email: string, password: string) => {
    const res = await authApi.login(email, password);
    applySession(res.token, res.usuario);
  };

  const register = async (nombre: string, email: string, password: string) => {
    const res = await authApi.register({ nombre, email, password });
    applySession(res.token, res.usuario);
  };

  const forgotPassword = async (email: string) => {
    const res = await authApi.forgotPassword(email);
    // Sin servicio de correo: guardamos el token devuelto para el reset.
    setRecoveryToken(res.token_dev ?? null);
  };

  const resetPassword = async (password: string, tokenOverride?: string) => {
    const t = tokenOverride ?? recoveryToken;
    if (!t) throw new Error('No hay token de recuperación válido');
    await authApi.resetPassword(t, password);
    setRecoveryToken(null);
  };

  const logout = () => {
    setToken(null);
    setUsuario(null);
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        usuario,
        token,
        isAuthenticated: !!token,
        recoveryToken,
        login,
        register,
        forgotPassword,
        resetPassword,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
