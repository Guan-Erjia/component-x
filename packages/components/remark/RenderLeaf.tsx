import { RenderLeafProps } from "slate-react";

interface CustomLeafProps extends RenderLeafProps {
  leaf: {
    bold?: boolean;
    code?: boolean;
    italic?: boolean;
    underline?: boolean;
    text: string;
  };
}

export default function renderLeaf(props: CustomLeafProps) {
  const { attributes, children, leaf } = props;
  return (
    <span {...attributes}>
      {leaf.bold ? (
        <strong>{children}</strong>
      ) : leaf.code ? (
        <code>{children}</code>
      ) : leaf.italic ? (
        <em>{children}</em>
      ) : leaf.underline ? (
        <u>{children}</u>
      ) : (
        children
      )}
    </span>
  );
}
