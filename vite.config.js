import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: { port: 3000, },
  define: {
    __APP_VERSION__: JSON.stringify('v1.0.0'),
    __API_URL__: process.env.SERVER_LOCATION,
  },
})
