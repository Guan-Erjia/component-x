<template>
  <div id="point">
    <x-busy id="loading" />
  </div>
</template>
<style lang="scss">
:host {
  position: relative;
  display: inline-block;
  background-color: var(--switch-default-bg);
  padding: var(--control-line) 0;
  border-radius: calc(var(--control-size));
  width: calc(var(--control-size) * 2.5);
  height: var(--control-size);
  cursor: pointer;
  user-select: none;
}
#point {
  width: var(--control-size);
  height: var(--control-size);
  background-color: var(--switch-btn);
  border-radius: 100%;
  position: absolute;
  transition: left 0.1s linear;
  display: flex;
  align-items: center;
}

#loading {
  height: var(--control-size);
  visibility: hidden;
}

:host([aria-busy]) {
  #loading {
    visibility: visible;
  }
}

:host([aria-checked]) {
  background-color: var(--radio-color);

  #point {
    left: calc(var(--control-size) * 1.5 - var(--control-line));
  }
}

:host(:not([aria-checked])) {
  #point {
    left: var(--control-line);
  }
}

:host([primary]) {
  --radio-color: var(--primary-color);
}

:host([warning]) {
  --radio-color: var(--warning-color);
}

:host([danger]) {
  --radio-color: var(--danger-color);
}

:host([success]) {
  --radio-color: var(--success-color);
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
export class XSwitch extends XComponent {
  static name: string = "x-switch";
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
    this.onclick = () => {
      if (this.ariaDisabled !== null || this.ariaBusy !== null) {
        return;
      }
      this.ariaChecked = this.ariaChecked === null ? "" : null;
      XDispatch.call(this, "change", this.ariaChecked);
    };
  }

  attributeChangedCallback() {}
}
</script>
