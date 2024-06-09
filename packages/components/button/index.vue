<style lang="scss">
:host {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  cursor: pointer;
  color: white;
  border-color: var(--btn-border-color);
  border-radius: var(--btn-border-radius);
  border-style: var(--btn-border-style);
  border-width: var(--control-line);
  box-shadow: var(--btn-shadow);
  background-color: var(--btn-bg);
  font-size: var(--control-size);
  font-weight: var(--control-weight);
  padding: var(--btn-padding-block) var(--btn-padding-inline);
  opacity: var(--btn-opacity);
}

#loading {
  display: none;
  height: var(--control-size);
  flex-shrink: 0;
  margin-right: var(--btn-loading-gap);
  transform: translateY(-30%);
}

:host([aria-busy]) {
  #loading {
    display: block;
  }
}

:host([round]) {
  --btn-border-radius: var(--control-radius);
}

:host([primary]) {
  --btn-bg: var(--primary-color);
  --btn-hover-bg: var(--primary-hover-color);
  --btn-active-bg: var(--primary-active-color);
}

:host([warning]) {
  --btn-bg: var(--warning-color);
  --btn-hover-bg: var(--warning-hover-color);
  --btn-active-bg: var(--warning-active-color);
}

:host([danger]) {
  --btn-bg: var(--danger-color);
  --btn-hover-bg: var(--danger-hover-color);
  --btn-active-bg: var(--danger-active-color);
}
:host([success]) {
  --btn-bg: var(--success-color);
  --btn-hover-bg: var(--success-hover-color);
  --btn-active-bg: var(--success-active-color);
}

:host(:not([primary]):not([success]):not([danger]):not([warning])) {
  --btn-bg: var(--default-color);
  --btn-hover-bg: var(--default-hover);
  --btn-active-bg: var(--default-active);
}

:host(:not([aria-disabled]):hover) {
  --btn-bg: var(--btn-hover-bg) !important;
}

:host(:not([aria-disabled]):active) {
  --btn-bg: var(--btn-active-bg) !important;
}

:host([aria-disabled]) {
  --btn-opacity: var(--disable-bg-opacity);
  cursor: not-allowed;
}
</style>

<template>
  <slot id="loading" name="loading">
    <x-busy white />
  </slot>
  <slot id="content"></slot>
</template>

<script lang="ts">
import { InitComponentTemplate } from "@/utils";
import { XComponent, XRegister } from "@/utils/decorator";

@XRegister
export class XButton extends XComponent {
  static get observedAttributes() {
    return [];
  }
  static name: string = "x-button";
  root?: HTMLButtonElement;
  constructor() {
    super();
    InitComponentTemplate.call(
      this,
      __X_COMPONENT_HTML_CODE__,
      __X_COMPONENT_STYLE_CODE__
    );
  }

  attributeChangedCallback() {
    this.attributeList = new Set(this.getAttributeNames());
    if (this.ariaDisabled !== null || this.ariaBusy !== null) {
      this.onclick = null;
    }
  }
}
</script>
