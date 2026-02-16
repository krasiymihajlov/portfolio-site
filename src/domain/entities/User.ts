export class User {
  constructor(
    public readonly uid: string,
    public readonly email: string | null,
    public readonly displayName: string | null,
    public readonly photoURL: string | null
  ) {}

  /**
   * Checks if the user has a verified email
   */
  hasEmail(): boolean {
    return this.email !== null && this.email !== '';
  }

  /**
   * Gets display name or email as fallback
   */
  getDisplayNameOrEmail(): string {
    return this.displayName || this.email || 'Anonymous';
  }

  /**
   * Checks if the user has a profile photo
   */
  hasProfilePhoto(): boolean {
    return this.photoURL !== null && this.photoURL !== '';
  }
}
