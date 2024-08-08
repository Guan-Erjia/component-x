import {
  BaseEditor,
  Editor,
  Element,
  Transforms,
  Node as SlateNode,
} from "slate";
import { visit } from "unist-util-visit";
import { Node } from "unist";
import { ToggleOption } from "./interface";
import { ReactEditor } from "slate-react";

export const editorAndElement = (n: any): boolean =>
  !Editor.isEditor(n) && Element.isElement(n);

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

export const blockActive = (
  editor: BaseEditor,
  format: string,
  options: Partial<ToggleOption>
) => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) => {
        if (editorAndElement(n) && "type" in n && n.type === format) {
          switch (format) {
            case "heading":
              return "depth" in n && n.depth === options.depth;
            case "list":
              return "ordered" in n && n.ordered === options.ordered;
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
  options: Partial<ToggleOption>
) => {
  const isActive = blockActive(editor, format, options);
  const listFormat = format === "list";
  const checkFormat = format === "listItem";
  /** 非任务列表拆包 */
  Transforms.unwrapNodes(editor, {
    match: (n) =>
      editorAndElement(n) && "type" in n && n.type === "list" && !checkFormat,
    split: true,
  });

  /** 激活，并且非任务列表 */
  const isParagraph = isActive && format !== "listItem";
  const newProperties = {
    /** 有序无序列表转成 listItem，其他转成format */
    type: isParagraph ? "paragraph" : listFormat ? "listItem" : format,
    ordered: isActive ? undefined : options.ordered,
    depth: options.depth,
    checked: isActive ? null : options.checked,
  };
  Transforms.setNodes(editor, newProperties as any);

  /** 有序无序列表包裹外层列表容器 */
  if (!isActive && listFormat) {
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

export const handleDOMBeforeInput = (editor: BaseEditor) => {
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
        match: (n) => Element.isElement(n) && Editor.isBlock(editor, n),
      });
      if (!blockEntry) {
        return false;
      }

      return Editor.isStart(editor, Editor.start(editor, path), blockEntry[1]);
    });

    if (scheduleFlush) {
      ReactEditor.androidScheduleFlush(editor);
    }
  });
};
