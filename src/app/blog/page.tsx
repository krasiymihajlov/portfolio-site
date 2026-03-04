'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { useTheme } from '@/presentation/contexts/ThemeContext';
import { useBlogArticles } from '@/presentation/hooks/useBlog';
import styles from './BlogPage.module.css';

function ArticleImage({ src, alt, isDark, coverClass, placeholderClass }: {
  src: string; alt: string; isDark: boolean; coverClass: string; placeholderClass: string;
}) {
  const [error, setError] = useState(false);
  if (error) return <div className={placeholderClass} />;
  return <img src={src} alt={alt} className={coverClass} onError={() => setError(true)} />;
}

export default function BlogPage() {
  const { theme } = useTheme();
  const { articles, loading, error } = useBlogArticles();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const isDark = theme === 'dark';

  const categories = ['all', 'Бизнес организация', 'Технологии', 'Кариера', 'Съвети'];

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

  if (error) {
    return (
      <div className={styles.loading}>
        <div className={`${styles.loadingText} ${isDark ? styles.dark : ''}`}>
          Грешка при зареждане: {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.pageContainer} ${isDark ? styles.dark : ''}`}>
      <div className={styles.container}>

        {/* Header */}
        <div className={styles.header}>
          <p className={`${styles.subtitle} ${isDark ? styles.dark : ''}`}>
            Статии за технологии, организиране на бизнеса, електротехника и други
          </p>
        </div>

        {/* Main layout: sidebar + articles */}
        <div className={styles.mainLayout}>

          {/* Sidebar — Categories */}
          <aside className={`${styles.sidebar} ${isDark ? styles.dark : ''}`}>
            <p className={`${styles.sidebarLabel} ${isDark ? styles.dark : ''}`}>Категории</p>
            <nav className={styles.categoryList}>
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
            </nav>
          </aside>

          {/* Articles */}
          <div className={styles.articlesSection}>
            {filteredArticles.length === 0 ? (
              <div className={styles.emptyState}>
                <p className={`${styles.emptyText} ${isDark ? styles.dark : ''}`}>
                  Няма статии в тази категория.
                </p>
              </div>
            ) : (
              <div className={styles.articlesGrid}>
                {filteredArticles.map((article) => (
                  <article
                    key={article.id}
                    className={`${styles.articleCard} ${isDark ? styles.dark : ''}`}
                  >
                    {/* Cover image — Firebase coverImage или auto-detect по slug */}
                    <ArticleImage
                      src={article.coverImage || `/images/blog/${article.slug}.png`}
                      alt={article.title}
                      isDark={isDark}
                      coverClass={styles.coverImage}
                      placeholderClass={`${styles.imagePlaceholder} ${isDark ? styles.dark : ''}`}
                    />

                    {/* Content */}
                    <div className={styles.cardContent}>
                      <div className={styles.articleMeta}>
                        <time className={`${styles.articleDate} ${isDark ? styles.dark : ''}`}>
                          {formatDate(article.createdAt)}
                        </time>
                        <span className={styles.categoryBadge}>{article.category}</span>
                      </div>

                      <h3 className={`${styles.articleTitle} ${isDark ? styles.dark : ''}`}>
                        <Link href={`/blog/${article.slug}`} className={styles.articleLink}>
                          {article.title}
                        </Link>
                      </h3>

                      <div className={styles.tagsContainer}>
                        {article.tags.map((tag) => (
                          <span key={tag} className={`${styles.tag} ${isDark ? styles.dark : ''}`}>
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
