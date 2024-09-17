import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    port: 5173,
    host: '0.0.0.0',
    proxy: {
      '/family': {
        target: 'http://211.188.49.236:5252',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/family/, '/api/v1/family'),
      },
    },
  },
  plugins: [react({ jsxImportSource: '@emotion/react' })],
})
