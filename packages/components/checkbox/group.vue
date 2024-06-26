<template>
  <slot class="x-checkbox-group"></slot>
</template>
<style lang="scss">
.x-checkbox-group {
  display: inline-flex;
}
</style>
<script lang="ts">
import { InitComponentTemplate, XDispatch } from "@/utils";
import { XComponent, XRegister } from "@/utils/decorator";
import { XCheckbox } from "./index.vue";

@XRegister
export class XCheckboxGroup extends XComponent {
  static name: string = "x-checkbox-group";
  static get observedAttributes() {
    return ["aria-valuetext"]; // 声明要监听的属性
  }

  root?: HTMLInputElement;
  childSet: Set<XCheckbox>;
  value: string[];
  constructor() {
    super();
    InitComponentTemplate.call(
      this,
      __X_COMPONENT_HTML_CODE__,
      __X_COMPONENT_STYLE_CODE__
    );
    this.childSet = new Set();
    this.value = [];
  }

  initListener(e: any) {
    e.stopPropagation();
    const payload = e.detail;
    if (!payload.ariaValueText) {
      return console.warn(`在group模式中，x-checkbox的value属性是必须的`);
    }
    this.childSet.add(payload);
    if (this.value.includes(payload.ariaValueText)) {
      payload.ariaChecked = "";
    }
  }

  changeListener(e: any) {
    e.stopPropagation();
    const payload = e.detail;
    if (this.value.includes(payload.ariaValueText)) {
      this.value = this.value.filter((i) => i !== payload.ariaValueText);
    } else {
      this.value.push(payload.ariaValueText);
    }
    this.setAttribute("aria-valuetext", this.value.join(","));
  }

  connectedCallback() {
    // 包含的checkbox元素注册到上层group中
    this.addEventListener("XCheckboxInit", this.initListener);
    this.addEventListener("XCheckboxChange", this.changeListener);
  }

  disconnectedCallback() {
    this.removeEventListener("XCheckboxInit", this.initListener);
    this.removeEventListener("XCheckboxChange", this.changeListener);
  }

  attributeChangedCallback() {
    this.value = (this.ariaValueText || "").split(",");
    this.childSet.forEach((child) => {
      if (this.value.includes(child.ariaValueText || "")) {
        child.ariaChecked = "";
      } else {
        child.ariaChecked = null;
      }
    });
    XDispatch.call(this, "change", this.value.join(","));
  }
}
</script>
