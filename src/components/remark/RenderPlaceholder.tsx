import { RenderPlaceholderProps } from "slate-react";

export default function renderPlaceholder(props: RenderPlaceholderProps) {
  const { attributes, children } = props;
  return (
    <div {...attributes} style={{ fontStyle: "italic", color: "gray" }}>
      {children}
    </div>
  );
}
