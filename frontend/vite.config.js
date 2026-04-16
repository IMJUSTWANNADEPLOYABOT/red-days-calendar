import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({

  server: {
    proxy: {
      '/red-days-calendar/api': {
        target: 'http://localhost:3001', 
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/red-days-calendar/, '')
      },
    },
  },
  base: '/red-days-calendar/',
  plugins: [react()],
})
