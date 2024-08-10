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
#image {
  max-width: var(--carousel-item-size);
  max-height: var(--carousel-item-size);
}
</style>

<template>
  <slot><img id="image" alt="" /></slot>
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
  }

  connectedCallback() {
    XDispatch.call(this, "XCarouselItemInit", undefined, true);
  }

  attributeChangedCallback() {
    if (this.ariaPlaceholder) {
      const img = this.root?.querySelector("#image");
      if (img && "src" in img) {
        img.src = this.ariaPlaceholder;
      }
    }
  }
}
</script>
