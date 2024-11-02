<style lang="scss">
:host {
  display: flex;

  > slot {
    display: block;
    overflow: auto;
    height: 100%;
    flex-grow: 1;
    &::-webkit-scrollbar {
      background-color: transparent;
      width: 0;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #d9d9d9;
      border-radius: 5px;
    }
    &.scrollbar-hidden {
      &::-webkit-scrollbar-thumb {
        background-color: transparent;
      }
    }
  }
}

.x-track {
  background-color: var(--scrollbar-track-background);
  height: 100%;
  flex-shrink: 0;
  overflow: auto;
  padding: var(--scrollbar-track-padding);
  box-sizing: border-box;
  &::-webkit-scrollbar {
    width: 0;
  }
}
.x-thumb {
  width: var(--scrollbar-thumb-width);
  height: var(--scrollbar-thumb-height);
  border-radius: var(--scrollbar-thumb-radius);
  background-color: var(--scrollbar-thumb-background);
}
</style>
<template>
  <slot></slot>
  <div class="x-track">
    <div class="x-thumb"></div>
  </div>
</template>

<script lang="ts">
import { InitComponentTemplate } from "@/utils";
import { XComponent, XRegister } from "@/utils/decorator";

@XRegister
export class XScrollbar extends XComponent {
  static name: string = "x-scrollbar";
  static register: any;
  static get observedAttributes() {
    return ["aria-valuetext"]; // 声明要监听的属性
  }
  scrollPercent: number;
  trackHeight: number;
  constructor() {
    super();
    InitComponentTemplate.call(
      this,
      __X_COMPONENT_HTML_CODE__,
      __X_COMPONENT_STYLE_CODE__
    );
    this.scrollPercent = 0;
    this.trackHeight = 0;
  }
  connectedCallback() {
    const track = this.shadowRoot?.querySelector(".x-track") as HTMLDivElement;
    const thumb = this.shadowRoot?.querySelector(".x-thumb") as HTMLDivElement;
    const scrollContainer = this.shadowRoot?.children[0];
    if (!track || !scrollContainer || !thumb) {
      return;
    }
    track.style.marginLeft = -track.clientWidth + "px";

    const trackStyle = getComputedStyle(track);
    this.trackHeight =
      this.clientHeight -
      +trackStyle.paddingTop.slice(0, -2) -
      +trackStyle.paddingBottom.slice(0, -2);

    scrollContainer?.addEventListener("scroll", () => {
      this.scrollPercent =
        scrollContainer.scrollTop /
        (scrollContainer.scrollHeight - this.scrollHeight);
      thumb.style.marginTop =
        (this.trackHeight - thumb.clientHeight) * this.scrollPercent + "px";
    });
  }
}
</script>
