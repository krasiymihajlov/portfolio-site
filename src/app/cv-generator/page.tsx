'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/presentation/contexts/AuthContext';
import { useTheme } from '@/presentation/contexts/ThemeContext';
import { useExperiences } from '@/presentation/hooks/useExperiences';
import styles from './CVGeneratorPage.module.css';

interface CVFormDataState {
  companyName: string;
  positionAppliedFor: string;
  companyDescription: string;
  startYear: number;
  endYear: number;
  selectedSkills: string[];
  customImage: File | null;
}

// Mock data за умения
const availableSkills = [
  'JavaScript',
  'TypeScript',
  'React',
  'Next.js',
  'Node.js',
  'Firebase',
  'Tailwind CSS',
  'Git',
  'REST APIs',
  'GraphQL',
  'SQL',
  'MongoDB',
];

export default function CVGeneratorPage() {
  const { user, loading: authLoading } = useAuth();
  const { experiences: allExperiences, loading: experiencesLoading } = useExperiences();
  const { isDark } = useTheme();
  const router = useRouter();

  const [formData, setFormData] = useState<CVFormDataState>({
    companyName: '',
    positionAppliedFor: '',
    companyDescription: '',
    startYear: 2020,
    endYear: new Date().getFullYear(),
    selectedSkills: [],
    customImage: null,
  });

  const [imagePreview, setImagePreview] = useState<string>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  // Филтриране на опита по години
  const filteredExperiences = allExperiences.filter((exp) =>
    exp.isWithinDateRange(formData.startYear, formData.endYear)
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, customImage: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleSkill = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedSkills: prev.selectedSkills.includes(skill)
        ? prev.selectedSkills.filter((s) => s !== skill)
        : [...prev.selectedSkills, skill],
    }));
  };

  const handleGenerateCV = async () => {
    setLoading(true);
    try {
      // Тук може да добавим логика за генериране на PDF или запазване в Firebase
      console.log('Generated CV with data:', {
        ...formData,
        filteredExperiences,
      });
      alert('CV генерирано успешно!');
    } catch (error) {
      console.error('Error generating CV:', error);
      alert('Грешка при генериране на CV');
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || experiencesLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={`${styles.loadingText} ${isDark ? styles.dark : ''}`}>
          Зареждане...
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className={`${styles.pageContainer} ${isDark ? styles.dark : ''}`}>
      <div className={styles.mainContainer}>
        <div className={styles.header}>
          <h1 className={`${styles.title} ${isDark ? styles.dark : ''}`}>
            CV Генератор
          </h1>
          <p className={`${styles.subtitle} ${isDark ? styles.dark : ''}`}>
            Попълнете формата за да генерирате персонализирано CV за конкретна компания
          </p>
        </div>

        <div className={styles.formContainer}>
          <div className={styles.formGrid}>
            {/* Form Section */}
            <div className={styles.formSection}>
              <div className={styles.inputGroup}>
                <label className={`${styles.label} ${isDark ? styles.dark : ''}`}>
                  Име на компания *
                </label>
                <input
                  type="text"
                  required
                  value={formData.companyName}
                  onChange={(e) =>
                    setFormData({ ...formData, companyName: e.target.value })
                  }
                  className={`${styles.input} ${isDark ? styles.dark : ''}`}
                  placeholder="Компания АБВ"
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={`${styles.label} ${isDark ? styles.dark : ''}`}>
                  Позиция *
                </label>
                <input
                  type="text"
                  required
                  value={formData.positionAppliedFor}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      positionAppliedFor: e.target.value,
                    })
                  }
                  className={`${styles.input} ${isDark ? styles.dark : ''}`}
                  placeholder="Senior Developer"
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={`${styles.label} ${isDark ? styles.dark : ''}`}>
                  Описание на компанията (опционално)
                </label>
                <textarea
                  rows={3}
                  value={formData.companyDescription}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      companyDescription: e.target.value,
                    })
                  }
                  className={`${styles.textarea} ${isDark ? styles.dark : ''}`}
                  placeholder="Описание на компанията..."
                />
              </div>

              <div className={styles.yearGrid}>
                <div className={styles.inputGroup}>
                  <label className={`${styles.label} ${isDark ? styles.dark : ''}`}>
                    От година
                  </label>
                  <input
                    type="number"
                    min="2000"
                    max={new Date().getFullYear()}
                    value={formData.startYear}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        startYear: parseInt(e.target.value),
                      })
                    }
                    className={`${styles.input} ${isDark ? styles.dark : ''}`}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label className={`${styles.label} ${isDark ? styles.dark : ''}`}>
                    До година
                  </label>
                  <input
                    type="number"
                    min="2000"
                    max={new Date().getFullYear()}
                    value={formData.endYear}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        endYear: parseInt(e.target.value),
                      })
                    }
                    className={`${styles.input} ${isDark ? styles.dark : ''}`}
                  />
                </div>
              </div>

              <div className={styles.skillsSection}>
                <label className={`${styles.skillsLabel} ${isDark ? styles.dark : ''}`}>
                  Умения
                </label>
                <div className={styles.skillsContainer}>
                  {availableSkills.map((skill) => (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => toggleSkill(skill)}
                      className={`${styles.skillBadge} ${
                        formData.selectedSkills.includes(skill) ? styles.selected : ''
                      } ${isDark ? styles.dark : ''}`}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.imageUploadSection}>
                <label className={`${styles.imageUploadLabel} ${isDark ? styles.dark : ''}`}>
                  Снимка (опционално)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className={`${styles.imageInput} ${isDark ? styles.dark : ''}`}
                />
                {imagePreview && (
                  <div className={styles.imagePreview}>
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className={styles.imagePreviewImg}
                    />
                  </div>
                )}
              </div>

              <button
                onClick={handleGenerateCV}
                disabled={loading || !formData.companyName || !formData.positionAppliedFor}
                className={`${styles.submitButton} ${isDark ? styles.dark : ''}`}
              >
                {loading ? 'Генериране...' : 'Генерирай CV'}
              </button>
            </div>

            {/* Preview Section */}
            <div className={`${styles.previewSection} ${isDark ? styles.dark : ''}`}>
              <h3 className={`${styles.previewTitle} ${isDark ? styles.dark : ''}`}>
                Преглед на филтрирания опит
              </h3>

              <p className={`${styles.previewSubtitle} ${isDark ? styles.dark : ''}`}>
                Показани са позиции от {formData.startYear} до {formData.endYear} година
              </p>

              <div className={styles.previewList}>
                {filteredExperiences.length > 0 ? (
                  filteredExperiences.map((exp) => (
                    <div
                      key={exp.id}
                      className={`${styles.previewCard} ${isDark ? styles.dark : ''}`}
                    >
                      <h4 className={`${styles.previewCardTitle} ${isDark ? styles.dark : ''}`}>
                        {exp.position}
                      </h4>
                      <p className={`${styles.previewCardCompany} ${isDark ? styles.dark : ''}`}>
                        {exp.company}
                      </p>
                      <p className={`${styles.previewCardDate} ${isDark ? styles.dark : ''}`}>
                        {exp.startDate} - {exp.endDate || 'Настояще'}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className={`${styles.emptyState} ${isDark ? styles.dark : ''}`}>
                    Няма опит в избрания период
                  </p>
                )}
              </div>

              {formData.selectedSkills.length > 0 && (
                <div className={styles.selectedSkillsSection}>
                  <h4 className={`${styles.selectedSkillsTitle} ${isDark ? styles.dark : ''}`}>
                    Избрани умения:
                  </h4>
                  <div className={styles.selectedSkillsContainer}>
                    {formData.selectedSkills.map((skill) => (
                      <span
                        key={skill}
                        className={`${styles.selectedSkillTag} ${isDark ? styles.dark : ''}`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
