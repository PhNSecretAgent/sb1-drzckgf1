import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    proxy: {
      '/scriptblox-api': {
        target: 'https://scriptblox.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/scriptblox-api/, ''),
        secure: true,
      }
    }
  }
});