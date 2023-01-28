import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
/* import dns from 'dns'

dns.setDefaultResultOrder('verbatim') */
// https://vitejs.dev/config/

export default defineConfig({
  plugins: [vue()],

  server: {
    hmr: true,
    // host: '0.0.0.0',
    port: 3001,
    // cors: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8081/',

        secure: false,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api'
        }
        // rewrite: (path) => path.replace(/^//api/, '')
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
