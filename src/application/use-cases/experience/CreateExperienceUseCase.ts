import { inject, injectable } from 'tsyringe';
import { WorkExperience } from '@/domain/entities';
import type { IWorkExperienceRepository } from '@/domain/repositories';

/**
 * Use Case: Create new work experience
 */
@injectable()
export class CreateExperienceUseCase {
  constructor(
    @inject('IWorkExperienceRepository')
    private readonly repository: IWorkExperienceRepository
  ) {}

  async execute(
    experience: Omit<WorkExperience, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<WorkExperience> {
    return await this.repository.create(experience);
  }
}
