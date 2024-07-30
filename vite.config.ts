import { defineConfig } from "vite";
import { ComponentXSfcLoader } from "./plugins/index";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import React from "@vitejs/plugin-react";

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
      charset: false,
      postcss: {
        plugins: [tailwindcss, autoprefixer],
      },
    },
    plugins: [ComponentXSfcLoader(), React()],
  };
  if (mode === "lib") {
    config.build = {
      lib: {
        entry: "./packages/main.ts",
        name: "ComponentX",
        fileName: "ComponentX",
      },
    };
  }
  return config;
});
