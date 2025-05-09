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
    padding: 5px;
    box-sizing: border-box;
  }
}

blockquote {
  padding-left: 10px;
  border-left-width: 5px;
  border-left-color: var(--default-color);
  border-left-style: solid;
}

hr {
  height: var(--control-line);
  border: none;
  background-color: gray;
}
img {
  display: block;
  width: 200px;
  border-radius: var(--control-radius);
}

li > input {
  vertical-align: middle;
  margin-right: 10px;
}

table {
  border-collapse: collapse;
}

td {
  border-style: solid;
  border-width: var(--control-line);
  border-color: #dc143c #1e90ff orange #32cd32;
  padding: 5px 12px;
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
import remarkGfm from "remark-gfm";
import { ReactEditor } from "slate-react";
import remarkParse from "remark-parse";
import { remarkListItem } from "./utils";

@XRegister
export class XRemark extends XComponent {
  static name: string = "x-remark";
  root?: HTMLButtonElement;
  editor?: ReactEditor;
  initialValue?: Descendant[];
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
    const remarkString = unified()
      .use(remarkGfm)
      .use(remarkStringify)
      .stringify(result);
    XDispatch.call(this, "change", {
      text: remarkString,
      descendant,
    });
  }

  setRemarkValue(text: string) {
    const processor = unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkToSlate)
      .use(remarkListItem);
    const slateDescendant = processor.processSync(text).result;
    if (!this.editor) {
      return;
    }
    Transforms.removeNodes(this.editor, {
      at: {
        anchor: Editor.start(this.editor, []),
        focus: Editor.end(this.editor, []),
      },
    });
    this.editor && Transforms.insertNodes(this.editor, slateDescendant);
  }

  onEditorReady(editor: ReactEditor) {
    this.editor = editor;
  }

  connectedCallback() {
    if (!this.root) {
      return;
    }
    const processor = unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkToSlate)
      .use(remarkListItem);
    if (this.ariaValueText) {
      const slateDescendant = processor.processSync(this.ariaValueText).result;
      this.initialValue = slateDescendant;
    }

    CreateSlateRemark(this.root, {
      // 直接传入上下文会报错
      onValueChange: (descendant) => this.onValueChange(descendant),
      onEditorReady: (editor) => this.onEditorReady(editor),
      initialValue:
        this.initialValue ||
        ([
          {
            type: "paragraph",
            children: [
              {
                text: " ",
              },
            ],
          },
        ] as any),
    });
  }
}
</script>
