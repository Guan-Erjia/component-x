<style lang="scss">
:host {
  display: block;
  position: relative;

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
  background-color: rgba(255, 0, 0, 0);
  height: calc(100% - var(--scrollbar-track-padding) * 2);
  overflow-y: auto;
  position: absolute;
  right: 0;
  top: 0;
  width: calc(var(--scrollbar-track-width) + 1px);
  margin-top: var(--scrollbar-track-padding);
  margin-bottom: var(--scrollbar-track-padding);
  &::-webkit-scrollbar {
    width: var(--scrollbar-track-width);
    background-color: var(--scrollbar-track-background);
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--scrollbar-thumb-background);
    border-radius: var(--control-radius);
    width: var(--scrollbar-track-width);
    height: var(--scrollbar-thumb-height);
  }
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
  inTrack: boolean;
  constructor() {
    super();
    InitComponentTemplate.call(
      this,
      __X_COMPONENT_HTML_CODE__,
      __X_COMPONENT_STYLE_CODE__
    );
    this.inTrack = false;
  }
  connectedCallback() {
    const track = this.shadowRoot?.querySelector(".x-track") as HTMLDivElement;
    const thumb = this.shadowRoot?.querySelector(".x-thumb") as HTMLDivElement;
    const container = this.shadowRoot?.children[0];
    if (!track || !container || !thumb) {
      return;
    }

    thumb.style.height = container.scrollHeight + "px";

    track.addEventListener("mouseenter", () => {
      this.inTrack = true;
    });
    track.addEventListener("mouseleave", () => {
      this.inTrack = false;
    });

    track.addEventListener("scroll", () => {
      if (!this.inTrack) {
        return;
      }
      const percent =
        track.scrollTop / (track.scrollHeight - track.clientHeight);
      container.scrollTop =
        (container.scrollHeight - container.clientHeight) * percent;
    });
    container.addEventListener("scroll", () => {
      if (this.inTrack) {
        return;
      }
      const percent =
        container.scrollTop / (container.scrollHeight - container.clientHeight);
      track.scrollTop = (track.scrollHeight - track.clientHeight) * percent;
    });
  }
}
</script>
