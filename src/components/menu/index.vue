<template>
  <slot></slot>
</template>
<style lang="scss">
:host {
  display: block;
  background-color: var(--menu-bg);
  padding: var(--menu-content-block) var(--menu-content-inline);
  height: fit-content;
}
</style>
<script lang="ts">
import { InitComponentTemplate } from "@/utils";
import { XComponent, XRegister } from "@/utils/decorator";
import { XMenuItem } from "./item.vue";

@XRegister
export class XMenu extends XComponent {
  static name: string = "x-menu";
  static get observedAttributes() {
    return ["aria-valuetext"]; // 声明要监听的属性
  }

  childSet: Set<XMenuItem>;
  constructor() {
    super();
    InitComponentTemplate.call(
      this,
      __X_COMPONENT_HTML_CODE__,
      __X_COMPONENT_STYLE_CODE__
    );
    this.childSet = new Set();
  }

  initListener(e: any) {
    e.stopPropagation();
    const payload = e.detail;
    if (!payload.ariaValueText) {
      return console.warn(`x-menu-item 的 ariaValueText 属性是必须的`);
    }
    this.childSet.add(payload);
    if (payload.ariaValueText === this.ariaValueText) {
      payload.ariaChecked = "";
    }
  }

  changeListener(e: any) {
    e.stopPropagation();
    this.ariaValueText = e.detail.ariaValueText;
  }

  connectedCallback() {
    this.addEventListener("XMenuItemInit", this.initListener);
    this.addEventListener("XMenuItemChange", this.changeListener);
  }

  disconnectedCallback() {
    this.removeEventListener("XMenuItemInit", this.initListener);
    this.removeEventListener("XMenuItemChange", this.changeListener);
  }

  attributeChangedCallback() {
    this.childSet.forEach((payload) => {
      if (payload.ariaValueText === this.ariaValueText) {
        payload.ariaChecked = "";
      } else {
        payload.ariaChecked = null;
      }
    });
  }
}
</script>
