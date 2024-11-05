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

.track-y {
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
    height: var(--scrollbar-thumb-length);
    background-color: var(--scrollbar-thumb-background);
    border-radius: var(--control-radius);
  }
}

.track-x {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  overflow-x: auto;
  height: calc(var(--scrollbar-track-width) + 1px);
  &::-webkit-scrollbar {
    height: var(--scrollbar-track-width);
    background-color: var(--scrollbar-track-background);
    padding: 2px;
  }
  &::-webkit-scrollbar-thumb {
    width: var(--scrollbar-track-width);
    height: var(--scrollbar-thumb-length);
    background-color: var(--scrollbar-thumb-background);
    border-radius: var(--control-radius);
  }
}

.scrollbar-hidden::-webkit-scrollbar-thumb {
  background-color: rgba(#000000, 0);
}

:host([aria-hidden="true"]) {
  .track-x::-webkit-scrollbar {
    background-color: rgba(#000000, 0);
  }
  .track-y::-webkit-scrollbar {
    background-color: rgba(#000000, 0);
  }
}
</style>
<template>
  <slot></slot>
  <div class="track-x">
    <div class="thumb-x"></div>
  </div>
  <div class="track-y">
    <div class="thumb-y"></div>
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
    return [];
  }
  inTrackX: boolean;
  inTrackY: boolean;
  timerX: number;
  timerY: number;
  delay: number;
  constructor() {
    super();
    InitComponentTemplate.call(
      this,
      __X_COMPONENT_HTML_CODE__,
      __X_COMPONENT_STYLE_CODE__
    );
    this.inTrackX = false;
    this.inTrackY = false;
    this.timerX = 0;
    this.timerY = 0;
    this.delay = 3000;
  }

  handleHidden(track: HTMLDivElement, vertical: boolean) {
    if (!this.ariaHidden) {
      return;
    }

    track?.classList.remove("scrollbar-hidden");
    const timerKey = vertical ? "timerY" : "timerX";
    if (this[timerKey]) {
      clearTimeout(this[timerKey]);
    }
    const inTrackKey = vertical ? "inTrackY" : "inTrackX";
    this[timerKey] = setTimeout(() => {
      if (this[inTrackKey]) {
        this.handleHidden(track, vertical);
      } else {
        track?.classList.add("scrollbar-hidden");
      }
    }, this.delay);
  }

  handleTrackScroll(track: HTMLDivElement, vertical: boolean) {
    const container = this.shadowRoot?.children[0] as HTMLDivElement;

    const inTrackKey = vertical ? "inTrackY" : "inTrackX";
    track.addEventListener("mouseenter", () => {
      this[inTrackKey] = true;
    });
    track.addEventListener("mouseleave", () => {
      this[inTrackKey] = false;
    });

    const offsetKey = vertical ? "scrollTop" : "scrollLeft";
    const lengthKey = vertical ? "scrollHeight" : "scrollWidth";
    track.addEventListener("scroll", () => {
      const inTrack = vertical ? this.inTrackY : this.inTrackX;
      if (!inTrack) {
        return;
      }
      const percent = track[offsetKey] / track[lengthKey];
      container[offsetKey] = container[lengthKey] * percent;
      this.handleHidden(track, vertical);
    });
  }

  connectedCallback() {
    const trackX = this.shadowRoot?.querySelector(".track-x") as HTMLDivElement;
    const thumbX = this.shadowRoot?.querySelector(".thumb-x") as HTMLDivElement;
    const trackY = this.shadowRoot?.querySelector(".track-y") as HTMLDivElement;
    const thumbY = this.shadowRoot?.querySelector(".thumb-y") as HTMLDivElement;
    const container = this.shadowRoot?.children[0] as HTMLDivElement;

    thumbX.style.width = container.scrollWidth + "px";
    thumbY.style.height = container.scrollHeight + "px";

    this.handleTrackScroll(trackX, false);
    this.handleTrackScroll(trackY, true);

    container.addEventListener("scroll", () => {
      if (this.inTrackX || this.inTrackY) {
        return;
      }
      const percentX = container.scrollLeft / container.scrollWidth;
      const percentY = container.scrollTop / container.scrollHeight;
      trackX.scrollLeft = trackX.scrollWidth * percentX;
      trackY.scrollTop = trackY.scrollHeight * percentY;

      this.handleHidden(trackX, false);
      this.handleHidden(trackY, true);
    });
  }
}
</script>
