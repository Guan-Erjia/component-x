<style lang="scss">
:host {
  position: relative;
  display: block;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
<template>
  <slot></slot>
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
  inTrack: boolean;
  timer: number;
  delay: number;
  trackX?: HTMLDivElement;
  trackY?: HTMLDivElement;
  resizeObserver?: ResizeObserver;
  constructor() {
    super();
    InitComponentTemplate.call(
      this,
      __X_COMPONENT_HTML_CODE__,
      __X_COMPONENT_STYLE_CODE__
    );
    this.inTrack = false;
    this.timer = 0;
    this.delay = 3000;
  }

  handleHidden() {
    if (!this.ariaHidden) {
      return;
    }
    this.trackX?.classList.remove("scrollbar-hidden");
    this.trackY?.classList.remove("scrollbar-hidden");
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => {
      if (this.inTrack) {
        this.handleHidden();
      } else {
        this.trackX?.classList.add("scrollbar-hidden");
        this.trackY?.classList.add("scrollbar-hidden");
      }
    }, this.delay);
  }

  handleTrackScroll(track: HTMLDivElement, vertical: boolean) {
    track.addEventListener("mouseenter", () => {
      this.inTrack = true;
    });
    track.addEventListener("mouseleave", () => {
      this.inTrack = false;
    });

    const offsetKey = vertical ? "scrollTop" : "scrollLeft";
    const lengthKey = vertical ? "scrollHeight" : "scrollWidth";

    track.addEventListener("scroll", () => {
      if (!this.inTrack) {
        return;
      }
      const percent = track[offsetKey] / track[lengthKey];
      this[offsetKey] = this[lengthKey] * percent;
      this.handleHidden();
    });
  }

  calcTrackStyle() {
    if (!this.trackX || !this.trackY) {
      return;
    }
    const rect = this.getBoundingClientRect();
    const rectY = this.trackY.getBoundingClientRect();
    this.trackY.style.transform = `translate(${
      rect.right - rectY.right + "px"
    },${rectY.top - rect.top + "px"})`;

    const rectX = this.trackX.getBoundingClientRect();
    this.trackX.style.transform = `translate(${
      rect.right - rectX.right + "px"
    },${rect.bottom - rectX.bottom + "px"})`;
  }

  connectedCallback() {
    this.trackX = document.createElement("div");
    this.trackY = document.createElement("div");
    this.trackX.style.width = this.clientWidth + "px";
    this.trackX.classList.add("x-scrollbar-track-x");
    this.trackY.classList.add("x-scrollbar-track-y");
    this.trackY.style.height = this.clientHeight + "px";
    this.parentElement?.appendChild(this.trackX);
    this.parentElement?.appendChild(this.trackY);
    this.resizeObserver = new ResizeObserver(() => {
      this.calcTrackStyle();
    });
    this.resizeObserver.observe(this);

    const thumbX = this.trackX.appendChild(document.createElement("div"));
    const thumbY = this.trackY.appendChild(document.createElement("div"));
    thumbX.style.width = this.scrollWidth + "px";
    thumbY.style.height = this.scrollHeight + "px";
    thumbY.style.width = "0";

    this.handleTrackScroll(this.trackX, false);
    this.handleTrackScroll(this.trackY, true);

    this.addEventListener("scroll", () => {
      if (this.inTrack || !this.trackX || !this.trackY) {
        return;
      }
      const percentX = this.scrollLeft / this.scrollWidth;
      const percentY = this.scrollTop / this.scrollHeight;
      this.trackX.scrollLeft = this.trackX.scrollWidth * percentX;
      this.trackY.scrollTop = this.trackY.scrollHeight * percentY;
      this.handleHidden();
    });
  }
  disconnectedCallback() {
    this.resizeObserver?.disconnect();
    this.trackX?.parentElement?.removeChild(this.trackX);
    this.trackY?.parentElement?.removeChild(this.trackY);
  }
}
</script>
