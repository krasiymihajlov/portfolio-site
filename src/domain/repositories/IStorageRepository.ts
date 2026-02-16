/**
 * Repository interface for File Storage
 * Infrastructure layer must implement this contract
 */
export interface IStorageRepository {
  /**
   * Upload a file to storage
   * @param file - The file to upload
   * @param path - The storage path (e.g., 'cv-images/user123/image.jpg')
   * @returns The public URL of the uploaded file
   */
  upload(file: File, path: string): Promise<string>;

  /**
   * Delete a file from storage
   * @param path - The storage path
   */
  delete(path: string): Promise<void>;

  /**
   * Get the download URL for a file
   * @param path - The storage path
   * @returns The public URL of the file
   */
  getDownloadURL(path: string): Promise<string>;

  /**
   * Check if a file exists
   * @param path - The storage path
   */
  exists(path: string): Promise<boolean>;

  /**
   * List all files in a directory
   * @param path - The directory path
   */
  listFiles(path: string): Promise<string[]>;
}
