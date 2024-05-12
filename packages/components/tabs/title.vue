<style lang="scss">
:host {
  display: inline-block;
  padding-bottom: var(--tabs-title-block);
  padding-left: var(--tabs-title-inline);
  padding-right: var(--tabs-title-inline);
}

:host([active]) {
  border-bottom: var(--tabs-title-active);
}
</style>

<template>
  <slot></slot>
</template>


<script lang="ts">
import { InitComponentTemplate, } from "@/utils";
import { XComponent, XRegister } from "@/utils/decorator";

@XRegister
export class XTabsTitle extends XComponent {
  static name: string = 'x-tabs-title'
  static get observedAttributes() {
    return ["key"]; // 声明要监听的属性
  }

  innerElement: HTMLDialogElement | undefined;
  key: string | null
  isActive: boolean

  constructor() {
    super();
    InitComponentTemplate.call(this, __X_COMPONENT_HTML_CODE__, __X_COMPONENT_STYLE_CODE__)
    this.key = null
    this.isActive = false
  }


  connectedCallback() {
    if (!this.attributeList.has('key')) {
      console.warn('x-tabs-title必须传入key')
    }
    this.dispatchEvent(new CustomEvent('xTabsTitleInit', { detail: this, bubbles: true }))
    this.dispatchEvent(new CustomEvent('xTabsTitle', { detail: this, bubbles: true }))
    this.onclick = () => this.dispatchEvent(new CustomEvent('xTabsChange', { detail: this.key, bubbles: true }))
  }

  setActive(active: boolean) {
    this.isActive = active
    if (this.isActive) {
      this.setAttribute('active', '')
    } else {
      this.removeAttribute('active')
    }
  }

  attributeChangedCallback() {
    this.attributeList = new Set(this.getAttributeNames());
    this.key = this.getAttribute('key')
  }
}

</script>