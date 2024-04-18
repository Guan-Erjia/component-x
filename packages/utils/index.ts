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

export function xComponentRegister(xcomp: any): void {
  if (!xcomp.name) {
    return console.error("未定义组件名称");
  }
  customElements.define(
    xcomp.name,
    xcomp as unknown as CustomElementConstructor
  );
}

export function InitComponentTemplate(this: any, html: string, style: string) {
  const template = document.createElement("template");
  template.innerHTML = html + style;
  const shadowRoot = this.attachShadow({ mode: "open" });
  shadowRoot.appendChild(template.content.cloneNode(true));
}
