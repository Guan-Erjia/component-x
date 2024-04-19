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

export function InitComponentTemplate(this: any, html: string, style: string) {
  const template = document.createElement("template");
  template.innerHTML = html + style;
  const shadowRoot = this.attachShadow({ mode: "open" });
  shadowRoot.appendChild(template.content.cloneNode(true));
  this.innerElement = (this.shadowRoot as ShadowRoot)
    .children[0] as HTMLButtonElement;
}
