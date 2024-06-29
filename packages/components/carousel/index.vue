<style lang="scss">
:host {
  display: inline-flex;
  border-radius: var(--control-radius);
  position: relative;
  height: fit-content;
}
#content {
  display: flex;
  height: 100%;
  width: 100%;
}

#prev,
#next {
  position: absolute;
  background-color: var(--carousel-btn-color);
  border-radius: var(--carousel-btn-radius);
  width: var(--carousel-btn-size);
  height: var(--carousel-btn-size);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
}
#prev-icon,
#next-icon {
  width: var(--carousel-arrow-size);
  height: var(--carousel-arrow-size);
  border-style: solid;
  border-color: var(--carousel-arrow-color);
  border-top-width: var(--carousel-arrow-width);
  border-right-width: var(--carousel-arrow-width);
  border-left-width: 0;
  border-bottom-width: 0;
}

#dots {
  position: absolute;
  display: flex;
  gap: var(--carousel-dot-gap);
  width: var(--carousel-dots-length);
  justify-content: space-between;
}

.dot {
  padding: var(--carousel-dot-block) var(--carousel-dot-inline);
  cursor: pointer;
  flex-grow: 1;
  > div {
    background-color: var(--carousel-dot-color);
    height: var(--carousel-dot-length);
    border-radius: var(--control-radius);
    &:hover {
      background-color: var(--carousel-dot-active);
    }
  }
}

.dot[aria-current] > div {
  background-color: gainsboro;
}

:host(:not([vertical])) {
  #content {
    overflow-x: hidden;
  }
  #prev,
  #next {
    top: var(--carousel-btn-position);
    transform: translateY(-50%);
  }
  #prev {
    left: var(--carousel-btn-margin);
  }
  #next {
    right: var(--carousel-btn-margin);
  }
  #prev-icon {
    transform: rotate(-135deg);
  }
  #next-icon {
    transform: rotate(45deg);
  }
  #dots {
    bottom: var(--carousel-dot-offset);
    left: 50%;
    transform: translateX(-50%);
  }
}

:host([vertical]) {
  #content {
    overflow-y: hidden;
    flex-direction: column;
  }
  #dots {
    left: var(--carousel-dot-offset);
    top: 50%;
    transform: translateY(-50%);
    flex-direction: column;
    height: var(--carousel-dots-length);
  }
  #prev,
  #next {
    left: var(--carousel-btn-position);
    transform: translateX(-50%);
  }
  #prev {
    top: var(--carousel-btn-margin);
  }
  #next {
    bottom: var(--carousel-btn-margin);
  }
  #prev-icon {
    transform: rotate(-45deg);
  }
  #next-icon {
    transform: rotate(135deg);
  }
  .dot {
    padding: var(--carousel-dot-inline) var(--carousel-dot-block);
    > div {
      width: var(--carousel-dot-length);
      height: 100%;
    }
  }
}

:host([hide-arrow]) {
  #prev,
  #next {
    display: none;
  }
}

:host([hide-control]) {
  #dots {
    display: none;
  }
}
</style>
<template>
  <div id="content">
    <slot></slot>
  </div>
  <div id="prev">
    <slot name="prev-icon">
      <div id="prev-icon"></div>
    </slot>
  </div>
  <div id="next">
    <slot name="next-icon">
      <div id="next-icon"></div>
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
    dot.innerHTML = `<div></div>`;
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
    let index = type === "next" ? this.curIndex + 1 : this.curIndex - 1;
    if (this.itemList.length === index) {
      index = 0;
    }
    if (index < 0) {
      index = this.itemList.length - 1;
    }
    this.ariaValueText = this.itemList[index].ariaValueText;
  }

  connectedCallback() {
    this.dots = this.shadowRoot?.querySelector("#dots");
    this.addEventListener("XCarouselItemInit", this.initListener);
    const prevBtn = this.shadowRoot?.querySelector("#prev") as HTMLElement;
    const nextBtn = this.shadowRoot?.querySelector("#next") as HTMLElement;
    prevBtn.onclick = () => this.switchIndex("prev");
    nextBtn.onclick = () => this.switchIndex("next");

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
