import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    port: 5173,
    host: '0.0.0.0',
    proxy: {
      '/family': {
        target: 'https://211.188.49.236:5252/api/v1',
        changeOrigin: true,
        secure: false,
      },
      '/users': {
        target: 'https://211.188.49.236:5252/api/v1',
        changeOrigin: true,
        secure: false,
      },
    },
    hmr: {
      host: 'familynote.ezbooks.kr/',
      protocol: 'wss',
      clientPort: 5173,
    },
  },
  plugins: [react({ jsxImportSource: '@emotion/react' })],
})
