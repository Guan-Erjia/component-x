import { BaseEditor, Editor, Element, Transforms } from "slate";
import { visit } from "unist-util-visit";
import { Node } from "unist";

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
    checked?: boolean;
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
          switch (format) {
            case "heading":
              return (n as any).depth === options.depth;
            case "list":
              return (n as any).ordered === options.ordered;
            case "listItem":
              /** 任务列表只有 true 和 false */
              return [true, false].includes((n as any).checked);
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
    checked?: boolean;
  }
) => {
  const isActive = isBlockActive(editor, format, options);
  const isList = format === "list";

  if (format !== "listItem") {
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
  }

  /** 激活，并且非任务列表 */
  const isParagraph = isActive && format !== "listItem";
  const newProperties = {
    /** 有序无序列表转成 listItem，其他转成format */
    type: isParagraph ? "paragraph" : isList ? "listItem" : format,
    ordered: isActive ? undefined : options.ordered,
    depth: options.depth,
    checked: isActive ? undefined : options.checked,
  };
  Transforms.setNodes<Element>(editor, newProperties as any);

  /** 有序无序列表包裹外层列表容器 */
  if (!isActive && isList) {
    const block = {
      type: format,
      ordered: options.ordered,
      children: [],
    };
    Transforms.wrapNodes(editor, block);
  }
};

export const remarkListItem = () => (tree: Node) => {
  visit(tree, "listItem", function (node: any) {
    node.children = node.children[0].children;
  });
};
