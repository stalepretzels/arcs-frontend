import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import read from 'read-file';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: { port: 3000, },
  define: {
    __APP_VERSION__: JSON.stringify(`${new TextDecoder("utf-8").decode(read.sync('./version.txt'))}`),
    __APP_CHANGELOG__: JSON.stringify(`${new TextDecoder("utf-8").decode(read.sync('./changelog.txt'))}`),
    __APP_VERSION_HANDLE__: JSON.stringify("Dragonfly")
//    __SERVER_LOCATION__: JSON.stringify(`${process.env.SERVER_LOCATION}`),
  },
})
