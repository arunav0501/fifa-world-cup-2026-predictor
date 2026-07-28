import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/predict-match': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true
      },
      '/simulate-match': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true
      },
      '/simulate-world-cup': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true
      },
      '/champion-probabilities': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true
      }
    }
  }
})
