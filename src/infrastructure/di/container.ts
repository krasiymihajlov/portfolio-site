import 'reflect-metadata';
import { container } from 'tsyringe';

// Import repository implementations
import {
  FirebaseWorkExperienceRepository,
  FirebaseBlogRepository,
  FirebaseAuthRepository,
  FirebaseStorageRepository,
} from '../persistence/firebase/repositories';

// Import use cases
import {
  GetAllExperiencesUseCase,
  GetExperienceByIdUseCase,
  GetExperiencesByDateRangeUseCase,
  CreateExperienceUseCase,
  UpdateExperienceUseCase,
  DeleteExperienceUseCase,
} from '@/application/use-cases/experience';

import {
  GetAllPublishedArticlesUseCase,
  GetArticleBySlugUseCase,
} from '@/application/use-cases/blog';

import {
  LoginUseCase,
  LogoutUseCase,
  GetCurrentUserUseCase,
} from '@/application/use-cases/auth';

import {
  GenerateCVUseCase,
} from '@/application/use-cases/cv-generator';

/**
 * Dependency Injection Container Setup
 * Registers all repository implementations and use cases
 */
export function setupDependencyInjection() {
  // Register repository implementations with their interface tokens
  container.register('IWorkExperienceRepository', {
    useClass: FirebaseWorkExperienceRepository,
  });

  container.register('IBlogRepository', {
    useClass: FirebaseBlogRepository,
  });

  container.register('IAuthRepository', {
    useClass: FirebaseAuthRepository,
  });

  container.register('IStorageRepository', {
    useClass: FirebaseStorageRepository,
  });

  // Register use cases (they will automatically resolve their dependencies)
  container.register(GetAllExperiencesUseCase, {
    useClass: GetAllExperiencesUseCase,
  });

  container.register(GetExperienceByIdUseCase, {
    useClass: GetExperienceByIdUseCase,
  });

  container.register(GetExperiencesByDateRangeUseCase, {
    useClass: GetExperiencesByDateRangeUseCase,
  });

  container.register(CreateExperienceUseCase, {
    useClass: CreateExperienceUseCase,
  });

  container.register(UpdateExperienceUseCase, {
    useClass: UpdateExperienceUseCase,
  });

  container.register(DeleteExperienceUseCase, {
    useClass: DeleteExperienceUseCase,
  });

  container.register(GetAllPublishedArticlesUseCase, {
    useClass: GetAllPublishedArticlesUseCase,
  });

  container.register(GetArticleBySlugUseCase, {
    useClass: GetArticleBySlugUseCase,
  });

  container.register(LoginUseCase, {
    useClass: LoginUseCase,
  });

  container.register(LogoutUseCase, {
    useClass: LogoutUseCase,
  });

  container.register(GetCurrentUserUseCase, {
    useClass: GetCurrentUserUseCase,
  });

  container.register(GenerateCVUseCase, {
    useClass: GenerateCVUseCase,
  });

  return container;
}

/**
 * Get a use case instance from the container
 */
export function getUseCase<T>(useCase: new (...args: any[]) => T): T {
  return container.resolve(useCase);
}
