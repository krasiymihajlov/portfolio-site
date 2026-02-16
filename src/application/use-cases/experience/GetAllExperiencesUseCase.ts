import { inject, injectable } from 'tsyringe';
import { WorkExperience } from '@/domain/entities';
import type { IWorkExperienceRepository } from '@/domain/repositories';

/**
 * Use Case: Get all work experiences
 * Retrieves all work experiences ordered by start date (newest first)
 */
@injectable()
export class GetAllExperiencesUseCase {
  constructor(
    @inject('IWorkExperienceRepository')
    private readonly repository: IWorkExperienceRepository
  ) {}

  async execute(): Promise<WorkExperience[]> {
    return await this.repository.findAll();
  }
}
