import { WorkExperience } from '../entities/WorkExperience';

/**
 * Repository interface for WorkExperience aggregate
 * Infrastructure layer must implement this contract
 */
export interface IWorkExperienceRepository {
  /**
   * Find all work experiences ordered by start date (descending)
   */
  findAll(): Promise<WorkExperience[]>;

  /**
   * Find a work experience by ID
   */
  findById(id: string): Promise<WorkExperience | null>;

  /**
   * Find work experiences within a date range
   */
  findByDateRange(startYear: number, endYear: number): Promise<WorkExperience[]>;

  /**
   * Find work experiences by technology
   */
  findByTechnology(technology: string): Promise<WorkExperience[]>;

  /**
   * Create a new work experience
   */
  create(experience: Omit<WorkExperience, 'id' | 'createdAt' | 'updatedAt'>): Promise<WorkExperience>;

  /**
   * Update an existing work experience
   */
  update(id: string, experience: Partial<WorkExperience>): Promise<WorkExperience>;

  /**
   * Delete a work experience
   */
  delete(id: string): Promise<void>;
}
