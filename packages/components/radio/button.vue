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
  padding: var(--radio-button-padding-block) var(--radio-button-padding-inline);
  border-width: var(--control-line);
  border-color: var(--radio-button-border-color);
  border-style: solid;
  margin-right: calc(-1 * var(--control-line));
  width: var(--radio-button-width);
  height: var(--radio-button-height);
  font-size: var(--control-size);
  font-weight: var(--control-weight);
  flex-shrink: 0;
}

:host(:last-child) {
  border-top-right-radius: var(--control-radius);
  border-bottom-right-radius: var(--control-radius);
}

:host(:first-child) {
  border-top-left-radius: var(--control-radius);
  border-bottom-left-radius: var(--control-radius);
}

:host([aria-checked]) {
  position: relative;
  border-color: var(--radio-button-color);
  box-shadow: none;
  z-index: 10;
}

:host(:not([plain])[aria-checked]) {
  background-color: var(--radio-button-color);
  color: white !important;
}

:host([plain][aria-checked]) {
  background-color: white;
  color: var(--radio-button-color);
}

:host([aria-disabled]) {
  cursor: not-allowed;
  opacity: var(--disable-bg-opacity);
}
</style>
<script lang="ts">
import { InitComponentTemplate, XDispatch } from "@/utils";
import { XComponent, XRegister } from "@/utils/decorator";

@XRegister
export class XRadioButton extends XComponent {
  static name: string = "x-radio-button";
  static get observedAttributes() {
    return []; // 声明要监听的属性
  }

  constructor() {
    super();
    InitComponentTemplate.call(
      this,
      __X_COMPONENT_HTML_CODE__,
      __X_COMPONENT_STYLE_CODE__
    );
  }

  connectedCallback() {
    XDispatch.call(this, "XRadioInit", this, true);
    this.onclick = () => {
      if (this.ariaDisabled !== null || this.ariaChecked !== null) {
        return;
      }
      this.ariaChecked = "";
      XDispatch.call(this, "XRadioChange", this, true);
      XDispatch.call(this, "change", this.ariaValueText);
    };
  }
}
</script>
