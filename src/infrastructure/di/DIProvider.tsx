'use client';

import { setupDependencyInjection } from './container';

// Initialize DI container immediately when module loads (before any component renders)
// This ensures dependencies are available during both SSR and client-side rendering
let initialized = false;
if (!initialized) {
  setupDependencyInjection();
  initialized = true;
}

/**
 * Dependency Injection Provider
 * The DI container is initialized at module load time
 */
export function DIProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
