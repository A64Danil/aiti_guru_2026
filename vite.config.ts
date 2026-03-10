import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command, mode }) => {
  const isProduction = mode === 'production';
  
  return {
    plugins: [react()],
    build: {
      outDir: isProduction ? 'dist' : 'dist-dev',
      sourcemap: !isProduction,
      minify: isProduction ? 'esbuild' : false,
    },
    server: {
      port: 5173,
    },
    preview: {
      port: 4173,
    },
  };
})
