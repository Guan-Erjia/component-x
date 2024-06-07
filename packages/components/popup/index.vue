<template>
  <slot></slot>
  <div class="x-popup-border">
    <div class="x-popup-content">
      <div class="x-popup-arrow">
      </div>
      <slot name="content"></slot>
    </div>
  </div>
</template>
<style lang="scss">
:host {
  position: relative;
  display: inline-block;
}

.x-popup-content {
  padding: var(--popup-padding-block) var(--popup-padding-inline);
  background-color: white;
  display: block;
  box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
  position: relative;
  border-radius: var(--control-radius);
  font-size: var(--control-size);
  font-weight: var(--control-weight);
}

.x-popup-border {
  transition-property: all;
  transition-duration: 0s;
  transition-delay: 0.1s;
  display: none;
  position: absolute;
  z-index: 20;
  padding: var(--popup-offset);
}

:host(:hover) {
  .x-popup-border {
    display: block;
  }
}

.x-popup-border:hover {
  display: block;
}

:host([show]) {
  .x-popup-border {
    display: block;
  }
}

.x-popup-arrow {
  width: var(--popup-arrow-size);
  height: var(--popup-arrow-size);
  background-color: white;
  position: absolute;
}

:host([dark]) {
  .x-popup-content {
    background-color: black;
    color: white;
  }

  .x-popup-arrow {
    background-color: black;
  }
}

:host(:not([position])) {
  .x-popup-border {
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
  }

  .x-popup-arrow {
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 50%) rotate(45deg);
  }
}

:host([position=bottom]) {
  .x-popup-border {
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
  }

  .x-popup-arrow {
    top: 0;
    left: 50%;
    transform: translate(-50%, -50%) rotate(45deg);
  }
}

:host([position=left]) {
  .x-popup-border {
    top: 50%;
    right: 100%;
    transform: translateY(-50%);
  }

  .x-popup-arrow {
    right: 0;
    top: 50%;
    transform: translate(50%, -50%) rotate(45deg)
  }
}

:host([position=right]) {
  .x-popup-border {
    top: 50%;
    left: 100%;
    transform: translateY(-50%);
  }

  .x-popup-arrow {
    left: 0;
    top: 50%;
    transform: translate(-50%, -50%) rotate(45deg)
  }
}


:host([position=lt]) {
  .x-popup-border {
    top: calc(-1 * var(--popup-offset));
    right: 100%;
  }

  .x-popup-arrow {
    right: 0;
    top: 0;
    transform: translate(50%, 100%) rotate(45deg);
  }
}

:host([position=lb]) {
  .x-popup-border {
    bottom: calc(-1 * var(--popup-offset));
    right: 100%;
  }

  .x-popup-arrow {
    right: 0;
    bottom: 0;
    transform: translate(50%, -100%) rotate(45deg);
  }
}

:host([position=rt]) {
  .x-popup-border {
    top: calc(-1 * var(--popup-offset));
    left: 100%;
  }

  .x-popup-arrow {
    top: 0;
    left: 0;
    transform: translate(-50%, 100%) rotate(45deg);
  }
}

:host([position=rb]) {
  .x-popup-border {
    bottom: calc(-1 * var(--popup-offset));
    left: 100%;
  }

  .x-popup-arrow {
    bottom: 0;
    left: 0;
    transform: translate(-50%, -100%) rotate(45deg);
  }
}

:host([position=tl]) {
  .x-popup-border {
    bottom: 100%;
    left: calc(-1 * var(--popup-offset));
  }

  .x-popup-arrow {
    bottom: 0;
    left: 0;
    transform: translate(100%, 50%) rotate(45deg);
  }
}

:host([position=tr]) {
  .x-popup-border {
    bottom: 100%;
    right: calc(-1 * var(--popup-offset));
  }

  .x-popup-arrow {
    bottom: 0;
    right: 0;
    transform: translate(-100%, 50%) rotate(45deg);
  }
}

:host([position=bl]) {
  .x-popup-border {
    top: 100%;
    left: calc(-1 * var(--popup-offset));
  }

  .x-popup-arrow {
    top: 0;
    left: 0;
    transform: translate(100%, -50%) rotate(45deg);
  }
}

:host([position=br]) {
  .x-popup-border {
    top: 100%;
    right: calc(-1 * var(--popup-offset));
  }

  .x-popup-arrow {
    top: 0;
    right: 0;
    transform: translate(-100%, -50%) rotate(45deg);
  }
}

:host([no-arrow]) {
  .x-popup-arrow {
    display: none;
  }
}
</style>
<script lang="ts">
import { InitComponentTemplate } from "@/utils";
import { XComponent, XRegister } from "@/utils/decorator";

@XRegister
export class XPopup extends XComponent {

  static name: string = 'x-popup'
  static get observedAttributes() {
    return ['placement']; // 声明要监听的属性
  }

  show: boolean
  constructor() {
    super()
    InitComponentTemplate.call(this, __X_COMPONENT_HTML_CODE__, __X_COMPONENT_STYLE_CODE__)
    this.show = false
  }

  attributeChangedCallback() {
    this.attributeList = new Set(this.getAttributeNames());
    this.show = this.attributeList.has('show')
  }

  switchStatus(checked: boolean) {
    checked ? this.setAttribute('show', '') : this.removeAttribute('show')
  }
}
</script>