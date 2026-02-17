'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from '@/presentation/contexts/ThemeContext';
import { ProjectCard } from '@/presentation/components/sections';
import { PROFILE_IMAGE } from '@/data/siteConfig';
import styles from './HomePage.module.css';

// Profile data constants
const PROFILE_IMAGE_PATH = PROFILE_IMAGE;
const PROFILE_NAME = 'Красимир Михайлов';
const PROFILE_IMAGE_SIZE = 112; // Width and height in pixels

// Job titles array
const jobTitles = [
  'Creative Technologist',
  'Electrical Engineer',
  'Software Engineer',
  'Merchant',
  'Business Consultant',
  'Insurance broker',
];

// Skills data for profile card with unique colors
const technicalSkills = [
  { id: 'tsql', name: 'Transact-SQL (T-SQL)', icon: 'database', color: '#3b82f6' },
  { id: 'mysql', name: 'MySQL', icon: 'circle-stack', color: '#60a5fa' },
  { id: 'dotnet', name: '.NET', icon: 'code-bracket', color: '#8b5cf6' },
  { id: 'react', name: 'React JS', icon: 'react', color: '#06b6d4' },
  { id: 'html', name: 'HTML', icon: 'document', color: '#f97316' },
  { id: 'css', name: 'CSS', icon: 'paint', color: '#ec4899' },
  { id: 'nginx', name: 'NGINX', icon: 'server', color: '#10b981' },
  { id: 'fullstack', name: 'Full-stack Developer', icon: 'command', color: '#6366f1' },
];

// Combined Business & Insurance skills (merged into one row)
const businessInsuranceSkills = [
  { id: 'sales', name: 'Sales Skills', icon: 'shopping-cart', color: '#22c55e' },
  { id: 'management', name: 'Management and Optimization', icon: 'users', color: '#6366f1' },
  { id: 'business-model', name: 'Creating a business model', icon: 'lightbulb', color: '#eab308' },
  { id: 'health', name: 'Health insurance', icon: 'heart-pulse', color: '#ef4444' },
  { id: 'life', name: 'Life insurance', icon: 'shield-check', color: '#3b82f6' },
  { id: 'investment', name: 'Investment insurance', icon: 'trending-up', color: '#10b981' },
];

// Updated projects data
const projects = [
  {
    id: 1,
    title: 'Българска Образователна Кибернетика',
    description: 'BOK Academy v2.0 е цялостна образователна платформа в сферата на предприемачеството, предназначена за управление на онлайн курсове, предоставяне на съдържание и записване на клиенти. Също така разполага с вътрешен административен панел, за създаване и управление, разплащателна система и система за SEO Оптимизация',
    tags: ['Web Application'],
    technologies: ['Node.js 18+', '.NET 8.0 SDK', 'TypeScript', 'MySQL 8.0+', 'Tailwind CSS', 'NGINX'],
    image: '/images/projects/logo-bok-skok.jpg',
    link: 'https://bok.bg/',
  },
  {
    id: 2,
    title: 'Автоматизиран генератор за оферти',
    description: '',
    tags: ['Web Application'],
    technologies: ["Google Apps Script", "JavaScript", "Google Sheets"],
    image: '/images/projects/offer-logo-bok.jpg',
    link: '#',
  },
  {
    id: 3,
    title: 'Генератор на график за медицински сестри',
    description: 'Placeholder description for nurse schedule generator',
    tags: ['Web Application'],
    technologies: ["Google Apps Script", "JavaScript", "Google Sheets"],
    image: '/images/projects/logo-maichin-dom.jpg',
    link: '#',
  },
];

export default function HomePage() {
  const { isDark } = useTheme();

  return (
    <div className={`${styles.pageContainer} ${isDark ? styles.dark : ''}`}>
      {/* Section 1: Hero - Two Interactive Cards */}
      <section className={styles.heroSection}>
        <div className={styles.heroContainer}>
          <div className={styles.heroCardsGrid}>

            {/* Profile Card */}
            <div className={`${styles.profileCard} ${isDark ? styles.dark : ''}`}>
              {/* Profile Header - Photo + Name */}
              <div className={styles.profileHeader}>
                <div className={styles.profilePhotoWrapper}>
                  <div className={`${styles.profilePhoto} ${isDark ? styles.dark : ''}`}>
                    <Image
                      src={PROFILE_IMAGE_PATH}
                      alt={PROFILE_NAME}
                      width={PROFILE_IMAGE_SIZE}
                      height={PROFILE_IMAGE_SIZE}
                      className={styles.profilePhotoImage}
                      priority
                    />
                  </div>
                  <div className={styles.profilePhotoZoom}>
                    <Image
                      src={PROFILE_IMAGE_PATH}
                      alt={PROFILE_NAME}
                      width={224}
                      height={224}
                      className={styles.profilePhotoZoomImage}
                    />
                  </div>
                </div>
                <h1 className={`${styles.profileName} ${isDark ? styles.dark : ''}`}>
                  {PROFILE_NAME}
                </h1>
              </div>

              {/* Job Titles */}
              <div className={styles.jobTitles}>
                {jobTitles.map((title, index) => (
                  <div
                    key={index}
                    className={`${styles.jobBadge} ${isDark ? styles.dark : ''}`}
                  >
                    {title}
                  </div>
                ))}
              </div>

              {/* Skills Section - 2 Rows with Colorful Icons */}
              <div className={styles.skillsSection}>
                {/* Technical Skills Row */}
                <div className={styles.skillsRow}>
                  {technicalSkills.map(skill => (
                    <div
                      key={skill.id}
                      className={styles.skillIcon}
                      data-tooltip={skill.name}
                      style={{ backgroundColor: `${skill.color}15`, color: skill.color }}
                    >
                      {skill.icon === 'database' && (
                        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                        </svg>
                      )}
                      {skill.icon === 'circle-stack' && (
                        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                        </svg>
                      )}
                      {skill.icon === 'code-bracket' && (
                        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                        </svg>
                      )}
                      {skill.icon === 'react' && (
                        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6.115 5.19l.319 1.913A6 6 0 008.11 10.36L9.75 12l-.387.775c-.217.433-.132.956.21 1.298l1.348 1.348c.21.21.329.497.329.795v1.089c0 .426.24.815.622 1.006l.153.076c.433.217.956.132 1.298-.21l.723-.723a8.7 8.7 0 002.288-4.042 1.087 1.087 0 00-.358-1.099l-1.33-1.108c-.251-.21-.582-.299-.905-.245l-1.17.195a1.125 1.125 0 01-.98-.314l-.295-.295a1.125 1.125 0 010-1.591l.13-.132a1.125 1.125 0 011.3-.21l.603.302a.809.809 0 001.086-1.086L14.25 7.5l1.256-.837a4.5 4.5 0 001.528-1.732l.146-.292M6.115 5.19A9 9 0 1017.18 4.64M6.115 5.19A8.965 8.965 0 0112 3c1.929 0 3.716.607 5.18 1.64" />
                        </svg>
                      )}
                      {skill.icon === 'document' && (
                        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                        </svg>
                      )}
                      {skill.icon === 'paint' && (
                        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
                        </svg>
                      )}
                      {skill.icon === 'server' && (
                        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 17.25v-.228a4.5 4.5 0 00-.12-1.03l-2.268-9.64a3.375 3.375 0 00-3.285-2.602H7.923a3.375 3.375 0 00-3.285 2.602l-2.268 9.64a4.5 4.5 0 00-.12 1.03v.228m19.5 0a3 3 0 01-3 3H5.25a3 3 0 01-3-3m19.5 0a3 3 0 00-3-3H5.25a3 3 0 00-3 3m16.5 0h.008v.008h-.008v-.008zm-3 0h.008v.008h-.008v-.008z" />
                        </svg>
                      )}
                      {skill.icon === 'command' && (
                        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
                        </svg>
                      )}
                    </div>
                  ))}
                </div>

                {/* Business & Insurance Skills Row (Combined) */}
                <div className={styles.skillsRow}>
                  {businessInsuranceSkills.map(skill => (
                    <div
                      key={skill.id}
                      className={styles.skillIcon}
                      data-tooltip={skill.name}
                      style={{ backgroundColor: `${skill.color}15`, color: skill.color }}
                    >
                      {skill.icon === 'shopping-cart' && (
                        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                        </svg>
                      )}
                      {skill.icon === 'users' && (
                        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                        </svg>
                      )}
                      {skill.icon === 'lightbulb' && (
                        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                        </svg>
                      )}
                      {skill.icon === 'heart-pulse' && (
                        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                        </svg>
                      )}
                      {skill.icon === 'shield-check' && (
                        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                        </svg>
                      )}
                      {skill.icon === 'trending-up' && (
                        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                        </svg>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Profile Footer - Location + Contact Button */}
              <div className={`${styles.profileFooter} ${isDark ? styles.dark : ''}`}>
                <div className={styles.location}>
                  <svg
                    className={`${styles.locationIcon} ${isDark ? styles.dark : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  <span className={`${styles.locationText} ${isDark ? styles.dark : ''}`}>
                    Варна, България
                  </span>
                </div>
                <Link href="/contact" className={`${styles.contactButton} ${isDark ? styles.dark : ''}`}>
                  Свържи се с мен
                </Link>
              </div>
            </div>

            {/* About Card */}
            <div className={`${styles.aboutCard} ${isDark ? styles.dark : ''}`}>
              <h2 className={`${styles.aboutTitle} ${isDark ? styles.dark : ''}`}>
                За Мен
              </h2>
              <p className={`${styles.aboutText} ${isDark ? styles.dark : ''}`}>
                Комбинирам над 10 години опит в софтуерното/електро инженерството, търговията и бизнеса, за да помагам на хора и компании да работят по-умно, по-бързо и по-ефективно. Чрез AI инструменти, иновативни подходи и модерни софтуерни решения подпомагам малки бизнеси, фрилансъри и организации да изграждат силно онлайн присъствие, да оптимизират процесите си и да превръщат идеите си в реални продукти, които носят стойност и продажби.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Section 2: Projects Grid */}
      <section id="projects" className={`${styles.projectsSection} ${isDark ? styles.dark : ''}`}>
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <h2 className={`${styles.sectionTitle} ${isDark ? styles.dark : ''}`}>
              Последни проекти
            </h2>
            <p className={`${styles.sectionSubtitle} ${isDark ? styles.dark : ''}`}>
              Реализирани решения за малки бизнеси
            </p>
          </div>

          <div className={styles.projectsGrid}>
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                id={project.id}
                title={project.title}
                description={project.description}
                tags={project.tags}
                technologies={project.technologies}
                image={project.image}
                link={project.link}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
