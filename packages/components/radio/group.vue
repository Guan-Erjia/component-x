<template>
  <slot></slot>
</template>

<script lang="ts">
import { InitComponentTemplate } from "@/utils";
import { XComponent, XRegister } from "@/utils/decorator";

@XRegister
export class XRadioGroup extends XComponent {
  static name: string = 'x-radio-group'
  static get observedAttributes() {
    return []; // 声明要监听的属性
  }

  innerElement: HTMLInputElement | undefined;
  radioMap: Map<string, any>
  constructor() {
    super()
    InitComponentTemplate.call(this, __X_COMPONENT_HTML_CODE__, __X_COMPONENT_STYLE_CODE__)
    this.radioMap = new Map()
  }

  disconnectedCallback() {
    this.removeEventListener('xRadioInit', this.initListener)
    this.removeEventListener('xRadioChange', this.changeListener)
    console.log("Custom element removed from page.");
  }

  initListener(e: any) {
    e.stopPropagation()
    const payload = e.detail
    // 没有value属性的剔除
    if (!payload.value) {
      return console.warn(`在group模式中，x-radio的value属性是必须的`)
    }

    if (this.radioMap.get(payload.value)) {
      return console.warn(`在group模式中，x-radio的value属性有重复`)
    }
    this.radioMap.set(payload.value, payload)
  }

  changeListener(e: any) {
    this.radioMap.forEach((func, value) => {
      if (value === e.detail) {
        func.switchStatus(true)
      } else {
        func.switchStatus(false)
      }
    })
    this.dispatchEvent(new CustomEvent('change', { detail: e.target.value }))
  }

  connectedCallback() {
    // 包含的radio元素注册到上层group中
    this.addEventListener('xRadioInit', this.initListener)
    this.addEventListener('xRadioChange', this.changeListener)
  }

  attributeChangedCallback() {
    this.attributeList = new Set(this.getAttributeNames());
  }
}

</script>