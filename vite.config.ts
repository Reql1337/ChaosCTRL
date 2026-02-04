import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/ChaosCTRL/', // Set to your repository name for GitHub Pages
  define: {
    'process.env': {} // Polyfill process.env to prevent crashes in browser (API key will be undefined in public demo)
  }
});