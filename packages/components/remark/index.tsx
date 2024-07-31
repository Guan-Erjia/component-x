import React from "react";
import ReactDOM from "react-dom/client";
import { useCallback, useMemo } from "react";
import { createEditor, Descendant, Editor, Element, Node } from "slate";
import { withHistory } from "slate-history";
import { Editable, ReactEditor, Slate, withReact } from "slate-react";
import { renderElement } from "./RenderElement";
import renderLeaf from "./RenderLeaf";
import Menu from "./Menu";
import { SHORTCUTS } from "./utils";
import { withShortcuts } from "./withShorts";
import { initialValue } from "./initValue";

export interface SlateRemarkProps {
  onValueChange?: (descendant: Descendant[]) => void;
}

function SlateRemark(props: SlateRemarkProps) {
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

        const { text } = Node.leaf(editor, path);
        const beforeText = text.slice(0, diff.start) + diff.text.slice(0, -1);
        if (!(beforeText in SHORTCUTS)) {
          return;
        }

        const blockEntry = Editor.above(editor, {
          at: path,
          match: (n) => Element.isElement(n) && Editor.isBlock(editor, n),
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
      onValueChange={props.onValueChange}
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

export function CreateSlateRemark(
  element: HTMLElement,
  props: SlateRemarkProps
) {
  return ReactDOM.createRoot(element!).render(
    <React.StrictMode>
      <SlateRemark {...props} />
    </React.StrictMode>
  );
}
