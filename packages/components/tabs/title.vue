<style lang="scss">
:host {
  display: inline-block;
  cursor: pointer;
  padding-bottom: var(--tabs-title-block);
  padding-left: var(--tabs-title-inline);
  padding-right: var(--tabs-title-inline);
  font-size: var(--tab-title-size);
}

:host([aria-current]) {
  border-bottom: var(--tabs-title-active);
}
</style>

<template>
  <slot></slot>
</template>

<script lang="ts">
import { InitComponentTemplate } from "@/utils";
import { XComponent, XRegister } from "@/utils/decorator";

@XRegister
export class XTabsTitle extends XComponent {
  static name: string = "x-tabs-title";
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
      console.warn("x-tabs-title必须传入 ariaValueText");
    }
    this.dispatchEvent(
      new CustomEvent("xTabsTitleInit", { detail: this, bubbles: true })
    );
    this.onclick = () =>
      this.dispatchEvent(
        new CustomEvent("xTabsChange", { detail: this.ariaValueText, bubbles: true })
      );
  }

  attributeChangedCallback() {
    this.attributeList = new Set(this.getAttributeNames());
  }
}
</script>
