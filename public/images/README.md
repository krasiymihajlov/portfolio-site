# Images Directory

Тази директория съдържа всички снимки за Portfolio сайта.

## Структура:

```
public/images/
├── profile/        # Профилни снимки
├── projects/       # Снимки за проекти
├── blog/           # Снимки за блог статии
└── general/        # Общи снимки
```

## Как да добавите снимки:

1. **Копирайте снимката** в съответната поддиректория
2. **Използвайте в кода** с Next.js Image компонент

## Примери за употреба:

### За профилна снимка в Hero Section:

```tsx
import Image from 'next/image';

// В JSX кода:
<Image
  src="/images/profile/krasimir-mihaylov.jpg"
  alt="Красимир Михайлов"
  width={80}
  height={80}
  className={styles.profilePhotoImage}
/>
```

### За проектна снимка:

```tsx
<Image
  src="/images/projects/bok-website.jpg"
  alt="Уеб сайт на БОК"
  width={600}
  height={400}
/>
```

### За блог статия:

```tsx
<Image
  src="/images/blog/article-cover.jpg"
  alt="Заглавна снимка"
  width={800}
  height={450}
/>
```

## Препоръки:

- **Формат:** JPG за снимки, PNG за лога/графики, WebP за оптимизация
- **Размер:** Оптимизирайте снимките преди upload (max 500KB)
- **Имена:** Използвайте описателни имена с малки букви и тирета
  - ✅ `krasimir-mihaylov-profile.jpg`
  - ✅ `bok-website-screenshot.jpg`
  - ❌ `IMG_1234.jpg`
  - ❌ `Снимка 1.png`

## Next.js Image оптимизация:

Next.js автоматично оптимизира снимките чрез Image компонента:
- Lazy loading
- Responsive images
- WebP конвертиране
- Automatic sizing
