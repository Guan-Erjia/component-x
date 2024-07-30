import React from "react";
import ReactDOM from "react-dom/client";
import { useCallback, useMemo } from "react";
import {
  createEditor,
  Editor,
  Element as SlateElement,
  Node as SlateNode,
} from "slate";
import { withHistory } from "slate-history";
import { Editable, ReactEditor, Slate, withReact } from "slate-react";
import { remarkToSlate, slateToRemark } from "remark-slate-transformer";
import { unified } from "unified";
import remarkStringify from "remark-stringify";
import remarkParse from "remark-parse";
import { renderElement } from "./RenderElement";
import renderLeaf from "./RenderLeaf";
import Menu from "./Menu";
import { SHORTCUTS } from "./utils";
import { withShortcuts } from "./withShorts";
import { initialValue } from "./initValue";

function SlateMarkdown() {
  const editor = useMemo<ReactEditor>(
    () => withShortcuts(withReact(withHistory(createEditor()))),
    []
  );

  const handleDOMBeforeInput = useCallback(() => {
    queueMicrotask(() => {
      const pendingDiffs = ReactEditor.androidPendingDiffs(editor);

      const scheduleFlush = pendingDiffs?.some(({ diff, path }) => {
        if (!diff.text.endsWith(" ")) {
          return false;
        }

        const { text } = SlateNode.leaf(editor, path);
        const beforeText = text.slice(0, diff.start) + diff.text.slice(0, -1);
        if (!(beforeText in SHORTCUTS)) {
          return;
        }

        const blockEntry = Editor.above(editor, {
          at: path,
          match: (n) => SlateElement.isElement(n) && Editor.isBlock(editor, n),
        });
        if (!blockEntry) {
          return false;
        }

        const [, blockPath] = blockEntry;
        return Editor.isStart(editor, Editor.start(editor, path), blockPath);
      });

      if (scheduleFlush) {
        ReactEditor.androidScheduleFlush(editor);
      }
    });
  }, [editor]);

  return (
    <Slate
      editor={editor}
      initialValue={initialValue}
      onValueChange={(value) => {
        try {
          const result = slateToRemark(value);
          const file = unified().use(remarkStringify).stringify(result);
          console.log(file);

          const processor = unified().use(remarkParse).use(remarkToSlate);

          const value1 = processor.processSync(file).result;
          console.log(value1);
        } catch (error) {
          console.error(error);
        }
      }}
    >
      <Menu />
      <Editable
        onDOMBeforeInput={handleDOMBeforeInput}
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder="Write some markdown..."
        spellCheck
        autoFocus
      />
    </Slate>
  );
}

export function CreateSlateRemark(id: string) {
  return ReactDOM.createRoot(document.getElementById(id)!).render(
    <React.StrictMode>
      <SlateMarkdown />
    </React.StrictMode>
  );
}
