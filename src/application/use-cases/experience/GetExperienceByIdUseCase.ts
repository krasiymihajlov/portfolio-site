import { inject, injectable } from 'tsyringe';
import { WorkExperience } from '@/domain/entities';
import type { IWorkExperienceRepository } from '@/domain/repositories';

/**
 * Use Case: Get single work experience by ID
 */
@injectable()
export class GetExperienceByIdUseCase {
  constructor(
    @inject('IWorkExperienceRepository')
    private readonly repository: IWorkExperienceRepository
  ) {}

  async execute(id: string): Promise<WorkExperience | null> {
    return await this.repository.findById(id);
  }
}
