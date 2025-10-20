import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true,
  },
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/components'),
      '@utilities': path.resolve(__dirname, './src/utilities'),
      '@store': path.resolve(__dirname, './src/store'),
    },
  },
})
