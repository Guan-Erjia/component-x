export const getClassNameFromAttr = (
  tagName: string,
  observer: string[],
  attr: Set<string>
): string =>
  `x-${tagName} ` +
  [...attr]
    .filter((i) => observer.includes(i))
    .map((i) => `x-${tagName}-${i}`)
    .join(" ");

export function InitComponentTemplate(this: any, html: string, style: string) {
  const template = document.createElement("template");
  template.innerHTML = html + style;
  const shadowRoot = this.attachShadow({ mode: "open" });
  shadowRoot.appendChild(template.content.cloneNode(true));
  this.root = (this.shadowRoot as ShadowRoot)
    .children[0] as HTMLTemplateElement;
}

export function XDispatch(this: HTMLElement, eventName: string, payload?: any, bubbles?: boolean) {
  this.dispatchEvent(new CustomEvent(eventName, { detail: payload, bubbles }));
}
