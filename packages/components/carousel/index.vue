<style lang="scss">
:host {
  display: flex;
  border-radius: var(--control-radius);
  position: relative;
  height: fit-content;
}
#content {
  display: flex;
  overflow-x: hidden;
  height: 100%;
  width: 100%;
}

#left,
#right {
  position: absolute;
  transform: var(--carousel-btn-transform);
  background-color: var(--carousel-btn-color);
  border-radius: var(--carousel-btn-radius);
  width: var(--carousel-btn-size);
  height: var(--carousel-btn-size);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  > div {
    width: var(--carousel-arrow-size);
    height: var(--carousel-arrow-size);
    border-style: solid;
    border-color: var(--carousel-arrow-color);
    border-top-width: var(--carousel-arrow-width);
    border-right-width: var(--carousel-arrow-width);
    border-left-width: 0;
    border-bottom-width: 0;
  }
}
#left {
  left: var(--carousel-btn-margin);
  top: 50%;
  > div {
    transform: rotate(-135deg);
  }
}
#right {
  right: var(--carousel-btn-margin);
  top: 50%;
  > div {
    transform: rotate(45deg);
  }
}
</style>
<template>
  <div id="content">
    <slot></slot>
  </div>
  <div id="left">
    <div></div>
  </div>
  <div id="right">
    <div></div>
  </div>
</template>

<script lang="ts">
import { InitComponentTemplate } from "@/utils";
import { XComponent, XRegister } from "@/utils/decorator";
import { XCarouselItem } from "./item.vue";

@XRegister
export class XCarosel extends XComponent {
  static name: string = "x-carousel";
  static get observedAttributes() {
    return ["aria-valuetext"]; // 声明要监听的属性
  }

  itemList: XCarouselItem[];
  curIndex: number;
  timeout: number;
  root?: HTMLElement;
  hover: boolean;
  constructor() {
    super();
    InitComponentTemplate.call(
      this,
      __X_COMPONENT_HTML_CODE__,
      __X_COMPONENT_STYLE_CODE__
    );
    this.itemList = [];
    this.curIndex = 0;
    this.timeout = 0;
    this.hover = false;
  }

  initListener(e: any) {
    e.stopPropagation();
    const payload = e.detail;
    if (this.itemList.some((i) => i.ariaValueText === payload.ariaValueText)) {
      return console.warn(`x-carousel-item 的 ariaValueText 属性有重复`);
    }
    this.itemList.push(payload);
    console.log(this.itemList)
    if (payload.ariaValueText === this.ariaValueText) {
      payload.ariaCurrent = "";
    }
  }

  switchNext() {
    clearTimeout(this.timeout);
    this.curIndex += 1;
    if (this.itemList.length === this.curIndex) {
      this.curIndex = 0;
    }
    this.ariaValueText = this.itemList[this.curIndex].ariaValueText;
  }

  switchPrev() {
    clearTimeout(this.timeout);
    this.curIndex -= 1;
    if (this.curIndex < 0) {
      this.curIndex = this.itemList.length - 1;
    }
    this.ariaValueText = this.itemList[this.curIndex].ariaValueText;
  }

  connectedCallback() {
    this.addEventListener("XCarouselItemInit", this.initListener);
    const leftBtn = this.shadowRoot?.querySelector("#left") as HTMLElement;
    const rightBtn = this.shadowRoot?.querySelector("#right") as HTMLElement;
    leftBtn.onclick = () => this.switchPrev();
    rightBtn.onclick = () => this.switchNext();

    this.onmouseover = () => {
      if (this.ariaValueNow === null) {
        return;
      }
      clearTimeout(this.timeout);
      this.hover = true;
    };
    this.onmouseleave = () => {
      if (this.ariaValueNow === null) {
        return;
      }
      this.hover = false;
      this.attributeChangedCallback();
    };
  }

  disconnectedCallback() {
    this.removeEventListener("XCarouselItemInit", this.initListener);
    this.onmouseover = null;
    this.onmouseleave = null;
  }

  attributeChangedCallback() {
    this.itemList.forEach((tabItem) => {
      if (tabItem.ariaValueText === this.ariaValueText) {
        tabItem.ariaCurrent = "";
        tabItem.scrollIntoView({ behavior: "smooth" });
      } else {
        tabItem.ariaCurrent = null;
      }
    });
    if (this.ariaValueNow && this.ariaValueNow !== null) {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.switchNext();
      }, +this.ariaValueNow);
    }
  }
}
</script>
