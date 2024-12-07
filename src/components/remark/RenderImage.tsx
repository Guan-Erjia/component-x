import { useFocused, useSelected } from "slate-react";
import { RenderElementProps } from "./interface";

export default function RenderImage(props: RenderElementProps) {
  const { attributes, children, element } = props;
  const selected = useSelected();
  const focused = useFocused();
  return (
    <div {...attributes}>
      {children}
      <img
        src={element.url}
        style={{
          boxShadow: ` ${selected && focused ? "0 0 0 2px blue;" : "none"}`,
        }}
      />
    </div>
  );
}
