interface XCompConstructor extends CustomElementConstructor {
  name: string | undefined;
  register: () => void;
  callbackList?: Array<() => void>;
}

export class XComponent extends HTMLElement {
  static name: string;
  static register: () => void;
  callbackList!: Array<() => void>;
  attributeList!: Set<string>;
  constructor() {
    super();
    this.attributeList = new Set();
    this.callbackList = [];
  }
}

export function XRegister(constructor: XCompConstructor) {
  const name: string | undefined = constructor.name;
  constructor.register = () => {
    if (!name) {
      return console.error("未定义组件名称");
    }
    if (customElements.get(name)) {
      console.warn(`自定义元素-- ${name} -- 重复注册！后注册的元素将会覆盖`);
    }
    customElements.define(name, constructor);
  };
}
