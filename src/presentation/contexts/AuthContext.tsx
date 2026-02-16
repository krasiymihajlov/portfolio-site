'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@/domain/entities/User';
import { getUseCase } from '@/infrastructure/di/container';
import {
  LoginUseCase,
  LogoutUseCase,
  GetCurrentUserUseCase,
} from '@/application/use-cases/auth';
import { IAuthRepository } from '@/domain/repositories/IAuthRepository';
import { container } from 'tsyringe';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signIn: async () => {},
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get auth repository to listen for auth state changes
    const authRepo = container.resolve<IAuthRepository>('IAuthRepository');

    const unsubscribe = authRepo.onAuthStateChanged((newUser: User | null) => {
      setUser(newUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const loginUseCase = getUseCase(LoginUseCase);
    const loggedInUser = await loginUseCase.execute(email, password);
    setUser(loggedInUser);
  };

  const signOut = async () => {
    const logoutUseCase = getUseCase(LogoutUseCase);
    await logoutUseCase.execute();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
