'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/presentation/contexts/AuthContext';
import { useTheme } from '@/presentation/contexts/ThemeContext';
import styles from './LoginPage.module.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, user } = useAuth();
  const { isDark } = useTheme();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/cv-generator');
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signIn(email, password);
      router.push('/cv-generator');
    } catch (err: any) {
      setError('Грешен email или парола');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${styles.pageContainer} ${isDark ? styles.dark : ''}`}>
      <div className={styles.header}>
        <h2 className={`${styles.title} ${isDark ? styles.dark : ''}`}>
          Вход в CV генератор
        </h2>
      </div>

      <div className={styles.formContainer}>
        <form className={styles.form} onSubmit={handleSubmit}>
          {error && (
            <div className={`${styles.errorMessage} ${isDark ? styles.dark : ''}`}>
              <div className={`${styles.errorText} ${isDark ? styles.dark : ''}`}>
                {error}
              </div>
            </div>
          )}

          <div className={styles.inputGroup}>
            <label
              htmlFor="email"
              className={`${styles.label} ${isDark ? styles.dark : ''}`}
            >
              Email адрес
            </label>
            <div className={styles.inputWrapper}>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`${styles.input} ${isDark ? styles.dark : ''}`}
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label
              htmlFor="password"
              className={`${styles.label} ${isDark ? styles.dark : ''}`}
            >
              Парола
            </label>
            <div className={styles.inputWrapper}>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`${styles.input} ${isDark ? styles.dark : ''}`}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`${styles.submitButton} ${isDark ? styles.dark : ''}`}
            >
              {loading ? 'Зареждане...' : 'Вход'}
            </button>
          </div>
        </form>

        <p className={`${styles.footerText} ${isDark ? styles.dark : ''}`}>
          Тази страница е само за администратори
        </p>
      </div>
    </div>
  );
}
