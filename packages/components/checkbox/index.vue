<template>
  <input class="x-checkbox" type="checkbox" />
  <slot class="x-checkbox-content"></slot>
</template>
<style lang="scss">
:host {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: var(--checkbox-padding-block) var(--checkbox-padding-inline);
  cursor: pointer;
  user-select: none;
  font-weight: var(--control-weight);
}

.x-checkbox {
  margin: 0;
  width: var(--control-size);
  height: var(--control-size);
  flex-shrink: 0;
  cursor: unset;
}

.x-checkbox-content {
  display: inline-block;
  margin-left: var(--checkbox-gap);
  font-size: var(--control-size);
  flex-shrink: 0;
  color: var(--checkbox-color);
}

:host(:not([aria-disabled])) {
  .x-checkbox-content:hover {
    color: var(--checkbox-hover-color);
  }

  .x-checkbox-content:active {
    color: var(--checkbox-active-color);
  }
}

:host([primary]) {
  --checkbox-color: var(--primary-color);
  --checkbox-hover-color: var(--primary-hover-color);
  --checkbox-active-color: var(--primary-active-color);
}

:host([warning]) {
  --checkbox-color: var(--warning-color);
  --checkbox-hover-color: var(--warning-hover-color);
  --checkbox-active-color: var(--warning-active-color);
}

:host([danger]) {
  --checkbox-color: var(--danger-color);
  --checkbox-hover-color: var(--danger-hover-color);
  --checkbox-active-color: var(--danger-active-color);
}

:host([success]) {
  --checkbox-color: var(--success-color);
  --checkbox-hover-color: var(--success-hover-color);
  --checkbox-active-color: var(--success-active-color);
}

:host([aria-disabled]) {
  cursor: not-allowed;

  .x-checkbox-content {
    opacity: var(--disable-bg-opacity);
  }
}
</style>
<script lang="ts">
import { InitComponentTemplate } from "@/utils";
import { XComponent, XRegister } from "@/utils/decorator";

@XRegister
export class XCheckbox extends XComponent {
  static name: string = "x-checkbox";
  static get observedAttributes() {
    return ["aria-checked", "aria-disabled", "aria-valuetext"]; // 声明要监听的属性
  }

  innerElement: HTMLInputElement | undefined;
  constructor() {
    super();
    InitComponentTemplate.call(
      this,
      __X_COMPONENT_HTML_CODE__,
      __X_COMPONENT_STYLE_CODE__
    );
  }

  connectedCallback() {
    this.dispatchEvent(
      new CustomEvent("XCheckboxInit", { detail: this, bubbles: true })
    );
    this.onclick = () => {
      if (!this.innerElement || this.ariaDisabled !== null) {
        return;
      }
      this.ariaChecked !== null && this.ariaChecked !== "mixed"
        ? (this.ariaChecked = null)
        : (this.ariaChecked = "");
      this.dispatchEvent(
        new CustomEvent("XCheckboxChange", { detail: this, bubbles: true })
      );
      this.dispatchEvent(
        new CustomEvent("change", { detail: this.ariaChecked })
      );
    };
  }

  attributeChangedCallback() {
    if (!this.innerElement) {
      return;
    }
    this.innerElement.checked = this.ariaChecked !== null;
    this.innerElement.disabled = this.ariaDisabled !== null;
    this.innerElement.indeterminate = this.ariaChecked === "mixed";
  }
}
</script>
