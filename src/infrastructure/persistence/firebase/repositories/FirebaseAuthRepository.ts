import { injectable } from 'tsyringe';
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail as firebaseSendPasswordResetEmail,
  updateProfile as firebaseUpdateProfile,
  User as FirebaseUser,
} from 'firebase/auth';
import { auth } from '../config/firebase';
import { User } from '@/domain/entities/User';
import type { IAuthRepository } from '@/domain/repositories/IAuthRepository';

@injectable()
export class FirebaseAuthRepository implements IAuthRepository {
  async signInWithEmailAndPassword(email: string, password: string): Promise<User> {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return this.mapFirebaseUserToEntity(userCredential.user);
  }

  async signOut(): Promise<void> {
    await signOut(auth);
  }

  async getCurrentUser(): Promise<User | null> {
    return new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        unsubscribe();
        if (firebaseUser) {
          resolve(this.mapFirebaseUserToEntity(firebaseUser));
        } else {
          resolve(null);
        }
      });
    });
  }

  onAuthStateChanged(callback: (user: User | null) => void): () => void {
    return onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        callback(this.mapFirebaseUserToEntity(firebaseUser));
      } else {
        callback(null);
      }
    });
  }

  async sendPasswordResetEmail(email: string): Promise<void> {
    await firebaseSendPasswordResetEmail(auth, email);
  }

  async updateProfile(displayName?: string, photoURL?: string): Promise<void> {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error('No user is currently signed in');
    }

    await firebaseUpdateProfile(currentUser, {
      displayName: displayName || null,
      photoURL: photoURL || null,
    });
  }

  private mapFirebaseUserToEntity(firebaseUser: FirebaseUser): User {
    return new User(
      firebaseUser.uid,
      firebaseUser.email,
      firebaseUser.displayName,
      firebaseUser.photoURL
    );
  }
}
