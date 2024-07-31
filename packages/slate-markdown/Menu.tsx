import { MouseEventHandler, ReactNode } from "react";
import { BaseEditor, Editor, Transforms } from "slate";
import { useSlate, useSlateStatic } from "slate-react";
import imageExtensions from "image-extensions";
import { isBlockActive, toggleBlock } from "./utils";

const Button = (props: {
  onMouseDown: MouseEventHandler;
  active?: boolean;
  children?: ReactNode;
}) => (
  <span
    onMouseDown={props.onMouseDown}
    style={{
      cursor: "pointer",
      color: props.active ? "black" : "#ccc",
    }}
  >
    {props.children}
  </span>
);

const MarkButton = (props: { format: string; icon: ReactNode }) => {
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
    >
      {props.icon}
    </Button>
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
      onMouseDown={(event) => {
        event.preventDefault();
        const url = window.prompt("Enter the URL of the image:");
        if (url && !isImageUrl(url)) {
          alert("URL is not an image");
          return;
        }
        url && insertImage(editor, url);
      }}
    >
      <span className="material-icons"></span>
    </Button>
  );
};
const BlockButton = (props: {
  format: string;
  icon: ReactNode;
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
    >
      <span className="material-icons"> {props.icon}</span>
    </Button>
  );
};

export default function Menu() {
  return (
    <div
      data-test-id="menu"
      style={{
        position: "relative",
        padding: "5px 10px",
        borderBottom: "2px solid #eee",
        width: "100%",
        display: "flex",
        gap: "10px",
        boxSizing: "border-box",
      }}
    >
      <MarkButton
        format="bold"
        icon={<span className="font-semibold">B</span>}
      />
      <MarkButton
        format="italic"
        icon={
          <span
            style={{
              fontStyle: "italic",
            }}
          >
            I
          </span>
        }
      />
      <MarkButton
        format="underline"
        icon={
          <span
            style={{
              textDecoration: "underline",
            }}
          >
            U
          </span>
        }
      />
      <MarkButton format="code" icon={<span>{"< >"}</span>} />
      <BlockButton format="heading" depth={1} icon={<span>h1</span>} />
      <BlockButton format="heading" depth={2} icon={<span>h2</span>} />
      <BlockButton format="heading" depth={3} icon={<span>h3</span>} />
      <BlockButton format="blockquote" icon={<span>”</span>} />
      <BlockButton format="list" ordered={true} icon={<span>Ol</span>} />
      <BlockButton format="list" ordered={false} icon={<span>Ul</span>} />
      <InsertImageButton />
    </div>
  );
}
