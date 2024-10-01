import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{
      'api/v1': {
        target: 'https//:localhost:7158',
        changeOrigin: true,
        secure: false
      },
      '/api': {
        target: 'http://localhost:5259',
        changeOrigin: true
      }
    }
  }
})
