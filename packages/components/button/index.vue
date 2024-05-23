<style lang="scss">
:host {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  user-select: none;
}

.x-button {
  flex-shrink: 0;
  flex-grow: 1;
  cursor: pointer;
  text-align: center;
  border-color: var(--btn-border-color);
  border-radius: var(--control-radius);
  border-style: var(--btn-border-style);
  border-width: var(--control-line);
  box-shadow: var(--btn-shadow);
  color: var(--btn-text);
  background-color: var(--btn-default-bg);
  font-size: var(--control-size);
  font-weight: var(--control-weight);
  line-height: var(--control-size);
  padding: var(--btn-padding-block) var(--btn-padding-inline);
  opacity: var(--btn-opacity);

  &-loading {
    display: none;
    width: calc(var(--control-size) - var(--control-line));
    height: calc(var(--control-size) - var(--control-line));
    animation: spin 1s linear infinite;

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
      --btn-default-bg: var(--primary-color);
      --btn-border-color: var(--primary-color);
      --btn-hover-bg: var(--primary-hover-color);
      --btn-hover-border-color: var(--primary-hover-color);
      --btn-active-bg: var(--primary-active-color);
      --btn-active-border-color: var(--primary-active-color);
    }

    &-warning {
      --btn-default-bg: var(--warning-color);
      --btn-border-color: var(--warning-color);
      --btn-hover-bg: var(--warning-hover-color);
      --btn-hover-border-color: var(--warning-hover-color);
      --btn-active-bg: var(--warning-active-color);
      --btn-active-border-color: var(--warning-active-color);
    }

    &-danger {
      --btn-default-bg: var(--danger-color);
      --btn-border-color: var(--danger-color);
      --btn-hover-bg: var(--danger-hover-color);
      --btn-hover-border-color: var(--danger-hover-color);
      --btn-active-bg: var(--danger-active-color);
      --btn-active-border-color: var(--danger-active-color);
    }

    &-success {
      --btn-default-bg: var(--success-color);
      --btn-border-color: var(--success-color);
      --btn-hover-bg: var(--success-hover-color);
      --btn-hover-border-color: var(--success-hover-color);
      --btn-active-bg: var(--success-active-color);
      --btn-active-border-color: var(--success-active-color);
    }
  }
}

:host([plain]) {
  --btn-text: var(--default-color);
  --btn-hover-color: var(--default-hover-color);

  .x-button {
    --btn-default-bg: var(--btn-plain-bg);

    &-primary {
      --btn-text: var(--primary-color);
      --btn-border-color: var(--primary-color);
      --btn-hover-color: var(--primary-hover-color);
      --btn-hover-border-color: var(--primary-hover-color);
      --btn-active-color: var(--primary-active-color);
      --btn-active-border-color: var(--primary-active-color);
    }

    &-warning {
      --btn-text: var(--warning-color);
      --btn-border-color: var(--warning-color);
      --btn-hover-color: var(--warning-hover-color);
      --btn-hover-border-color: var(--warning-hover-color);
      --btn-active-color: var(--warning-active-color);
      --btn-active-border-color: var(--warning-active-color);
    }

    &-danger {
      --btn-text: var(--danger-color);
      --btn-border-color: var(--danger-color);
      --btn-hover-color: var(--danger-hover-color);
      --btn-hover-border-color: var(--danger-hover-color);
      --btn-active-color: var(--danger-active-color);
      --btn-active-border-color: var(--danger-active-color);
    }

    &-success {
      --btn-text: var(--success-color);
      --btn-border-color: var(--success-color);
      --btn-hover-color: var(--success-hover-color);
      --btn-hover-border-color: var(--success-hover-color);
      --btn-active-color: var(--success-active-color);
      --btn-active-border-color: var(--success-active-color);
    }
  }
}

:host([disabled]) {
  --btn-opacity: var(--disable-bg-opacity);

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
      <svg viewBox="0 0 1024 1024" fill="currentColor">
        <path
          d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z">
        </path>
      </svg>
    </slot>
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { InitComponentTemplate, getClassNameFromAttr } from "@/utils";
import { XComponent, XRegister } from "@/utils/decorator";

@XRegister
export class XButton extends XComponent {
  static get observedAttributes() {
    return ["plain", "primary", "warning", "danger", "success", "info"]; // 声明要监听的属性
  }
  static name: string = 'x-button'

  innerElement: HTMLButtonElement | undefined;

  constructor() {
    super();
    InitComponentTemplate.call(this, __X_COMPONENT_HTML_CODE__, __X_COMPONENT_STYLE_CODE__)
  }

  connectedCallback() {
    this.setInnerElementAttr();
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
      this.attributeList.has("disabled") ||
      this.attributeList.has("loading")
    ) {
      this.onclick = null;
    }
  }

  attributeChangedCallback() {
    this.attributeList = new Set(this.getAttributeNames());
    this.setInnerElementAttr();
  }
}

</script>
