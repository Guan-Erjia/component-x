export function getComponentTemplate(module: {
  template: string;
  style: string;
}): HTMLTemplateElement {
  const template = document.createElement("template");
  template.innerHTML = module.style + module.template;
  return template;
}

export const getClassNameFromAttr = (
  tagName: string,
  observer: string[],
  attr: string[]
): string =>
  `x-${tagName} ` +
  attr
    .filter((i) => observer.includes(i))
    .map((i) => `x-${tagName}-${i}`)
    .join(" ");
