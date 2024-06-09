<style lang="scss">
:host(:not([aria-current])) {
  display: none;
}
</style>

<template>
  <slot></slot>
</template>

<script lang="ts">
import { InitComponentTemplate, XDispatch } from "@/utils";
import { XComponent, XRegister } from "@/utils/decorator";

@XRegister
export class XSwiperItem extends XComponent {
  static name: string = "x-swiper-item";
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
      console.warn("x-swiper-item必须传入 ariaValueText");
    }
    XDispatch.call(this, "XSwiperItemInit", this, true);
  }
}
</script>
