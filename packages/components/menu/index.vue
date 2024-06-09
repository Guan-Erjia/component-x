<template>
  <slot></slot>
</template>
<style lang="scss">
:host {
  display: block;
  background-color: var(--menu-bg);
  padding: var(--menu-content-block) var(--menu-content-inline);
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
    return [""]; // 声明要监听的属性
  }

  curMenuItem?: XMenuItem;
  constructor() {
    super();
    InitComponentTemplate.call(
      this,
      __X_COMPONENT_HTML_CODE__,
      __X_COMPONENT_STYLE_CODE__
    );
  }

  initListener(e: any) {
    e.stopPropagation();
    const payload = e.detail;
    if (!payload.ariaValueText) {
      return console.warn(`x-menu-item 的 ariaValueText 属性是必须的`);
    }
    if (payload.ariaValueText === this.ariaValueText) {
      payload.ariaChecked = "";
      if (!this.curMenuItem) {
        this.curMenuItem = payload;
      }
    }
  }

  changeListener(e: any) {
    e.stopPropagation();
    if (this.curMenuItem) {
      this.curMenuItem.ariaChecked = null;
    }
    e.detail.ariaChecked = "";
    this.curMenuItem = e.detail;
  }

  connectedCallback() {
    this.addEventListener("XMenuItemInit", this.initListener);
    this.addEventListener("XMenuItemChange", this.changeListener);
  }

  disconnectedCallback() {
    this.removeEventListener("XMenuItemInit", this.initListener);
    this.removeEventListener("XMenuItemChange", this.changeListener);
  }

  attributeChangedCallback() {}
}
</script>
