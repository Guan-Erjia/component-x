<style lang="scss">
:host {
  display: block;
  border-width: var(--control-line);
  border-color: var(--tabs-border-color);
  border-style: var(--tabs-border-style);
  padding: var(--tabs-padding);
  border-radius: var(--control-radius);

  .x-tabs-title {
    display: block;
    padding-bottom: var(--tabs-title-padding);
    margin-bottom: var(--tabs-title-margin);
    border-bottom: var(--tabs-br);
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
  itemsMap: Map<string, any>
  titleMap: Map<string, any>
  key: string | null

  constructor() {
    super();
    InitComponentTemplate.call(this, __X_COMPONENT_HTML_CODE__, __X_COMPONENT_STYLE_CODE__)
    this.titleMap = new Map()
    this.itemsMap = new Map()
    this.key = null
  }

  commonInit(e: any, type: 'title' | 'item') {
    e.stopPropagation()
    const payload = e.detail
    const map = type === 'title' ? this.titleMap : this.itemsMap
    if (map.get(payload.key)) {
      return console.warn(`x-tabs-${type}的key属性有重复`)
    }
    map.set(payload.key, payload)
    if (this.key && payload.key === this.key) {
      payload.setActive && payload.setActive(true)
      payload.setVisiable && payload.setVisiable(true)
    }
  }

  initItem(e: any) {
    this.commonInit(e, 'item')
  }

  initTitle(e: any) {
    this.commonInit(e, 'title')
  }

  handleTitleChange(e: any) {
    e.stopPropagation()
    this.setAttribute('key', e.detail)
  }


  handleChange() {
    this.itemsMap.forEach((tabItem, key) => {
      if (key === this.key) {
        tabItem.setVisiable(true)
      } else {
        tabItem.setVisiable(false)
      }
    })
    this.titleMap.forEach((tabItem, key) => {
      if (key === this.key) {
        tabItem.setActive(true)
      } else {
        tabItem.setActive(false)
      }
    })
    this.dispatchEvent(new CustomEvent('change', { detail: this.key }))
  }


  connectedCallback() {
    this.addEventListener('xTabsInit', this.initItem)
    this.addEventListener('xTabsTitle', this.initTitle)
    this.addEventListener('xTabsChange', this.handleTitleChange)
  }

  disconnectedCallback() {
    this.removeEventListener('xTabsInit', this.initItem)
    this.removeEventListener('xTabsTitle', this.initTitle)
    this.removeEventListener('xTabsChange', this.handleTitleChange)
  }

  attributeChangedCallback() {
    this.key = this.getAttribute('key')
    this.handleChange()
  }
}

</script>