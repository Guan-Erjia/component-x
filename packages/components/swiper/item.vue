<style lang="scss">
:host {
  width: 100%;
  height: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
#inner {
  height: 80%;
}
:host(:not([aria-current])) {
  display: none;
}
</style>

<template>
  <img id="inner" src="" alt="" />
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
  root?: HTMLImageElement;
  constructor() {
    super();
    InitComponentTemplate.call(
      this,
      __X_COMPONENT_HTML_CODE__,
      __X_COMPONENT_STYLE_CODE__
    );
    console.log(this.ariaPlaceholder);
  }

  connectedCallback() {
    if (this.ariaValueText === null) {
      console.warn("x-swiper-item必须传入 ariaValueText");
    }
    XDispatch.call(this, "XSwiperItemInit", this, true);
    if (this.root) {
      this.root.src = this.ariaPlaceholder || "";
    }
  }

  attributeChangedCallback() {
    if (this.root) {
      this.root.src = this.ariaPlaceholder || "";
    }
  }
}
</script>
