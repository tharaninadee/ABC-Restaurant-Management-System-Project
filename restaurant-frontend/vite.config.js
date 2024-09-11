import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Use defineConfig to wrap the configuration
export default defineConfig({
  plugins: [react()],
  server: {
  proxy: {
    '/api': {
      target: 'http://localhost:8080',
      changeOrigin: true,
      secure: false,
      configure: (proxy, options) => {
        proxy.on('error', (err) => {
          console.error('Proxy error:', err);
        });
      },
    },
  },
},

});
