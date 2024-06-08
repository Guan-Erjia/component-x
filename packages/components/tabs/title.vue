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
import { InitComponentTemplate, XDispatch } from "@/utils";
import { XComponent, XRegister } from "@/utils/decorator";

@XRegister
export class XTabsTitle extends XComponent {
  static name: string = "x-tabs-title";
  static get observedAttributes() {
    return []; // 声明要监听的属性
  }

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
    XDispatch.call(this, "xTabsTitleInit", this, true);

    this.onclick = () =>
      XDispatch.call(this, "xTabsChange", this.ariaValueText, true);
  }
}
</script>
