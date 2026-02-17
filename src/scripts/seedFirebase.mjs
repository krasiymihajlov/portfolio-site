/**
 * Firebase Seed Script
 * Зарежда всички CV данни в Firebase Firestore.
 *
 * Употреба:
 *   node src/scripts/seedFirebase.mjs
 *
 * Изисква: NEXT_PUBLIC_FIREBASE_* ENV variables в .env.local
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

// Load .env.local manually
const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, '../../.env.local');
const envContent = readFileSync(envPath, 'utf-8');
const env = Object.fromEntries(
  envContent.split('\n')
    .filter(line => line.includes('=') && !line.startsWith('#'))
    .map(line => {
      const [key, ...rest] = line.split('=');
      return [key.trim(), rest.join('=').trim()];
    })
);

const firebaseConfig = {
  apiKey: env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ──────────────────────────────────────────────
// DATA
// ──────────────────────────────────────────────

const experiencesEN = [
  {
    id: '1',
    company: 'Bulgarian Educational Cybernetics',
    position: 'Creator on website bok.bg',
    location: 'Varna, Bulgaria',
    startDate: '2025-08',
    endDate: null,
    website: 'https://bok.bg/',
    description: 'BOK Academy v2.0 is a comprehensive educational platform designed for online course management, student enrollment, and content delivery. The platform features a modern React frontend with a robust ASP.NET Core backend.',
    technologies: ['.NET 8.0 SDK', 'Node.js 18+', 'MySQL 8.0+', 'React', 'ASP.NET Core'],
    achievements: [
      'Course Management',
      'User Authentication',
      'Admin Panel',
      'Payment Integration',
      'SEO Optimized',
      'Responsive Design',
      'Email Notifications',
      'Modern AI solutions were used to create the platform',
    ],
    category: 'software-engineer',
  },
  {
    id: '2',
    company: 'Net Ins brokers',
    position: 'Insurance broker',
    location: 'Varna, Bulgaria',
    startDate: '2024-02',
    endDate: null,
    description: 'Focus on helping business owners reduce administrative costs and save valuable time and money through the right insurance solutions.',
    technologies: [],
    achievements: [
      'Specialized in solutions to help secure financial security in good old age',
      'Providing solutions in the field of health and health insurance',
      'Providing solutions in the field of life insurance',
    ],
    category: 'merchant',
  },
  {
    id: '3',
    company: 'Bulgarian Educational Cybernetics',
    position: 'Merchant/Business Consultant',
    location: 'Varna, Bulgaria',
    startDate: '2023-09',
    endDate: '2025-08',
    description: 'The company specializes in creating online educational courses in the field of entrepreneurship.',
    technologies: [],
    achievements: [
      '**Sales Skills:**',
      'Working with a strict schedule',
      'Working with B2B and B2C clients',
      'Writing a sales process for organizations and sales teams',
      'Preparing an Assessment of the client\'s readiness to make a "purchase"',
      'Writing templates for closing deals',
      'Regular customer satisfaction analyses',
      'Creating conditions for the sales process to be a strong competitive advantage',
      '',
      '**Business Consulting Skills:**',
      '*Management and Optimization:*',
      'Creating business processes by departments',
      'Writing a system for assessing the priority of tasks',
      'Writing the criteria for assessing a "completed task"',
      'Writing personal files',
      '',
      '*Creating a business model:*',
      'Creating a product portfolio (main and additional products)',
      'Creating a vision of the main product',
      'Preparation of binding offers',
      'Targeting of target audience and creation of sales channels (B2C, B2B)',
      'Creation of a pricing system',
    ],
    category: 'business-consultant',
  },
  {
    id: '4',
    company: 'Vitosha Soft',
    position: 'Software engineer',
    location: 'Sofia, Bulgaria',
    startDate: '2018-04',
    endDate: '2023-09',
    description: 'Company that specializes in software development for the USA financial industry.',
    technologies: ['ASP.NET Web Forms', 'C#', 'PDF Processing', 'XML'],
    achievements: [
      'Providing quick and easy access to documents such as W2, paystubs, tax return, Insurance and etc.',
      'Working and processing with PDF and XML formats',
      'Working with ASP.NET Web Forms',
    ],
    category: 'software-engineer',
  },
  {
    id: '5',
    company: 'InterService Uzunovi',
    position: 'Service engineer',
    location: 'Varna, Bulgaria',
    startDate: '2013-10',
    endDate: '2017-01',
    description: 'Maintenance of white goods.',
    technologies: [],
    achievements: [
      'Reading, familiarization and improvement of various electrical circuits, electronic components, testing and improvement of already prepared circuits',
      'Control, evaluation and preparation of technical documentation related to the electrical condition of the equipment according to legal norms',
      'Logistics in the field of delivery, repair and purchase of equipment',
    ],
    category: 'service-engineer',
  },
];

const experiencesBG = [
  {
    id: '1',
    company: 'Bulgarian Educational Cybernetics',
    position: 'Създател на уебсайта bok.bg',
    location: 'Варна, България',
    startDate: '2025-08',
    endDate: null,
    website: 'https://bok.bg/',
    description: 'BOK Academy v2.0 е цялостна образователна платформа, създадена за управление на онлайн курсове, записване на студенти и предоставяне на учебно съдържание. Платформата разполага с модерен React frontend и стабилен ASP.NET Core backend.',
    technologies: ['.NET 8.0 SDK', 'Node.js 18+', 'MySQL 8.0+', 'React', 'ASP.NET Core'],
    achievements: [
      'Управление на курсове',
      'Удостоверяване на потребители',
      'Административен панел',
      'Интеграция на плащания',
      'SEO оптимизация',
      'Адаптивен дизайн',
      'Имейл известия',
      'Използвани са модерни AI решения при създаването на платформата',
    ],
    category: 'software-engineer',
  },
  {
    id: '2',
    company: 'Net Ins Brokers',
    position: 'Застрахователен брокер',
    location: 'Варна, България',
    startDate: '2024-02',
    endDate: null,
    description: 'Фокус върху подпомагането на бизнес собственици да намалят административните разходи и да спестят време и средства чрез подходящи застрахователни решения.',
    technologies: [],
    achievements: [
      'Специализация в решения за осигуряване на финансова стабилност в напреднала възраст',
      'Предоставяне на решения в областта на здравното и медицинското застраховане',
      'Предоставяне на решения в областта на животозастраховането',
    ],
    category: 'merchant',
  },
  {
    id: '3',
    company: 'Bulgarian Educational Cybernetics',
    position: 'Търговец / Бизнес-консултант',
    location: 'Варна, България',
    startDate: '2023-09',
    endDate: '2025-08',
    description: 'Компанията е специализирана в създаването на онлайн образователни курсове в сферата на предприемачеството.',
    technologies: [],
    achievements: [
      '**Търговски умения:**',
      'Работа по стриктен график',
      'Работа с B2B и B2C клиенти',
      'Изготвяне на търговски процеси за организации и търговски екипи',
      'Подготовка на оценка за готовността на клиента да направи „покупка"',
      'Създаване на шаблони за затваряне на сделки',
      'Редовен анализ на удовлетвореността на клиентите',
      'Създаване на условия търговският процес да бъде силно конкурентно предимство',
      '',
      '**Умения в бизнес консултирането:**',
      '*Управление и оптимизация:*',
      'Създаване на бизнес процеси по отдели',
      'Изготвяне на система за оценка на приоритетите на задачите',
      'Определяне на критерии за оценка на „изпълнена задача"',
      'Създаване на лични досиета',
      '',
      '*Създаване на бизнес модел:*',
      'Изграждане на продуктово портфолио (основни и допълнителни продукти)',
      'Създаване на визия за основния продукт',
      'Подготовка на обвързващи оферти',
      'Определяне на целеви аудитории и изграждане на продажбени канали (B2C, B2B)',
      'Създаване на ценова система',
    ],
    category: 'business-consultant',
  },
  {
    id: '4',
    company: 'Vitosha Soft',
    position: 'Софтуерен инженер',
    location: 'София, България',
    startDate: '2018-04',
    endDate: '2023-09',
    description: 'Компания, специализирана в разработка на софтуер за финансовата индустрия в САЩ.',
    technologies: ['ASP.NET Web Forms', 'C#', 'PDF обработка', 'XML'],
    achievements: [
      'Осигуряване на бърз и лесен достъп до документи като W2, фишове за заплати, данъчни декларации, застраховки и др.',
      'Работа и обработка на PDF и XML формати',
      'Работа с ASP.NET Web Forms',
    ],
    category: 'software-engineer',
  },
  {
    id: '5',
    company: 'InterService Uzunovi',
    position: 'Сервизен инженер',
    location: 'Варна, България',
    startDate: '2013-10',
    endDate: '2017-01',
    description: 'Поддръжка и ремонт на бяла техника.',
    technologies: [],
    achievements: [
      'Четене, анализ и подобряване на различни електрически схеми, електронни компоненти, тестване и оптимизация на вече съществуващи схеми',
      'Контрол, оценка и подготовка на техническа документация, свързана с електрическото състояние на оборудването според нормативните изисквания',
      'Логистика в областта на доставка, ремонт и закупуване на оборудване',
    ],
    category: 'service-engineer',
  },
];

const educationEN = [
  { id: '1', institution: 'BOK', degree: 'In-house courses and personalized training', period: '2022-2025', gpa: null, logo: '/images/projects/bok-logo.jpg' },
  { id: '2', institution: 'SoftUni', degree: 'C# Web Developer', period: '2016-2018', gpa: '5.88/6.0', logo: '/images/projects/Logo_Software_University_(SoftUni).png' },
  { id: '3', institution: 'Technical University - Varna', degree: 'Master Electrical Engineer in Renewable Energy Sources', period: '2009-2015', gpa: '5.00/6.0', logo: '/images/projects/tu-varna-logo.png' },
];

const educationBG = [
  { id: '1', institution: 'BOK', degree: 'Вътрешнофирмени курсове и персонализирано обучение', period: '2022-2025', gpa: null, logo: '/images/projects/bok-logo.jpg' },
  { id: '2', institution: 'SoftUni', degree: 'C# Web Developer', period: '2016-2018', gpa: '5.88/6.0', logo: '/images/projects/Logo_Software_University_(SoftUni).png' },
  { id: '3', institution: 'Технически университет – Варна', degree: 'Магистър електро-инженер възобновяеми и енергийни източници', period: '2009-2015', gpa: '5.00/6.0', logo: '/images/projects/tu-varna-logo.png' },
];

const skills = {
  languages:    ['C#', 'JavaScript/TypeScript', 'SQL', 'PHP (basic)', 'Python (basic)', 'Java (basic)'],
  backend:      ['.NET Core', 'ASP.NET', 'ASP.NET Web Forms', 'WPF', 'REST API', 'Entity Framework'],
  frontend:     ['ReactJS', 'HTML5', 'CSS3', 'Tailwind', 'Responsive UI'],
  databases:    ['SQL Server', 'MySQL', 'NoSQL', 'JSON tree'],
  devops:       ['GitHub Actions', 'Vercel', 'Hostinger', 'Superhosting', 'Hetzner'],
  tools:        ['Visual Studio', 'VS Code', 'Claude', 'Git', 'Postman', 'Xampp'],
  architecture: ['SOLID', 'Clean Architecture', 'Microservices', 'Design Patterns'],
  integrations: ['Firebase', 'SendGrid', 'Gmail', 'EmailJS'],
};

// ──────────────────────────────────────────────
// SEED FUNCTIONS
// ──────────────────────────────────────────────

async function seedCollection(collectionName, items) {
  console.log(`\nSeeding ${collectionName}...`);
  for (const item of items) {
    const { id, ...data } = item;
    await setDoc(doc(collection(db, collectionName), id), data);
    console.log(`  ✓ ${collectionName}/${id}`);
  }
}

async function main() {
  console.log('🔥 Firebase Seed Script');
  console.log('========================');

  await seedCollection('experiences_en', experiencesEN);
  await seedCollection('experiences_bg', experiencesBG);
  await seedCollection('education_en', educationEN);
  await seedCollection('education_bg', educationBG);

  console.log('\nSeeding skills/programming...');
  await setDoc(doc(db, 'skills', 'programming'), skills);
  console.log('  ✓ skills/programming');

  console.log('\n✅ Seed completed successfully!');
  process.exit(0);
}

main().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
