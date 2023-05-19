import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      dts: true, // 產生 components.d.ts 檔
      resolvers: [IconsResolver()],
    }),
    Icons(),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        charset: false,
      },
    },
  },
});
