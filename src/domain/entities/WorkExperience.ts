export class WorkExperience {
  constructor(
    public readonly id: string,
    public readonly company: string,
    public readonly position: string,
    public readonly description: string,
    public readonly startDate: string, // Format: "YYYY-MM"
    public readonly endDate: string | null, // null means "Present"
    public readonly technologies: readonly string[],
    public readonly achievements: readonly string[],
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date
  ) {}

  /**
   * Checks if this experience falls within the given date range
   */
  isWithinDateRange(startYear: number, endYear: number): boolean {
    const expStartYear = parseInt(this.startDate.split('-')[0]);
    const expEndYear = this.endDate
      ? parseInt(this.endDate.split('-')[0])
      : new Date().getFullYear();

    return expStartYear <= endYear && expEndYear >= startYear;
  }

  /**
   * Checks if this experience is currently active (no end date)
   */
  isCurrent(): boolean {
    return this.endDate === null;
  }

  /**
   * Gets the duration in years
   */
  getDurationInYears(): number {
    const start = new Date(this.startDate);
    const end = this.endDate ? new Date(this.endDate) : new Date();

    return (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 365);
  }
}
