import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'tests/e2e',
  timeout: 30000,
  use: { baseURL: 'http://localhost:4179' },
  webServer: { command: 'npx vite preview --port 4179 --strictPort', url: 'http://localhost:4179/farmaco-flor/', reuseExistingServer: true },
  reporter: 'line',
});
