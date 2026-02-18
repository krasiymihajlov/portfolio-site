'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { useTheme } from '@/presentation/contexts/ThemeContext';
import { useProjectData } from '@/presentation/hooks/useProjectData';
import styles from './ProjectDetail.module.css';

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { isDark } = useTheme();
  const projectId = params.id as string;
  const [hoveredScreenshot, setHoveredScreenshot] = useState<string | null>(null);
  const { projects, loading } = useProjectData('bg');

  const project = projects.find(p => p.id === projectId);

  if (loading) {
    return (
      <div className={`${styles.container} ${isDark ? styles.dark : ''}`}>
        <div className={styles.notFound}>
          <h1>Зареждане...</h1>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className={`${styles.container} ${isDark ? styles.dark : ''}`}>
        <div className={styles.notFound}>
          <h1>Проектът не е намерен</h1>
          <Link href="/" className={styles.backButton}>
            Назад към начало
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.container} ${isDark ? styles.dark : ''}`}>
      {/* Back Button */}
      <div className={styles.navigation}>
        <button onClick={() => router.back()} className={styles.backButton}>
          <svg className={styles.backIcon} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Назад
        </button>
      </div>

      {/* Hero Section */}
      <div className={`${styles.hero} ${isDark ? styles.dark : ''}`}>
        {project.image && (
          <div className={styles.heroImage}>
            <img
              src={project.image}
              alt={project.title}
              className={styles.heroImageImg}
            />
          </div>
        )}
        <h1 className={`${styles.title} ${isDark ? styles.dark : ''}`}>
          {project.title}
        </h1>

        {/* Technologies */}
        {project.technologies.length > 0 && (
          <div className={styles.technologies}>
            <p className={`${styles.techLabel} ${isDark ? styles.dark : ''}`}>
              Технологии:
            </p>
            <div className={styles.techBadges}>
              {project.technologies.map((tech, index) => (
                <span key={index} className={styles.techBadge}>
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Tags */}
        {project.tags.length > 0 && (
          <div className={styles.tags}>
            {project.tags.map((tag, index) => (
              <span key={index} className={`${styles.tag} ${isDark ? styles.dark : ''}`}>
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Description */}
      <div className={`${styles.content} ${isDark ? styles.dark : ''}`}>
        <h2 className={`${styles.sectionTitle} ${isDark ? styles.dark : ''}`}>
          Описание
        </h2>
        <div className={`${styles.description} ${isDark ? styles.dark : ''}`}>
          {project.fullDescription.split('\n').map((line, index) => {
            if (line.startsWith('##')) {
              return <h3 key={index} className={styles.subheading}>{line.replace('##', '').trim()}</h3>;
            } else if (line.startsWith('###')) {
              return <h4 key={index} className={styles.subheading2}>{line.replace('###', '').trim()}</h4>;
            } else if (line.startsWith('-')) {
              return <li key={index} className={styles.listItem}>{line.replace('-', '').trim()}</li>;
            } else if (line.trim()) {
              return <p key={index}>{line}</p>;
            }
            return <br key={index} />;
          })}
        </div>
      </div>

      {/* Screenshots */}
      {project.screenshots.length > 0 && (
        <div className={`${styles.screenshots} ${isDark ? styles.dark : ''}`}>
          <h2 className={`${styles.sectionTitle} ${isDark ? styles.dark : ''}`}>
            Разгледай
          </h2>
          <div className={styles.screenshotsGrid}>
            {project.screenshots.map((screenshot, index) => (
              <div
                key={index}
                className={styles.screenshotItem}
                onMouseEnter={() => setHoveredScreenshot(screenshot)}
                onMouseLeave={() => setHoveredScreenshot(null)}
              >
                <img
                  src={screenshot}
                  alt={`${project.title} screenshot ${index + 1}`}
                  className={styles.screenshot}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Enlarged Screenshot Preview - Tooltip Style */}
      {hoveredScreenshot && (
        <div className={styles.screenshotPreview}>
          <img
            src={hoveredScreenshot}
            alt="Preview"
            className={styles.previewImage}
          />
        </div>
      )}

      {/* Action Buttons */}
      <div className={styles.actions}>
        {project.link && project.link !== '#' && !project.link.startsWith('#') && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.primaryButton}
          >
            <svg className={styles.buttonIcon} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
            Посети сайта
          </a>
        )}
        <Link href="/#projects" className={`${styles.secondaryButton} ${isDark ? styles.dark : ''}`}>
          Виж други проекти
        </Link>
      </div>
    </div>
  );
}
