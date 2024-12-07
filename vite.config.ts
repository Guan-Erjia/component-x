import { defineConfig } from "vite";
import { ComponentXSfcLoader } from "./plugins/index";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import React from "@vitejs/plugin-react";

export default defineConfig(({ command, mode }) => {
  console.log(command, mode);
  const config = {
    build: {},
    base: "/component-x/",
    resolve: {
      alias: {
        "@": "/src",
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
  return config;
});
