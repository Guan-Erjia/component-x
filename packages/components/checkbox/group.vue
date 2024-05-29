<template>
  <slot class="x-checkbox-group"></slot>
</template>
<style lang="scss">
.x-checkbox-group {
  display: inline-flex;
}
</style>
<script lang="ts">
import { InitComponentTemplate } from "@/utils";
import { XComponent, XRegister } from "@/utils/decorator";
import { XCheckbox } from "./index.vue";

@XRegister
export class XCheckboxGroup extends XComponent {
  static name: string = 'x-checkbox-group'
  static get observedAttributes() {
    return ['value']; // 声明要监听的属性
  }

  innerElement: HTMLInputElement | undefined;
  checkboxSet: Set<XCheckbox>
  value: string[] | undefined
  constructor() {
    super()
    InitComponentTemplate.call(this, __X_COMPONENT_HTML_CODE__, __X_COMPONENT_STYLE_CODE__)
    this.checkboxSet = new Set()
  }

  initListener(e: any) {
    e.stopPropagation()
    const payload = e.detail
    if (!payload.value) {
      return console.warn(`在group模式中，x-checkbox的value属性是必须的`)
    }
    this.checkboxSet.add(payload)
    if (this.value && this.value.includes(payload.value)) {
      payload.switchStatus(true)
    }
  }

  changeListener(e: any) {
    e.stopPropagation()
    const sent: string[] = []
    this.checkboxSet.forEach((i: XCheckbox) => {
      i.attributeList.has('checked') && i.value && sent.push(i.value)
    })
    this.dispatchEvent(new CustomEvent('change', { detail: sent }))
    this.setAttribute('value', sent.join(','))
  }

  connectedCallback() {
    // 包含的checkbox元素注册到上层group中
    this.addEventListener('XCheckboxInit', this.initListener)
    this.addEventListener('XCheckboxChange', this.changeListener)
  }

  disconnectedCallback() {
    this.removeEventListener('XCheckboxInit', this.initListener)
    this.removeEventListener('XCheckboxChange', this.changeListener)
  }

  attributeChangedCallback() {
    this.attributeList = new Set(this.getAttributeNames());
    this.value = this.getAttribute('value')?.split(',')
  }
}

</script>