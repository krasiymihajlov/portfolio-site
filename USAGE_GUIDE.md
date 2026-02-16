# Ръководство за Използване - Clean Architecture

## Кратък Преглед

Проектът следва Clean Architecture принципите с пълно разделение на слоевете:

```
Domain ← Application ← Infrastructure
         ↑
    Presentation
```

## Как да Работим с Архитектурата

### 1. Четене на Данни (Query)

#### Стъпка 1: Използвай Hook в Component

```tsx
// src/app/experience/page.tsx
'use client';

import { useExperiences } from '@/presentation/hooks';

export default function ExperiencePage() {
  const { experiences, loading, error } = useExperiences();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {experiences.map((exp) => (
        <div key={exp.id}>
          <h2>{exp.position} @ {exp.company}</h2>
          <p>Duration: {exp.getDurationInYears().toFixed(1)} years</p>
        </div>
      ))}
    </div>
  );
}
```

#### Стъпка 2: Hook Извиква Use Case

```tsx
// src/presentation/hooks/useExperiences.ts
import { getUseCase } from '@/infrastructure/di/container';
import { GetAllExperiencesUseCase } from '@/application/use-cases/experience';

export function useExperiences() {
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    const useCase = getUseCase<GetAllExperiencesUseCase>(GetAllExperiencesUseCase);
    useCase.execute().then(setExperiences);
  }, []);

  return { experiences, loading, error };
}
```

#### Стъпка 3: Use Case Използва Repository

```tsx
// src/application/use-cases/experience/GetAllExperiencesUseCase.ts
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

#### Стъпка 4: Firebase Repository Имплементира Interface

```tsx
// src/infrastructure/persistence/firebase/repositories/FirebaseWorkExperienceRepository.ts
@injectable()
export class FirebaseWorkExperienceRepository implements IWorkExperienceRepository {
  async findAll(): Promise<WorkExperience[]> {
    const snapshot = await getDocs(collection(db, 'workExperiences'));
    return snapshot.docs.map(doc => this.mapToEntity(doc.id, doc.data()));
  }
}
```

### 2. Запис на Данни (Command)

#### Пример: Създаване на Work Experience

```tsx
// В component
const handleCreate = async (formData) => {
  const useCase = getUseCase<CreateExperienceUseCase>(CreateExperienceUseCase);

  const newExperience = await useCase.execute({
    company: formData.company,
    position: formData.position,
    description: formData.description,
    startDate: formData.startDate,
    endDate: formData.endDate,
    technologies: formData.technologies,
    achievements: formData.achievements,
  });

  console.log('Created:', newExperience);
};
```

### 3. Автентикация

#### Login Example

```tsx
// src/app/login/page.tsx
'use client';

import { useAuth } from '@/presentation/contexts';

export default function LoginPage() {
  const { signIn, loading, error } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      await signIn(
        formData.get('email') as string,
        formData.get('password') as string
      );
      // Redirect on success
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" type="email" required />
      <input name="password" type="password" required />
      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
      {error && <p>{error.message}</p>}
    </form>
  );
}
```

### 4. CV Generation

```tsx
// src/app/cv-generator/page.tsx
'use client';

import { useCVGenerator } from '@/presentation/hooks';

export default function CVGeneratorPage() {
  const { generateCV, cv, loading, error } = useCVGenerator();

  const handleGenerate = async (formData) => {
    const dto = {
      companyName: formData.company,
      positionAppliedFor: formData.position,
      startYear: 2018,
      endYear: 2024,
      selectedSkillIds: ['typescript', 'react', 'firebase'],
      companyDescription: 'A great company',
      additionalNotes: 'Looking forward to working with you',
    };

    const customImage = formData.imageFile; // File from input
    await generateCV(dto, customImage);
  };

  if (cv) {
    return (
      <div>
        <h1>CV для {cv.companyName}</h1>
        <h2>Position: {cv.position}</h2>
        <h3>Relevant Experiences:</h3>
        <ul>
          {cv.experiences.map((exp) => (
            <li key={exp.id}>{exp.position} @ {exp.company}</li>
          ))}
        </ul>
      </div>
    );
  }

  return <CVForm onSubmit={handleGenerate} loading={loading} />;
}
```

## Налични Hooks

### Work Experience
- `useExperiences()` - Всички experiences
- `useExperience(id)` - Един experience по ID
- `useExperiencesByDateRange(startYear, endYear)` - Филтрирани по дата

### Blog
- `useBlogArticles()` - Всички публикувани статии
- `useBlogArticle(slug)` - Една статия по slug

### Auth
- `useAuth()` - Authentication state и методи
  - `user` - Current user
  - `loading` - Loading state
  - `error` - Error state
  - `login(email, password)` - Login method
  - `logout()` - Logout method
  - `isAuthenticated` - Boolean flag

### CV Generator
- `useCVGenerator()` - CV generation
  - `generateCV(dto, imageFile?)` - Generate CV
  - `cv` - Generated CV
  - `loading` - Loading state
  - `error` - Error state
  - `reset()` - Reset state

## Business Logic в Entities

Entities съдържат business logic:

```tsx
const experience = new WorkExperience(/* ... */);

// Check if experience is within date range
if (experience.isWithinDateRange(2020, 2024)) {
  console.log('Relevant for CV');
}

// Check if currently working there
if (experience.isCurrent()) {
  console.log('Current job');
}

// Get duration
const years = experience.getDurationInYears();
console.log(`Worked for ${years.toFixed(1)} years`);
```

```tsx
const article = new BlogArticle(/* ... */);

// Check if published
if (article.isPublished()) {
  console.log('Can display publicly');
}

// Get reading time
const readingTime = article.getReadingTimeMinutes();
console.log(`${readingTime} min read`);

// Check for tag
if (article.hasTag('typescript')) {
  console.log('TypeScript article');
}
```

## Validation в Entities

CVFormData има вградена валидация:

```tsx
try {
  const formData = new CVFormData(
    '', // Empty company name
    'Developer',
    2020,
    2024,
    ['typescript']
  );
} catch (error) {
  console.error(error.message); // "Company name is required"
}
```

## Testing

### Тестване на Use Cases

```tsx
describe('GetAllExperiencesUseCase', () => {
  it('should return all experiences from repository', async () => {
    // Mock repository
    const mockRepo: IWorkExperienceRepository = {
      findAll: jest.fn().mockResolvedValue([
        new WorkExperience(/* mock data */),
        new WorkExperience(/* mock data */),
      ]),
      // ... other methods
    };

    // Create use case with mock
    const useCase = new GetAllExperiencesUseCase(mockRepo);

    // Execute
    const result = await useCase.execute();

    // Assert
    expect(result).toHaveLength(2);
    expect(mockRepo.findAll).toHaveBeenCalledTimes(1);
  });
});
```

### Тестване на Entities

```tsx
describe('WorkExperience', () => {
  it('should calculate duration correctly', () => {
    const exp = new WorkExperience(
      '1',
      'Company',
      'Developer',
      'Description',
      '2020-01-01',
      '2022-01-01',
      ['typescript'],
      []
    );

    expect(exp.getDurationInYears()).toBeCloseTo(2, 1);
  });

  it('should identify current job', () => {
    const exp = new WorkExperience(
      '1',
      'Company',
      'Developer',
      'Description',
      '2020-01-01',
      null, // Still working
      ['typescript'],
      []
    );

    expect(exp.isCurrent()).toBe(true);
  });
});
```

## Добавяне на Нова Функционалност

### Пример: Добавяне на Skills Management

#### 1. Domain Layer

```tsx
// src/domain/entities/Skill.ts
export class Skill {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly category: string,
    public readonly yearsOfExperience: number
  ) {}

  isExpert(): boolean {
    return this.yearsOfExperience >= 5;
  }
}

// src/domain/repositories/ISkillRepository.ts
export interface ISkillRepository {
  findAll(): Promise<Skill[]>;
  findByCategory(category: string): Promise<Skill[]>;
  create(skill: Omit<Skill, 'id'>): Promise<Skill>;
}
```

#### 2. Application Layer

```tsx
// src/application/use-cases/skills/GetAllSkillsUseCase.ts
@injectable()
export class GetAllSkillsUseCase {
  constructor(
    @inject('ISkillRepository')
    private repository: ISkillRepository
  ) {}

  async execute(): Promise<Skill[]> {
    return await this.repository.findAll();
  }
}
```

#### 3. Infrastructure Layer

```tsx
// src/infrastructure/persistence/firebase/repositories/FirebaseSkillRepository.ts
@injectable()
export class FirebaseSkillRepository implements ISkillRepository {
  async findAll(): Promise<Skill[]> {
    const snapshot = await getDocs(collection(db, 'skills'));
    return snapshot.docs.map(doc => this.mapToEntity(doc.id, doc.data()));
  }
  // ... other methods
}

// Register in container.ts
container.register('ISkillRepository', {
  useClass: FirebaseSkillRepository,
});
```

#### 4. Presentation Layer

```tsx
// src/presentation/hooks/useSkills.ts
export function useSkills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const useCase = getUseCase<GetAllSkillsUseCase>(GetAllSkillsUseCase);
    useCase.execute().then(setSkills).finally(() => setLoading(false));
  }, []);

  return { skills, loading };
}

// Use in component
const { skills } = useSkills();
```

## Common Pitfalls

### ❌ НЕ правете това

```tsx
// НЕ извиквайте Firebase директно в components
import { db } from '@/lib/firebase';

export default function Component() {
  useEffect(() => {
    getDocs(collection(db, 'experiences')); // ❌ BAD
  }, []);
}
```

```tsx
// НЕ импортвайте repository в component
import { FirebaseWorkExperienceRepository } from '@/infrastructure/...'; // ❌ BAD
```

### ✅ Правете това

```tsx
// Използвайте hooks
import { useExperiences } from '@/presentation/hooks';

export default function Component() {
  const { experiences } = useExperiences(); // ✅ GOOD
}
```

## Environment Variables

Уверете се че `.env.local` е попълнен:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## Полезни Команди

```bash
# Development
npm run dev

# Type check
npx tsc --noEmit

# Build
npm run build

# Production
npm start
```

## Следващи Стъпки

1. Добави валидация слой (Zod/Yup)
2. Добави error handling middleware
3. Добави logging
4. Добави caching layer
5. Напиши unit tests
6. Напиши integration tests
7. Добави e2e tests
