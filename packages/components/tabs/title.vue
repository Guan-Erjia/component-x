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

  constructor() {
    super();
    InitComponentTemplate.call(this, __X_COMPONENT_HTML_CODE__, __X_COMPONENT_STYLE_CODE__)
    this.key = null
  }


  connectedCallback() {
    if (!this.attributeList.has('key')) {
      console.warn('x-tabs-title必须传入key')
    }
    this.onclick = () => this.dispatchEvent(new CustomEvent('xTabsChange', { detail: this.key, bubbles: true }))
  }

  attributeChangedCallback() {
    this.attributeList = new Set(this.getAttributeNames());
    this.key = this.getAttribute('key')
  }
}

</script>