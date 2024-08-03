import { BaseEditor, Editor, Element, Transforms } from "slate";

export interface MarkdownElement {
  type: string;
  ordered?: boolean;
  depth?: number;
  url?: string;
}

export const SHORTCUTS = {
  "*": "listItem",
  "-": "listItem",
  "+": "listItem",
  ">": "blockquote",
  "#": "heading",
  "##": "heading",
  "###": "heading",
  "####": "heading",
  "#####": "heading",
  "######": "heading",
};

export const isBlockActive = (
  editor: BaseEditor,
  format: string,
  options: {
    depth?: number;
    ordered?: boolean;
  }
) => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) => {
        if (
          !Editor.isEditor(n) &&
          Element.isElement(n) &&
          (n as any).type === format
        ) {
          switch ((n as any).type) {
            case "heading":
              return (n as any).depth === options.depth;
            case "list":
              return (n as any).ordered === options.ordered;
            default:
              return true;
          }
        } else {
          return false;
        }
      },
    })
  );

  return !!match;
};
export const toggleBlock = (
  editor: BaseEditor,
  format: string,
  options: {
    depth?: number;
    ordered?: boolean;
  }
) => {
  const isActive = isBlockActive(editor, format, options);
  const isList = format === "list";

  Transforms.unwrapNodes(editor, {
    match: (n) => {
      if (
        !Editor.isEditor(n) &&
        Element.isElement(n) &&
        (n as any).type === "list"
      ) {
        return true;
      } else {
        return false;
      }
    },
    split: true,
  });

  const newProperties = {
    type: isActive ? "paragraph" : isList ? "listItem" : format,
    ordered: isActive ? undefined : options.ordered,
    depth: options.depth,
  };
  Transforms.setNodes<Element>(editor, newProperties as any);

  if (!isActive && isList) {
    const block = {
      type: format,
      ordered: options.ordered,
      children: [],
    };
    Transforms.wrapNodes(editor, block);
  }
};
