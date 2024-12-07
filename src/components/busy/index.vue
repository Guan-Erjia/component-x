<style lang="scss">
:host {
  display: inline-flex;
  flex-wrap: wrap;
  width: var(--control-size);
  height: var(--control-size);
  animation: spin 1s linear infinite;

  @keyframes spin {
    100% {
      transform: rotate(360deg);
      transform-origin: 50% 50%;
    }
  }
  .item {
    width: 50%;
    height: 50%;
    box-sizing: border-box;
    border-color: var(--busy-color);
    border-style: solid;
    border-width: 0;
  }
}
:host([white]) {
  --busy-color: white;
}
:host(:not([white])) {
  --busy-color: var(--default-color);
}
</style>

<template>
  <div
    class="item"
    style="
      border-top-width: var(--control-line);
      border-left-width: var(--control-line);
      border-top-left-radius: 100%;
    "
  ></div>
  <div
    class="item"
    style="
      border-top-width: var(--control-line);
      border-right-width: var(--control-line);
      border-top-right-radius: 100%;
    "
  ></div>
  <div
    class="item"
    style="
      border-bottom-width: var(--control-line);
      border-left-width: var(--control-line);
      border-bottom-left-radius: 100%;
    "
  ></div>
</template>

<script lang="ts">
import { InitComponentTemplate } from "@/utils";
import { XComponent, XRegister } from "@/utils/decorator";

@XRegister
export class XBusy extends XComponent {
  static get observedAttributes() {
    return ["aria-setsize"];
  }
  static name: string = "x-busy";
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
    if (this.ariaSetSize !== null) {
      this.style.height = this.ariaSetSize;
      this.style.width = this.ariaSetSize;
    }
  }
}
</script>
