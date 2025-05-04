import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
   base: '/your-repo-name/',
  plugins: [react()],
  server: {         // <<< You missed this server block
    port: 5174,
    strictPort: true,
  }
})
