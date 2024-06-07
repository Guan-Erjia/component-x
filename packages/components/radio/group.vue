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
import { XRadio } from "./index.vue";
import { XRadioButton } from "./button.vue";

@XRegister
export class XRadioGroup extends XComponent {
  static name: string = 'x-radio-group'
  static get observedAttributes() {
    return ['aria-valuetext']; // 声明要监听的属性
  }

  curRadio: XRadio | XRadioButton | null;
  radioMap: Set<XRadio | XRadioButton>
    constructor() {
    super()
    InitComponentTemplate.call(this, __X_COMPONENT_HTML_CODE__, __X_COMPONENT_STYLE_CODE__)
    this.radioMap = new Set()
    this.curRadio = null
  }

  disconnectedCallback() {
    this.removeEventListener('XRadioInit', this.initListener)
    this.removeEventListener('XRadioChange', this.changeListener)
  }

  initListener(e: any) {
    e.stopPropagation()
    const payload = e.detail
    // 没有value属性的剔除
    if (!payload.ariaValueText) {
      return console.warn(`在group模式中，x-radio的 ariaValueText 属性是必须的`)
    }

    if (this.radioMap.has(payload)) {
      return console.warn(`在group模式中，x-radio的 ariaValueText 属性有重复`)
    }

    this.radioMap.add(payload);
    if (payload.ariaValueText === this.ariaValueText) {
      payload.ariaChecked = 'true'
      if (!this.curRadio) {
        this.curRadio = payload
      }
    }
  }

  changeListener(e: any) {
      this.ariaValueText = e.detail.ariaValueText
      this.dispatchEvent(new CustomEvent('change', { detail: e.detail.value }))
  }

  connectedCallback() {
    // 包含的radio元素注册到上层group中
    this.addEventListener('XRadioInit', this.initListener)
    this.addEventListener('XRadioChange', this.changeListener)
  }

  attributeChangedCallback() {
    this.radioMap.forEach(radio=> {
      if (this.ariaValueText === radio.ariaValueText) {
        radio.ariaChecked = "";
      } else {
        radio.ariaChecked = null;
      }
    })
  }
}

</script>