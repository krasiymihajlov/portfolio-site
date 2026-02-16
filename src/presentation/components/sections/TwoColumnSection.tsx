import React from 'react';

interface TwoColumnSectionProps {
  imagePosition: 'left' | 'right';
  heading: string;
  description: string | React.ReactNode;
  backgroundColor?: 'white' | 'gray';
  imageSrc?: string;
  imageAlt?: string;
}

export function TwoColumnSection({
  imagePosition,
  heading,
  description,
  backgroundColor = 'white',
  imageSrc,
  imageAlt = 'Section image',
}: TwoColumnSectionProps) {
  const bgClass = backgroundColor === 'gray'
    ? 'bg-gray-50 dark:bg-gray-800/50'
    : 'bg-white dark:bg-gray-900';

  const gridOrder = imagePosition === 'left'
    ? 'lg:grid-cols-2'
    : 'lg:grid-cols-2';

  const imageOrderClass = imagePosition === 'left'
    ? 'lg:order-first'
    : 'lg:order-last';

  const textOrderClass = imagePosition === 'left'
    ? 'lg:order-last'
    : 'lg:order-first';

  return (
    <section className={`${bgClass} transition-colors py-16 sm:py-24 lg:py-32`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className={`grid grid-cols-1 ${gridOrder} gap-x-8 gap-y-16 items-center`}>
          {/* Text Content */}
          <div className={textOrderClass}>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              {heading}
            </h2>
            <div className="text-lg leading-8 text-gray-600 dark:text-gray-300">
              {description}
            </div>
          </div>

          {/* Image */}
          <div className={imageOrderClass}>
            {imageSrc ? (
              <img
                src={imageSrc}
                alt={imageAlt}
                className="rounded-lg shadow-lg w-full h-auto"
              />
            ) : (
              <div className="rounded-lg bg-gray-200 dark:bg-gray-700 aspect-square flex items-center justify-center">
                <svg
                  className="w-24 h-24 text-gray-400 dark:text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
