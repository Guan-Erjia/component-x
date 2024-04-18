import { defineConfig } from "vite";
import { ComponentXSfcLoader } from "./plugins/index";

export default defineConfig({
  // build: {
  //   lib: {
  //     entry: "./index.ts",
  //     name: "ComponentX",
  //     fileName: "ComponentX",
  //   },
  // },
  base: "/component-x/",
  resolve: {
    alias: {
      "@": "/packages",
    },
  },
  css: {
    preprocessorOptions: {
      scss: {},
    },
  },
  plugins: [ComponentXSfcLoader()],
});
