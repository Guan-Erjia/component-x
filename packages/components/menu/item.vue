<template>
  <div class="x-menu-main">
    <div id="label">
      <slot name="prefix">
        <span>😊</span>
      </slot>
      <slot name="text">
        <span id="text"></span>
      </slot>
      <slot name="suffix">
        <span>😆</span>
      </slot>
    </div>
    <slot name="expand" id="arrow">
      <span>></span>
    </slot>
  </div>
  <div id="children">
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
  transition: background-color 0.2s linear;
  border-radius: var(--control-radius);
  height: var(--control-size);

  #label {
    flex-grow: 1;
  }

  &:hover {
    background-color: var(--menu-hover-color);
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

#children {
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

#arrow {
  display: inline-block;
  flex-grow: 0;
  flex-shrink: 0;
  transition: all 0.2s linear;
  font-size: var(--control-size);
}

:host(:not([aria-expanded])) {
  #arrow {
    display: none;
  }
}

:host([aria-expanded="true"]) {
  #children {
    grid-template-rows: 1fr;
  }

  #arrow {
    transform: rotate(90deg);
  }
}
</style>
<script lang="ts">
import { InitComponentTemplate, XDispatch } from "@/utils";
import { XComponent, XRegister } from "@/utils/decorator";

@XRegister
export class XMenuItem extends XComponent {
  static name: string = "x-menu-item";
  static get observedAttributes() {
    return ["aria-label", "aria-expanded"]; // 声明要监听的属性
  }

  textElement: HTMLDivElement;
  root?: HTMLDivElement;
  constructor() {
    super();
    InitComponentTemplate.call(
      this,
      __X_COMPONENT_HTML_CODE__,
      __X_COMPONENT_STYLE_CODE__
    );
    this.textElement = this.shadowRoot?.querySelector(
      "#text"
    ) as HTMLDivElement;
  }

  connectedCallback() {
    XDispatch.call(this, "XMenuItemInit", this, true);
    if (this.root) {
      this.root.onclick = () => {
        if (this.ariaDisabled !== null) {
          return;
        }
        if (this.ariaExpanded !== null) {
          this.ariaExpanded = this.ariaExpanded === "true" ? "false" : "true";
          return;
        }
        XDispatch.call(this, "XMenuItemChange", this, true);
      };
    }
    this.addEventListener("XMenuItemInit", this.inherentListener);
  }

  disconnectedCallback() {
    this.removeEventListener("XMenuItemInit", this.inherentListener);
  }

  inherentListener(e: any) {
    e.detail.ariaLevel = +e.detail.ariaLevel + 1;
  }

  attributeChangedCallback() {
    this.attributeList = new Set(this.getAttributeNames());
    this.textElement.innerHTML = this.ariaLabel || "";
    queueMicrotask(() => {
      if (this.root) {
        this.root.style.paddingLeft = `calc(var(--menu-padding-inline) + ${
          this.ariaLevel || 0
        } * var(--menu-gap))`;
      }
    });
  }
}
</script>
