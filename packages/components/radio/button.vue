<template>
  <slot></slot>
</template>
<style lang="scss">
:host {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  user-select: none;
  padding-left: var(--radio-button-padding-inline);
  padding-right: var(--radio-button-padding-inline);
  padding-top: var(--radio-button-padding-block);
  padding-bottom: var(--radio-button-padding-block);
  box-shadow: var(--radio-button-shadow) inset;
  width: var(--radio-button-width);
  height: var(--radio-button-height);
  font-size: var(--radio-size);
  flex-shrink: 0;
}

:host(:last-child) {
  border-top-right-radius: var(--radio-button-radius);
  border-bottom-right-radius: var(--radio-button-radius);
}

:host(:first-child) {
  border-top-left-radius: var(--radio-button-radius);
  border-bottom-left-radius: var(--radio-button-radius);
}

:host([checked]) {
  position: relative;
  border: 1px solid var(--radio-button-color);
  box-shadow: none;
  padding-left: calc(var(--radio-button-padding-inline) - 1px);
  padding-right: calc(var(--radio-button-padding-inline) - 1px);
  padding-top: calc(var(--radio-button-padding-block) - 1px);
  padding-bottom: calc(var(--radio-button-padding-block) - 1px);
}

:host(:not([plain])[checked]) {
  background-color: var(--radio-button-color);
  color: white !important;
}

:host([plain][checked]) {
  background-color: white;
  color: var(--radio-button-color);
}

:host([disabled]) {
  cursor: not-allowed;
  opacity: var(--disable-bg-opacity);
}
</style>
<script lang="ts">
import { InitComponentTemplate } from "@/utils";
import { XComponent, XRegister } from "@/utils/decorator";

@XRegister
export class XRadioButton extends XComponent {

  static name: string = 'x-radio-button'
  static get observedAttributes() {
    return ["checked", "primary", "warning", "danger", "success", 'disabled', 'value']; // 声明要监听的属性
  }

  value: string | null
  constructor() {
    super()
    InitComponentTemplate.call(this, __X_COMPONENT_HTML_CODE__, __X_COMPONENT_STYLE_CODE__)
    this.value = null
  }

  connectedCallback() {
    this.dispatchEvent(new CustomEvent('xRadioInit', { detail: this, bubbles: true }))
    this.onclick = () => {
      if (this.attributeList.has('disabled')) {
        return
      }
      this.attributeList.has('checked') ? {} : this.setAttribute('checked', '')
      this.dispatchEvent(new CustomEvent('xRadioChange', { detail: this.value, bubbles: true }))
    }
  }

  syncStatus() {
    this.value = this.getAttribute('value')
    this.dispatchEvent(new CustomEvent('change', { detail: this.value }))
  }

  attributeChangedCallback() {
    this.attributeList = new Set(this.getAttributeNames());
    this.syncStatus()
  }

  switchStatus(checked: boolean) {
    checked ? this.setAttribute('checked', '') : this.removeAttribute('checked')
  }
}
</script>