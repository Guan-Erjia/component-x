<style lang="scss">
:host {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  cursor: pointer;
  color: var(--btn-color);
  border-color: var(--btn-color);
  border-radius: var(--btn-border-radius);
  border-style: var(--btn-border-style);
  border-width: var(--control-line);
  box-shadow: var(--btn-shadow);
  background-color: var(--btn-bg-color);
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
  transform: translateY((calc(-0.4 * var(--control-size)))) ;
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
  --btn-color: var(--primary-color);
  --btn-hover-color: var(--primary-hover-color);
  --btn-active-color: var(--primary-active-color);
}

:host([warning]) {
  --btn-color: var(--warning-color);
  --btn-hover-color: var(--warning-hover-color);
  --btn-active-color: var(--warning-active-color);
}

:host([danger]) {
  --btn-color: var(--danger-color);
  --btn-hover-color: var(--danger-hover-color);
  --btn-active-color: var(--danger-active-color);
}
:host([success]) {
  --btn-color: var(--success-color);
  --btn-hover-color: var(--success-hover-color);
  --btn-active-color: var(--success-active-color);
}

:host(:not([primary]):not([success]):not([danger]):not([warning])) {
  --btn-color: var(--default-color);
  --btn-hover-color: var(--default-hover);
  --btn-active-color: var(--default-active);
}

:host(:not([aria-disabled]):hover) {
  --btn-color: var(--btn-hover-color) !important;
}

:host(:not([aria-disabled]):active) {
  --btn-color: var(--btn-active-color) !important;
}

:host([aria-disabled]) {
  --btn-opacity: var(--disable-bg-opacity);
  cursor: not-allowed;
}
</style>

<template>
  <slot id="loading" name="loading">
    <x-busy />
  </slot>
  <slot id="content"></slot>
</template>

<script lang="ts">
import { InitComponentTemplate } from "@/utils";
import { XComponent, XRegister } from "@/utils/decorator";

@XRegister
export class XButtonPlain extends XComponent {
  static get observedAttributes() {
    return [];
  }
  static name: string = "x-button-plain";
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
