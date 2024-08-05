import React, { useEffect } from "react";
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
import renderPlaceholder from "./RenderPlaceholder";

export interface SlateRemarkProps {
  onValueChange?: (descendant: Descendant[]) => void;
  onEditorReady?: (editor: ReactEditor) => void;
  initialValue: Descendant[];
}

function SlateRemark(props: SlateRemarkProps) {
  const editor = useMemo<ReactEditor>(
    () => withShortcuts(withReact(withHistory(createEditor()))),
    []
  );

  useEffect(() => {
    props.onEditorReady?.(editor);
  }, []);

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

        return Editor.isStart(
          editor,
          Editor.start(editor, path),
          blockEntry[1]
        );
      });

      if (scheduleFlush) {
        ReactEditor.androidScheduleFlush(editor);
      }
    });
  }, [editor]);

  return (
    <Slate
      editor={editor}
      initialValue={props.initialValue}
      onValueChange={props.onValueChange}
    >
      <Menu />
      <Editable
        style={{
          flexGrow: 1,
          overflowY: "auto",
          border: "none",
          borderRadius: 0,
        }}
        onDOMBeforeInput={handleDOMBeforeInput}
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        renderPlaceholder={renderPlaceholder}
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
