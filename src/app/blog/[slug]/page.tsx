'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useTheme } from '@/presentation/contexts/ThemeContext';
import { useBlogArticle } from '@/presentation/hooks/useBlog';
import { BlogArticle } from '@/domain/entities/BlogArticle';
import styles from './BlogArticlePage.module.css';

// Mock data (същите статии като в blog page)
const mockArticles: BlogArticle[] = [
  new BlogArticle(
    '1',
    'Как да се подготвим за техническо интервю',
    'tech-interview-preparation',
    'Съвети и стратегии за успешно преминаване на техническо интервю за позиция като разработчик.',
    `
# Как да се подготвим за техническо интервю

Техническите интервюта могат да бъдат предизвикателство, но с правилната подготовка можете да се представите отлично.

## 1. Разберете какво се очаква от вас

Преди интервюто е важно да разберете какви са изискванията за позицията:
- Какви технологии използва компанията
- Какъв тип проекти ще работите
- Каква е структурата на интервюто

## 2. Практикувайте coding challenges

Използвайте платформи като:
- LeetCode
- HackerRank
- CodeWars

## 3. Подгответе въпроси

Винаги е добре да имате подготвени въпроси за интервюиращия:
- За екипа и културата
- За технологиите които използват
- За възможностите за растеж

## Заключение

Помнете че интервюто е двупосочен процес - не само компанията ви оценява, но и вие оценявате дали искате да работите там.
    `,
    'Кариера',
    ['интервю', 'кариера', 'съвети'],
    true,
    new Date('2024-01-15'),
    new Date('2024-01-15')
  ),
  new BlogArticle(
    '2',
    'Въведение в React Server Components',
    'react-server-components-intro',
    'Разбираме какво са React Server Components и как могат да подобрят производителността на приложенията ни.',
    `
# Въведение в React Server Components

React Server Components (RSC) са нова функционалност в React която променя начина по който изграждаме уеб приложения.

## Какво са Server Components?

Server Components са React компоненти които се рендират само на сървъра. Те не изпращат JavaScript към браузъра, което води до:

- По-малки bundle sizes
- По-бързо зареждане
- По-добър SEO

## Пример

\`\`\`jsx
// app/page.tsx - Server Component по подразбиране
async function getData() {
  const res = await fetch('https://api.example.com/data')
  return res.json()
}

export default async function Page() {
  const data = await getData()

  return <div>{data.title}</div>
}
\`\`\`

## Client Components

Когато имате нужда от интерактивност, използвайте Client Components:

\`\`\`jsx
'use client'

export default function Counter() {
  const [count, setCount] = useState(0)

  return <button onClick={() => setCount(count + 1)}>{count}</button>
}
\`\`\`

## Заключение

Server Components са мощна функционалност която може значително да подобри производителността на вашето приложение.
    `,
    'Технологии',
    ['React', 'Next.js', 'Performance'],
    true,
    new Date('2024-01-10'),
    new Date('2024-01-10')
  ),
  new BlogArticle(
    '3',
    '10 грешки които правят начинаещите разработчици',
    'common-beginner-mistakes',
    'Разглеждаме най-честите грешки на начинаещите програмисти и как да ги избегнем.',
    `
# 10 грешки които правят начинаещите разработчици

Започването на кариера в програмирането може да бъде предизвикателство. Ето някои чести грешки:

## 1. Прекалено много tutorial hell

Гледането на безкрайно tutorials без да пишете собствен код.

**Решение:** След всеки tutorial, направете собствен проект с наученото.

## 2. Игнориране на основите

Прескачане директно към frameworks без да разбирате основите.

**Решение:** Уверете се че разбирате JavaScript преди да започнете с React.

## 3. Страх от грешките

Избягване на сложни проекти защото не искате да правите грешки.

**Решение:** Грешките са част от ученето. Приемете ги!

## 4. Липса на version control

Непозлването на Git от самото начало.

**Решение:** Научете Git основи веднага.

## 5. Копиране без разбиране

Copy-paste на код от Stack Overflow без да разбирате как работи.

**Решение:** Винаги се опитвайте да разберете кода който копирате.

## Заключение

Всеки разработчик е правил тези грешки. Важното е да учите от тях и да продължавате напред!
    `,
    'Съвети',
    ['начинаещи', 'best practices', 'съвети'],
    true,
    new Date('2024-01-05'),
    new Date('2024-01-05')
  ),
];

export default function BlogArticlePage() {
  const params = useParams();
  const slug = params.slug as string;
  const { isDark } = useTheme();
  const { article, loading, error } = useBlogArticle(slug);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('bg-BG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={`${styles.loadingText} ${isDark ? styles.dark : ''}`}>
          Зареждане...
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className={styles.notFoundContainer}>
        <h1 className={`${styles.notFoundTitle} ${isDark ? styles.dark : ''}`}>
          Статията не е намерена
        </h1>
        <Link
          href="/blog"
          className={`${styles.notFoundLink} ${isDark ? styles.dark : ''}`}
        >
          Обратно към блога
        </Link>
      </div>
    );
  }

  return (
    <div className={`${styles.pageContainer} ${isDark ? styles.dark : ''}`}>
      <article className={styles.articleContainer}>
        <div className={styles.backLinkContainer}>
          <Link
            href="/blog"
            className={`${styles.backLink} ${isDark ? styles.dark : ''}`}
          >
            ← Обратно към блога
          </Link>
        </div>

        <header className={styles.articleHeader}>
          <div className={`${styles.articleMeta} ${isDark ? styles.dark : ''}`}>
            <time dateTime={article.createdAt.toISOString()}>
              {formatDate(article.createdAt)}
            </time>
            <span className={`${styles.categoryBadge} ${isDark ? styles.dark : ''}`}>
              {article.category}
            </span>
          </div>

          <h1 className={`${styles.articleTitle} ${isDark ? styles.dark : ''}`}>
            {article.title}
          </h1>

          <p className={`${styles.articleExcerpt} ${isDark ? styles.dark : ''}`}>
            {article.excerpt}
          </p>

          <div className={styles.tagsContainer}>
            {article.tags.map((tag) => (
              <span
                key={tag}
                className={`${styles.tag} ${isDark ? styles.dark : ''}`}
              >
                #{tag}
              </span>
            ))}
          </div>
        </header>

        <div className={`${styles.prose} ${isDark ? styles.dark : ''}`}>
          <div
            dangerouslySetInnerHTML={{
              __html: article.content.replace(/\n/g, '<br />'),
            }}
            className={`${styles.articleContent} ${isDark ? styles.dark : ''}`}
          />
        </div>
      </article>
    </div>
  );
}
