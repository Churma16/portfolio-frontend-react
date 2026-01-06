import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['react-icons/si'],
  },
  build: {
    commonjsOptions: {
      include: [/react-icons[\\/]si/, /node_modules/],
    },
  },
})
