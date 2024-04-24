<template>
  <slot></slot>
</template>

<script lang="ts">
import { InitComponentTemplate } from "@/utils";
import { XComponent, XRegister } from "@/utils/decorator";
import { XCheckbox } from "./index.vue";

@XRegister
export class XCheckboxGroup extends XComponent {
  static name: string = 'x-checkbox-group'
  static get observedAttributes() {
    return []; // 声明要监听的属性
  }

  innerElement: HTMLInputElement | undefined;
  checkboxSet: Set<XCheckbox>
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
  }

  changeListener(e: any) {
    e.stopPropagation()
    const payload: string[] = []
    this.checkboxSet.forEach((i: XCheckbox) => {
      i.attributeList.has('checked') && i.value && payload.push(i.value)
    })
    this.dispatchEvent(new CustomEvent('change', { detail: payload }))
  }

  connectedCallback() {
    // 包含的checkbox元素注册到上层group中
    this.addEventListener('xCheckboxInit', this.initListener)
    this.addEventListener('xCheckboxChange', this.changeListener)
  }

  disconnectedCallback() {
    this.removeEventListener('xCheckboxInit', this.initListener)
    this.removeEventListener('xCheckboxChange', this.changeListener)
  }

  attributeChangedCallback() {
    this.attributeList = new Set(this.getAttributeNames());
  }
}

</script>