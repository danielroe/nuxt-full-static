/// <reference types="vitest" />
import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    include: ['src'],
    coverage: {
      reporter: ['text', 'json'],
    },
  },
})
