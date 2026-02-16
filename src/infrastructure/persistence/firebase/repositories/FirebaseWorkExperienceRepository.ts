import { injectable } from 'tsyringe';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  Timestamp,
  orderBy,
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { WorkExperience } from '@/domain/entities/WorkExperience';
import { IWorkExperienceRepository } from '@/domain/repositories/IWorkExperienceRepository';

@injectable()
export class FirebaseWorkExperienceRepository implements IWorkExperienceRepository {
  private readonly collectionName = 'workExperiences';

  async findAll(): Promise<WorkExperience[]> {
    const q = query(
      collection(db, this.collectionName),
      orderBy('startDate', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => this.mapToEntity(doc.id, doc.data()));
  }

  async findById(id: string): Promise<WorkExperience | null> {
    const docRef = doc(db, this.collectionName, id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return null;
    }

    return this.mapToEntity(docSnap.id, docSnap.data());
  }

  async findByDateRange(startYear: number, endYear: number): Promise<WorkExperience[]> {
    const allExperiences = await this.findAll();
    return allExperiences.filter((exp) =>
      exp.isWithinDateRange(startYear, endYear)
    );
  }

  async findByTechnology(technology: string): Promise<WorkExperience[]> {
    const q = query(
      collection(db, this.collectionName),
      where('technologies', 'array-contains', technology)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => this.mapToEntity(doc.id, doc.data()));
  }

  async create(
    experience: Omit<WorkExperience, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<WorkExperience> {
    const now = Timestamp.now();
    const docData = {
      company: experience.company,
      position: experience.position,
      description: experience.description,
      startDate: experience.startDate,
      endDate: experience.endDate,
      technologies: experience.technologies,
      achievements: experience.achievements,
      createdAt: now,
      updatedAt: now,
    };

    const docRef = await addDoc(collection(db, this.collectionName), docData);
    return new WorkExperience(
      docRef.id,
      experience.company,
      experience.position,
      experience.description,
      experience.startDate,
      experience.endDate,
      experience.technologies,
      experience.achievements,
      now.toDate(),
      now.toDate()
    );
  }

  async update(id: string, experience: Partial<WorkExperience>): Promise<WorkExperience> {
    const docRef = doc(db, this.collectionName, id);
    const updateData: any = {
      ...experience,
      updatedAt: Timestamp.now(),
    };

    // Remove fields that shouldn't be updated
    delete updateData.id;
    delete updateData.createdAt;

    await updateDoc(docRef, updateData);

    const updated = await this.findById(id);
    if (!updated) {
      throw new Error(`Failed to update work experience with id: ${id}`);
    }

    return updated;
  }

  async delete(id: string): Promise<void> {
    const docRef = doc(db, this.collectionName, id);
    await deleteDoc(docRef);
  }

  private mapToEntity(id: string, data: any): WorkExperience {
    return new WorkExperience(
      id,
      data.company,
      data.position,
      data.description,
      data.startDate,
      data.endDate,
      data.technologies,
      data.achievements,
      data.createdAt?.toDate(),
      data.updatedAt?.toDate()
    );
  }
}
