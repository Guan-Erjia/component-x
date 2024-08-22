import { RenderLeafProps } from "slate-react";

interface CustomLeafProps extends RenderLeafProps {
  leaf: {
    strong?: boolean;
    code?: boolean;
    italic?: boolean;
    emphasis?: boolean;
    delete?: boolean;
    text: string;
  };
}

export default function renderLeaf(props: CustomLeafProps) {
  const { attributes, children, leaf } = props;
  return (
    <span {...attributes}>
      {leaf.strong ? (
        <strong>{children}</strong>
      ) : leaf.code ? (
        <code>{children}</code>
      ) : leaf.italic ? (
        <em>{children}</em>
      ) : leaf.emphasis ? (
        <u>{children}</u>
      ) : leaf.delete ? (
        <span
          style={{
            textDecoration: "line-through",
          }}
        >
          {children}
        </span>
      ) : (
        children
      )}
    </span>
  );
}
