import { resolve } from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: ['react', 'tiny-invariant'],
    },
    sourcemap: true,
  },
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['@testing-library/jest-dom/vitest', './vitest.setup.js'],
  },
});
