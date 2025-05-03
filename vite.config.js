import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {         // <<< You missed this server block
    port: 5174,
    strictPort: true,
    allowedHosts: [
      '02e1-152-59-48-172.ngrok-free.app', // ✅ your ngrok domain
    ],
  }
})
