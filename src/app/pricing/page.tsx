'use client';

import { useTheme } from '@/presentation/contexts/ThemeContext';
import styles from './PricingPage.module.css';

export default function PricingPage() {
  const { isDark } = useTheme();

  return (
    <main>
      {/* Базови пакети - Empty Placeholder */}
      <section className={`${styles.section} ${styles.light} ${isDark ? styles.dark : ''}`}>
        <div className={styles.sectionContainer}>
          <h2 className={`${styles.sectionTitle} ${isDark ? styles.dark : ''}`}>
            Базови пакети
          </h2>
          <p className={`${styles.sectionText} ${isDark ? styles.dark : ''}`}>
            Coming soon...
          </p>
        </div>
      </section>

      {/* Индивидуални решения - Empty Placeholder */}
      <section className={`${styles.section} ${styles.gray} ${isDark ? styles.dark : ''}`}>
        <div className={styles.sectionContainer}>
          <h2 className={`${styles.sectionTitle} ${isDark ? styles.dark : ''}`}>
            Индивидуални решения
          </h2>
          <p className={`${styles.sectionText} ${isDark ? styles.dark : ''}`}>
            Coming soon...
          </p>
        </div>
      </section>
    </main>
  );
}
