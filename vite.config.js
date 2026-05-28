import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@content': path.resolve(__dirname, './content'),
    },
  },
  server: {
    // Allow access from other devices on the same WiFi (phone testing, etc.)
    host: true,
    port: 5173,
  },
})
