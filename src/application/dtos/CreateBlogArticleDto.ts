/**
 * DTO for creating a new blog article
 */
export interface CreateBlogArticleDto {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  published: boolean;
  coverImage?: string;
}
