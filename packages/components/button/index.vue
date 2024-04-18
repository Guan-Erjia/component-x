<style lang="scss">
:host {
  display: inline-flex;
  justify-content: center;
  align-items: center;
}

.x-button {
  display: inline-block;
  flex-shrink: 0;
  flex-grow: 1;
  outline: none;
  cursor: pointer;
  text-align: center;
  border-color: var(--btn-border-color);
  border-radius: var(--btn-border-radius);
  border-style: var(--btn-border-style);
  border-width: var(--btn-border-width);
  box-shadow: var(--btn-shadow);
  color: var(--btn-text);
  background-color: var(--btn-default-bg);
  font-size: var(--btn-font-size);
  font-weight: var(--btn-font-weight);
  line-height: var(--btn-line-height);
  padding-left: var(--btn-padding-inline);
  padding-right: var(--btn-padding-inline);
  padding-top: var(--btn-padding-block);
  padding-bottom: var(--btn-padding-block);
  opacity: var(--btn-opacity);

  &-loading {
    display: none;
    width: calc(var(--btn-font-size) - var(--btn-border-width));
    height: calc(var(--btn-font-size) - var(--btn-border-width));
    animation: spin 1s linear infinite;
    margin-left: calc(-1 * var(--btn-font-size) / 2);
    margin-right: calc(var(--btn-font-size) / 2);
    line-height: var(--btn-font-size);

    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }

      100% {
        transform: rotate(360deg);
      }
    }
  }
}

:host([loading]) {
  .x-button-loading {
    display: inline-block;
  }
}

:host(:not([round])) {
  >button {
    --btn-border-radius: 0;
  }
}

:host(:not([disabled])) {
  >button {
    &:hover {
      color: var(--btn-hover-color);
      background-color: var(--btn-hover-bg);
      border-color: var(--btn-hover-border-color);
    }

    &:active {
      color: var(--btn-active-color);
      background-color: var(--btn-active-bg);
      border-color: var(--btn-active-border-color);
    }
  }
}

:host(:not([plain])) {
  .x-button {
    --btn-text: white;
    --btn-hover-color: white;
    --btn-active-color: white;
    --btn-hover-bg: var(--btn-default-hover-bg);
    --btn-active-bg: var(--btn-default-active-bg);

    &-primary {
      --btn-default-bg: var(--btn-primary-color);
      --btn-border-color: var(--btn-primary-color);
      --btn-hover-bg: var(--btn-primary-hover-color);
      --btn-hover-border-color: var(--btn-primary-hover-color);
      --btn-active-bg: var(--btn-primary-active-color);
      --btn-active-border-color: var(--btn-primary-active-color);
    }

    &-warning {
      --btn-default-bg: var(--btn-warning-color);
      --btn-border-color: var(--btn-warning-color);
      --btn-hover-bg: var(--btn-warning-hover-color);
      --btn-hover-border-color: var(--btn-warning-hover-color);
      --btn-active-bg: var(--btn-warning-active-color);
      --btn-active-border-color: var(--btn-warning-active-color);
    }

    &-danger {
      --btn-default-bg: var(--btn-danger-color);
      --btn-border-color: var(--btn-danger-color);
      --btn-hover-bg: var(--btn-danger-hover-color);
      --btn-hover-border-color: var(--btn-danger-hover-color);
      --btn-active-bg: var(--btn-danger-active-color);
      --btn-active-border-color: var(--btn-danger-active-color);
    }

    &-success {
      --btn-default-bg: var(--btn-success-color);
      --btn-border-color: var(--btn-success-color);
      --btn-hover-bg: var(--btn-success-hover-color);
      --btn-hover-border-color: var(--btn-success-hover-color);
      --btn-active-bg: var(--btn-success-active-color);
      --btn-active-border-color: var(--btn-success-active-color);
    }
  }
}

:host([plain]) {
  --btn-text: var(--btn-default-text);
  --btn-hover-color: var(--btn-default-hover-text);

  .x-button {
    --btn-default-bg: var(--btn-plain-bg);

    &-primary {
      --btn-text: var(--btn-primary-color);
      --btn-border-color: var(--btn-primary-color);
      --btn-hover-color: var(--btn-primary-hover-color);
      --btn-hover-border-color: var(--btn-primary-hover-color);
      --btn-active-color: var(--btn-primary-active-color);
      --btn-active-border-color: var(--btn-primary-active-color);
    }

    &-warning {
      --btn-text: var(--btn-warning-color);
      --btn-border-color: var(--btn-warning-color);
      --btn-hover-color: var(--btn-warning-hover-color);
      --btn-hover-border-color: var(--btn-warning-hover-color);
      --btn-active-color: var(--btn-warning-active-color);
      --btn-active-border-color: var(--btn-warning-active-color);
    }

    &-danger {
      --btn-text: var(--btn-danger-color);
      --btn-border-color: var(--btn-danger-color);
      --btn-hover-color: var(--btn-danger-hover-color);
      --btn-hover-border-color: var(--btn-danger-hover-color);
      --btn-active-color: var(--btn-danger-active-color);
      --btn-active-border-color: var(--btn-danger-active-color);
    }

    &-success {
      --btn-text: var(--btn-success-color);
      --btn-border-color: var(--btn-success-color);
      --btn-hover-color: var(--btn-success-hover-color);
      --btn-hover-border-color: var(--btn-success-hover-color);
      --btn-active-color: var(--btn-success-active-color);
      --btn-active-border-color: var(--btn-success-active-color);
    }
  }
}

:host([disabled]) {
  --btn-opacity: var(--btn-disable-bg-opacity);

  >button {
    cursor: not-allowed;
  }
}

:host([disabled]:not([plain])) {
  --btn-hover-bg: var(--btn-default-bg);
  --btn-active-bg: var(--btn-default-bg);
}
</style>

<template>
  <button class="x-button">
    <slot class="x-button-loading" name="loading">
      <svg viewBox="0 0 1024 1024" fill="currentColor" class="x-button-spin">
        <path
          d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z">
        </path>
      </svg>
    </slot>
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { getClassNameFromAttr, getComponentTemplate } from "@/utils";
export class XButton extends HTMLElement {
  static get observedAttributes() {
    return ["plain", "primary", "warning", "danger", "success", "info"]; // 声明要监听的属性
  }

  innerElement: HTMLButtonElement | undefined;
  attributeList: string[];
  static name: string = 'x-button'

  constructor() {
    super();
    this.attributeList = [];
    const template = getComponentTemplate({ template: __X_COMPONENT_TEMPLATE_CODE__, style: __X_COMPONENT_STYLE_CODE__ });
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(template.content.cloneNode(true));
    this.innerElement = (this.shadowRoot as ShadowRoot)
      .children[1] as HTMLButtonElement;
    this.setInnerElementAttr();
  }

  connectedCallback() {
    console.log("Custom element added to page.");
  }

  disconnectedCallback() {
    console.log("Custom element removed from page.");
  }

  adoptedCallback() {
    console.log("Custom element moved to new page.");
  }

  setInnerElementAttr() {
    const className = getClassNameFromAttr(
      "button",
      ["plain", "success", "primary", "danger", "warning"],
      this.attributeList
    );
    this.innerElement?.setAttribute("class", className);
    if (
      this.attributeList.includes("disabled") ||
      this.attributeList.includes("loading")
    ) {
      this.onclick = null;
    }
  }

  attributeChangedCallback() {
    this.attributeList = this.getAttributeNames();
    this.setInnerElementAttr();
  }
}

</script>
