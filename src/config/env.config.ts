/**
 * Centralized environment configuration.
 * This provides Type Safety and a single source of truth.
 */

export const env = {
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  appName: import.meta.env.VITE_APP_NAME || 'CreatorApp',
  isProduction: import.meta.env.PROD, // Built-in Vite boolean
  isDevelopment: import.meta.env.DEV,
};

// Production Guard: Ensure critical variables exist
if (!env.apiUrl) {
  throw new Error("CRITICAL ERROR: VITE_API_URL is not defined in .env");
}