import { inject, injectable } from 'tsyringe';
import { BlogArticle } from '@/domain/entities';
import type { IBlogRepository } from '@/domain/repositories';

/**
 * Use Case: Get article by slug
 * Retrieves a single article by its URL-friendly slug
 */
@injectable()
export class GetArticleBySlugUseCase {
  constructor(
    @inject('IBlogRepository')
    private readonly repository: IBlogRepository
  ) {}

  async execute(slug: string): Promise<BlogArticle | null> {
    const article = await this.repository.findBySlug(slug);

    // Only return if published (security check)
    if (article && !article.isPublished()) {
      return null;
    }

    return article;
  }
}
