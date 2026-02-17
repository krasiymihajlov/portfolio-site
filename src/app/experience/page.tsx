'use client';

import { useState } from 'react';
import { pdf } from '@react-pdf/renderer';
import { useTheme } from '@/presentation/contexts/ThemeContext';
import { CVDownloadModal } from '@/presentation/components/CVDownloadModal';
import { CVDocument } from '@/presentation/components/CVDocument';
import { useCVData } from '@/presentation/hooks/useCVData';
import { formatDate } from '@/data/cvData';
import { CV_PROFILE_IMAGE } from '@/data/siteConfig';
import { Locale } from '@/infrastructure/persistence/firebase/repositories/FirebaseCVDataRepository';
import styles from './ExperiencePage.module.css';

const skillLabels: Record<string, { en: string; bg: string }> = {
  languages:    { en: 'Languages',               bg: 'Езици' },
  backend:      { en: 'Backend',                 bg: 'Backend' },
  frontend:     { en: 'Frontend',                bg: 'Frontend' },
  databases:    { en: 'Databases',               bg: 'Бази данни' },
  devops:       { en: 'DevOps, Cloud, CI/CD & Hosting', bg: 'DevOps, Cloud, CI/CD & Hosting' },
  tools:        { en: 'Tools',                   bg: 'Инструменти' },
  architecture: { en: 'Architecture & Concepts', bg: 'Архитектура и концепции' },
  integrations: { en: 'Integrations & Services', bg: 'Интеграции и услуги' },
};

export default function ExperiencePage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [locale, setLocale] = useState<Locale>('bg');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const { experiences, education, skills, loading } = useCVData(locale);
  const { experiences: experiencesEN, education: educationEN } = useCVData('en');

  const handleDownloadCV = async (position: 'software-engineer' | 'merchant' | 'business-consultant') => {
    try {
      setIsGenerating(true);

      // Pre-fetch profile image as base64 so react-pdf doesn't make a network request during rendering
      let profileImageData: string = PROFILE_IMAGE;
      try {
        const imgResponse = await fetch(CV_PROFILE_IMAGE);
        const imgBlob = await imgResponse.blob();
        profileImageData = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(imgBlob);
        });
      } catch {
        // fallback to path if fetch fails
      }

      const doc = <CVDocument selectedPosition={position} experiences={experiencesEN} education={educationEN} skills={skills} profileImage={profileImageData ?? CV_PROFILE_IMAGE} />;
      const blob = await pdf(doc).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      const positionName = position === 'software-engineer'
        ? 'Software_Engineer'
        : position === 'merchant'
        ? 'Merchant'
        : 'Business_Consultant';
      link.download = `Krasimir_Mihaylov_CV_${positionName}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Възникна грешка при генерирането на PDF. Моля, опитайте отново.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className={`${styles.pageContainer} ${isDark ? styles.dark : ''}`}>
      {/* Hero Section */}
      <section className={`${styles.heroSection} ${isDark ? styles.dark : ''}`}>
        <div className={styles.heroContainer}>
          <div className={styles.heroContent}>
            <h1 className={`${styles.heroTitle} ${isDark ? styles.dark : ''}`}>
              Професионален опит
            </h1>
            <p className={`${styles.heroSubtitle} ${isDark ? styles.dark : ''}`}>
              10+ години опит в софтуерното инженерство, бизнес консултирането и предприемачеството
            </p>

            <div className={styles.buttonContainer}>
              {/* Locale Toggle */}
              <div className={`${styles.localeToggle} ${isDark ? styles.dark : ''}`}>
                <button
                  className={`${styles.localeBtn} ${locale === 'bg' ? styles.localeActive : ''} ${isDark ? styles.dark : ''}`}
                  onClick={() => setLocale('bg')}
                >
                  БГ
                </button>
                <button
                  className={`${styles.localeBtn} ${locale === 'en' ? styles.localeActive : ''} ${isDark ? styles.dark : ''}`}
                  onClick={() => setLocale('en')}
                >
                  EN
                </button>
              </div>

              {/* Download CV Button */}
              <button
                className={`${styles.downloadButton} ${isDark ? styles.dark : ''}`}
                onClick={() => setIsModalOpen(true)}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <svg className={styles.loadingIcon} fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Генериране...
                  </>
                ) : (
                  <>
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download CV
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className={styles.experienceSection}>
        <div className={styles.sectionContainer}>
          <h2 className={`${styles.sectionTitle} ${styles.centered} ${isDark ? styles.dark : ''}`}>
            {locale === 'bg' ? 'Трудов Опит' : 'Work Experience'}
          </h2>

          {loading ? (
            <div className={`${styles.loadingState} ${isDark ? styles.dark : ''}`}>
              <svg className={styles.loadingIcon} fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          ) : (
            <div className={styles.timelineContainer}>
              <div className={`${styles.timelineLine} ${isDark ? styles.dark : ''}`} />
              <div className={styles.timelineItems}>
                {experiences.map((experience, index) => (
                  <div key={experience.id} className={styles.timelineItem}>
                    <div className={`${styles.timelineDot} ${isDark ? styles.dark : ''}`} />
                    <div className={`${styles.experienceContent} ${index % 2 === 0 ? styles.right : styles.left}`}>
                      <div className={`${styles.experienceCard} ${isDark ? styles.dark : ''}`}>
                        <div className={styles.cardHeader}>
                          <h3 className={`${styles.jobTitle} ${isDark ? styles.dark : ''}`}>
                            {experience.position}
                          </h3>
                          <p className={`${styles.company} ${isDark ? styles.dark : ''}`}>
                            {experience.company}
                          </p>
                          <p className={`${styles.location} ${isDark ? styles.dark : ''}`}>
                            {experience.location}
                          </p>
                          <div className={`${styles.date} ${isDark ? styles.dark : ''}`}>
                            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {formatDate(experience.startDate, locale)} - {formatDate(experience.endDate, locale)}
                          </div>
                        </div>

                        <p className={`${styles.description} ${isDark ? styles.dark : ''}`}>
                          {experience.description}
                        </p>

                        {experience.website && (
                          <a href={experience.website} target="_blank" rel="noopener noreferrer"
                            className={`${styles.websiteLink} ${isDark ? styles.dark : ''}`}>
                            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            Visit Website
                          </a>
                        )}

                        {experience.technologies.length > 0 && (
                          <div className={styles.techSection}>
                            <h4 className={`${styles.sectionSubtitle} ${isDark ? styles.dark : ''}`}>
                              {locale === 'bg' ? 'Технологии:' : 'Technologies:'}
                            </h4>
                            <div className={styles.techContainer}>
                              {experience.technologies.map((tech, i) => (
                                <span key={i} className={`${styles.techBadge} ${isDark ? styles.dark : ''}`}>{tech}</span>
                              ))}
                            </div>
                          </div>
                        )}

                        {experience.achievements.length > 0 && (
                          <div>
                            <h4 className={`${styles.sectionSubtitle} ${isDark ? styles.dark : ''}`}>
                              {locale === 'bg' ? 'Постижения:' : 'Key Achievements:'}
                            </h4>
                            <ul className={styles.achievementsList}>
                              {experience.achievements.map((achievement, i) => (
                                <li key={i}
                                  className={`${styles.achievement} ${isDark ? styles.dark : ''} ${achievement.startsWith('**') ? styles.bold : achievement.startsWith('-') ? styles.indent : ''}`}>
                                  {achievement.startsWith('-') ? (
                                    <span className={styles.achievementWithBullet}>
                                      <span className={`${styles.bullet} ${isDark ? styles.dark : ''}`}>•</span>
                                      <span>{achievement.substring(1).trim()}</span>
                                    </span>
                                  ) : achievement}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Education Section */}
      <section className={`${styles.educationSection} ${isDark ? styles.dark : ''}`}>
        <div className={styles.sectionContainer}>
          <h2 className={`${styles.sectionTitle} ${styles.centered} ${isDark ? styles.dark : ''}`}>
            {locale === 'bg' ? 'Образование' : 'Education'}
          </h2>

          {!loading && (
            <div className={styles.educationGrid}>
              {education.map((edu) => (
                <div key={edu.id} className={`${styles.educationCard} ${isDark ? styles.dark : ''}`}>
                  <div className={`${styles.educationIcon} ${isDark ? styles.dark : ''}`}>
                    {edu.logo ? (
                      <img
                        src={edu.logo}
                        alt={edu.institution}
                        className={styles.educationLogo}
                      />
                    ) : (
                      <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      </svg>
                    )}
                  </div>
                  <h3 className={`${styles.educationInstitution} ${isDark ? styles.dark : ''}`}>{edu.institution}</h3>
                  <p className={`${styles.educationDegree} ${isDark ? styles.dark : ''}`}>{edu.degree}</p>
                  <p className={`${styles.educationPeriod} ${isDark ? styles.dark : ''}`}>{edu.period}</p>
                  {edu.gpa && (
                    <p className={`${styles.educationGpa} ${isDark ? styles.dark : ''}`}>GPA: {edu.gpa}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Programming Skills Section */}
      <section className={styles.skillsSection}>
        <div className={styles.sectionContainer}>
          <h2 className={`${styles.sectionTitle} ${styles.centered} ${isDark ? styles.dark : ''}`}>
            {locale === 'bg' ? 'Програмни умения' : 'Programming Skills'}
          </h2>

          {!loading && skills && (
            <div className={styles.skillsGrid}>
              {(Object.keys(skillLabels) as Array<keyof typeof skillLabels>).map((key) => {
                const items = skills[key as keyof typeof skills] as string[];
                if (!items || items.length === 0) return null;
                return (
                  <div key={key} className={`${styles.skillCard} ${isDark ? styles.dark : ''}`}>
                    <h3 className={`${styles.skillHeader} ${isDark ? styles.dark : ''}`}>
                      <span className={`${styles.skillIndicator} ${styles.main}`}></span>
                      {skillLabels[key][locale]}
                    </h3>
                    <ul className={styles.skillList}>
                      {items.map((skill, i) => (
                        <li key={i} className={`${styles.skillItem} ${isDark ? styles.dark : ''}`}>
                          <svg className={`${styles.skillCheckmark} ${styles.main}`} fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <CVDownloadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelectPosition={handleDownloadCV}
      />
    </div>
  );
}
