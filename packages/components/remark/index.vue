<style lang="scss">
:host {
  border: 1px solid red;
  display: inline-block;
  overflow-y: auto;
}
* {
  line-height: normal;
}
</style>

<template>
  <div style="height: 100%"></div>
</template>

<script lang="ts">
import { InitComponentTemplate, XDispatch } from "@/utils";
import { XComponent, XRegister } from "@/utils/decorator";
import { CreateSlateRemark } from "./index";
import { Descendant } from "slate";
import { slateToRemark } from "remark-slate-transformer";
// import { remarkToSlate } from "remark-slate-transformer";
// import remarkParse from "remark-parse";
import { unified } from "unified";
import remarkStringify from "remark-stringify";

@XRegister
export class XRemark extends XComponent {
  static get observedAttributes() {
    return [];
  }
  static name: string = "x-remark";
  root?: HTMLButtonElement;
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
    // const processor = unified().use(remarkParse).use(remarkToSlate);
    // const slateDescendant = processor.processSync(remarkString).result;
    XDispatch.call(this, "change", {
      text: remarkString,
      descendant,
    });
  }

  connectedCallback() {
    if (!this.root) {
      return;
    }
    CreateSlateRemark(this.root, {
      // 直接传入上下文会报错
      onValueChange: (descendant) => this.onValueChange(descendant),
    });
  }
}
</script>
