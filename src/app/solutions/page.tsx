import { TwoColumnSection } from '@/presentation/components/sections';

export default function SolutionsPage() {
  return (
    <main>
      {/* Section 1: Building end-to-end solutions */}
      <TwoColumnSection
        imagePosition="right"
        heading="Building end-to-end solutions"
        description="Throughout my career, I've mainly focused on developing end to end solutions — from designing the backend architecture and APIs to implementing responsive frontend interfaces. My most recent project was a full stack web platform for online courses, built with .NET Core and React, using SQL/MySQL as the database. It included features like video streaming, payment integrations, article management, user authentication, and email verification workflows."
        backgroundColor="white"
      />

      {/* Section 2: Автоматизации */}
      <TwoColumnSection
        imagePosition="left"
        heading="Автоматизации"
        description={
          <>
            <p className="mb-4">
              Автоматизацията е просто усилвател на нашият процес. Ако процеса ни е бавен,
              тромав и неефективен, усилването и забързването, чрез автоматизирането му може
              да доведе до по бърз негативен ефект. Затова преди да вземем решение дали да
              автоматизираме даден процес, трябва да сме сигурни, че нашата ефективност в
              момента е в правилната посока.
            </p>
            <p className="text-gray-500 dark:text-gray-400 italic">
              Топ 3 оптимизации - coming soon...
            </p>
          </>
        }
        backgroundColor="gray"
      />
    </main>
  );
}
