'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTheme } from '@/presentation/contexts/ThemeContext';
import { useBlogArticles } from '@/presentation/hooks/useBlog';
import styles from './BlogPage.module.css';

export default function BlogPage() {
  const { theme } = useTheme();
  const { articles, loading, error } = useBlogArticles();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const isDark = theme === 'dark';

  const categories = ['all', 'Технологии', 'Кариера', 'Съвети'];

  const filteredArticles =
    selectedCategory === 'all'
      ? articles
      : articles.filter((article) => article.category === selectedCategory);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('bg-BG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={`${styles.loadingText} ${isDark ? styles.dark : ''}`}>Зареждане...</div>
      </div>
    );
  }

  return (
    <div className={`${styles.pageContainer} ${isDark ? styles.dark : ''}`}>
      <div className={styles.container}>
        <div className={styles.heroSection}>
          <h1 className={`${styles.title} ${isDark ? styles.dark : ''}`}>
            Блог
          </h1>
          <p className={`${styles.subtitle} ${isDark ? styles.dark : ''}`}>
            Статии за технологии, кариера и полезни съвети за разработчици
          </p>
        </div>

        {/* Category Filter */}
        <div className={styles.categoryFilter}>
          <div className={styles.buttonGroup} role="group">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`${styles.categoryButton} ${isDark ? styles.dark : ''} ${
                  selectedCategory === category ? styles.active : ''
                }`}
              >
                {category === 'all' ? 'Всички' : category}
              </button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        <div className={styles.articlesGrid}>
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              className={styles.article}
            >
              <div className={styles.articleGradient} />

              <div className={styles.articleMeta}>
                <time className={styles.articleDate} dateTime={article.createdAt.toISOString()}>
                  {formatDate(article.createdAt)}
                </time>
                <span className={styles.categoryBadge}>
                  {article.category}
                </span>
              </div>

              <h3 className={styles.articleTitle}>
                <Link href={`/blog/${article.slug}`} className={styles.articleLink}>
                  {article.title}
                </Link>
              </h3>

              <p className={styles.articleExcerpt}>
                {article.excerpt}
              </p>

              <div className={styles.tagsContainer}>
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className={styles.tag}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className={styles.emptyState}>
            <p className={`${styles.emptyText} ${isDark ? styles.dark : ''}`}>Няма статии в тази категория.</p>
          </div>
        )}
      </div>
    </div>
  );
}
