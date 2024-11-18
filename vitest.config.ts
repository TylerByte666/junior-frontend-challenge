import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        environment: 'jsdom',  // Use jsdom for DOM-related testing (like React)
        globals: true,          // Enable global variables (like expect)
        setupFiles: './src/setupTests.ts', // Path to setup files
    },
})