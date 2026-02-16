export type SkillCategory = 'frontend' | 'backend' | 'database' | 'tools' | 'other';
export type SkillProficiency = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export class Skill {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly category: SkillCategory,
    public readonly proficiency: SkillProficiency,
    public readonly yearsOfExperience?: number
  ) {}

  /**
   * Checks if the skill is advanced or expert level
   */
  isAdvanced(): boolean {
    return this.proficiency === 'advanced' || this.proficiency === 'expert';
  }

  /**
   * Gets proficiency as a percentage (0-100)
   */
  getProficiencyPercentage(): number {
    const levels: Record<SkillProficiency, number> = {
      beginner: 25,
      intermediate: 50,
      advanced: 75,
      expert: 100,
    };
    return levels[this.proficiency];
  }

  /**
   * Checks if the skill has sufficient experience (>= years)
   */
  hasExperience(minYears: number): boolean {
    return (this.yearsOfExperience || 0) >= minYears;
  }
}
