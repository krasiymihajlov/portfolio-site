import { inject, injectable } from 'tsyringe';
import { WorkExperience } from '@/domain/entities';
import type { IWorkExperienceRepository } from '@/domain/repositories';

/**
 * Use Case: Update existing work experience
 */
@injectable()
export class UpdateExperienceUseCase {
  constructor(
    @inject('IWorkExperienceRepository')
    private readonly repository: IWorkExperienceRepository
  ) {}

  async execute(
    id: string,
    experience: Partial<WorkExperience>
  ): Promise<WorkExperience> {
    return await this.repository.update(id, experience);
  }
}
