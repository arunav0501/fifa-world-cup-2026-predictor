import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/predict-match': {
        target: 'https://worldcup-backend-8888.onrender.com',
        changeOrigin: true
      },
      '/simulate-match': {
        target: 'https://worldcup-backend-8888.onrender.com',
        changeOrigin: true
      },
      '/simulate-world-cup': {
        target: 'https://worldcup-backend-8888.onrender.com',
        changeOrigin: true
      },
      '/champion-probabilites': {
        target: 'https://worldcup-backend-8888.onrender.com',
        changeOrigin: true
      }
    }
  }
})
