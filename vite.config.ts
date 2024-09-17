import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    port: 5173,
    host: '0.0.0.0',
  },
  plugins: [react({ jsxImportSource: '@emotion/react' })],
  server: {
    proxy: {
      '/api': {
        target: 'http://211.188.49.236:5252',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api'),
      },
    },
  },
})
