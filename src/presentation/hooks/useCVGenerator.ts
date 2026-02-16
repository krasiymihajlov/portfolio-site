'use client';

import { useState } from 'react';
import { GeneratedCV } from '@/domain/entities/GeneratedCV';
import { GenerateCVDto } from '@/application/dtos/GenerateCVDto';
import { getUseCase } from '@/infrastructure/di/container';
import { GenerateCVUseCase } from '@/application/use-cases/cv-generator';

/**
 * Hook for CV generation operations
 */
export function useCVGenerator() {
  const [cv, setCV] = useState<GeneratedCV | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const generateCV = async (dto: GenerateCVDto, customImage?: File) => {
    try {
      setLoading(true);
      setError(null);
      const useCase = getUseCase(GenerateCVUseCase);
      const generatedCV = await useCase.execute(dto, customImage);
      setCV(generatedCV);
      return generatedCV;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setCV(null);
    setError(null);
  };

  return {
    cv,
    loading,
    error,
    generateCV,
    reset,
  };
}
