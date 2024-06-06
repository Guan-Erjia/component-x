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
}

.x-menu-main {
  cursor: pointer;
  display: flex;
  font-size: var(--control-size);
  align-items: center;
  justify-content: space-between;
  padding: var(--menu-padding-block) var(--menu-padding-inline);
  transition: all 0.2s linear;
  .x-menu-label {
    flex-grow: 1;
  }
  &:hover {
    background-color: var(--menu-hover-color);
    border-radius: var(--control-radius);
  }
}

:host([aria-checked]) {
  .x-menu-main {
    background-color: var(--menu-active-color);
  }
}
:host([aria-disabled]) {
  .x-menu-main {
    cursor: not-allowed;
    opacity: var(--disable-bg-opacity);
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
:host(:not([aria-expanded])) {
  .x-menu-arrow {
    display: none;
  }
}

:host([aria-expanded="true"]) {
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
  gap: string;
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
    this.gap = "";
  }

  connectedCallback() {
    this.mainElement.onclick = () => {
      if (this.ariaExpanded !== null) {
        this.setAttribute(
          "aria-expanded",
          this.ariaExpanded === "true" ? "false" : "true"
        );
      }
      this.ariaChecked === null
        ? this.setAttribute("aria-checked", "")
        : this.removeAttribute("aria-checked");
    };
  }

  disconnectedCallback() {}

  attributeChangedCallback() {
    this.attributeList = new Set(this.getAttributeNames());
    this.textElement.innerHTML = this.ariaLabel || "";
    this.gap = getComputedStyle(this).getPropertyValue("--menu-gap");
    if (this.ariaLevel) {
      this.mainElement.style.paddingLeft = `calc(var(--menu-padding-inline) + ${
        this.ariaLevel || 0
      } * ${this.gap})`;
    }
  }
}
</script>
