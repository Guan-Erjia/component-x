import { compileStringAsync } from "sass";
import { transformWithEsbuild } from "vite";

async function compileStyle(code: string) {
  const styleRegex = /<style lang=.+>([\s\S]*?)<\/style>/gi;
  const matchStyles: string[] = code.match(styleRegex) || [];

  const styleSheets: string[] = [];
  for (let i = 0; i < matchStyles.length; i++) {
    const styleContent = matchStyles[i]
      .replace(/(^<style lang=.+?>)|(<\/style>$)/g, "")
      .trim();
    const loadStyle = (await compileStringAsync(styleContent)).css;
    styleSheets.push(loadStyle);
  }
  return `<style>\n${styleSheets.join("\n")}</style>`;
}

function compileTemplate(code: string) {
  const templateRegex = /<template>[.|\s|\S]+<\/template>/gim;
  const matchTemplates = code.match(templateRegex) || [];
  const templates = matchTemplates
    .map((template) => {
      return template.replace(/(^<template.?>)|(<\/template>$)/g, "").trim();
    })
    .join("\n");
  return templates;
}

function getScriptCode(code: string): string {
  const scriptRegex = /<script lang=".+">([\s\S]*?)<\/script>/gi;
  const matchScripts = code.match(scriptRegex) || [];
  const scripts = matchScripts
    .map((script) => {
      return script.replace(/(^<script lang=.+?>)|(<\/script>$)/g, "").trim();
    })
    .join("\n");
  return scripts;
}

export async function compileSFC(code: string, id: string): Promise<string> {
  const scriptCode = getScriptCode(code);
  const templateCode = `const __X_COMPONENT_TEMPLATE_CODE__ = ${JSON.stringify(
    compileTemplate(code)
  )}`;
  const stylesCode = `const __X_COMPONENT_STYLE_CODE__ = ${JSON.stringify(
    await compileStyle(code)
  )}`;
  const output = [templateCode, stylesCode, scriptCode];
  const resolvedResult = await transformWithEsbuild(output.join("\n"), id, {
    loader: "ts",
    target: "esnext",
  });
  return resolvedResult.code;
}
