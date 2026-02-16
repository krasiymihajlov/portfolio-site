import { BlogArticle } from '../entities/BlogArticle';

/**
 * Repository interface for BlogArticle aggregate
 * Infrastructure layer must implement this contract
 */
export interface IBlogRepository {
  /**
   * Find all published blog articles ordered by creation date (descending)
   */
  findAllPublished(): Promise<BlogArticle[]>;

  /**
   * Find all articles (including drafts) - admin only
   */
  findAll(): Promise<BlogArticle[]>;

  /**
   * Find an article by slug
   */
  findBySlug(slug: string): Promise<BlogArticle | null>;

  /**
   * Find an article by ID
   */
  findById(id: string): Promise<BlogArticle | null>;

  /**
   * Find articles by category
   */
  findByCategory(category: string): Promise<BlogArticle[]>;

  /**
   * Find articles by tag
   */
  findByTag(tag: string): Promise<BlogArticle[]>;

  /**
   * Search articles by title or content
   */
  search(query: string): Promise<BlogArticle[]>;

  /**
   * Create a new blog article
   */
  create(article: Omit<BlogArticle, 'id' | 'createdAt' | 'updatedAt'>): Promise<BlogArticle>;

  /**
   * Update an existing blog article
   */
  update(id: string, article: Partial<BlogArticle>): Promise<BlogArticle>;

  /**
   * Delete a blog article
   */
  delete(id: string): Promise<void>;

  /**
   * Publish/unpublish an article
   */
  setPublished(id: string, published: boolean): Promise<void>;
}
