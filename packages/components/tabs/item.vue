<style lang="scss">
:host(:not([aria-current])) {
  display: none;
}
</style>

<template>
  <slot></slot>
</template>

<script lang="ts">
import { InitComponentTemplate } from "@/utils";
import { XComponent, XRegister } from "@/utils/decorator";

@XRegister
export class XTabsItem extends XComponent {
  static name: string = "x-tabs-item";
  static get observedAttributes() {
    return ["aria-valuetext", "aria-current"]; // 声明要监听的属性
  }

  innerElement: HTMLDialogElement | undefined;
  constructor() {
    super();
    InitComponentTemplate.call(
      this,
      __X_COMPONENT_HTML_CODE__,
      __X_COMPONENT_STYLE_CODE__
    );
  }

  connectedCallback() {
    if (this.ariaValueText === null) {
      console.warn("x-tabs-item必须传入 ariaValueText");
    }
    this.dispatchEvent(
      new CustomEvent("xTabsItemInit", { detail: this, bubbles: true })
    );
  }

  attributeChangedCallback() {
    this.attributeList = new Set(this.getAttributeNames());
  }
}
</script>
