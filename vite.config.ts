import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  // تعيين المسار الأساسي بناءً على بيئة التشغيل
  base: process.env.GITHUB_PAGES ? '/Zakerly/' : '/',
});
