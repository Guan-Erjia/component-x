<style lang="scss">
:host {
  border: 1px solid red;
  display: inline-block;
}

* {
  line-height: normal;
}

p {
  line-height: normal;
  margin: 0;
}
</style>

<template>
  <div style="height: 100%;display: flex; flex-direction: column;"></div>
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
  static get observedAttributes() {
    return [];
  }
  static name: string = "x-remark";
  root?: HTMLButtonElement;
  editor?: ReactEditor
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

  onEditorConnected(editor: ReactEditor) {
    this.editor = editor
    if (this.ariaValueText) {
      const processor = unified().use(remarkParse).use(remarkToSlate);
      const slateDescendant = processor.processSync(this.ariaValueText).result;
      queueMicrotask(() => {
        this.clear()
        this.editor && Transforms.insertNodes(
          this.editor, slateDescendant
        )
      });
    }
  }
  clear() {
    if (!this.editor) {
      return
    }
    Transforms.delete(this.editor, {
      at: {
        anchor: Editor.start(this.editor, []),
        focus: Editor.end(this.editor, []),
      },
    })
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
