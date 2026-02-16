import { inject, injectable } from 'tsyringe';
import type { IWorkExperienceRepository } from '@/domain/repositories';

/**
 * Use Case: Delete work experience
 */
@injectable()
export class DeleteExperienceUseCase {
  constructor(
    @inject('IWorkExperienceRepository')
    private readonly repository: IWorkExperienceRepository
  ) {}

  async execute(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
