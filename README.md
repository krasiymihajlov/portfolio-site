# 🚀 Portfolio Site - Krasimir Mihaylov

Професионално портфолио уебсайт, фокусиран върху бизнес решения за малки и средни предприятия. Включва CV генератор с PDF експорт, интегрирана контактна форма с EmailJS, и динамично управление на проекти и опит чрез Firebase.

## 📋 Описание

Модерен и отзивчив портфолио сайт, построен с Next.js 16 и TypeScript, следвайки принципите на Clean Architecture. Сайтът представя професионален опит, проекти, услуги и позволява генериране на CV в PDF формат за различни професионални роли.

## ✨ Основни функционалности

- **🎨 Dark/Light Mode** - Автоматично запазване на предпочитанията
- **📄 CV Generator** - Генериране на PDF CV за 3 роли (Software Engineer, Merchant, Business Consultant)
- **📧 Contact Form** - Интегрирана контактна форма с EmailJS
- **🔥 Firebase Integration** - Управление на опит и проекти
- **📱 Responsive Design** - Оптимизиран за всички устройства
- **⚡ Performance** - Next.js 16 с Turbopack за бързо разработване

## 🛠️ Технологичен стек

### Frontend
- **Framework:** Next.js 16.1.1 (App Router)
- **Language:** TypeScript 5
- **Styling:** CSS Modules + Tailwind CSS 4
- **UI:** React 19.2.3

### Backend & Services
- **Database:** Firebase 12.7.0
- **Email Service:** EmailJS 4.4.1
- **PDF Generation:** @react-pdf/renderer 4.3.2

### Architecture
- **Pattern:** Clean Architecture
- **DI Container:** TSyringe (Dependency Injection)
- **State Management:** React Hooks + Context API

## 📁 Структура на проекта

```
portfolio-site/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── page.tsx             # Home page
│   │   ├── solutions/           # Решения и услуги
│   │   ├── experience/          # Опит и CV
│   │   ├── blog/                # Блог статии
│   │   └── contact/             # Контакти
│   ├── presentation/             # UI Layer
│   │   ├── components/          # React компоненти
│   │   ├── contexts/            # Context providers
│   │   ├── hooks/               # Custom hooks
│   │   └── styles/              # CSS modules
│   ├── application/              # Business Logic Layer
│   │   └── use-cases/           # Use cases
│   ├── domain/                   # Domain Layer
│   │   ├── entities/            # Business entities
│   │   └── interfaces/          # Interfaces
│   ├── infrastructure/           # Infrastructure Layer
│   │   ├── firebase/            # Firebase config
│   │   ├── emailjs/             # EmailJS service
│   │   └── di/                  # Dependency injection
│   └── data/                     # Static data
│       └── cvData.ts            # CV content
├── public/                       # Static assets
└── .env.local                    # Environment variables (not in git)
```

## 🚀 Стартиране на проекта

### Изисквания

- Node.js 20+
- npm или yarn

### Инсталация

1. **Клонирайте проекта:**
```bash
git clone https://github.com/your-username/portfolio-site.git
cd portfolio-site
```

2. **Инсталирайте зависимости:**
```bash
npm install
```

3. **Конфигурирайте environment variables:**

Създайте `.env.local` файл в root директорията:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# EmailJS Configuration
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

Вижте `.env.local.example` за повече информация.

4. **Стартирайте dev сървъра:**
```bash
npm run dev
```

Отворете [http://localhost:3000](http://localhost:3000) в браузъра.

## 📜 Налични скриптове

```bash
npm run dev      # Стартира development сървър
npm run build    # Прави production build
npm run start    # Стартира production сървър
npm run lint     # Проверява кода за грешки
```

## 🔧 Конфигурация

### Firebase Setup

1. Създайте Firebase проект на [Firebase Console](https://console.firebase.google.com/)
2. Добавете Web App в проекта
3. Копирайте конфигурацията в `.env.local`
4. Вижте `ARCHITECTURE.md` за повече детайли

### EmailJS Setup

1. Създайте акаунт на [EmailJS](https://www.emailjs.com/)
2. Създайте Email Service и Template
3. Копирайте credentials в `.env.local`
4. Вижте `EMAILJS_SETUP.md` за пълна инструкция

## 🌐 Deployment

Проектът е оптимизиран за deployment на Vercel:

1. Push кода към GitHub
2. Свържете GitHub repo с Vercel
3. Добавете environment variables в Vercel Dashboard
4. Deploy автоматично при push

Вижте `DEPLOYMENT_GUIDE.md` за детайлна инструкция.

## 📖 Документация

- `ARCHITECTURE.md` - Архитектура и дизайн patterns
- `DEPLOYMENT_GUIDE.md` - Deployment на Vercel
- `EMAILJS_SETUP.md` - EmailJS конфигурация
- `CONTACT_FORM_README.md` - Контактна форма
- `CLAUDE.md` - Development guidelines

## 🎨 Стилизация

Проектът използва **CSS Modules** за component-specific styling и **Tailwind CSS 4** за utility classes:

- Всеки компонент има собствен `.module.css` файл
- Dark mode поддръжка чрез CSS variables
- Responsive design с mobile-first подход

## 🔒 Сигурност

- Environment variables са изолирани в `.env.local`
- `.env.local` е в `.gitignore` (не се commit-ва)
- Firebase правила за достъп са конфигурирани
- EmailJS CORS security с allowed origins

## 🤝 Принос

Проектът е отворен за предложения и подобрения. Ако откриете проблем или имате идея:

1. Fork проекта
2. Създайте feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit промените (`git commit -m 'Add some AmazingFeature'`)
4. Push към branch (`git push origin feature/AmazingFeature`)
5. Отворете Pull Request

## 📄 Лиценз

Този проект е лицензиран под MIT License - вижте [LICENSE](LICENSE) файла за детайли.

## 👤 Автор

**Krasimir Mihaylov**

- Portfolio: [вашият-сайт.com](https://вашият-сайт.com)
- GitHub: https://github.com/krasiymihajlov
- LinkedIn: [Krasimir Mihaylov](https://www.linkedin.com/in/krasimir-mihailov-301429139/)

## 🙏 Благодарности

- Next.js team за страхотния framework
- Firebase за backend services
- EmailJS за email integration
- Vercel за hosting platform

---

**Изработено с ❤️ и Next.js**
