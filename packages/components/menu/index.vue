<template>
  <slot class="x-menu"></slot>
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

  innerElement: HTMLInputElement | undefined;
  checkboxSet: Set<XMenuItem>;
  value: string[] | undefined;
  constructor() {
    super();
    InitComponentTemplate.call(
      this,
      __X_COMPONENT_HTML_CODE__,
      __X_COMPONENT_STYLE_CODE__
    );
    this.checkboxSet = new Set();
  }

  connectedCallback() {
  }

  disconnectedCallback() {}

  attributeChangedCallback() {
    this.attributeList = new Set(this.getAttributeNames());
    this.value = this.getAttribute("value")?.split(",");
  }
}
</script>
