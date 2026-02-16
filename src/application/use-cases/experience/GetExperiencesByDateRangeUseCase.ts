import { inject, injectable } from 'tsyringe';
import { WorkExperience } from '@/domain/entities';
import type { IWorkExperienceRepository } from '@/domain/repositories';

/**
 * Use Case: Get experiences within a date range
 * Used for filtering experiences for CV generation
 */
@injectable()
export class GetExperiencesByDateRangeUseCase {
  constructor(
    @inject('IWorkExperienceRepository')
    private readonly repository: IWorkExperienceRepository
  ) {}

  async execute(startYear: number, endYear: number): Promise<WorkExperience[]> {
    return await this.repository.findByDateRange(startYear, endYear);
  }
}
