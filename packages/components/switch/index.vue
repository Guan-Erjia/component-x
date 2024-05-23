<template>
  <div class="x-switch">
    <slot class="x-switch-loading" name="loading">
      <svg viewBox="0 0 1024 1024" fill="currentColor">
        <path
          d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z">
        </path>
      </svg>
    </slot>
  </div>
</template>
<style lang="scss">
:host {
  position: relative;
  display: inline-block;
  background-color: gray;
  padding: var(--control-line) 0;
  border-radius: calc(var(--control-size));
  width: calc(var(--control-size) * 2.5);
  height: var(--control-size);
  cursor: pointer;
  user-select: none;

  .x-switch {
    width: var(--control-size);
    height: var(--control-size);
    background-color: white;
    border-radius: 100%;
    position: absolute;
    transition: left 0.1s linear;

    &-loading {
      display: none;
      width: var(--control-size);
      height: var(--control-size);
      animation: spin 1s linear infinite;

      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }

        100% {
          transform: rotate(360deg);
        }
      }
    }
  }
}

:host([checked]) {
  background-color: var(--radio-color);

  .x-switch {
    left: calc(var(--control-size) * 1.5 - var(--control-line));
  }
}

:host(:not([checked])) {
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

:host([disabled]) {
  cursor: not-allowed;
  opacity: var(--disable-bg-opacity);
}


:host([loading]) {
  .x-switch-loading {
    display: inline-block;
  }
}
</style>
<script lang="ts">
import { InitComponentTemplate } from "@/utils";
import { XComponent, XRegister } from "@/utils/decorator";

@XRegister
export class XSwitch extends XComponent {

  static name: string = 'x-switch'
  static get observedAttributes() {
    return ["checked", "primary", "warning", "danger", "success", 'disabled', 'loading']; // 声明要监听的属性
  }

  innerElement: HTMLInputElement | undefined;
  checked: boolean | false
  constructor() {
    super()
    InitComponentTemplate.call(this, __X_COMPONENT_HTML_CODE__, __X_COMPONENT_STYLE_CODE__)
    this.checked = false
  }

  connectedCallback() {
    this.onclick = () => {
      if (this.attributeList.has('disabled') || this.attributeList.has('loading')) {
        return
      }
      this.switchStatus(!this.attributeList.has('checked'))
      this.dispatchEvent(new CustomEvent('change', { detail: { value: this.checked } }))
    }
  }


  attributeChangedCallback() {
    this.attributeList = new Set(this.getAttributeNames());
  }

  switchStatus(checked: boolean) {
    checked ? this.setAttribute('checked', '') : this.removeAttribute('checked')
  }
}
</script>