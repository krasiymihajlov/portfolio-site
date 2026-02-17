import Link from 'next/link';
import { TwoColumnSection } from '@/presentation/components/sections';

export default function SolutionsPage() {
  return (
    <main>
      {/* Section 1: Building end-to-end solutions */}
      <TwoColumnSection
        imagePosition="right"
        imageSrc="/images/general/end-to-end.jpg"
        imageAlt="End-to-end решения"
        heading="Изграждане на end-to-end решения"
        description={
          <>
            <p className="mb-4">
             През цялата си кариера съм се фокусирал основно върху разработването на цялостни решения – от
             проектиране на backend архитектурата и API до внедряване на адаптивни frontend интерфейси.
             Най-скорошният ми проект беше full‑stack уеб платформа за онлайн курсове, изградена с .NET Core и React,
             използваща SQL/MySQL като база данни. Тя включваше функции като видео стрийминг, интеграции за плащания,
             управление на статии, удостоверяване на потребителите и работни процеси за проверка на имейл.
            </p>
          </>
        }
        backgroundColor="white"
      />

      {/* Section 2: Автоматизации */}
      <TwoColumnSection
        imagePosition="left"
        imageSrc="/images/general/automation.jpg"
        imageAlt="Автоматизации"
        heading="Автоматизации"
        description={
          <>
            <p className="mb-4">
              Автоматизацията на един процес е усилвател на ефективността, която той вече притежава.
              Ако процесът в момента е бавен, тромав или неефективен, неговото ускоряване чрез автоматизация
              може да доведе до по‑бърз негативен резултат, вместо до положителен.
              Затова преди да вземем решение дали да автоматизираме даден процес, е важно да се уверим,
              че настоящите ни процеси са оптимизирани и добре структурирани.
            </p>
            <p className="mb-4">
              Чрез принципи и инструменти от Lean Management и Теория на ограниченията мога да ви помогна
              да изградите ефективна, подредена и устойчива бизнес среда, в която автоматизацията наистина носи стойност.
            </p>
            <p className="mb-6">
              Ако не сте сигурни дали вашият бизнес има нужда от допълнителна автоматизация, свържете се с мен.
              С удоволствие ще организираме среща, на която да обсъдим вашия бизнес, текущите предизвикателства
              и най‑подходящите решения за вас.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow hover:bg-blue-700 transition-colors"
            >
              Свържи се с мен
            </Link>
          </>
        }
        backgroundColor="gray"
      />
    </main>
  );
}
