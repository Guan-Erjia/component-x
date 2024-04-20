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
}

.x-checkbox {
  margin: 0;
  width: var(--checkbox-size);
  height: var(--checkbox-size);
  flex-shrink: 0;
  cursor: unset;
}

input[type=checkbox]:indeterminate {
  background: lime;
}

.x-checkbox-content {
  display: inline-block;
  margin-left: var(--checkbox-gap);
  font-size: var(--checkbox-size);
  flex-shrink: 0;
  color: var(--checkbox-color);

  &:hover {
    color: var(--checkbox-hover-color);
  }

  &:active {
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
  opacity: var(--disable-bg-opacity);
  cursor: not-allowed;
}
</style>
<script lang="ts">
import { InitComponentTemplate } from "@/utils";
import { XRegister } from "@/utils/decorator";

@XRegister
export class XCheckbox extends HTMLElement {

  static name: string = 'x-checkbox'
  static register: () => void

  static get observedAttributes() {
    return ["checked", "primary", "warning", "danger", "success", 'disabled']; // 声明要监听的属性
  }

  innerElement: HTMLInputElement | undefined;
  attributeList: string[]
  constructor() {
    super()
    InitComponentTemplate.call(this, __X_COMPONENT_HTML_CODE__, __X_COMPONENT_STYLE_CODE__)
    this.attributeList = [];
  }

  connectedCallback() {
    this.onclick = () => {
      if (!this.innerElement || this.attributeList.includes('disabled')) {
        return
      }
      const checked = this.attributeList.includes('checked')
      checked ? this.removeAttribute('checked') : this.setAttribute('checked', '')
    }
    if (this.innerElement && this.attributeList.includes('disabled')) {
      this.innerElement.onclick = e => e.preventDefault()
    }
  }

  syncStatus() {
    if (this.innerElement) {
      this.innerElement.checked = this.attributeList.includes('checked') ? true : false
      this.dispatchEvent(new CustomEvent('change', { detail: this.innerElement?.checked }))
    }
  }

  attributeChangedCallback() {
    this.attributeList = this.getAttributeNames();
    this.syncStatus()
  }
}
</script>