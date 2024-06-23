<style lang="scss">
:host(:not([aria-haspopup])) {
  dialog {
    display: none;
  }
}
dialog::backdrop {
  background: var(--drawer-backdrop-background);
  opacity: var(--drawer-backdrop-opacity);
}

dialog {
  padding: var(--drawer-padding);
  border-width: 0;
  border-style: none;
  background-color: var(--drawer-background);
  width: var(--drawer-width);
  margin-left: 0;
  margin-top: 0;
  margin-bottom: 0;
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr auto;
  transition: all 1s linear;
}

#header {
  display: flex;
  width: 100%;
  align-items: center;
}

#text {
  flex-grow: 1;
  font-size: var(--drawer-title-size);
  font-weight: var(--drawer-title-weight);
  color: var(--drawer-title-color);
}

#close {
  flex-shrink: 0;
  cursor: pointer;
  color: var(--drawer-title-color);
  width: var(--drawer-title-size);
  height: var(--drawer-title-size);
}
#content {
  padding-top: var(--drawer-content-gap);
  padding-bottom: var(--drawer-content-gap);
  display: block;
}

#footer {
  width: 100%;
  display: block;
  text-align: right;
}

:host([filter]) {
  .x-drawer::backdrop {
    backdrop-filter: var(--drawer-filter);
    background: unset;
    opacity: unset;
  }
}
</style>

<template>
  <dialog>
    <slot id="header" name="header">
      <div id="text"></div>
      <svg
        id="close"
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
    <slot id="content"></slot>
    <slot id="footer" name="footer">
      <x-button success id="cancel">取消</x-button>
      <x-button primary round id="ok">确认</x-button>
    </slot>
  </dialog>
</template>

<script lang="ts">
import { InitComponentTemplate, XDispatch } from "@/utils";
import { XComponent, XRegister } from "@/utils/decorator";

@XRegister
export class XDrawer extends XComponent {
  static name: string = "x-drawer";
  static get observedAttributes() {
    return ["aria-haspopup", "header", "width"]; // 声明要监听的属性
  }

  root?: HTMLDialogElement;
  headerElement?: HTMLElement;
  headerClose?: HTMLElement;
  footerOk?: HTMLElement;
  footerCancel?: HTMLElement;
  constructor() {
    super();
    InitComponentTemplate.call(
      this,
      __X_COMPONENT_HTML_CODE__,
      __X_COMPONENT_STYLE_CODE__
    );
  }

  connectedCallback() {
    if (!this.root) {
      return;
    }

    addEventListener("keyup", (e) => {
      if (e.code === "Escape") {
        this.ariaHasPopup = null;
      }
    });

    this.headerElement = this.root.querySelector("#text") ?? undefined;
    this.headerClose = this.root.querySelector("#close") ?? undefined;
    this.footerOk = this.root.querySelector("#ok") ?? undefined;
    this.footerCancel = this.root.querySelector("#calcel") ?? undefined;
    if (this.headerClose) {
      this.headerClose.onclick = () => (this.ariaHasPopup = null);
    }
    if (this.footerOk) {
      this.footerOk.onclick = () => XDispatch.call(this, "ok");
    }
    if (this.footerCancel) {
      this.footerCancel.onclick = () => XDispatch.call(this, "cancel");
    }
  }

  attributeChangedCallback() {
    queueMicrotask(() => {
      if (this.headerElement) {
        this.headerElement.innerHTML = this.getAttribute("header") || "";
      }
    });
    if (!this.root) {
      return;
    }
    this.root.style.width = this.getAttribute("width") || "";

    if (this.ariaHasPopup !== null) {
      this.root.showModal();
      XDispatch.call(this, "open");
    } else {
      this.root.close();
      XDispatch.call(this, "close");
    }
  }
}
</script>
