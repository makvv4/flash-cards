import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@app': path.resolve(__dirname, 'src/1.app'),
      '@processes': path.resolve(__dirname, 'src/2.processes'),
      '@pages': path.resolve(__dirname, 'src/3.pages'),
      '@widgets': path.resolve(__dirname, 'src/4.widgets'),
      '@features': path.resolve(__dirname, 'src/5.features'),
      '@entities': path.resolve(__dirname, 'src/6.entities'),
      '@shared': path.resolve(__dirname, 'src/7.shared'),
    },
  },
  base: '/flash-cards',
})
