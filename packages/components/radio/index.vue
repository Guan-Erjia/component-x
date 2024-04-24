<template>
  <input class="x-radio" type="radio">
  <slot class="x-radio-content"></slot>
</template>
<style lang="scss">
:host {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding-left: var(--radio-padding-inline);
  padding-right: var(--radio-padding-inline);
  padding-top: var(--radio-padding-block);
  padding-bottom: var(--radio-padding-block);
  cursor: pointer;
  user-select: none;
}

.x-radio {
  margin: 0;
  width: var(--radio-size);
  height: var(--radio-size);
  flex-shrink: 0;
  cursor: unset;
}

.x-radio-content {
  display: inline-block;
  margin-left: var(--radio-gap);
  font-size: var(--radio-size);
  flex-shrink: 0;
  color: var(--radio-color);
}

:host(:not([disabled])) {
  .x-radio-content:hover {
    color: var(--radio-hover-color);
  }

  .x-radio-content:active {
    color: var(--radio-active-color);
  }
}


:host([primary]) {
  --radio-color: var(--primary-color);
  --radio-hover-color: var(--primary-hover-color);
  --radio-active-color: var(--primary-active-color);
}

:host([warning]) {
  --radio-color: var(--warning-color);
  --radio-hover-color: var(--warning-hover-color);
  --radio-active-color: var(--warning-active-color);
}

:host([danger]) {
  --radio-color: var(--danger-color);
  --radio-hover-color: var(--danger-hover-color);
  --radio-active-color: var(--danger-active-color);
}

:host([success]) {
  --radio-color: var(--success-color);
  --radio-hover-color: var(--success-hover-color);
  --radio-active-color: var(--success-active-color);
}

:host([disabled]) {
  cursor: not-allowed;

  .x-radio-content {
    opacity: var(--disable-bg-opacity);
  }
}
</style>
<script lang="ts">
import { InitComponentTemplate } from "@/utils";
import { XComponent, XRegister } from "@/utils/decorator";

@XRegister
export class XRadio extends XComponent {

  static name: string = 'x-radio'
  static get observedAttributes() {
    return ["checked", "primary", "warning", "danger", "success", 'disabled', 'value']; // 声明要监听的属性
  }

  innerElement: HTMLInputElement | undefined;
  attributeList: string[]
  value: string | null
  constructor() {
    super()
    InitComponentTemplate.call(this, __X_COMPONENT_HTML_CODE__, __X_COMPONENT_STYLE_CODE__)
    this.attributeList = [];
    this.value = null
  }

  connectedCallback() {
    this.dispatchEvent(new CustomEvent('radioInit', { detail: this, bubbles: true }))
    this.onclick = () => {
      if (!this.innerElement || this.attributeList.includes('disabled')) {
        return
      }
      this.attributeList.includes('checked') ? {} : this.setAttribute('checked', '')
      this.dispatchEvent(new CustomEvent('radioChange', { detail: this.value, bubbles: true }))
    }
    if (this.innerElement && this.attributeList.includes('disabled')) {
      this.innerElement.onclick = e => e.preventDefault()
    }
  }

  syncStatus() {
    if (this.innerElement) {
      this.innerElement.checked = this.attributeList.includes('checked') ? true : false
      this.innerElement.disabled = this.attributeList.includes('disabled') ? true : false
      this.value = this.getAttribute('value')
      this.dispatchEvent(new CustomEvent('change', { detail: this.value }))
    }
  }

  attributeChangedCallback() {
    this.attributeList = this.getAttributeNames();
    this.syncStatus()
  }

  switchStatus(checked: boolean) {
    checked ? this.setAttribute('checked', '') : this.removeAttribute('checked')
  }
}
</script>