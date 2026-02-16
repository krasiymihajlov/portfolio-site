import { inject, injectable } from 'tsyringe';
import { BlogArticle } from '@/domain/entities';
import type { IBlogRepository } from '@/domain/repositories';

/**
 * Use Case: Get all published blog articles
 * Returns only published articles for public viewing
 */
@injectable()
export class GetAllPublishedArticlesUseCase {
  constructor(
    @inject('IBlogRepository')
    private readonly repository: IBlogRepository
  ) {}

  async execute(): Promise<BlogArticle[]> {
    return await this.repository.findAllPublished();
  }
}
