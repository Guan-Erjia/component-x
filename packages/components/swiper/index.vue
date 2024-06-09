<style lang="scss">
:host {
  display: block;
  border-radius: var(--control-radius);
  height: fit-content;
  position: relative;
}

#left,
#right {
  position: absolute;
  transform: var(--swiper-btn-transform);
  background-color: var(--swiper-btn-color);
  border-radius: var(--swiper-btn-radius);
  width: var(--swiper-btn-size);
  height: var(--swiper-btn-size);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  > div {
    width: var(--swiper-arrow-size);
    height: var(--swiper-arrow-size);
    border-style: solid;
    border-color: var(--swiper-arrow-color);
    border-top-width: var(--swiper-arrow-width);
    border-right-width: var(--swiper-arrow-width);
    border-left-width: 0;
    border-bottom-width: 0;
  }
}
#left {
  left: var(--swiper-btn-margin);
  top: 50%;
  > div {
    transform: rotate(-135deg);
  }
}
#right {
  right: var(--swiper-btn-margin);
  top: 50%;
  > div {
    transform: rotate(45deg);
  }
}
</style>
<template>
  <slot></slot>
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
import { XSwiperItem } from "./item.vue";

@XRegister
export class XSwiper extends XComponent {
  static name: string = "x-swiper";
  static get observedAttributes() {
    return ["aria-valuetext"]; // 声明要监听的属性
  }

  itemList: XSwiperItem[];
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
      return console.warn(`x-swiper-item 的 ariaValueText 属性有重复`);
    }
    this.itemList.push(payload);
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
    this.addEventListener("XSwiperItemInit", this.initListener);
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
    this.removeEventListener("XSwiperItemInit", this.initListener);
    this.onmouseover = null;
    this.onmouseleave = null;
  }

  attributeChangedCallback() {
    this.itemList.forEach((tabItem) => {
      tabItem.ariaCurrent =
        tabItem.ariaValueText === this.ariaValueText ? "" : null;
    });
    if (this.ariaValueNow && this.ariaValueNow !== null)
      this.timeout = setTimeout(() => {
        this.switchNext();
      }, +this.ariaValueNow);
  }
}
</script>
