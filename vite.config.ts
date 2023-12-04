import { defineConfig, ConfigEnv, UserConfig, loadEnv } from "vite";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();
  const env = loadEnv(mode, root);

  return {
    root,
    base: env.VITE_PUBLIC_PATH,
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src")
      }
    },
    server: {
      host: "0.0.0.0",
      port: Number(env.VITE_PORT),
      open: env.VITE_OPEN === "true",
      // cors: true,
      proxy: {
        [env.VITE_API_URL]: {
          // target: "http://47.94.217.248:10003",
          target: "http://localhost:10003",
          changeOrigin: true
          // rewrite: (path: string): string => {
          //   // 重写请求路径
          //   return path.replace(new RegExp(`^${env.VITE_API_URL}`), "");
          //   // return path.replace(/^env.VITE_API_URL/, "");
          // }
        }
      }
    },
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ]
  };
});
