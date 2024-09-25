import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    port: 5173,
    host: '0.0.0.0',
    proxy: {
      '/family': {
        target: 'http://211.188.49.236:5252/api/v1',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
      '/users': {
        target: 'http://211.188.49.236:5252/api/v1',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
      '/login': {
        target: 'http://211.188.49.236:5252/api/v1',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
      '/login': {
        target: 'http://211.188.49.236:5252/api/v1',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
  plugins: [react({ jsxImportSource: '@emotion/react' })],
})
