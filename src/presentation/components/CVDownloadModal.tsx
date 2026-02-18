'use client';

import styles from './CVDownloadModal.module.css';

interface CVDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPosition: (position: 'software-engineer' | 'merchant' | 'business-consultant') => void;
}

export function CVDownloadModal({ isOpen, onClose, onSelectPosition }: CVDownloadModalProps) {
  if (!isOpen) return null;

  const positions = [
    {
      id: 'software-engineer' as const,
      title: 'Софтуерен инжинер',
      icon: (
        <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      description: 'CV фокусирано върху технически умения и софтуерни проекти',
    },
    // {
    //   id: 'merchant' as const,
    //   title: 'Търговец',
    //   icon: (
    //     <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    //       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    //     </svg>
    //   ),
    //   description: 'CV фокусирано върху продажби и бизнес консултации',
    // },
    // {
    //   id: 'business-consultant' as const,
    //   title: 'Бизнес консултант',
    //   icon: (
    //     <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    //       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    //     </svg>
    //   ),
    //   description: 'CV фокусирано върху бизнес стратегия и управление',
    // },
  ];

  return (
    <div className={styles.modalOverlay}>
      {/* Backdrop */}
      <div className={styles.backdrop} onClick={onClose} />

      {/* Modal */}
      <div className={styles.modalContainer}>
        <div className={styles.modalContent}>
          {/* Close button */}
          <button onClick={onClose} className={styles.closeButton}>
            <svg className={styles.closeIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Header */}
          <div className={styles.header}>
            <h2 className={styles.modalTitle}>
              Изберете тип CV
            </h2>
            <p className={styles.modalDescription}>
              Изберете за каква позиция ви е необходимо CV-то
            </p>
          </div>

          {/* Position cards */}
          <div className={styles.positionsGrid}>
            {positions.map((position) => (
              <button
                key={position.id}
                onClick={() => {
                  onSelectPosition(position.id);
                  onClose();
                }}
                className={styles.positionCard}
              >
                <div className={styles.iconContainer}>
                  {position.icon}
                </div>
                <div className={styles.positionInfo}>
                  <h3 className={styles.positionTitle}>
                    {position.title}
                  </h3>
                  <p className={styles.positionDescription}>
                    {position.description}
                  </p>
                </div>
                <div className={styles.arrowContainer}>
                  <svg className={styles.arrow} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
