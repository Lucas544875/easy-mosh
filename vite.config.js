import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: process.env.GITHUB_PAGES  // この行を追加
  ? "easy-mosh"            // この行を追加
  : "./", 
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@features': path.resolve(__dirname, 'src/components/features'),
      '@common': path.resolve(__dirname, 'src/components/common'),
      '@atoms' : path.resolve(__dirname, 'src/components/atoms'),
      '@assets': path.resolve(__dirname, 'src/assets'),
    },
  },
  optimizeDeps: {
    exclude: ['@ffmpeg/ffmpeg', '@ffmpeg/util'],
  },
  server: {
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp'
    }
  }
});
