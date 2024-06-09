<template>
  <div class="x-switch">
    <slot id="loading" name="loading">
      <x-busy />
    </slot>
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

  .x-switch {
    width: var(--control-size);
    height: var(--control-size);
    background-color: var(--switch-btn);
    border-radius: 100%;
    position: absolute;
    transition: left 0.1s linear;
  }
}

#loading {
  display: none;
  height: var(--control-size);
  transform: translateY(-50%);
}

:host([aria-checked]) {
  background-color: var(--radio-color);

  .x-switch {
    left: calc(var(--control-size) * 1.5 - var(--control-line));
  }
}

:host(:not([aria-checked])) {
  .x-switch {
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

:host([aria-busy]) {
  #loading {
    display: inline-block;
  }
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
      if (this.ariaDisabled !== null || this.attributeList.has("loading")) {
        return;
      }
      this.ariaChecked = this.ariaChecked === null ? "" : null;
      XDispatch.call(this, "change", this.ariaChecked);
    };
  }

  attributeChangedCallback() {}
}
</script>
