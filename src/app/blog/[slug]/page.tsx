'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { marked } from 'marked';
import { useTheme } from '@/presentation/contexts/ThemeContext';
import { useBlogArticle } from '@/presentation/hooks/useBlog';
import styles from './BlogArticlePage.module.css';

// Конфигурация на marked
marked.setOptions({ breaks: true });

function processContent(content: string): string {
  // Премахва "## Увод" и "## Заключение" заглавия, но запазва съдържанието
  let processed = content
    .replace(/^##\s+Увод\s*$/gim, '')
    .replace(/^##\s+Заключение\s*$/gim, '')
    // Премахва SEO секцията от края (не е за показване)
    .replace(/^##\s+SEO метаданни[\s\S]*$/gim, '')
    // Премахва [ИЗОБРАЖЕНИЕ: ...] маркери
    .replace(/^\[ИЗОБРАЖЕНИЕ:.*?\]\s*$/gim, '')
    // Премахва [ВЪТРЕШЕН ЛИНК: ...] маркери
    .replace(/^\[ВЪТРЕШЕН ЛИНК:.*?\]\s*$/gim, '')
    // Премахва metadata редовете (Поредица, Статия №)
    .replace(/^\*\*Поредица:\*\*.*$/gim, '')
    .replace(/^\*\*Статия №:\*\*.*$/gim, '')
    // Премахва "Последна редакция" реда
    .replace(/^\*Последна редакция:.*\*\s*$/gim, '')
    // Почиства излишните празни редове
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  return processed;
}

function CoverImage({ src, alt, className }: { src: string; alt: string; className: string }) {
  const [error, setError] = useState(false);
  if (error) return null;
  return <img src={src} alt={alt} className={className} onError={() => setError(true)} />;
}

export default function BlogArticlePage() {
  const params = useParams();
  const slug = params.slug as string;
  const { isDark } = useTheme();
  const { article, loading, error } = useBlogArticle(slug);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('bg-BG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={`${styles.loadingText} ${isDark ? styles.dark : ''}`}>
          Зареждане...
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className={styles.notFoundContainer}>
        <h1 className={`${styles.notFoundTitle} ${isDark ? styles.dark : ''}`}>
          Статията не е намерена
        </h1>
        <Link href="/blog" className={`${styles.notFoundLink} ${isDark ? styles.dark : ''}`}>
          Обратно към блога
        </Link>
      </div>
    );
  }

  const processedContent = processContent(article.content);
  const htmlContent = marked(processedContent) as string;

  return (
    <div className={`${styles.pageContainer} ${isDark ? styles.dark : ''}`}>
      <article className={styles.articleContainer}>

        <div className={styles.backLinkContainer}>
          <Link href="/blog" className={`${styles.backLink} ${isDark ? styles.dark : ''}`}>
            ← Обратно към блога
          </Link>
        </div>

        {/* Cover image на статията */}
        <CoverImage
          src={article.coverImage || `/images/blog/${article.slug}.png`}
          alt={article.title}
          className={styles.articleCoverImage}
        />

        <header className={styles.articleHeader}>
          <div className={`${styles.articleMeta} ${isDark ? styles.dark : ''}`}>
            <time dateTime={article.createdAt.toISOString()}>
              {formatDate(article.createdAt)}
            </time>
            <span className={`${styles.categoryBadge} ${isDark ? styles.dark : ''}`}>
              {article.category}
            </span>
          </div>

          <h1 className={`${styles.articleTitle} ${isDark ? styles.dark : ''}`}>
            {article.title}
          </h1>

          <div className={styles.tagsContainer}>
            {article.tags.map((tag) => (
              <span key={tag} className={`${styles.tag} ${isDark ? styles.dark : ''}`}>
                #{tag}
              </span>
            ))}
          </div>
        </header>

        <div
          className={`${styles.articleContent} ${isDark ? styles.dark : ''}`}
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />

      </article>
    </div>
  );
}
