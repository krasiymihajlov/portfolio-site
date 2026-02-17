/**
 * CV Data - Interfaces, types and fallback data
 * Live data is loaded from Firebase. This file provides types and static fallbacks.
 */

export interface ExperienceData {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string | null;
  website?: string;
  description: string;
  technologies: string[];
  achievements: string[];
  category: 'software-engineer' | 'merchant' | 'business-consultant' | 'service-engineer';
}

export interface EducationData {
  id: string;
  institution: string;
  degree: string;
  period: string;
  gpa: string | null;
  logo?: string;
}

export interface ProgrammingSkills {
  languages: string[];
  backend: string[];
  frontend: string[];
  databases: string[];
  devops: string[];
  tools: string[];
  architecture: string[];
  integrations: string[];
}

// Fallback Experience Data (EN) - used if Firebase is unavailable
export const experiencesData: ExperienceData[] = [
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
      'Writing personnel files',
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

// Fallback Education Data (EN)
export const educationData: EducationData[] = [
  {
    id: '1',
    institution: 'BOK',
    degree: 'In-house courses and personalized training',
    period: '2022-2025',
    gpa: null,
    logo: '/images/projects/bok-logo.jpg',
  },
  {
    id: '2',
    institution: 'SoftUni',
    degree: 'C# Web Developer',
    period: '2016-2018',
    gpa: '5.88/6.0',
    logo: '/images/projects/Logo_Software_University_(SoftUni).png',
  },
  {
    id: '3',
    institution: 'Technical University - Varna',
    degree: 'Master Electrical Engineer in Renewable Energy Sources',
    period: '2009-2015',
    gpa: '5.00/6.0',
    logo: '/images/projects/tu-varna-logo.png',
  },
];

// Fallback Programming Skills
export const programmingSkills: ProgrammingSkills = {
  languages: ['C#', 'JavaScript/TypeScript', 'SQL', 'PHP (basic)', 'Python (basic)', 'Java (basic)'],
  backend: ['.NET Core', 'ASP.NET', 'ASP.NET Web Forms', 'WPF', 'REST API', 'Entity Framework'],
  frontend: ['ReactJS', 'HTML5', 'CSS3', 'Tailwind', 'Responsive UI'],
  databases: ['SQL Server', 'MySQL', 'NoSQL', 'JSON tree'],
  devops: ['GitHub Actions', 'Vercel', 'Hostinger', 'Superhosting', 'Hetzner'],
  tools: ['Visual Studio', 'VS Code', 'Claude', 'Git', 'Postman', 'Xampp'],
  architecture: ['SOLID', 'Clean Architecture', 'Microservices', 'Design Patterns'],
  integrations: ['Firebase', 'SendGrid', 'Gmail', 'EmailJS'],
};

// Utility function to format dates
export const formatDate = (dateString: string | null, locale: 'en' | 'bg' = 'en'): string => {
  if (!dateString) return locale === 'bg' ? 'Настояще' : 'Present';
  const [year, month] = dateString.split('-');
  const monthsEn = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthsBg = ['Яну', 'Фев', 'Мар', 'Апр', 'Май', 'Юни', 'Юли', 'Авг', 'Сеп', 'Окт', 'Ное', 'Дек'];
  const months = locale === 'bg' ? monthsBg : monthsEn;
  return `${months[parseInt(month) - 1]} ${year}`;
};
