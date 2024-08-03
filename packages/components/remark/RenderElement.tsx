import RenderImage from "./RenderImage";
import { RenderElementProps } from "./interface";
import RenderLink from "./RenderLink";

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
      return (
        <li {...attributes}>
          {element.checked !== undefined && (
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
