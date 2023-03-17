import nodePath from 'node:path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    includeSource: ['src/**/*.{js,ts}'],
  },
  resolve: {
    alias: {
      '@': nodePath.resolve(__dirname, './src')
    },
  },
})
