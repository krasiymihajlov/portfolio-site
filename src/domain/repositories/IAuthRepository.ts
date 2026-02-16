import { User } from '../entities/User';

/**
 * Repository interface for Authentication
 * Infrastructure layer must implement this contract
 */
export interface IAuthRepository {
  /**
   * Sign in with email and password
   */
  signInWithEmailAndPassword(email: string, password: string): Promise<User>;

  /**
   * Sign out the current user
   */
  signOut(): Promise<void>;

  /**
   * Get the currently authenticated user
   */
  getCurrentUser(): Promise<User | null>;

  /**
   * Listen to authentication state changes
   * Returns an unsubscribe function
   */
  onAuthStateChanged(callback: (user: User | null) => void): () => void;

  /**
   * Send password reset email
   */
  sendPasswordResetEmail(email: string): Promise<void>;

  /**
   * Update user profile
   */
  updateProfile(displayName?: string, photoURL?: string): Promise<void>;
}
