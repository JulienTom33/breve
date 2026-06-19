import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    // 🧪 Configuration générale
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],

    // 📊 Coverage
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.test.ts',
        '**/*.test.tsx',
        '**/index.ts',
        '**/index.tsx',
      ],
      lines: 80, // Minimum 80% line coverage
      functions: 80,
      branches: 75,
      statements: 80,
    },

    // 🎯 Patterns
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['node_modules', 'dist', '.idea', '.git', '.cache'],

    // 🔍 Reporter
    reporter: ['verbose'],
    outputFile: {
      html: './coverage/index.html',
    },

    // ⚙️ Avancé
    testTimeout: 10000,
    hookTimeout: 10000,
    isolate: true,
    threads: true,
    mockReset: true,
    restoreMocks: true,
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
