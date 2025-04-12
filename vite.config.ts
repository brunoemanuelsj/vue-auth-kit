import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [vue(), dts()],
  test: {
    globals: true,
    environment: 'jsdom',
  },
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'VueAuthKit',
      fileName: 'vue-auth-kit',
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  
})
