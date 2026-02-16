# Project Screenshots

Тази директория съдържа скрийншоти за проектите.

## Структура:

```
screenshots/
├── project-1-screenshot-1.jpg
├── project-1-screenshot-2.jpg
├── project-2-screenshot-1.jpg
└── ...
```

## Как да добавите скрийншоти:

### 1. Добавете снимките във папката

Копирайте скрийншотите в тази папка с описателни имена:
- ✅ `bok-dashboard.jpg`
- ✅ `bok-course-page.jpg`
- ✅ `bok-admin-panel.jpg`
- ❌ `Screenshot 2024-01-01.png`

### 2. Обновете project data

В `src/app/projects/[id]/page.tsx` добавете пътищата към screenshots масива:

```typescript
{
  id: 1,
  title: 'Българска Образователна Кибернетика',
  // ... други полета
  screenshots: [
    '/images/projects/screenshots/bok-dashboard.jpg',
    '/images/projects/screenshots/bok-course-page.jpg',
    '/images/projects/screenshots/bok-admin-panel.jpg',
  ],
}
```

### 3. Скрийншотите автоматично ще се покажат

На детайлната страница на проекта скрийншотите ще се показват в grid layout с hover ефекти.

## Препоръки:

- **Формат:** JPG за снимки, PNG за UI screenshots с текст
- **Размер:** Оптимизирайте преди upload (max 1MB на снимка)
- **Резолюция:** 1920x1080 или по-голяма за най-добро качество
- **Aspect Ratio:** 16:9 е препоръчителен за еднакъв grid layout

## Проекти без публичен сайт:

За проекти които нямат публичен сайт, скрийншотите са основният начин да покажете функционалността. Добавете:
- Главен екран/Dashboard
- Ключови функции
- Admin panel (ако има)
- Mobile view (ако е responsive)
