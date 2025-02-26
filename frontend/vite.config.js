import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: true,
    host: true,
    port: 5173,
    proxy: {
      '/posts': {
        target: process.env.NODE_ENV === 'production' 
          ? 'http://sol.librian.info:3000' 
          : 'http://192.168.1.24:3000',
        changeOrigin: true,
        secure: false,
      }
    }
  }
});

console.log("NODE_ENV:", process.env.NODE_ENV);