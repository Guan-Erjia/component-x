import { Editor, Range, Transforms, Element, Point } from "slate";
import { editorAndElement, SHORTCUTS } from "./utils";
import { ReactEditor } from "slate-react";

export const withShortcuts = (editor: ReactEditor): ReactEditor => {
  const { deleteBackward, insertText } = editor;

  editor.insertText = (text) => {
    const { selection } = editor;

    if (text.endsWith(" ") && selection && Range.isCollapsed(selection)) {
      const block = Editor.above(editor, {
        match: (n) => Element.isElement(n) && Editor.isBlock(editor, n),
      });
      const path = block ? block[1] : [];
      const range = {
        anchor: selection.anchor,
        focus: Editor.start(editor, path),
      };
      const beforeText = Editor.string(editor, range) + text.slice(0, -1);
      const type = SHORTCUTS[beforeText as keyof typeof SHORTCUTS];

      if (type) {
        Transforms.select(editor, range);

        if (!Range.isCollapsed(range)) {
          Transforms.delete(editor);
        }

        if (type === "heading") {
          Transforms.setNodes(
            editor,
            {
              type,
              depth: beforeText.length,
            } as any,
            {
              match: (n) => Element.isElement(n) && Editor.isBlock(editor, n),
            }
          );
        }
        if (type === "listItem") {
          Transforms.setNodes(
            editor,
            {
              type,
              checked: null,
            } as any,
            {
              match: (n) => Element.isElement(n) && Editor.isBlock(editor, n),
            }
          );
          Transforms.wrapNodes(
            editor,
            {
              type: "list",
              children: [],
            } as any,
            {
              match: (n) =>
                editorAndElement(n) && "type" in n && n.type === "listItem",
            }
          );
        }

        return;
      }
    }

    insertText(text);
  };

  editor.deleteBackward = (...args) => {
    const { selection } = editor;

    if (selection && Range.isCollapsed(selection)) {
      const match = Editor.above(editor, {
        match: (n) => Element.isElement(n) && Editor.isBlock(editor, n),
      });

      if (match) {
        const [block, path] = match;

        if (
          editorAndElement(block) &&
          "type" in block &&
          block.type !== "paragraph" &&
          Point.equals(selection.anchor, Editor.start(editor, path))
        ) {
          Transforms.setNodes(editor, { type: "paragraph" } as any);

          if ("type" in block && block.type === "listItem") {
            Transforms.unwrapNodes(editor, {
              match: (n) =>
                editorAndElement(n) && "type" in n && n.type === "list",
              split: true,
            });
          }

          return;
        }
      }

      deleteBackward(...args);
    }
  };

  return editor;
};
