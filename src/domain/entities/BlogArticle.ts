export class BlogArticle {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly slug: string,
    public readonly excerpt: string,
    public readonly content: string, // Markdown content
    public readonly category: string,
    public readonly tags: readonly string[],
    public readonly published: boolean,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly coverImage?: string
  ) {}

  /**
   * Checks if the article is published
   */
  isPublished(): boolean {
    return this.published;
  }

  /**
   * Checks if the article has a specific tag
   */
  hasTag(tag: string): boolean {
    return this.tags.includes(tag);
  }

  /**
   * Checks if the article belongs to a category
   */
  isInCategory(category: string): boolean {
    return this.category === category;
  }

  /**
   * Gets reading time estimate (based on word count)
   */
  getReadingTimeMinutes(): number {
    const wordsPerMinute = 200;
    const wordCount = this.content.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  }
}
