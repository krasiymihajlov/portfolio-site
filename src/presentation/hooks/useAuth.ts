'use client';

import { useState, useEffect } from 'react';
import { User } from '@/domain/entities/User';
import { getUseCase } from '@/infrastructure/di/container';
import {
  LoginUseCase,
  LogoutUseCase,
  GetCurrentUserUseCase,
} from '@/application/use-cases/auth';

/**
 * Hook for authentication operations
 */
export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        setLoading(true);
        const useCase = getUseCase(GetCurrentUserUseCase);
        const currentUser = await useCase.execute();
        setUser(currentUser);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    };

    getCurrentUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const useCase = getUseCase<LoginUseCase>(LoginUseCase);
      const loggedInUser = await useCase.execute(email, password);
      setUser(loggedInUser);
      setError(null);
      return loggedInUser;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      const useCase = getUseCase(LogoutUseCase);
      await useCase.execute();
      setUser(null);
      setError(null);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    error,
    login,
    logout,
    isAuthenticated: !!user,
  };
}
