<template>
  <input class="x-checkbox" type="checkbox">
  <slot class="x-checkbox-content"></slot>
</template>
<style lang="scss">
:host {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding-left: var(--checkbox-padding-inline);
  padding-right: var(--checkbox-padding-inline);
  padding-top: var(--checkbox-padding-block);
  padding-bottom: var(--checkbox-padding-block);
  cursor: pointer;
  user-select: none;
}

.x-checkbox {
  margin: 0;
  width: var(--checkbox-size);
  height: var(--checkbox-size);
  flex-shrink: 0;
  cursor: unset;
}

.x-checkbox-content {
  display: inline-block;
  margin-left: var(--checkbox-gap);
  font-size: var(--checkbox-size);
  flex-shrink: 0;
  color: var(--checkbox-color);
}

:host(:not([disabled])) {
  .x-checkbox-content:hover {
    color: var(--checkbox-hover-color);
  }

  .x-checkbox-content:active {
    color: var(--checkbox-active-color);
  }
}

:host([primary]) {
  --checkbox-color: var(--primary-color);
  --checkbox-hover-color: var(--primary-hover-color);
  --checkbox-active-color: var(--primary-active-color);
}

:host([warning]) {
  --checkbox-color: var(--warning-color);
  --checkbox-hover-color: var(--warning-hover-color);
  --checkbox-active-color: var(--warning-active-color);
}

:host([danger]) {
  --checkbox-color: var(--danger-color);
  --checkbox-hover-color: var(--danger-hover-color);
  --checkbox-active-color: var(--danger-active-color);
}

:host([success]) {
  --checkbox-color: var(--success-color);
  --checkbox-hover-color: var(--success-hover-color);
  --checkbox-active-color: var(--success-active-color);
}

:host([disabled]) {
  cursor: not-allowed;

  .x-checkbox-content {
    opacity: var(--disable-bg-opacity);
  }
}
</style>
<script lang="ts">
import { InitComponentTemplate } from "@/utils";
import { XComponent, XRegister } from "@/utils/decorator";

@XRegister
export class XCheckbox extends XComponent {
  static name: string = 'x-checkbox'
  static get observedAttributes() {
    return ["checked", "primary", "warning", "danger", "success", 'disabled', 'indeterminate', 'value']; // 声明要监听的属性
  }

  innerElement: HTMLInputElement | undefined;
  value: string | null
  constructor() {
    super()
    InitComponentTemplate.call(this, __X_COMPONENT_HTML_CODE__, __X_COMPONENT_STYLE_CODE__)
    this.value = null
  }

  connectedCallback() {
    this.dispatchEvent(new CustomEvent('xCheckboxInit', { detail: this, bubbles: true }))
    this.onclick = () => {
      if (!this.innerElement || this.attributeList.includes('disabled')) {
        return
      }
      this.attributeList.includes('checked') ? this.removeAttribute('checked') : this.setAttribute('checked', '')
      this.removeAttribute('indeterminate')
      this.dispatchEvent(new CustomEvent('xCheckboxChange', { detail: { value: this.value, checked: this.attributeList.includes('checked') }, bubbles: true }))
    }
    if (this.innerElement && this.attributeList.includes('disabled')) {
      this.innerElement.onclick = e => e.preventDefault()
    }
  }

  syncStatus() {
    this.value = this.getAttribute('value')
    if (this.innerElement) {
      this.innerElement.checked = this.attributeList.includes('checked') ? true : false
      this.innerElement.disabled = this.attributeList.includes('disabled') ? true : false
      this.innerElement.indeterminate = this.attributeList.includes('indeterminate') ? true : false
      this.dispatchEvent(new CustomEvent('change', { detail: this.innerElement?.checked }))
    }
  }

  attributeChangedCallback() {
    this.attributeList = this.getAttributeNames();
    this.syncStatus()
  }
}
</script>