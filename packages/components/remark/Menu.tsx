import { MouseEventHandler } from "react";
import { BaseEditor, Editor, Transforms } from "slate";
import { useSlate, useSlateStatic } from "slate-react";
import imageExtensions from "image-extensions";
import { isBlockActive, toggleBlock } from "./utils";
import Blockquote from "@/assets/blockquote.svg";
import Bold from "@/assets/bold.svg";
import Code from "@/assets/code.svg";
import Delete from "@/assets/delete.svg";
import Img from "@/assets/img.svg";
import Italic from "@/assets/italic.svg";
import Ol from "@/assets/ol.svg";
import Ul from "@/assets/ul.svg";
import Task from "@/assets/task.svg";
import Underline from "@/assets/underline.svg";
import H1 from "@/assets/h1.svg";
import H2 from "@/assets/h2.svg";
import H3 from "@/assets/h3.svg";
import H4 from "@/assets/h4.svg";
import H5 from "@/assets/h5.svg";
import H6 from "@/assets/h6.svg";

const Button = (props: {
  onMouseDown: MouseEventHandler;
  active?: boolean;
  icon: string;
}) => (
  <img
    onMouseDown={props.onMouseDown}
    style={{
      cursor: "pointer",
      width: 20,
      height: 20,
      filter: props.active ? "" : "opacity(25%)",
    }}
    src={props.icon}
  />
);

const MarkButton = (props: { format: string; icon: string }) => {
  const editor = useSlate();
  const marks = Editor.marks(editor) as Record<string, boolean>;
  const isMarkActive = marks ? marks[props.format] === true : false;

  return (
    <Button
      active={isMarkActive}
      onMouseDown={(event) => {
        event.preventDefault();
        if (isMarkActive) {
          Editor.removeMark(editor, props.format);
        } else {
          Editor.addMark(editor, props.format, true);
        }
      }}
      icon={props.icon}
    />
  );
};

const isImageUrl = (url: string | URL) => {
  if (!url) return false;
  const ext = new URL(url).pathname.split(".").pop() || "";
  return imageExtensions.includes(ext);
};
const insertImage = (editor: BaseEditor, url: string) => {
  const text = { text: "" };
  const image = { type: "image", url, children: [text] };
  Transforms.insertNodes(editor, image);
  const paragraph = { type: "paragraph", children: [{ text: "" }] };
  Transforms.insertNodes(editor, paragraph);
};

const InsertImageButton = () => {
  const editor = useSlateStatic();
  return (
    <Button
      active
      icon={Img}
      onMouseDown={(event) => {
        event.preventDefault();
        const url = window.prompt("Enter the URL of the image:");
        if (url && !isImageUrl(url)) {
          alert("URL is not an image");
          return;
        }
        url && insertImage(editor, url);
      }}
    />
  );
};
const BlockButton = (props: {
  format: string;
  icon: string;
  depth?: number;
  ordered?: boolean;
}) => {
  const editor = useSlate();

  const active = isBlockActive(editor, props.format, {
    depth: props.depth,
    ordered: props.ordered,
  });
  return (
    <Button
      active={active}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleBlock(editor, props.format, {
          depth: props.depth,
          ordered: props.ordered,
        });
      }}
      icon={props.icon}
    />
  );
};

export default function Menu() {
  return (
    <div
      data-test-id="menu"
      style={{
        position: "relative",
        padding: "5px 10px",
        borderBottomWidth: "var(--control-width)",
        borderBottomColor: "var(--default-color)",
        borderBottomStyle: "solid",
        width: "100%",
        display: "flex",
        gap: "10px",
        boxSizing: "border-box",
        alignItems: "center",
        flexShrink: 0,
        flexGrow: 0,
      }}
    >
      <MarkButton format="bold" icon={Bold} />
      <MarkButton format="italic" icon={Italic} />
      <MarkButton format="underline" icon={Underline} />
      <MarkButton format="delete" icon={Delete} />
      <MarkButton format="code" icon={Code} />
      <BlockButton format="heading" depth={1} icon={H1} />
      <BlockButton format="heading" depth={2} icon={H2} />
      <BlockButton format="heading" depth={3} icon={H3} />
      <BlockButton format="heading" depth={4} icon={H4} />
      <BlockButton format="heading" depth={5} icon={H5} />
      <BlockButton format="heading" depth={6} icon={H6} />
      <BlockButton format="blockquote" icon={Blockquote} />
      <BlockButton format="list" ordered={true} icon={Ol} />
      <BlockButton format="list" ordered={false} icon={Ul} />
      <BlockButton format="list" icon={Task} />
      <InsertImageButton />
    </div>
  );
}
