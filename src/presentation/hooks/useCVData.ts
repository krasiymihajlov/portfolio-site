'use client';

import { useState, useEffect } from 'react';
import { FirebaseCVDataRepository, Locale } from '@/infrastructure/persistence/firebase/repositories/FirebaseCVDataRepository';
import { ExperienceData, EducationData, ProgrammingSkills, ProjectData } from '@/data/cvData';

interface CVData {
  experiences: ExperienceData[];
  education: EducationData[];
  skills: ProgrammingSkills | null;
  projects: ProjectData[];
  loading: boolean;
  error: string | null;
}

const repository = new FirebaseCVDataRepository();

export function useCVData(locale: Locale): CVData {
  const [experiences, setExperiences] = useState<ExperienceData[]>([]);
  const [education, setEducation] = useState<EducationData[]>([]);
  const [skills, setSkills] = useState<ProgrammingSkills | null>(null);
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const [exp, edu, sk, proj] = await Promise.all([
          repository.getExperiences(locale),
          repository.getEducation(locale),
          repository.getSkills(),
          repository.getProjects('en'),
        ]);
        if (!cancelled) {
          setExperiences(exp);
          setEducation(edu);
          setSkills(sk);
          setProjects(proj);
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

  return { experiences, education, skills, projects, loading, error };
}
