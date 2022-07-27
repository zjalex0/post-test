import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, 'src')}/`,
      '@core/': `${path.resolve(__dirname, 'src/core')}/`,
      '@pages/': `${path.resolve(__dirname, 'src/pages')}/`,
      '@actions/': `${path.resolve(__dirname, 'src/actions')}/`,
      '@hooks/': `${path.resolve(__dirname, 'src/hooks/useForm.jsx')}/`,
      '@types/': `${path.resolve(__dirname, 'src/types/types.jsx')}/`,
      '@styles/': `${path.resolve(__dirname, 'src/scss/custom')}/`,
      '@axiosApi/': `${path.resolve(__dirname, 'src/api/axiosApi.jsx')}/`
    }
  }
});
