import { useMemo, CSSProperties, createElement } from "react";
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
  const style = useMemo(() => {
    const style: CSSProperties = {};
    if (leaf.strong) {
      style.fontWeight = "bold";
    }
    if (leaf.italic) {
      style.fontStyle = "italic";
    }
    if (leaf.emphasis) {
      style.borderBottom = "1px solid black";
    }
    if (leaf.delete) {
      style.textDecoration = "line-through";
    }
    return style;
  }, [leaf]);
  return createElement(
    leaf.code ? "code" : "span",
    { ...attributes, style },
    children
  );
}
