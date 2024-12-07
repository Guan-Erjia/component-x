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
  scroll-behavior: smooth;
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
  z-index: 10;
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

@XRegister
export class XCarosel extends XComponent {
  static name: string = "x-carousel";
  static get observedAttributes() {
    return ["aria-current"]; // 声明要监听的属性
  }

  carouselItemCount: number;
  timeout: number;
  dots: HTMLElement | null | undefined;
  root?: HTMLDivElement;
  constructor() {
    super();
    InitComponentTemplate.call(
      this,
      __X_COMPONENT_HTML_CODE__,
      __X_COMPONENT_STYLE_CODE__
    );
    this.carouselItemCount = 0;
    this.timeout = 0;
  }

  initListener(event: any) {
    event.stopPropagation();
    const dot = document.createElement("div");
    dot.className = "dot";
    dot.appendChild(document.createElement("div"));
    dot.ariaValueText = this.carouselItemCount + "";
    dot.onclick = () => {
      clearTimeout(this.timeout);
      this.ariaCurrent = dot.ariaValueText;
    };
    if (this.carouselItemCount === this.currentIndex) {
      dot.ariaCurrent = "";
      this.root?.scrollTo({ ...this.scrollToOptions, behavior: "instant" });
    }
    this.dots?.appendChild(dot);
    this.carouselItemCount++;
  }

  get currentIndex() {
    return +(this.ariaCurrent || 0);
  }

  switchIndex(type: "next" | "prev") {
    clearTimeout(this.timeout);
    let index = type === "next" ? this.currentIndex + 1 : this.currentIndex - 1;
    if (this.carouselItemCount <= index) {
      index = 0;
    }
    if (index < 0) {
      index = this.carouselItemCount - 1;
    }
    this.ariaCurrent = index + "";
  }

  connectedCallback() {
    this.dots = this.shadowRoot?.querySelector("#dots");
    this.addEventListener("XCarouselItemInit", this.initListener);
    const prevBtn = this.shadowRoot?.querySelector("#prev");
    const nextBtn = this.shadowRoot?.querySelector("#next");
    if (prevBtn && "onclick" in prevBtn) {
      prevBtn.onclick = () => this.switchIndex("prev");
    }
    if (nextBtn && "onclick" in nextBtn) {
      nextBtn.onclick = () => this.switchIndex("next");
    }

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
  }

  get containerWidth() {
    return this.root ? +getComputedStyle(this.root).width.replace("px", "") : 0;
  }

  get containerHeight() {
    return this.root
      ? +getComputedStyle(this.root).height.replace("px", "")
      : 0;
  }

  get scrollToOptions() {
    return this.getAttribute("vertical") === null
      ? {
          left: this.containerWidth * this.currentIndex,
        }
      : {
          top: this.containerHeight * this.currentIndex,
        };
  }

  attributeChangedCallback() {
    if (this.ariaCurrent) {
      this.dots?.childNodes.forEach((dot: any, index) => {
        dot.ariaCurrent = this.currentIndex === index ? "" : null;
      });
    }
    this.root?.scrollTo(this.scrollToOptions);
    if (this.ariaValueNow !== null) {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.switchIndex("next");
      }, +this.ariaValueNow);
    }
  }
}
</script>
