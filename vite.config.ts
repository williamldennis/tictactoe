import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  base: '/',
  build: {
    outDir: 'dist',
  },
  plugins: [react(),
  tailwindcss(),
  ],
  server: {
    watch: {
      ignored: ['**/dist/**', '**/.vite/**', '**/node_modules/**']
    }
  }
})


