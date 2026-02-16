import { inject, injectable } from 'tsyringe';
import { User } from '@/domain/entities';
import type { IAuthRepository } from '@/domain/repositories';

/**
 * Use Case: User Login
 * Authenticates a user with email and password
 */
@injectable()
export class LoginUseCase {
  constructor(
    @inject('IAuthRepository')
    private readonly repository: IAuthRepository
  ) {}

  async execute(email: string, password: string): Promise<User> {
    // Validation
    if (!email || !email.includes('@')) {
      throw new Error('Invalid email format');
    }

    if (!password || password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }

    return await this.repository.signInWithEmailAndPassword(email, password);
  }
}
