<template>
  <div class="x-menu-main">
    <div class="x-menu-label">
      <slot name="prefix">
        <span>😊</span>
      </slot>
      <slot name="label">
        <span id="x-menu-text"></span>
      </slot>
      <slot name="suffix">
        <span>😆</span>
      </slot>
    </div>
    <slot name="expand" class="x-menu-arrow">
      <span>></span>
    </slot>
  </div>
  <div class="x-menu-children">
    <ol>
      <slot></slot>
    </ol>
  </div>
</template>
<style lang="scss">
:host {
  display: block;
  padding-left: 10px;
}

.x-menu-main {
  cursor: pointer;
  display: flex;
  font-size: var(--control-size);
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  .x-menu-label {
    flex-grow: 1;
  }
}
.x-menu-children {
  display: grid;
  grid-template-rows: 0fr;
  overflow: hidden;
  transition: all 0.2s linear;
  > ol {
    min-height: 0;
    margin: 0;
    padding-left: 0;
  }
}
.x-menu-arrow {
  display: inline-block;
  flex-grow: 0;
  flex-shrink: 0;
  transition: all 0.2s linear;
  font-size: var(--control-size);
}
:host([aria-expanded]) {
  .x-menu-children {
    grid-template-rows: 1fr;
  }
  .x-menu-arrow {
    transform: rotate(90deg);
  }
}
</style>
<script lang="ts">
import { InitComponentTemplate } from "@/utils";
import { XComponent, XRegister } from "@/utils/decorator";

@XRegister
export class XMenuItem extends XComponent {
  static name: string = "x-menu-item";
  static get observedAttributes() {
    return ["aria-label", "aria-disabled", "aria-expanded"]; // 声明要监听的属性
  }

  textElement: HTMLDivElement;
  mainElement: HTMLDivElement;
  label: string;
  expand: boolean;
  constructor() {
    super();
    InitComponentTemplate.call(
      this,
      __X_COMPONENT_HTML_CODE__,
      __X_COMPONENT_STYLE_CODE__
    );
    this.textElement = this.shadowRoot?.querySelector(
      "#x-menu-text"
    ) as HTMLDivElement;
    this.mainElement = this.shadowRoot?.querySelector(
      ".x-menu-main"
    ) as HTMLDivElement;
    this.label = "";
    this.expand = false;
  }

  connectedCallback() {
    this.mainElement.onclick = () => {
      this.expand
        ? this.removeAttribute("aria-expanded")
        : this.setAttribute("aria-expanded", "");
    };
  }

  disconnectedCallback() {}

  attributeChangedCallback() {
    this.attributeList = new Set(this.getAttributeNames());
    this.label = this.getAttribute("aria-label") || "";
    this.expand = this.attributeList.has("aria-expanded");
    this.textElement.innerHTML = this.label;
  }
}
</script>
