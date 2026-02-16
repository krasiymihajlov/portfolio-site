import { injectable } from 'tsyringe';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  listAll,
  getMetadata,
} from 'firebase/storage';
import { storage } from '../config/firebase';
import type { IStorageRepository } from '@/domain/repositories/IStorageRepository';

@injectable()
export class FirebaseStorageRepository implements IStorageRepository {
  async upload(file: File, path: string): Promise<string> {
    const storageRef = ref(storage, path);

    // Upload the file
    await uploadBytes(storageRef, file);

    // Get the download URL
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  }

  async delete(path: string): Promise<void> {
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
  }

  async getDownloadURL(path: string): Promise<string> {
    const storageRef = ref(storage, path);
    return await getDownloadURL(storageRef);
  }

  async exists(path: string): Promise<boolean> {
    try {
      const storageRef = ref(storage, path);
      await getMetadata(storageRef);
      return true;
    } catch (error: any) {
      if (error.code === 'storage/object-not-found') {
        return false;
      }
      throw error;
    }
  }

  async listFiles(path: string): Promise<string[]> {
    const storageRef = ref(storage, path);
    const result = await listAll(storageRef);
    return result.items.map((item) => item.fullPath);
  }
}
