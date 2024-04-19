<style lang="scss">
.x-dialog::backdrop {
  background: var(--dialog-backdrop-background);
  opacity: var(--dialog-backdrop-opacity);
}

.x-dialog {
  padding: var(--dialog-padding);
  border-width: var(--dialog-border-width);
  border-style: var(--dialog-border-style);
  border-color: var(--dialog-border-color);
  border-radius: var(--dialog-border-radius);
  background-color: var(--dialog-background);
  width: var(--dialog-width);

  &-header {
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

  &-content {
    padding-top: var(--dialog-content-gap);
    padding-bottom: var(--dialog-content-gap);
    display: block;
  }

  &-footer {
    width: 100%;
    display: block;
    text-align: right;
  }

  &:-internal-dialog-in-top-layer {
    inset-block-start: calc(-100% + var(--dialog-margin-top));
    transform: translateY(50%);
  }
}

x-dialog[center] {
  .x-dialog:-internal-dialog-in-top-layer {
    inset-block-start: 0;
    transform: none;
  }
}
</style>

<template>
  <dialog class="x-dialog">
    <slot class="x-dialog-header" name="header">
      <div class="x-dialog-header-text"></div>
      <svg class="x-dialog-header-close" fill-rule="evenodd" viewBox="64 64 896 896" focusable="false" data-icon="close"
        width="1em" height="1em" fill="currentColor" aria-hidden="true">
        <path
          d="M799.86 166.31c.02 0 .04.02.08.06l57.69 57.7c.04.03.05.05.06.08a.12.12 0 010 .06c0 .03-.02.05-.06.09L569.93 512l287.7 287.7c.04.04.05.06.06.09a.12.12 0 010 .07c0 .02-.02.04-.06.08l-57.7 57.69c-.03.04-.05.05-.07.06a.12.12 0 01-.07 0c-.03 0-.05-.02-.09-.06L512 569.93l-287.7 287.7c-.04.04-.06.05-.09.06a.12.12 0 01-.07 0c-.02 0-.04-.02-.08-.06l-57.69-57.7c-.04-.03-.05-.05-.06-.07a.12.12 0 010-.07c0-.03.02-.05.06-.09L454.07 512l-287.7-287.7c-.04-.04-.05-.06-.06-.09a.12.12 0 010-.07c0-.02.02-.04.06-.08l57.7-57.69c.03-.04.05-.05.07-.06a.12.12 0 01.07 0c.03 0 .05.02.09.06L512 454.07l287.7-287.7c.04-.04.06-.05.09-.06a.12.12 0 01.07 0z">
        </path>
      </svg>
    </slot>
    <slot class="x-dialog-content"></slot>
    <slot class="x-dialog-footer" name="footer">
      <x-button round class="x-dialog-footer-cancel">取消</x-button>
      <x-button primary round class="x-dialog-footer-ok">确认</x-button>
    </slot>
  </dialog>
</template>

<script lang="ts">
import { InitComponentTemplate, getClassNameFromAttr } from "@/utils";
import { XRegister } from "@/utils/decorator";

@XRegister
export class XDialog extends HTMLElement {
  innerElement: HTMLDialogElement | undefined;
  attributeList: string[];

  static name: string = 'x-dialog'
  static register: () => void
  static get observedAttributes() {
    return ["open", "header", "width"]; // 声明要监听的属性
  }

  constructor() {
    super();
    InitComponentTemplate.call(this, __X_COMPONENT_HTML_CODE__, __X_COMPONENT_STYLE_CODE__)
    this.attributeList = [];
    this.setInnerElementAttr();
    this.initEvent();
  }

  initEvent() {
    if (!this.innerElement) {
      return;
    }
    (
      this.innerElement.querySelector(
        ".x-dialog-footer-cancel"
      ) as HTMLButtonElement
    ).onclick = () => {
      this.dispatchEvent(new Event("cancel"));
    };
    (
      this.innerElement.querySelector(
        ".x-dialog-footer-ok"
      ) as HTMLButtonElement
    ).onclick = () => {
      this.dispatchEvent(new Event("ok"));
    };
    addEventListener("keyup", (e) => {
      if (e.code === "Escape") {
        this.closeModal();
      }
    });
  }

  setInnerElementAttr() {
    if (!this.innerElement) {
      return;
    }
    const className = getClassNameFromAttr(
      "dialog",
      ["open"],
      this.attributeList
    );
    this.innerElement.setAttribute("class", className);
    if (this.attributeList.includes("open")) {
      this.innerElement.showModal();
    } else {
      this.closeModal();
    }

    // 目前没有api选择插槽内容，暂不优化渲染次数
    const headerText = this.innerElement.querySelector(".x-dialog-header-text");
    if (this.attributeList.includes("header") && headerText) {
      headerText.innerHTML = this.getAttribute("header") || "";
    }

    const closeBtn: HTMLElement | null = this.innerElement.querySelector(
      ".x-dialog-header-close"
    );
    if (closeBtn) {
      closeBtn.onclick = () => this.closeModal();
    }
    if (this.innerElement.style) {
      this.innerElement.style.width = this.getAttribute("width") || "";
    }
  }

  showModal() {
    if (!this.getAttribute("open")) {
      this.setAttribute("open", "");
    }
  }

  closeModal() {
    this.removeAttribute("open");
    this.innerElement?.close();
    this.dispatchEvent(new Event("close"));
  }

  attributeChangedCallback() {
    this.attributeList = this.getAttributeNames();
    this.setInnerElementAttr();
  }
}

export default XDialog
</script>