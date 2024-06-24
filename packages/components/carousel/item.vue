<style lang="scss">
:host {
  width: 100%;
  height: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
}
#inner {
  height: 80%;
}
</style>

<template>
  <img id="inner" src="" alt="" />
</template>

<script lang="ts">
import { InitComponentTemplate, XDispatch } from "@/utils";
import { XComponent, XRegister } from "@/utils/decorator";

@XRegister
export class XCarouselItem extends XComponent {
  static name: string = "x-carousel-item";
  static get observedAttributes() {
    return ["aria-placeholder"]; // 声明要监听的属性
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
      console.warn("x-carousel-item必须传入 ariaValueText");
    }
    XDispatch.call(this, "XCarouselItemInit", this, true);
  }

  attributeChangedCallback() {
    if (this.root) {
      this.root.src = this.ariaPlaceholder || "";
    }
  }
}
</script>
