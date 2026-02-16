export class CVFormData {
  constructor(
    public readonly companyName: string,
    public readonly positionAppliedFor: string,
    public readonly startYear: number,
    public readonly endYear: number,
    public readonly selectedSkills: readonly string[],
    public readonly companyDescription?: string,
    public readonly customImage?: File | null,
    public readonly additionalNotes?: string
  ) {
    this.validate();
  }

  /**
   * Validates the form data
   */
  private validate(): void {
    if (!this.companyName || this.companyName.trim() === '') {
      throw new Error('Company name is required');
    }

    if (!this.positionAppliedFor || this.positionAppliedFor.trim() === '') {
      throw new Error('Position is required');
    }

    if (this.startYear > this.endYear) {
      throw new Error('Start year cannot be after end year');
    }

    const currentYear = new Date().getFullYear();
    if (this.endYear > currentYear) {
      throw new Error('End year cannot be in the future');
    }
  }

  /**
   * Gets the year range as a string
   */
  getYearRange(): string {
    return `${this.startYear} - ${this.endYear}`;
  }

  /**
   * Gets the duration in years
   */
  getDurationInYears(): number {
    return this.endYear - this.startYear + 1;
  }

  /**
   * Checks if a custom image is provided
   */
  hasCustomImage(): boolean {
    return this.customImage !== null && this.customImage !== undefined;
  }
}
