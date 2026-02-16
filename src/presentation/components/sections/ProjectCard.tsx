import React from 'react';
import Link from 'next/link';

interface ProjectCardProps {
  id: number;
  title: string;
  description: string;
  tags?: string[];
  technologies?: string[];
  image?: string;
  link?: string;
}

export function ProjectCard({
  id,
  title,
  description,
  tags = [],
  technologies = [],
  image,
  link = '#',
}: ProjectCardProps) {
  const cardContent = (
    <>
      {/* Image */}
      <div className="aspect-video bg-gray-200 dark:bg-gray-700 relative flex items-center justify-center rounded-2xl m-4">
        {image ? (
          <img
            src={image}
            alt={title}
            className="max-w-[85%] max-h-[85%] object-contain transition-transform group-hover:scale-105 rounded-xl shadow-lg"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg
              className="w-16 h-16 text-gray-400 dark:text-gray-500"
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

      {/* Content */}
      <div className="p-6">
        {/* Title - Centered */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 text-center">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {description}
        </p>

        {/* Technologies - Teal Badges like Job Titles */}
        {technologies.length > 0 && (
          <div className="mb-4">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 font-semibold">Технологии:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {technologies.map((tech, index) => (
                <span
                  key={index}
                  className="bg-teal-500 text-white text-xs font-medium px-3 py-1.5 rounded-full hover:bg-teal-600 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Tags - Category Tags (optional, shown if provided) */}
        {tags.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2 justify-center">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 mt-4">
          {link && link !== '#' && !link.startsWith('#') && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-2 px-4 rounded-lg font-medium transition-colors text-sm"
              onClick={(e) => e.stopPropagation()}
            >
              Посети сайта
            </a>
          )}
          <Link
            href={`/projects/${id}`}
            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white text-center py-2 px-4 rounded-lg font-medium transition-colors text-sm"
          >
            Виж повече
          </Link>
        </div>
      </div>
    </>
  );

  // Note: Cards are not wrapped in Link anymore - buttons handle navigation
  return (
    <div className="group bg-white dark:bg-gray-800 rounded-lg shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:brightness-105 dark:hover:brightness-110 hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.15)]">
      {cardContent}
    </div>
  );
}
