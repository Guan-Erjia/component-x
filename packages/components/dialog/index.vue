<style lang="scss">
.x-dialog::backdrop {
  background: var(--dialog-backdrop-background);
  opacity: var(--dialog-backdrop-opacity);
}

.x-dialog {
  padding: var(--dialog-padding);
  border-width: var(--control-line);
  border-style: var(--dialog-border-style);
  border-color: var(--dialog-border-color);
  border-radius: var(--control-radius);
  background-color: var(--dialog-background);
  width: var(--dialog-width);

  .header {
    display: flex;
    width: 100%;
    align-items: center;

    &-text {
      flex-grow: 1;
      font-size: var(--dialog-title-size);
      font-weight: var(--dialog-title-weight);
      color: var(--dialog-title-color);
    }

    &-close {
      flex-shrink: 0;
      cursor: pointer;
      color: var(--dialog-title-color);
      width: var(--dialog-title-size);
      height: var(--dialog-title-size);
    }
  }

  .content {
    padding-top: var(--dialog-content-gap);
    padding-bottom: var(--dialog-content-gap);
    display: block;
  }

  .footer {
    width: 100%;
    display: block;
    text-align: right;
  }

  &:-internal-dialog-in-top-layer {
    inset-block-start: calc(-100% + var(--dialog-margin-top));
    transform: translateY(50%);
  }
}

:host([center]) {
  .x-dialog:-internal-dialog-in-top-layer {
    inset-block-start: 0;
    transform: none;
  }
}

:host([filter]) {
  .x-dialog::backdrop {
    backdrop-filter: var(--dialog-filter);
    background: unset;
    opacity: unset;
  }
}
</style>

<template>
  <dialog class="x-dialog">
    <slot class="header" name="header">
      <div class="header-text"></div>
      <svg
        class="header-close"
        fill-rule="evenodd"
        viewBox="64 64 896 896"
        focusable="false"
        data-icon="close"
        width="1em"
        height="1em"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          d="M799.86 166.31c.02 0 .04.02.08.06l57.69 57.7c.04.03.05.05.06.08a.12.12 0 010 .06c0 .03-.02.05-.06.09L569.93 512l287.7 287.7c.04.04.05.06.06.09a.12.12 0 010 .07c0 .02-.02.04-.06.08l-57.7 57.69c-.03.04-.05.05-.07.06a.12.12 0 01-.07 0c-.03 0-.05-.02-.09-.06L512 569.93l-287.7 287.7c-.04.04-.06.05-.09.06a.12.12 0 01-.07 0c-.02 0-.04-.02-.08-.06l-57.69-57.7c-.04-.03-.05-.05-.06-.07a.12.12 0 010-.07c0-.03.02-.05.06-.09L454.07 512l-287.7-287.7c-.04-.04-.05-.06-.06-.09a.12.12 0 010-.07c0-.02.02-.04.06-.08l57.7-57.69c.03-.04.05-.05.07-.06a.12.12 0 01.07 0c.03 0 .05.02.09.06L512 454.07l287.7-287.7c.04-.04.06-.05.09-.06a.12.12 0 01.07 0z"
        ></path>
      </svg>
    </slot>
    <slot class="content"></slot>
    <slot class="footer" name="footer">
      <x-button round class="footer-cancel">取消</x-button>
      <x-button primary round class="footer-ok">确认</x-button>
    </slot>
  </dialog>
</template>

<script lang="ts">
import { InitComponentTemplate } from "@/utils";
import { XComponent, XRegister } from "@/utils/decorator";

@XRegister
export class XDialog extends XComponent {
  static name: string = "x-dialog";
  static get observedAttributes() {
    return ["aria-modal", "header", "width"]; // 声明要监听的属性
  }

  inner: HTMLDialogElement | undefined;

  constructor() {
    super();
    InitComponentTemplate.call(
      this,
      __X_COMPONENT_HTML_CODE__,
      __X_COMPONENT_STYLE_CODE__
    );
  }

  connectedCallback() {
    if (!this.inner) {
      return;
    }
    (this.inner.querySelector(".footer-cancel") as HTMLElement).onclick =
      () => {
        this.dispatchEvent(new Event("cancel"));
      };
    (this.inner.querySelector(".footer-ok") as HTMLElement).onclick = () => {
      this.dispatchEvent(new Event("ok"));
    };
    addEventListener("keyup", (e) => {
      if (e.code === "Escape") {
        this.ariaModal = null;
      }
    });

    (this.inner.querySelector(".header-close") as HTMLElement).onclick = () =>
      (this.ariaModal = null);
  }

  attributeChangedCallback() {
    if (!this.inner) {
      return;
    }
    const headerText = this.inner.querySelector(".header-text");
    if (headerText) {
      headerText.innerHTML = this.getAttribute("header") || "";
    }
    if (this.inner.style) {
      this.inner.style.width = this.getAttribute("width") || "";
    }
    if (this.ariaModal !== null) {
      this.inner.showModal();
      this.dispatchEvent(new Event("open"));
    } else {
      this.inner.close();
      this.dispatchEvent(new Event("close"));
    }
  }
}
</script>
