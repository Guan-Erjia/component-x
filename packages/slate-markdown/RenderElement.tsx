import { Element } from "slate";

interface RenderElementProps {
  children: any;
  element: Element & Record<string, any>;
  attributes: {
    "data-slate-node": "element";
    "data-slate-inline"?: true;
    "data-slate-void"?: true;
    dir?: "rtl";
    ref: any;
  };
}

export function renderElement(props: RenderElementProps): JSX.Element {
  const { attributes, children, element } = props;
  switch (element.type) {
    case "blockquote":
      return <blockquote {...attributes}>{children}</blockquote>;
    case "list":
      return element.ordered ? (
        <ol {...attributes}>{children}</ol>
      ) : (
        <ul {...attributes}>{children}</ul>
      );
    case "heading":
      switch (element.depth) {
        case 1:
          return (
            <h1
              {...attributes}
              style={{
                margin: "0",
              }}
            >
              {children}
            </h1>
          );
        case 2:
          return (
            <h2
              {...attributes}
              style={{
                margin: "0",
              }}
            >
              {children}
            </h2>
          );
        case 3:
          return (
            <h3
              {...attributes}
              style={{
                margin: "0",
              }}
            >
              {children}
            </h3>
          );
        default:
          return <p {...attributes}>{children}</p>;
      }
    case "listItem":
      return <li {...attributes}>{children}</li>;
    case "image":
      return <img src={element.url} />;
    case "code":
      return <code {...attributes}>{children}</code>;
    case "link":
      return (
        <a {...attributes} href={element.url}>
          {children}
        </a>
      );
    default:
      return <p {...attributes}>{children}</p>;
  }
}
