/**
 * DTO for generating a CV
 */
export interface GenerateCVDto {
  companyName: string;
  positionAppliedFor: string;
  startYear: number;
  endYear: number;
  selectedSkillIds: string[];
  companyDescription?: string;
  additionalNotes?: string;
}
