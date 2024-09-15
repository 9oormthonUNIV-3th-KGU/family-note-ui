import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react({ jsxImportSource: '@emotion/react' })],
  server: {
    proxy: {
      '/api': {
        target: {
          /* server url env 넣기 */
        },
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api'),
      },
    },
  },
})
