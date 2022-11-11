import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import path from "path";
// https://vitejs.dev/config/
console.log(process.cwd());
const pathSrc = path.resolve(__dirname, "src");

export default defineConfig({
  resolve: {
    alias: {
      /*
      路径别名
      若为文件系统路径必须是绝对路径的形式，否则将以别名原样呈现，不会解析为文件系统路径路径 
    */
      // "@": process.cwd() + "/src",
      // '@':path.resolve('src')
      "@": path.resolve(__dirname, "src"),
    },
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          prefix: "Icon",
        }),
      ],
    }),
    Components({
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({ enabledCollections: ["ep"] }),
      ],
    }),
    Icons({
      autoInstall: true,
    }),
  ],
  server: {
    port: 8000,
    proxy: {
      "/path": {
        target: "http://127.0.0.1:3000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/path/, ""),
      },
    },
  },
});
