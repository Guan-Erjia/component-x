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
  top: var(--carousel-btn-position);
}
#left {
  left: var(--carousel-btn-margin);
}
#right {
  right: var(--carousel-btn-margin);
}
#left-icon,
#right-icon {
  width: var(--carousel-arrow-size);
  height: var(--carousel-arrow-size);
  border-style: solid;
  border-color: var(--carousel-arrow-color);
  border-top-width: var(--carousel-arrow-width);
  border-right-width: var(--carousel-arrow-width);
  border-left-width: 0;
  border-bottom-width: 0;
}
#left-icon {
  transform: rotate(-135deg);
}
#right-icon {
  transform: rotate(45deg);
}
.dot {
  background-color: gray;
  width: 20px;
  height: 5px;
  margin: 0 10px;
  cursor: pointer;
  &:hover {
    background-color: gainsboro;
  }
}

.dot[aria-current] {
  background-color: gainsboro;
}

#dots {
  position: absolute;
  bottom: 5%;
  left: 50%;
  display: flex;
  transform: translateX(-50%);
}
</style>
<template>
  <div id="content">
    <slot></slot>
  </div>
  <div id="left">
    <slot name="left-icon">
      <div id="left-icon"></div>
    </slot>
  </div>
  <div id="right">
    <slot name="right-icon">
      <div id="right-icon"></div>
    </slot>
  </div>
  <div id="dots"></div>
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
  dots: HTMLElement | null | undefined;
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
      return console.warn(`x-carousel-item 的 ariaValueText 属性有重复`);
    }
    this.itemList.push(payload);
    const dot = document.createElement("div");
    dot.className = "dot";
    dot.ariaValueText = payload.ariaValueText;
    if (payload.ariaValueText === this.ariaValueText) {
      payload.ariaCurrent = "";
      dot.ariaCurrent = "";
      payload.scrollIntoView();
    }
    dot.onclick = () => {
      clearTimeout(this.timeout);
      this.ariaValueText = payload.ariaValueText;
    };
    this.dots?.appendChild(dot);
  }

  switchIndex(type: "next" | "prev") {
    clearTimeout(this.timeout);
    let index;
    if (type === "next") {
      index = this.curIndex + 1;
      if (this.itemList.length === index) {
        index = 0;
      }
    } else {
      index = this.curIndex - 1;
      if (index < 0) {
        index = this.itemList.length - 1;
      }
    }
    this.ariaValueText = this.itemList[index].ariaValueText;
  }

  connectedCallback() {
    this.dots = this.shadowRoot?.querySelector("#dots");
    this.addEventListener("XCarouselItemInit", this.initListener);
    const leftBtn = this.shadowRoot?.querySelector("#left") as HTMLElement;
    const rightBtn = this.shadowRoot?.querySelector("#right") as HTMLElement;
    leftBtn.onclick = () => this.switchIndex("prev");
    rightBtn.onclick = () => this.switchIndex("next");

    this.onmouseover = () => {
      if (this.ariaValueNow === null) {
        return;
      }
      clearTimeout(this.timeout);
    };
    this.onmouseleave = () => {
      if (this.ariaValueNow === null) {
        return;
      }
      this.attributeChangedCallback();
    };
  }

  disconnectedCallback() {
    this.removeEventListener("XCarouselItemInit", this.initListener);
    this.onmouseover = null;
    this.onmouseleave = null;
  }

  attributeChangedCallback() {
    if (this.ariaValueText) {
      this.dots?.childNodes.forEach((dot: any) => {
        dot.ariaCurrent = dot.ariaValueText === this.ariaValueText ? "" : null;
      });
    }
    this.itemList.forEach((tabItem, index) => {
      if (tabItem.ariaValueText === this.ariaValueText) {
        tabItem.ariaCurrent = "";
        tabItem.scrollIntoView({ behavior: "smooth" });
        this.curIndex = index;
      } else {
        tabItem.ariaCurrent = null;
      }
    });
    if (this.ariaValueNow !== null) {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.switchIndex("next");
      }, +this.ariaValueNow);
    }
  }
}
</script>
