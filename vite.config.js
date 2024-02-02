import dayjs from 'dayjs';
import vue from '@vitejs/plugin-vue';
import VueDevTools from 'vite-plugin-vue-devtools';

import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';

// UnoCSS
import UnoCSS from 'unocss/vite';

// 自动引入-icons,NaiveUI, Vue
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [
      // VueDevTools(),
      vue(),
      UnoCSS(),
      AutoImport({
        dts: 'src/typings/auto-imports.d.ts',
        imports: [
          'vue',
          'vue-router',
          {
            'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar']
          }
        ]
      }),
      Components({
        dts: 'src/typings/components.d.ts',
        resolvers: [NaiveUiResolver(), IconsResolver({ prefix: 'icon' })]
      }),
      Icons()
    ],
    resolve: {
      alias: {
        '~': fileURLToPath(new URL('./', import.meta.url)),
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    define: {
      PROJECT_BUILD_TIME: JSON.stringify(dayjs().format('YYYY-MM-DD HH:mm:ss'))
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/scss/mixin.scss" as *;`
        }
      }
    },
    server: {
      host: '0.0.0.0',
      open: true
    }
  };
});
