<style lang="scss">
:host {
  .x-tabs-title {
    display: block;
  }
}
</style>
<template>
  <slot name="title" class="x-tabs-title"></slot>
  <slot></slot>
</template>


<script lang="ts">
import { InitComponentTemplate, } from "@/utils";
import { XComponent, XRegister } from "@/utils/decorator";

@XRegister
export class XTabs extends XComponent {
  static name: string = 'x-tabs'
  static get observedAttributes() {
    return ["key"]; // 声明要监听的属性
  }

  innerElement: HTMLDialogElement | undefined;
  tabsMap: Map<string, any>
  key: string | null

  constructor() {
    super();
    InitComponentTemplate.call(this, __X_COMPONENT_HTML_CODE__, __X_COMPONENT_STYLE_CODE__)
    this.tabsMap = new Map()
    this.key = null
  }


  initListener(e: any) {
    e.stopPropagation()
    const payload = e.detail

    if (this.tabsMap.get(payload.key)) {
      return console.warn(`x-tabs-item的key属性有重复`)
    }
    this.tabsMap.set(payload.key, payload)
    if (this.key && payload.key === this.key) {
      payload.setVisiable(true)
    }
  }

  handleTitleChange(e: any) {
    e.stopPropagation()
    this.setAttribute('key', e.detail)
  }


  handleChange() {
    this.tabsMap.forEach((tabItem, key) => {
      if (key === this.key) {
        tabItem.setVisiable(true)
      } else {
        tabItem.setVisiable(false)
      }
    })
    this.dispatchEvent(new CustomEvent('change', { detail: this.key }))
  }


  connectedCallback() {
    this.addEventListener('xTabsInit', this.initListener)
    this.addEventListener('xTabsChange', this.handleTitleChange)
  }

  disconnectedCallback() {
    this.removeEventListener('xTabsInit', this.initListener)
    this.removeEventListener('xTabsChange', this.handleTitleChange)
  }

  attributeChangedCallback() {
    this.attributeList = new Set(this.getAttributeNames());
    this.key = this.getAttribute('key')
    this.handleChange()
  }
}

</script>