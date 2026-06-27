import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/predict-match': 'http://127.0.0.1:8000',
      '/simulate-match': 'http://127.0.0.1:8000',
      '/simulate-world-cup': 'http://127.0.0.1:8000',
      '/champion-probabilites': 'http://127.0.0.1:8000'
    }
  }
})
