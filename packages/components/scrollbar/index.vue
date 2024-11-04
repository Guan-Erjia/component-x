<style lang="scss">
:host {
  position: relative;
  display: block;

  > slot {
    overflow: auto;
    height: 100%;
    display: block;
    &::-webkit-scrollbar {
      width: 0;
    }
  }
}

.x-track {
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  overflow-y: auto;
  width: calc(var(--scrollbar-track-width) + 1px);
  &::-webkit-scrollbar {
    width: var(--scrollbar-track-width);
    background-color: var(--scrollbar-track-background);
    padding: 2px;
  }
  &::-webkit-scrollbar-thumb {
    width: var(--scrollbar-track-width);
    height: var(--scrollbar-thumb-height);
    background-color: var(--scrollbar-thumb-background);
    border-radius: var(--control-radius);
  }

  &.x-scrollbar-thumb-hidden::-webkit-scrollbar-thumb {
    background-color: rgba(#000000, 0);
  }
}
:host([aria-hidden="true"]) {
  .x-track::-webkit-scrollbar {
    background-color: rgba(#000000, 0);
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
  track: HTMLDivElement | null;
  timer: number;
  delay: number;
  constructor() {
    super();
    InitComponentTemplate.call(
      this,
      __X_COMPONENT_HTML_CODE__,
      __X_COMPONENT_STYLE_CODE__
    );
    this.inTrack = false;
    this.timer = 0;
    this.track = null;
    this.delay = 3000;
  }

  handleHidden() {
    if (this.ariaHidden) {
      this.track?.classList.remove("x-scrollbar-thumb-hidden");
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        if (!this.inTrack) {
          this.track?.classList.add("x-scrollbar-thumb-hidden");
        } else {
          this.handleHidden();
        }
      }, this.delay);
    }
  }

  connectedCallback() {
    const track = this.shadowRoot?.querySelector(".x-track") as HTMLDivElement;
    const thumb = this.shadowRoot?.querySelector(".x-thumb") as HTMLDivElement;
    const container = this.shadowRoot?.children[0];
    if (!track || !container || !thumb) {
      return;
    }
    this.track = track;
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
      const percent = track.scrollTop / track.scrollHeight;
      container.scrollTop = container.scrollHeight * percent;
      this.handleHidden();
    });

    container.addEventListener("scroll", () => {
      if (this.inTrack) {
        return;
      }
      const percent = container.scrollTop / container.scrollHeight;
      track.scrollTop = track.scrollHeight * percent;
      this.handleHidden();
    });
  }
}
</script>
