import React, { useCallback, useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";
import { createEditor, Descendant } from "slate";
import { withHistory } from "slate-history";
import { Editable, ReactEditor, Slate, withReact } from "slate-react";
import { renderElement } from "./RenderElement";
import renderLeaf from "./RenderLeaf";
import Menu from "./Menu";
import { handleDOMBeforeInput } from "./utils";
import { withShortcuts } from "./withShorts";
import renderPlaceholder from "./RenderPlaceholder";

export interface SlateRemarkProps {
  onValueChange?: (descendant: Descendant[]) => void;
  onEditorReady?: (editor: ReactEditor) => void;
  initialValue: Descendant[];
}

function SlateRemark(props: SlateRemarkProps) {
  const editor = useRef<ReactEditor>(
    withShortcuts(withReact(withHistory(createEditor())))
  );

  useEffect(() => {
    props.onEditorReady?.(editor.current);
  }, []);

  const onDOMBeforeInput = useCallback(() => {
    handleDOMBeforeInput(editor.current);
  }, [editor]);

  return (
    <Slate
      editor={editor.current}
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
        onDOMBeforeInput={onDOMBeforeInput}
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
