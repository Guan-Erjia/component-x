<template>
  <input class="x-radio" type="radio">
  <slot class="x-radio-content"></slot>
</template>
<style lang="scss">
:host {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: var(--radio-padding-block) var(--radio-padding-inline);
  cursor: pointer;
  user-select: none;
  font-weight: var(--control-weight);
}

.x-radio {
  margin: 0;
  width: var(--control-size);
  height: var(--control-size);
  flex-shrink: 0;
  cursor: unset;
}

.x-radio-content {
  display: inline-block;
  margin-left: var(--radio-gap);
  font-size: var(--control-size);
  flex-shrink: 0;
  color: var(--radio-color);
}

:host(:not([aria-disabled])) {
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

:host([aria-disabled]) {
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
    return ["aria-checked", 'aria-disabled', 'aria-valuetext']; // 声明要监听的属性
  }

  innerElement: HTMLInputElement | undefined;
  constructor() {
    super()
    InitComponentTemplate.call(this, __X_COMPONENT_HTML_CODE__, __X_COMPONENT_STYLE_CODE__)
  }

  connectedCallback() {
    this.dispatchEvent(new CustomEvent('XRadioInit', { detail: this, bubbles: true }))
    this.onclick = () => {
      if (this.ariaDisabled !== null || this.ariaChecked !== null) {
        return
      }
      this.ariaChecked = 'true'
      this.dispatchEvent(new CustomEvent('XRadioChange', { detail: this, bubbles: true }))
      this.dispatchEvent(new CustomEvent('change', { detail: this.ariaValueText }))
    }
  }

  attributeChangedCallback() {
    if (!this.innerElement) {
      return
    }
    this.innerElement.checked = this.ariaChecked !== null
    this.innerElement.disabled = this.ariaDisabled !== null
  }
}
</script>