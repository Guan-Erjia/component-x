import { useMemo } from "react";
import { RenderElementProps } from "./interface";
const allowedSchemes = ["http:", "https:", "mailto:", "tel:"];
export default function SafeLink(props: RenderElementProps) {
  const { attributes, children, href } = props;
  const safeHref = useMemo(() => {
    let parsedUrl: URL | null = null;
    try {
      parsedUrl = new URL(href);
    } catch {}
    if (parsedUrl && allowedSchemes.includes(parsedUrl.protocol)) {
      return parsedUrl.href;
    }
    return "about:blank";
  }, [href]);

  return (
    <a {...attributes} href={safeHref}>
      {children}
    </a>
  );
}
