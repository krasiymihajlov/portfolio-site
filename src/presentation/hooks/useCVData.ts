'use client';

import { useState, useEffect } from 'react';
import { FirebaseCVDataRepository, Locale } from '@/infrastructure/persistence/firebase/repositories/FirebaseCVDataRepository';
import { ExperienceData, EducationData, ProgrammingSkills } from '@/data/cvData';

interface CVData {
  experiences: ExperienceData[];
  education: EducationData[];
  skills: ProgrammingSkills | null;
  loading: boolean;
  error: string | null;
}

const repository = new FirebaseCVDataRepository();

export function useCVData(locale: Locale): CVData {
  const [experiences, setExperiences] = useState<ExperienceData[]>([]);
  const [education, setEducation] = useState<EducationData[]>([]);
  const [skills, setSkills] = useState<ProgrammingSkills | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const [exp, edu, sk] = await Promise.all([
          repository.getExperiences(locale),
          repository.getEducation(locale),
          repository.getSkills(),
        ]);
        if (!cancelled) {
          setExperiences(exp);
          setEducation(edu);
          setSkills(sk);
        }
      } catch {
        if (!cancelled) setError('Грешка при зареждане на данните');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, [locale]);

  return { experiences, education, skills, loading, error };
}
