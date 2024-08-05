import RenderImage from "./RenderImage";
import { RenderElementProps } from "./interface";
import RenderLink from "./RenderLink";
import { createElement } from "react";

export function renderElement(props: RenderElementProps): JSX.Element {
  const { attributes, children, element } = props;
  switch (element.type) {
    case "blockquote":
      return <blockquote {...attributes}>{children}</blockquote>;
    case "list":
      return createElement(
        element.ordered ? "ol" : "ul",
        attributes,
        ...children
      );
    case "heading":
      return createElement("h" + element.depth, attributes, ...children);
    case "listItem":
      return (
        <li {...attributes}>
          {[true, false].includes(element.checked) && (
            <input type="checkbox" defaultChecked={element.checked} />
          )}
          {children}
        </li>
      );
    case "image":
      return <RenderImage {...props} />;
    case "code":
      return (
        <pre>
          <code {...attributes}>{children}</code>
        </pre>
      );
    case "link":
      return (
        <RenderLink {...props} href={element.url}>
          {children}
        </RenderLink>
      );
    case "table":
      return (
        <table border={2} cellSpacing={10} {...attributes}>
          <tbody>{children}</tbody>
        </table>
      );
    case "tableRow":
      return <tr {...attributes}>{children}</tr>;
    case "tableCell":
      return <td {...attributes}>{children}</td>;
    case "thematicBreak":
      return <hr />;
    case "linkReference":
      return (
        <span {...attributes} title={element.label}>
          {children}
        </span>
      );
    case "definition":
      return <p {...attributes}>{children}</p>;
    case "footnoteReference":
      return <span {...attributes}>{children}</span>;
    case "footnoteDefinition":
      return <span {...attributes}>{children}</span>;
    case "html":
      return (
        <div>
          {element.children.map((child: any, index) => (
            <div
              dangerouslySetInnerHTML={{ __html: child.text }}
              key={child.text + index}
            ></div>
          ))}
        </div>
      );
    default:
      return <p {...attributes}>{children}</p>;
  }
}
