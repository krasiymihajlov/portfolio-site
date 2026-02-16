# Portfolio Site - Project Documentation

## 📋 Project Overview

This is a business-focused portfolio website for Krasimir Mihaylov, targeting small businesses and showcasing professional experience in software engineering, business consulting, and entrepreneurship.

## 🏗️ Architecture

**Tech Stack:**
- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** CSS Modules (separate CSS files)
- **Architecture Pattern:** Clean Architecture
- **State Management:** React Hooks
- **PDF Generation:** @react-pdf/renderer
- **Database:** Firebase (for experience data)

**Directory Structure:**
```
portfolio-site/
├── src/
│   ├── app/                      # Next.js App Router pages
│   ├── presentation/             # UI components
│   │   ├── components/           # Reusable components
│   │   ├── hooks/                # Custom React hooks
│   │   └── styles/               # CSS modules
│   ├── application/              # Use cases / business logic
│   ├── domain/                   # Entities and interfaces
│   ├── infrastructure/           # External services (Firebase, etc.)
│   └── data/                     # Static data files
```

## 🎨 Styling Guidelines

### **CRITICAL: Always Separate CSS from HTML**

**Rule:** When creating new pages or components, ALWAYS create separate CSS files. DO NOT use inline styles or utility classes inside JSX.

**Correct Approach:**
```tsx
// Component.tsx
import styles from './Component.module.css';

export function Component() {
  return <div className={styles.container}>...</div>;
}
```

**CSS File Structure:**
- Use CSS Modules: `ComponentName.module.css`
- Place CSS files in the same directory as components or in `/src/presentation/styles/`
- Use semantic class names (e.g., `.hero`, `.card`, `.button`)
- Support dark mode with CSS variables

**Avoid:**
- ❌ Inline styles: `<div style={{color: 'red'}}>`
- ❌ Utility classes in JSX (unless absolutely necessary)
- ❌ Mixing CSS and JSX logic

## 📄 Pages Structure

### Current Pages:
1. **/** - Home (Hero + Projects)
2. **/solutions** - Solutions & Services
3. **/experience** - Work Experience & Education (with CV download)
4. **/blog** - Blog articles
5. **/contact** - Contact information
6. **/pricing** - Pricing plans (commented out in nav)

### Navigation Order:
Начало → Решения → Опит → Блог → Контакти

## 🔧 Key Features

### CV Download Functionality
- Modal with 3 position types: Software Engineer, Merchant, Business Consultant
- PDF generation with role-specific content
- Full description for selected role, condensed (2-3 lines) for others
- Built with @react-pdf/renderer

### Dark Mode
- Supported across all pages
- Toggle in header
- CSS variables for theme switching

## 📊 Data Management

### CV/Experience Data
- Location: `/src/data/cvData.ts`
- Includes: Work experiences, education, skills
- Used for both display and PDF generation

## 🌐 Content Language

- Primary: Bulgarian (Cyrillic)
- Secondary: English (for technical content)
- All user-facing text in Bulgarian

## 🚀 Development Guidelines

1. **Component Creation:**
   - Create component file: `ComponentName.tsx`
   - Create CSS module: `ComponentName.module.css`
   - Keep components focused and reusable

2. **Styling:**
   - Use CSS Modules for component-specific styles
   - Use global CSS for shared styles
   - Follow BEM naming convention when appropriate

3. **Data:**
   - Keep static data in `/src/data/`
   - Use TypeScript interfaces for data structures

4. **Clean Architecture:**
   - Presentation layer: UI components only
   - Application layer: Business logic
   - Domain layer: Entities and interfaces
   - Infrastructure layer: External services

## 📝 Notes

- Site repositioned from developer portfolio to business-focused platform
- Target audience: Small businesses, entrepreneurs
- Focus on practical outcomes and business value
