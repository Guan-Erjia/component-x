import { defineConfig } from "vite";
import { ComponentXSfcLoader } from "./plugins/index";

export default defineConfig(({ command, mode, isSsrBuild, isPreview }) => {
  console.log(command, mode);
  const config = {
    build: {},
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
  };
  if (mode === "lib") {
    config.build = {
      lib: {
        entry: "./index.ts",
        name: "ComponentX",
        fileName: "ComponentX",
      },
    };
  }
  return config;
});
