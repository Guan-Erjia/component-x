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
#title {
  display: block;
  padding-bottom: var(--tabs-title-padding);
  margin-bottom: var(--tabs-title-margin);
  border-bottom: var(--tabs-br);
}
</style>
<template>
  <slot name="title" id="title"></slot>
  <slot></slot>
</template>

<script lang="ts">
import { InitComponentTemplate, XDispatch } from "@/utils";
import { XComponent, XRegister } from "@/utils/decorator";
import { XTabsTitle } from "./title.vue";
import { XTabsItem } from "./item.vue";

@XRegister
export class XTabs extends XComponent {
  static name: string = "x-tabs";
  static get observedAttributes() {
    return ["aria-valuetext"]; // 声明要监听的属性
  }

  childSet: Set<XTabsTitle>;
  titleSet: Set<XTabsItem>;

  constructor() {
    super();
    InitComponentTemplate.call(
      this,
      __X_COMPONENT_HTML_CODE__,
      __X_COMPONENT_STYLE_CODE__
    );
    this.titleSet = new Set();
    this.childSet = new Set();
  }

  commonInit(e: any, type: "title" | "item") {
    e.stopPropagation();
    const payload = e.detail;
    const set = type === "title" ? this.titleSet : this.childSet;
    set.add(payload);
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
    this.addEventListener("XTabsItemInit", this.initItem);
    this.addEventListener("XTabsTitleInit", this.initTitle);
    this.addEventListener("XTabsChange", this.handleTitleChange);
  }

  disconnectedCallback() {
    this.removeEventListener("XTabsItemInit", this.initItem);
    this.removeEventListener("XTabsTitleInit", this.initTitle);
    this.removeEventListener("XTabsChange", this.handleTitleChange);
  }

  attributeChangedCallback() {
    this.childSet.forEach((tabItem) => {
      tabItem.ariaCurrent = tabItem.ariaValueText === this.ariaValueText ? "" : null;
    });
    this.titleSet.forEach((title) => {
      title.ariaCurrent =  title.ariaValueText === this.ariaValueText ? "" : null;
    });
    XDispatch.call(this, "change", this.ariaValueText);
  }
}
</script>
