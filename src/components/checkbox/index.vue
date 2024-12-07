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
import { InitComponentTemplate, XDispatch } from "@/utils";
import { XComponent, XRegister } from "@/utils/decorator";

@XRegister
export class XCheckbox extends XComponent {
  static name: string = "x-checkbox";
  static get observedAttributes() {
    return ["aria-checked", "aria-disabled", "aria-valuetext"]; // 声明要监听的属性
  }

  root?: HTMLInputElement;
  constructor() {
    super();
    InitComponentTemplate.call(
      this,
      __X_COMPONENT_HTML_CODE__,
      __X_COMPONENT_STYLE_CODE__
    );
  }

  connectedCallback() {
    XDispatch.call(this, "XCheckboxInit", this, true);
    this.onclick = () => {
      if (!this.root || this.ariaDisabled !== null) {
        return;
      }
      this.ariaChecked !== null && this.ariaChecked !== "mixed"
        ? (this.ariaChecked = null)
        : (this.ariaChecked = "");
      XDispatch.call(this, "XCheckboxChange", this, true);
      XDispatch.call(this, "change", this.ariaChecked);
    };
  }

  attributeChangedCallback() {
    if (!this.root) {
      return;
    }
    this.root.checked = this.ariaChecked !== null;
    this.root.disabled = this.ariaDisabled !== null;
    this.root.indeterminate = this.ariaChecked === "mixed";
  }
}
</script>
