import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: { port: 3000, },
  define: {
    __APP_VERSION__: JSON.stringify('v1.0.0'),
    __SERVER_LOCATION__: JSON.stringify(`${process.env.SERVER_LOCATION}`),
  },
})
