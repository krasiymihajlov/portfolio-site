import { inject, injectable } from 'tsyringe';
import { User } from '@/domain/entities';
import type { IAuthRepository } from '@/domain/repositories';

/**
 * Use Case: Get Current User
 * Retrieves the currently authenticated user
 */
@injectable()
export class GetCurrentUserUseCase {
  constructor(
    @inject('IAuthRepository')
    private readonly repository: IAuthRepository
  ) {}

  async execute(): Promise<User | null> {
    return await this.repository.getCurrentUser();
  }
}
