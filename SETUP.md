# Портфолио Сайт - Ръководство за настройка

## Преглед на проекта

Професионално портфолио с CV генератор, изградено с Next.js, TypeScript, Tailwind CSS и Firebase.

## Структура на проекта

```
portfolio-site/
├── src/
│   ├── app/                    # Next.js App Router страници
│   │   ├── page.tsx           # Homepage
│   │   ├── experience/        # Работен опит
│   │   ├── blog/             # Блог статии
│   │   ├── cv-generator/     # CV генератор (защитен)
│   │   └── login/            # Login страница
│   ├── components/           # React компоненти
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── contexts/            # React contexts
│   │   └── AuthContext.tsx
│   ├── lib/                # Библиотеки и конфигурации
│   │   └── firebase.ts
│   └── types/              # TypeScript типове
│       └── index.ts
├── .env.local             # Environment variables (не се commit-ва)
├── .env.example          # Пример за env променливи
└── package.json
```

## Функционалности

### 1. Homepage
- Hero секция с представяне
- Секция с умения
- Контакт форма

### 2. Работен опит
- Timeline с позиции
- Филтриране по години
- Mock данни (докато не се попълни Firebase)

### 3. Блог
- Листинг на статии
- Филтриране по категории
- Индивидуални страници за статии
- Mock данни за тестване

### 4. CV Генератор (Защитен)
- Login система с Firebase Auth
- Форма с:
  - Име на компания
  - Позиция
  - Времеви диапазон (от-до година)
  - Multi-select за умения
  - Upload на снимка
- Преглед на филтрирания опит
- Генериране на персонализирано CV

## Настройка

### 1. Инсталация на зависимости

```bash
cd portfolio-site
npm install
```

### 2. Firebase настройка

#### Стъпка 1: Създайте Firebase проект

1. Отидете на https://console.firebase.google.com/
2. Кликнете "Add project" или "Create a project"
3. Въведете име на проект (например "portfolio-site")
4. Следвайте стъпките за създаване

#### Стъпка 2: Регистрирайте Web AppСъздадох 

1. В Firebase Console, кликнете на иконата "</>" (Web)
2. Регистрирайте app с име (например "Portfolio Web App")
3. Копирайте Firebase config обекта

#### Стъпка 3: Активирайте Firebase услуги

**Authentication:**
1. Отидете на "Build" → "Authentication"
2. Кликнете "Get started"
3. Активирайте "Email/Password" provider
4. Създайте потребител от "Users" таб:
   - Email: вашият email
   - Password: вашата парола
   - Запишете си credentials-ите!

**Firestore Database:**
1. Отидете на "Build" → "Firestore Database"
2. Кликнете "Create database"
3. Изберете "Start in test mode" (за development)
4. Изберете location (europe-west1 за Европа)

**Storage:**
1. Отидете на "Build" → "Storage"
2. Кликнете "Get started"
3. Изберете "Start in test mode"

#### Стъпка 4: Конфигурирайте .env.local

```bash
cp .env.example .env.local
```

Редактирайте `.env.local` и попълнете Firebase credentials-ите:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 3. Стартиране на проекта

```bash
npm run dev
```

Отворете http://localhost:3000 в браузъра.

## Използване

### Тестване на сайта

1. **Homepage**: http://localhost:3000
   - Редактирайте "Вашето име" в `src/app/page.tsx:14`
   - Добавете вашите skills в същия файл

2. **Работен опит**: http://localhost:3000/experience
   - Показва mock данни
   - За да добавите реални данни, вижте секцията по-долу

3. **Блог**: http://localhost:3000/blog
   - Показва 3 примерни статии
   - За да добавите реални данни, вижте секцията по-долу

4. **CV Генератор**: http://localhost:3000/cv-generator
   - Първо трябва да влезете през http://localhost:3000/login
   - Използвайте email и парола от Firebase Auth

### Добавяне на реални данни

#### Работен опит (Firestore)

1. Отидете на Firebase Console → Firestore Database
2. Създайте collection "experiences"
3. Добавете документи със структура:

```json
{
  "company": "Компания ABC",
  "position": "Senior Developer",
  "description": "Описание на позицията",
  "startDate": "2022-01",
  "endDate": null,
  "technologies": ["React", "Next.js", "TypeScript"],
  "achievements": [
    "Постижение 1",
    "Постижение 2"
  ],
  "createdAt": "2024-01-15T00:00:00Z",
  "updatedAt": "2024-01-15T00:00:00Z"
}
```

#### Блог статии (Firestore)

1. Създайте collection "articles"
2. Добавете документи със структура:

```json
{
  "title": "Заглавие на статията",
  "slug": "url-friendly-slug",
  "excerpt": "Кратко описание",
  "content": "Пълно съдържание (може да е Markdown)",
  "category": "Технологии",
  "tags": ["React", "Next.js"],
  "published": true,
  "createdAt": "2024-01-15T00:00:00Z",
  "updatedAt": "2024-01-15T00:00:00Z"
}
```

## Deploy към Vercel

### 1. Push към GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/your-username/portfolio-site.git
git push -u origin main
```

### 2. Deploy на Vercel

1. Отидете на https://vercel.com
2. Кликнете "Add New" → "Project"
3. Import вашия GitHub repository
4. Добавете Environment Variables (същите като в .env.local)
5. Кликнете "Deploy"

### 3. Автоматични deployments

След първоначалния deploy, всеки `git push` ще trigger-не автоматичен deploy.

## Персонализация

### Промяна на име и информация

1. **Homepage**: `src/app/page.tsx`
   - Ред 14: Променете "[Вашето име]"
   - Ред 16-19: Променете описанието
   - Ред 48-68: Променете skills секцията

2. **Footer**: `src/components/Footer.tsx`
   - Ред 36-60: Променете email, GitHub, LinkedIn линкове

3. **Header**: `src/components/Header.tsx`
   - Ред 18: Променете "Портфолио" с вашето име

### Добавяне на нови умения в CV генератора

Редактирайте `src/app/cv-generator/page.tsx:12-24`:

```typescript
const availableSkills = [
  'JavaScript',
  'TypeScript',
  // Добавете нови умения тук
  'Python',
  'Docker',
];
```

## Troubleshooting

### Firebase грешки

**"Firebase: Error (auth/configuration-not-found)"**
- Проверете дали .env.local съществува
- Уверете се че всички променливи са попълнени
- Рестартирайте dev сървъра

**"Missing or insufficient permissions"**
- Уверете се че Firestore rules са в test mode
- Отидете на Firestore → Rules и добавете:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true; // За development
    }
  }
}
```

### Login не работи

1. Проверете дали сте създали потребител в Firebase Auth
2. Проверете дали Email/Password provider е активиран
3. Проверете browser console за грешки

## Следващи стъпки

- [ ] Добавете реални данни в Firestore
- [ ] Персонализирайте съдържанието
- [ ] Добавете собствени снимки
- [ ] Настройте custom domain в Vercel
- [ ] (Опционално) Имплементирайте PDF export за CV-тата
- [ ] (Опционално) Добавете email функционалност за контакт формата

## Поддръжка

За въпроси или проблеми:
- Проверете Firebase Console за грешки
- Проверете Browser Console (F12)
- Проверете Vercel deployment logs
