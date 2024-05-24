<template>
  <slot class="x-radio-group"></slot>
</template>
<style lang="scss">
.x-radio-group {
  display: inline-flex;
  align-items: center;
}
</style>
<script lang="ts">
import { InitComponentTemplate } from "@/utils";
import { XComponent, XRegister } from "@/utils/decorator";

@XRegister
export class XRadioGroup extends XComponent {
  static name: string = 'x-radio-group'
  static get observedAttributes() {
    return ['value']; // 声明要监听的属性
  }

  innerElement: HTMLInputElement | undefined;
  radioMap: Map<string, any>
  value: string | null
  constructor() {
    super()
    InitComponentTemplate.call(this, __X_COMPONENT_HTML_CODE__, __X_COMPONENT_STYLE_CODE__)
    this.radioMap = new Map()
    this.value = null
  }

  disconnectedCallback() {
    this.removeEventListener('XRadioInit', this.initListener)
    this.removeEventListener('XRadioChange', this.changeListener)
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
    if (this.value && payload.value === this.value) {
      payload.switchStatus(true)
    }
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
    this.setAttribute('value', e.target.value)
  }

  connectedCallback() {
    // 包含的radio元素注册到上层group中
    this.addEventListener('XRadioInit', this.initListener)
    this.addEventListener('XRadioChange', this.changeListener)
  }

  attributeChangedCallback() {
    this.attributeList = new Set(this.getAttributeNames());
    this.value = this.getAttribute('value')
  }
}

</script>