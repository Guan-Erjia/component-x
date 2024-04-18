import { Plugin } from "vite";
import { compileSFC } from "./sfc";

export function ComponentXSfcLoader(): Plugin {
  return {
    name: "x-component-loader",
    transform(code, id) {
      if (id.endsWith(".vue")) {
        return compileSFC(code, id);
      }
      return code;
    },
  };
}
