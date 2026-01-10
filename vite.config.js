import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    // Vite automatically handles SPA routing in dev mode
    // No additional config needed for history API fallback
  }
})

