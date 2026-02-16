'use client';

import { useState, useEffect } from 'react';
import { BlogArticle } from '@/domain/entities/BlogArticle';
import { getUseCase } from '@/infrastructure/di/container';
import {
  GetAllPublishedArticlesUseCase,
  GetArticleBySlugUseCase,
} from '@/application/use-cases/blog';

/**
 * Hook for fetching all published blog articles
 */
export function useBlogArticles() {
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const useCase = getUseCase(GetAllPublishedArticlesUseCase);
        const data = await useCase.execute();
        setArticles(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return { articles, loading, error };
}

/**
 * Hook for fetching a single blog article by slug
 */
export function useBlogArticle(slug: string | null) {
  const [article, setArticle] = useState<BlogArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }

    const fetchArticle = async () => {
      try {
        setLoading(true);
        const useCase = getUseCase(GetArticleBySlugUseCase);
        const data = await useCase.execute(slug);
        setArticle(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  return { article, loading, error };
}
