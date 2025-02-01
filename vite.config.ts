import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@assets/": "/src/assets",
      "@components/": "/src/components",
      "@services/": "/src/services",
      "@screens/": "/src/screens",
      "@schemas/": "/src/schemas",
    }
  }
})
