import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config.ts'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      exclude: ['**/node_modules/**', '**/dist/**', 'e2e/**', '**/e2e/**'],
      coverage: {
        provider: 'v8',
        clean: false,
        reportsDirectory: './coverage-report',
        reporter: ['text', 'html'],
        thresholds: {
          statements: 80,
          branches: 80,
          functions: 80,
          lines: 80,
        },
        include: ['src/**/*.{ts,tsx}'],
        exclude: [
          'src/**/*.test.{ts,tsx}',
          'src/**/*.stories.{ts,tsx}',
          'src/test/**',
          'src/main.tsx',
        ],
      },
    },
  })
)
