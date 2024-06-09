<style lang="scss">
:host {
  display: block;
  border-width: var(--control-line);
  border-color: var(--tabs-border-color);
  border-style: var(--tabs-border-style);
  padding: var(--tabs-padding);
  border-radius: var(--control-radius);
  height: fit-content;
}
</style>
<template>
  <slot></slot>
</template>

<script lang="ts">
import { InitComponentTemplate, XDispatch } from "@/utils";
import { XComponent, XRegister } from "@/utils/decorator";

@XRegister
export class XSwiper extends XComponent {
  static name: string = "x-tabs";
  static get observedAttributes() {
    return ["aria-valuetext"]; // 声明要监听的属性
  }

  itemsMap: Map<string, any>;
  titleMap: Map<string, any>;

  constructor() {
    super();
    InitComponentTemplate.call(
      this,
      __X_COMPONENT_HTML_CODE__,
      __X_COMPONENT_STYLE_CODE__
    );
    this.titleMap = new Map();
    this.itemsMap = new Map();
  }

  commonInit(e: any, type: "title" | "item") {
    e.stopPropagation();
    const payload = e.detail;
    const map = type === "title" ? this.titleMap : this.itemsMap;
    if (map.get(payload.ariaValueText)) {
      return console.warn(`x-tabs-${type}的 ariaValueText 属性有重复`);
    }
    map.set(payload.ariaValueText, payload);
    if (payload.ariaValueText === this.ariaValueText) {
      payload.ariaCurrent = "";
    }
  }

  initItem(e: any) {
    this.commonInit(e, "item");
  }

  initTitle(e: any) {
    this.commonInit(e, "title");
  }

  handleTitleChange(e: any) {
    e.stopPropagation();
    this.ariaValueText = e.detail;
  }

  connectedCallback() {
    this.addEventListener("XSwiperItemInit", this.initItem);
    this.addEventListener("XSwiperChange", this.handleTitleChange);
  }

  disconnectedCallback() {
    this.removeEventListener("XSwiperItemInit", this.initItem);
    this.removeEventListener("XSwiperChange", this.handleTitleChange);
  }

  attributeChangedCallback() {
    this.itemsMap.forEach((tabItem, key) => {
      tabItem.ariaCurrent = key === this.ariaValueText ? "" : null;
    });
    this.titleMap.forEach((title, key) => {
      title.ariaCurrent = key === this.ariaValueText ? "" : null;
    });
    XDispatch.call(this, "change", this.ariaValueText);
  }
}
</script>
