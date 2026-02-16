import { inject, injectable } from 'tsyringe';
import type { IAuthRepository } from '@/domain/repositories';

/**
 * Use Case: User Logout
 * Signs out the current user
 */
@injectable()
export class LogoutUseCase {
  constructor(
    @inject('IAuthRepository')
    private readonly repository: IAuthRepository
  ) {}

  async execute(): Promise<void> {
    await this.repository.signOut();
  }
}
