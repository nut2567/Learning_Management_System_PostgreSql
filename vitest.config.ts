// vitest.config.ts
import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: ['./src/setupTests.ts'], // path to your setup file
    },
    resolve: {
        alias: {
            "@lib": path.resolve(__dirname, 'lib'),
            '@': path.resolve(__dirname, 'src'), // Ensure Vitest resolves the alias correctly
        },
    },
});
