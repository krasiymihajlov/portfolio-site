/**
 * DTO for creating a new work experience
 */
export interface CreateWorkExperienceDto {
  company: string;
  position: string;
  description: string;
  startDate: string; // Format: "YYYY-MM"
  endDate: string | null; // null means "Present"
  technologies: string[];
  achievements: string[];
}
