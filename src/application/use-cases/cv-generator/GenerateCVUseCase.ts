import { inject, injectable } from 'tsyringe';
import { CVFormData, GeneratedCV } from '@/domain/entities';
import type { IWorkExperienceRepository, IStorageRepository } from '@/domain/repositories';
import { GenerateCVDto } from '@/application/dtos/GenerateCVDto';

/**
 * Use Case: Generate CV
 * Creates a customized CV based on user input
 */
@injectable()
export class GenerateCVUseCase {
  constructor(
    @inject('IWorkExperienceRepository')
    private readonly experienceRepository: IWorkExperienceRepository,
    @inject('IStorageRepository')
    private readonly storageRepository: IStorageRepository
  ) {}

  async execute(dto: GenerateCVDto, customImage?: File): Promise<GeneratedCV> {
    // Validate input
    const formData = new CVFormData(
      dto.companyName,
      dto.positionAppliedFor,
      dto.startYear,
      dto.endYear,
      dto.selectedSkillIds,
      dto.companyDescription,
      customImage,
      dto.additionalNotes
    );

    // Get filtered experiences
    const experiences = await this.experienceRepository.findByDateRange(
      formData.startYear,
      formData.endYear
    );

    // Upload custom image if provided
    let imageUrl: string | undefined;
    if (customImage) {
      const path = `cv-images/${Date.now()}-${customImage.name}`;
      imageUrl = await this.storageRepository.upload(customImage, path);
    }

    // Create CV entity
    const cv = new GeneratedCV(
      `cv-${Date.now()}`,
      formData.companyName,
      formData.positionAppliedFor,
      experiences,
      [], // Skills would be fetched from a skills repository
      new Date(),
      imageUrl
    );

    return cv;
  }
}
