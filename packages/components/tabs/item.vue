<style lang="scss">
:host(:not([active])) {
  display: none;
}

:host([active]) {
  display: unset;
}
</style>

<template>
  <slot></slot>
</template>


<script lang="ts">
import { InitComponentTemplate, } from "@/utils";
import { XComponent, XRegister } from "@/utils/decorator";

@XRegister
export class XTabsItem extends XComponent {
  static name: string = 'x-tabs-item'
  static get observedAttributes() {
    return ["key", 'active']; // 声明要监听的属性
  }

  innerElement: HTMLDialogElement | undefined;
  key: string | null

  constructor() {
    super();
    InitComponentTemplate.call(this, __X_COMPONENT_HTML_CODE__, __X_COMPONENT_STYLE_CODE__)
    this.key = null
  }

  setVisiable(visable: boolean) {
    if (visable) {
      this.setAttribute('active', '')
    } else {
      this.removeAttribute('active')
    }
  }

  connectedCallback() {
    if (!this.attributeList.has('key')) {
      console.warn('x-tabs-item必须传入key')
    }
    this.dispatchEvent(new CustomEvent('xTabsInit', { detail: this, bubbles: true }))
  }

  attributeChangedCallback() {
    this.attributeList = new Set(this.getAttributeNames());
    this.key = this.getAttribute('key')
  }
}

</script>