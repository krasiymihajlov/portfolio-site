'use client';

import { useState, useEffect } from 'react';
import { WorkExperience } from '@/domain/entities/WorkExperience';
import { getUseCase } from '@/infrastructure/di/container';
import {
  GetAllExperiencesUseCase,
  GetExperienceByIdUseCase,
  GetExperiencesByDateRangeUseCase,
} from '@/application/use-cases/experience';

/**
 * Hook for fetching all work experiences
 */
export function useExperiences() {
  const [experiences, setExperiences] = useState<WorkExperience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        setLoading(true);
        const useCase = getUseCase(GetAllExperiencesUseCase);
        const data = await useCase.execute();
        setExperiences(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  return { experiences, loading, error };
}

/**
 * Hook for fetching a single work experience by ID
 */
export function useExperience(id: string | null) {
  const [experience, setExperience] = useState<WorkExperience | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const fetchExperience = async () => {
      try {
        setLoading(true);
        const useCase = getUseCase<GetExperienceByIdUseCase>(GetExperienceByIdUseCase);
        const data = await useCase.execute(id);
        setExperience(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    };

    fetchExperience();
  }, [id]);

  return { experience, loading, error };
}

/**
 * Hook for fetching work experiences by date range
 */
export function useExperiencesByDateRange(startYear: number, endYear: number) {
  const [experiences, setExperiences] = useState<WorkExperience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        setLoading(true);
        const useCase = getUseCase<GetExperiencesByDateRangeUseCase>(GetExperiencesByDateRangeUseCase);
        const data = await useCase.execute(startYear, endYear);
        setExperiences(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, [startYear, endYear]);

  return { experiences, loading, error };
}
