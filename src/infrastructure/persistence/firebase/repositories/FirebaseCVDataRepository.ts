import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import {
  ExperienceData,
  EducationData,
  ProgrammingSkills,
  ProjectData,
  experiencesData,
  educationData,
  programmingSkills,
  projectsData,
} from '@/data/cvData';

export type Locale = 'en' | 'bg';

export class FirebaseCVDataRepository {
  async getExperiences(locale: Locale): Promise<ExperienceData[]> {
    try {
      const collectionName = locale === 'bg' ? 'experiences_bg' : 'experiences_en';
      const snapshot = await getDocs(collection(db, collectionName));

      if (snapshot.empty) return locale === 'en' ? experiencesData : experiencesData;

      const items = snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as ExperienceData));
      items.sort((a, b) => a.id.localeCompare(b.id));
      return items;
    } catch {
      return experiencesData;
    }
  }

  async getEducation(locale: Locale): Promise<EducationData[]> {
    try {
      const collectionName = locale === 'bg' ? 'education_bg' : 'education_en';
      const snapshot = await getDocs(collection(db, collectionName));

      if (snapshot.empty) return educationData;

      const items = snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as EducationData));
      items.sort((a, b) => a.id.localeCompare(b.id));
      return items;
    } catch {
      return educationData;
    }
  }

  async getSkills(): Promise<ProgrammingSkills> {
    try {
      const docRef = doc(db, 'skills', 'programming');
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) return programmingSkills;

      return docSnap.data() as ProgrammingSkills;
    } catch {
      return programmingSkills;
    }
  }

  async getProjects(locale: Locale = 'en'): Promise<ProjectData[]> {
    try {
      const collectionName = locale === 'bg' ? 'projects_bg' : 'projects_en';
      const snapshot = await getDocs(collection(db, collectionName));

      if (snapshot.empty) return projectsData;

      const items = snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as ProjectData));
      items.sort((a, b) => a.order - b.order);
      return items;
    } catch {
      return projectsData;
    }
  }
}
