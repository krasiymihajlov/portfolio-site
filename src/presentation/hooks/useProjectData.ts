'use client';

import { useState, useEffect } from 'react';
import { FirebaseCVDataRepository } from '@/infrastructure/persistence/firebase/repositories/FirebaseCVDataRepository';
import { ProjectData, projectsData } from '@/data/cvData';

const repository = new FirebaseCVDataRepository();

export function useProjectData(locale: 'bg' | 'en' = 'bg') {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await repository.getProjects(locale);
        if (!cancelled) setProjects(data);
      } catch {
        if (!cancelled) {
          setProjects(projectsData);
          setError('Грешка при зареждане на проектите');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, [locale]);

  return { projects, loading, error };
}
