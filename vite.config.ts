import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import MotionResolver from 'motion-v/resolver'
import UnoCSS from 'unocss/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    UnoCSS(),
    Components({
      dts: true,
      resolvers: [
        MotionResolver(),
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@L': resolve(__dirname, 'src/layouts'),
      '@P': resolve(__dirname, 'src/pages'),
      '@C': resolve(__dirname, 'src/components'),
      '@A': resolve(__dirname, 'src/common/assets'),
      '@CP': resolve(__dirname, 'src/common/composables'),
      '@U': resolve(__dirname, 'src/common/utils'),
    },
  },
})
