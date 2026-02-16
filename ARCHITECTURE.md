# Clean Architecture - Проектна Структура

## Общ Преглед

Проектът следва **Clean Architecture** принципите с пълна слоева изолация и Dependency Injection.

### ✅ Статус на Имплементацията

- ✅ **Domain Layer** - Завършен (Entities, Repository Interfaces)
- ✅ **Application Layer** - Завършен (Use Cases, DTOs)
- ✅ **Infrastructure Layer** - Завършен (Firebase Repositories, DI Container)
- ✅ **Presentation Layer** - Завършен (Hooks, Components, Contexts)

## Слоева Архитектура

```
┌─────────────────────────────────────────────────────────────┐
│                     PRESENTATION LAYER                       │
│              (React Components, Next.js Pages)               │
│                    Depends on: Application                   │
└──────────────────────────┬──────────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────────┐
│                    APPLICATION LAYER                         │
│            (Use Cases, DTOs, Service Interfaces)             │
│                    Depends on: Domain                        │
└──────────────────────────┬──────────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────────┐
│                      DOMAIN LAYER                            │
│           (Entities, Repository Interfaces)                  │
│                   Depends on: NOTHING                        │
└──────────────────────────▲──────────────────────────────────┘
                           │
┌──────────────────────────┴──────────────────────────────────┐
│                  INFRASTRUCTURE LAYER                        │
│        (Firebase, External Services, DI Container)           │
│           Depends on: Domain, Application                    │
└─────────────────────────────────────────────────────────────┘
```

## Структура на Директориите

```
src/
├── domain/                          # ⭕ DOMAIN LAYER (Core Business Logic)
│   ├── entities/                    # Business entities (Plain TypeScript classes)
│   │   ├── WorkExperience.ts
│   │   ├── BlogArticle.ts
│   │   ├── User.ts
│   │   ├── Skill.ts
│   │   └── CVFormData.ts
│   │
│   └── repositories/                # Repository interfaces (contracts)
│       ├── IWorkExperienceRepository.ts
│       ├── IBlogRepository.ts
│       ├── IAuthRepository.ts
│       └── IStorageRepository.ts
│
├── application/                     # 🔵 APPLICATION LAYER (Use Cases)
│   ├── dtos/                        # Data Transfer Objects
│   │   ├── CreateWorkExperienceDto.ts
│   │   ├── UpdateBlogArticleDto.ts
│   │   └── GenerateCVDto.ts
│   │
│   ├── use-cases/                   # Business use cases
│   │   ├── auth/
│   │   │   ├── LoginUseCase.ts
│   │   │   └── LogoutUseCase.ts
│   │   ├── blog/
│   │   │   ├── GetAllArticlesUseCase.ts
│   │   │   ├── GetArticleBySlugUseCase.ts
│   │   │   └── CreateArticleUseCase.ts
│   │   ├── experience/
│   │   │   ├── GetAllExperiencesUseCase.ts
│   │   │   └── GetExperiencesByDateRangeUseCase.ts
│   │   └── cv-generator/
│   │       ├── GenerateCVUseCase.ts
│   │       └── UploadCVImageUseCase.ts
│   │
│   └── interfaces/                  # Service interfaces
│       └── IEmailService.ts
│
├── infrastructure/                  # 🟢 INFRASTRUCTURE LAYER (External Dependencies)
│   ├── persistence/
│   │   ├── firebase/               # Firebase implementations
│   │   │   ├── repositories/
│   │   │   │   ├── FirebaseWorkExperienceRepository.ts
│   │   │   │   ├── FirebaseBlogRepository.ts
│   │   │   │   ├── FirebaseAuthRepository.ts
│   │   │   │   └── FirebaseStorageRepository.ts
│   │   │   └── config/
│   │   │       └── firebase.config.ts
│   │   └── models/                 # Firebase-specific models (if needed)
│   │
│   ├── services/                   # External service implementations
│   │   └── EmailService.ts
│   │
│   └── di/                         # Dependency Injection
│       ├── container.ts            # DI Container setup
│       └── tokens.ts               # Injection tokens
│
├── presentation/                    # 🟣 PRESENTATION LAYER (UI)
│   ├── app/                        # Next.js App Router
│   │   ├── (pages)/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── components/                 # React components
│   │   ├── common/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── ThemeToggle.tsx
│   │   ├── features/
│   │   │   ├── blog/
│   │   │   ├── experience/
│   │   │   └── cv-generator/
│   │   └── ui/                     # Reusable UI components
│   │
│   ├── hooks/                      # Custom React hooks
│   │   ├── useAuth.ts
│   │   ├── useBlog.ts
│   │   ├── useExperience.ts
│   │   └── useCVGenerator.ts
│   │
│   └── contexts/                   # React contexts
│       ├── AuthContext.tsx
│       └── ThemeContext.tsx
│
└── shared/                         # 🟡 SHARED (Cross-cutting concerns)
    ├── types/                      # Shared types
    ├── utils/                      # Utility functions
    ├── constants/                  # Constants
    └── errors/                     # Custom error classes
```

## Имплементирани Компоненти

### Domain Layer
- ✅ `WorkExperience` - Business entity за работен опит с методи за филтриране
- ✅ `BlogArticle` - Entity за блог статии с reading time calculation
- ✅ `User` - Authentication entity
- ✅ `Skill` - Skills entity
- ✅ `CVFormData` - Form data с built-in validation
- ✅ `GeneratedCV` - CV entity
- ✅ Repository interfaces: `IWorkExperienceRepository`, `IBlogRepository`, `IAuthRepository`, `IStorageRepository`

### Application Layer
- ✅ **Work Experience Use Cases:**
  - `GetAllExperiencesUseCase`
  - `GetExperienceByIdUseCase`
  - `GetExperiencesByDateRangeUseCase`
  - `CreateExperienceUseCase`
  - `UpdateExperienceUseCase`
  - `DeleteExperienceUseCase`

- ✅ **Blog Use Cases:**
  - `GetAllPublishedArticlesUseCase`
  - `GetArticleBySlugUseCase`

- ✅ **Auth Use Cases:**
  - `LoginUseCase`
  - `LogoutUseCase`
  - `GetCurrentUserUseCase`

- ✅ **CV Generator Use Cases:**
  - `GenerateCVUseCase`

### Infrastructure Layer
- ✅ **Firebase Repositories:**
  - `FirebaseWorkExperienceRepository`
  - `FirebaseBlogRepository`
  - `FirebaseAuthRepository`
  - `FirebaseStorageRepository`
- ✅ Firebase configuration
- ✅ DI Container setup с tsyringe
- ✅ DIProvider за инициализация

### Presentation Layer
- ✅ **Hooks:**
  - `useExperiences`, `useExperience`, `useExperiencesByDateRange`
  - `useBlogArticles`, `useBlogArticle`
  - `useAuth`
  - `useCVGenerator`

- ✅ **Components:**
  - `Header` - Navigation с dark mode
  - `Footer` - Footer information
  - `ThemeToggle` - Dark/Light mode toggle

- ✅ **Contexts:**
  - `AuthContext` - Authentication state management
  - `ThemeContext` - Theme state management

## Dependency Flow (Dependency Rule)

**Правило:** Зависимостите трябва да сочат НАВЪТРЕ към по-вътрешните слоеве.

```
Infrastructure → Application → Domain
Presentation → Application → Domain

❌ Domain НЕ ТРЯБВА да зависи от нищо
❌ Application НЕ ТРЯБВА да зависи от Infrastructure
❌ Domain/Application НЕ ТРЯБВА да знаят за React/Next.js
```

## Dependency Injection Setup

### Технологии
- **tsyringe** - DI Container
- **reflect-metadata** - Decorator metadata support

### Конфигурация (tsconfig.json)
```json
{
  "experimentalDecorators": true,
  "emitDecoratorMetadata": true
}
```

### Регистрация на Dependencies

```typescript
// infrastructure/di/container.ts
import { container } from 'tsyringe';
import { IWorkExperienceRepository } from '@/domain/repositories/IWorkExperienceRepository';
import { FirebaseWorkExperienceRepository } from '@/infrastructure/persistence/firebase/repositories/FirebaseWorkExperienceRepository';

// Регистрация
container.register<IWorkExperienceRepository>(
  'IWorkExperienceRepository',
  { useClass: FirebaseWorkExperienceRepository }
);
```

### Инжектиране в Use Cases

```typescript
// application/use-cases/experience/GetAllExperiencesUseCase.ts
import { inject, injectable } from 'tsyringe';
import { IWorkExperienceRepository } from '@/domain/repositories/IWorkExperienceRepository';

@injectable()
export class GetAllExperiencesUseCase {
  constructor(
    @inject('IWorkExperienceRepository')
    private repository: IWorkExperienceRepository
  ) {}

  async execute(): Promise<WorkExperience[]> {
    return await this.repository.findAll();
  }
}
```

### Употреба в React Components

```typescript
// presentation/hooks/useExperience.ts
import { container } from 'tsyringe';
import { GetAllExperiencesUseCase } from '@/application/use-cases/experience/GetAllExperiencesUseCase';

export function useExperience() {
  const getAllExperiences = container.resolve(GetAllExperiencesUseCase);

  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    getAllExperiences.execute().then(setExperiences);
  }, []);

  return { experiences };
}
```

## Принципи

### 1. Single Responsibility Principle (SRP)
Всеки клас трябва да има една-единствена отговорност.

### 2. Dependency Inversion Principle (DIP)
- High-level модули не зависят от low-level модули
- И двата зависят от абстракции (interfaces)

### 3. Interface Segregation Principle (ISP)
- Repository interfaces са специфични за use case
- Не създаваме "god interfaces"

### 4. Open/Closed Principle (OCP)
- Отворени за разширение, затворени за модификация
- Лесно добавяне на нови Firebase alternatives

## Как да Добавим Нова Функционалност

### Пример: Добавяне на Comments система

#### Стъпка 1: Domain Layer
```typescript
// domain/entities/Comment.ts
export class Comment {
  constructor(
    public id: string,
    public articleId: string,
    public author: string,
    public content: string,
    public createdAt: Date
  ) {}
}

// domain/repositories/ICommentRepository.ts
export interface ICommentRepository {
  findByArticleId(articleId: string): Promise<Comment[]>;
  create(comment: Comment): Promise<Comment>;
  delete(id: string): Promise<void>;
}
```

#### Стъпка 2: Application Layer
```typescript
// application/use-cases/comments/GetCommentsByArticleUseCase.ts
@injectable()
export class GetCommentsByArticleUseCase {
  constructor(
    @inject('ICommentRepository')
    private repository: ICommentRepository
  ) {}

  async execute(articleId: string): Promise<Comment[]> {
    return await this.repository.findByArticleId(articleId);
  }
}
```

#### Стъпка 3: Infrastructure Layer
```typescript
// infrastructure/persistence/firebase/repositories/FirebaseCommentRepository.ts
@injectable()
export class FirebaseCommentRepository implements ICommentRepository {
  async findByArticleId(articleId: string): Promise<Comment[]> {
    // Firebase implementation
  }
}

// infrastructure/di/container.ts
container.register<ICommentRepository>(
  'ICommentRepository',
  { useClass: FirebaseCommentRepository }
);
```

#### Стъпка 4: Presentation Layer
```typescript
// presentation/hooks/useComments.ts
export function useComments(articleId: string) {
  const getComments = container.resolve(GetCommentsByArticleUseCase);
  // React logic
}
```

## Testing Strategy

### Unit Tests
```typescript
// Test use cases with mocked repositories
describe('GetAllExperiencesUseCase', () => {
  it('should return all experiences', async () => {
    const mockRepository = {
      findAll: jest.fn().mockResolvedValue([/* mock data */])
    };

    const useCase = new GetAllExperiencesUseCase(mockRepository);
    const result = await useCase.execute();

    expect(result).toHaveLength(2);
  });
});
```

### Integration Tests
```typescript
// Test repositories with Firebase emulator
```

## Конвенции за Именуване

### Files
- **Entities:** `WorkExperience.ts` (PascalCase)
- **Repositories Interface:** `IWorkExperienceRepository.ts` (I prefix)
- **Repository Implementation:** `FirebaseWorkExperienceRepository.ts`
- **Use Cases:** `GetAllExperiencesUseCase.ts`
- **DTOs:** `CreateWorkExperienceDto.ts`

### Classes/Interfaces
- **Interface:** `IWorkExperienceRepository`
- **Implementation:** `FirebaseWorkExperienceRepository`
- **Use Case:** `GetAllExperiencesUseCase`
- **Entity:** `WorkExperience`

## Migrация от Старата Структура

### Преди
```
src/
├── types/index.ts          # Всички типове на едно място
├── lib/firebase.ts         # Direct Firebase usage
└── app/page.tsx            # Direct Firebase calls в components
```

### След
```
src/
├── domain/                 # Business entities & interfaces
├── application/            # Use cases
├── infrastructure/         # Firebase implementations
└── presentation/           # UI layer
```

## Environment Variables

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

## Бъдещи Подобрения

- [ ] Add validation layer (using Zod/Yup)
- [ ] Add logging infrastructure
- [ ] Add error handling middleware
- [ ] Add caching layer
- [ ] Add e2e tests
- [ ] Add API documentation (if needed)
- [ ] Add performance monitoring

## Полезни Команди

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run tests
npm test

# Build for production
npm run build

# Type check
npx tsc --noEmit
```

## Допълнителни Ресурси

- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [tsyringe Documentation](https://github.com/microsoft/tsyringe)
- [Next.js Documentation](https://nextjs.org/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
