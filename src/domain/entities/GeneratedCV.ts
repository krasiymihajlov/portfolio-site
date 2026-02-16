import { WorkExperience } from './WorkExperience';
import { Skill } from './Skill';

export class GeneratedCV {
  constructor(
    public readonly id: string,
    public readonly companyName: string,
    public readonly positionAppliedFor: string,
    public readonly filteredExperiences: readonly WorkExperience[],
    public readonly selectedSkills: readonly Skill[],
    public readonly generatedAt: Date,
    public readonly customImage?: string, // URL after upload
    public readonly pdfUrl?: string
  ) {}

  /**
   * Checks if the CV has experiences
   */
  hasExperiences(): boolean {
    return this.filteredExperiences.length > 0;
  }

  /**
   * Checks if the CV has skills
   */
  hasSkills(): boolean {
    return this.selectedSkills.length > 0;
  }

  /**
   * Checks if a PDF has been generated
   */
  hasPDF(): boolean {
    return this.pdfUrl !== undefined && this.pdfUrl !== '';
  }

  /**
   * Gets total years of experience from filtered experiences
   */
  getTotalYearsOfExperience(): number {
    return this.filteredExperiences.reduce(
      (total, exp) => total + exp.getDurationInYears(),
      0
    );
  }

  /**
   * Gets all technologies from experiences
   */
  getAllTechnologies(): string[] {
    const technologies = new Set<string>();
    this.filteredExperiences.forEach((exp) => {
      exp.technologies.forEach((tech) => technologies.add(tech));
    });
    return Array.from(technologies);
  }
}
