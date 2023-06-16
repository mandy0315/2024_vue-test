import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import path from 'path';

const isProd = process.env.NODE_ENV === 'production';
const removeDataTestAttrs = node => {
  if (node.type === 1 /* NodeTypes.ELEMENT */) {
    node.props = node.props.filter(prop =>
      prop.type === 6 /* NodeTypes.ATTRIBUTE */ ? prop.name !== 'data-test' : true,
    );
  }
};
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '/src': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          nodeTransforms: isProd ? [removeDataTestAttrs] : [],
        },
      },
    }),
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
  build: {
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, 'index.html'),
      },
      output: {
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]',
      },
    },
  },
});
