<template>
  <slot name="label">
    <span class="x-menu-label">
    </span>
    <span class="x-menu-arrow">></span>
  </slot>
  <ol class="x-menu-children">
    <slot></slot>
  </ol>
</template>
<style lang="scss">
:host {
  display: block;
  background-color: gainsboro;
}

.x-menu-label {
  cursor: pointer;
  margin: 10px 0;
}

.x-menu-children {
  display: none;
  transition: all 1s linear;
}

:host([aria-expanded]) {
  .x-menu-children {
    display: block;
  }
}
</style>
<script lang="ts">
import { InitComponentTemplate } from "@/utils";
import { XComponent, XRegister } from "@/utils/decorator";

@XRegister
export class XMenuItem extends XComponent {
  static name: string = 'x-menu-item'
  static get observedAttributes() {
    return ['aria-label', 'aria-disabled', 'aria-expanded']; // 声明要监听的属性
  }

  labelElement: HTMLOListElement;
  label: string
  expand: boolean
  constructor() {
    super()
    InitComponentTemplate.call(this, __X_COMPONENT_HTML_CODE__, __X_COMPONENT_STYLE_CODE__)
    this.labelElement = this.shadowRoot?.querySelector('.x-menu-label') as HTMLOListElement
    this.label = ''
    this.expand = false;
  }


  connectedCallback() {
    this.labelElement.onclick = () => {
      this.expand ? this.removeAttribute('aria-expanded') : this.setAttribute('aria-expanded', '')
    }
  }

  disconnectedCallback() {
  }

  attributeChangedCallback() {
    this.attributeList = new Set(this.getAttributeNames());
    this.label = this.getAttribute('aria-label') || ''
    this.expand = this.attributeList.has('aria-expanded')
    this.labelElement.innerHTML = this.label
  }
}

</script>