<style lang="scss">
:host {
  display: inline-block;
  border-width: var(--control-width);
  border-color: var(--default-color);
  border-style: solid;
}

* {
  line-height: normal;
  ::-webkit-scrollbar {
    width: 4px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: var(--default-color);
    border-radius: var(--control-radius);
  }

  [contenteditable] {
    outline: none;
    border-radius: 0;
    width: 100%;
  }

  [contenteditable]:focus {
    border-radius: 3px;
  }
}

p {
  line-height: normal;
  margin: 0;
}
</style>

<template>
  <div style="height: 100%; display: flex; flex-direction: column"></div>
</template>

<script lang="ts">
import { InitComponentTemplate, XDispatch } from "@/utils";
import { XComponent, XRegister } from "@/utils/decorator";
import { CreateSlateRemark } from "./index";
import { Descendant, Editor, Transforms } from "slate";
import { remarkToSlate, slateToRemark } from "remark-slate-transformer";
import { unified } from "unified";
import remarkStringify from "remark-stringify";
import { ReactEditor } from "slate-react";
import remarkParse from "remark-parse";

@XRegister
export class XRemark extends XComponent {
  static name: string = "x-remark";
  root?: HTMLButtonElement;
  editor?: ReactEditor;
  constructor() {
    super();
    InitComponentTemplate.call(
      this,
      __X_COMPONENT_HTML_CODE__,
      __X_COMPONENT_STYLE_CODE__
    );
  }

  onValueChange(descendant: Descendant[]) {
    const result = slateToRemark(descendant);
    const remarkString = unified().use(remarkStringify).stringify(result);
    XDispatch.call(this, "change", {
      text: remarkString,
      descendant,
    });
  }

  setRemarkValue(text: string) {
    const processor = unified().use(remarkParse).use(remarkToSlate);
    const slateDescendant = processor.processSync(text).result;
    queueMicrotask(() => {
      if (!this.editor) {
        return;
      }
      this.clear();
      Transforms.removeNodes(this.editor, {
        at: {
          anchor: Editor.start(this.editor, []),
          focus: Editor.end(this.editor, []),
        },
      });
      this.editor && Transforms.insertNodes(this.editor, slateDescendant);
    });
  }

  clear() {
    if (!this.editor) {
      return;
    }
    Transforms.delete(this.editor, {
      at: {
        anchor: Editor.start(this.editor, []),
        focus: Editor.end(this.editor, []),
      },
    });
  }

  onEditorConnected(editor: ReactEditor) {
    this.editor = editor;
    if (this.ariaValueText) {
      this.setRemarkValue(this.ariaValueText);
    }
  }
  connectedCallback() {
    if (!this.root) {
      return;
    }
    CreateSlateRemark(this.root, {
      // 直接传入上下文会报错
      onValueChange: (descendant) => this.onValueChange(descendant),
      onEditorConnected: (editor) => this.onEditorConnected(editor),
    });
  }
}
</script>
