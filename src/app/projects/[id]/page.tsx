'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from '@/presentation/contexts/ThemeContext';
import styles from './ProjectDetail.module.css';

// Project data - TODO: Move to shared data file
const projects = [
  {
    id: 1,
    title: 'Българска Образователна Кибернетика',
    description: 'BOK Academy е цялостна образователна платформа в сферата на предприемачеството, предназначена за управление на онлайн курсове, предоставяне на съдържание и записване на клиенти. Също така разполага с вътрешен административен панел, за създаване и управление, разплащателна система и система за SEO Оптимизация',
    fullDescription: `
BOK Academy v2.0 е цялостна образователна платформа разработена специално за предприемачи и малки бизнеси, които искат да развият своите умения и знания в областта на бизнеса.

## Основни функционалности:

### Образователна платформа
- Управление на онлайн курсове с видео материали
- Интерактивни тестове и задачи
- Прогрес tracking за всеки студент
- Сертификати при завършване на курсове

### Административен панел
- Създаване и редактиране на курсове
- Управление на потребители и права
- Статистики и аналитика
- Управление на плащания

### Разплащателна система
- Интеграция със Stripe, Borica, Epay 
- Различни планове и пакети
- Автоматични фактури
- Recurring payments

### SEO оптимизация
- Автоматично генериране на meta tags
- Sitemap генерация
- Schema markup
- Open Graph integration

Платформата е изградена с модерни технологии и предлага отлично потребителско изживяване на всички устройства.
    `,
    tags: ['Web Application'],
    technologies: ['Node.js 18+', '.NET 8.0 SDK', 'TypeScript', 'MySQL 8.0+', 'Tailwind CSS', 'NGINX'],
    image: '/images/projects/logo-bok-skok.jpg',
    screenshots: [
      "/images/projects/screenshots/bok-login.png", 
      "/images/projects/screenshots/bok-courses.jpg", 
      "/images/projects/screenshots/admin-bok.png"
    ],
    link: 'https://bok.bg/',
  },
  {
    id: 2,
    title: 'Автоматизиран генератор за оферти',
    description: 'Placeholder description for automated quote generator',
    fullDescription: 'Детайлно описание на автоматизиран генератор за оферти...',
    tags: ['Web Application'],
    technologies: [],
    image: '/images/projects/offer-logo-bok.jpg',
    screenshots: [
      "/images/projects/screenshots/bok-offer.jpg",
      "/images/projects/screenshots/bok-offer.png"
    ],
    link: '#',
  },
  {
    id: 3,
    title: 'Генератор на график за медицински сестри',
    description: 'Placeholder description for nurse schedule generator',
    fullDescription: 'Детайлно описание на генератор на график за медицински сестри...',
    tags: ['Web Application'],
    technologies: [],
    image: '/images/projects/logo-maichin-dom.jpg',
    screenshots: [
      "/images/projects/screenshots/Nastroiki_med_sestri.png",
      "/images/projects/screenshots/Ekip_plan_otpuski.png",
      "/images/projects/screenshots/grafik-med-sestri.png"
    ],
    link: '#',
  },
];

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { isDark } = useTheme();
  const projectId = parseInt(params.id as string);
  const [hoveredScreenshot, setHoveredScreenshot] = useState<string | null>(null);

  const project = projects.find(p => p.id === projectId);

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
