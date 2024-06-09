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
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 100%;
  width: 40px;
  height: 40px;
  cursor: pointer;
}
#left {
  left: 10px;
  top: 50%;
}
#right {
  right: 10px;
  top: 50%;
}
</style>
<template>
  <slot></slot>
  <div id="left"></div>
  <div id="right"></div>
</template>

<script lang="ts">
import { InitComponentTemplate, XDispatch } from "@/utils";
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

  connectedCallback() {
    this.addEventListener("XSwiperItemInit", this.initListener);
    const leftBtn = this.shadowRoot?.querySelector("#left") as HTMLElement;
    const rightBtn = this.shadowRoot?.querySelector("#right") as HTMLElement;
    leftBtn.onclick = () => {
      clearTimeout(this.timeout);
      this.curIndex -= 1;
      if (this.curIndex < 0) {
        this.curIndex = this.itemList.length - 1;
      }
      this.ariaValueText = this.itemList[this.curIndex].ariaValueText;
    };
    rightBtn.onclick = () => {
      clearTimeout(this.timeout);
      this.curIndex += 1;
      if (this.itemList.length === this.curIndex) {
        this.curIndex = 0;
      }
      this.ariaValueText = this.itemList[this.curIndex].ariaValueText;
    };
  }

  disconnectedCallback() {
    this.removeEventListener("XSwiperItemInit", this.initListener);
  }

  attributeChangedCallback() {
    this.itemList.forEach((tabItem) => {
      tabItem.ariaCurrent =
        tabItem.ariaValueText === this.ariaValueText ? "" : null;
    });
    XDispatch.call(this, "change", this.ariaValueText);

    this.timeout = setTimeout(() => {
      this.curIndex += 1;
      if (this.itemList.length === this.curIndex) {
        this.curIndex = 0;
      }
      this.ariaValueText = this.itemList[this.curIndex].ariaValueText;
    }, 1000);
  }
}
</script>
