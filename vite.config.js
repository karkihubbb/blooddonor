import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Relative asset paths work on both GitHub Pages (/blooddonor/) and Vercel (/).
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
