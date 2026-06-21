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
      reporter: ['text', 'json', 'html'], // ✅ 'html' ajouté ici
      reportsDirectory: './coverage', // ✅ remplace outputFile.html
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.test.ts',
        '**/*.test.tsx',
        '**/index.ts',
        '**/index.tsx',
      ],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 75,
        statements: 80,
      },
    },

    // 🎯 Patterns
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['node_modules', 'dist', '.idea', '.git', '.cache'],

    // 🔍 Reporter
    reporters: ['verbose'], // ✅ pluriel

    // ⚙️ Avancé
    testTimeout: 10000,
    hookTimeout: 10000,
    isolate: true,
    pool: 'forks', // ✅ remplace threads: true (forks = défaut Vitest 2+)
    mockReset: true,
    restoreMocks: true,
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
