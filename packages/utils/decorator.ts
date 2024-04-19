export function XRegister(XComp: any) {
  const name: string | undefined = XComp.name;
  XComp.register = () => {
    if (!name) {
      return console.error("未定义组件名称");
    }
    if (customElements.get(name)) {
      console.warn(`自定义元素-- ${name} -- 重复注册！后注册的元素将会覆盖`);
    }
    customElements.define(name, XComp);
  };
}
