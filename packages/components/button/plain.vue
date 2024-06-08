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
  width: var(--control-size);
  height: var(--control-size);
  animation: spin 1s linear infinite;
  flex-shrink: 0;
  margin-right: var(--btn-loading-gap);

  @keyframes spin {
    100% {
      transform: rotate(360deg);
      transform-origin: 50% 50%;
    }
  }
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
  --btn-color: var(--btn-default-color);
  --btn-hover-color: var(--btn-default-hover);
  --btn-active-color: var(--btn-default-active);
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
    <svg style="height: 90%" viewBox="0 0 1024 1024" fill="currentColor">
      <path
        d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z"
      ></path>
    </svg>
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
