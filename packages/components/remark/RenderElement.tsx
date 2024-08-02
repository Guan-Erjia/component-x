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
          return <h1 {...attributes}>{children}</h1>;
        case 2:
          return <h2 {...attributes}>{children}</h2>;
        case 3:
          return <h3 {...attributes}>{children}</h3>;
        case 4:
          return <h4 {...attributes}>{children}</h4>;
        case 5:
          return <h5 {...attributes}>{children}</h5>;
        case 6:
          return <h6 {...attributes}>{children}</h6>;
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
      console.log(element.type);
      return <p {...attributes}>{children}</p>;
  }
}
