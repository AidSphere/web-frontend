import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests', // This is where your tests will live
  timeout: 30000,
  expect: { timeout: 5000 },
  fullyParallel: true,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000', // Your Next.js dev server
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'npm run dev', // Command to start Next.js
    url: 'http://localhost:3000',
    timeout: 120000,
  },
});