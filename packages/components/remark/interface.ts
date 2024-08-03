import { Element } from "slate";
export interface RenderElementProps {
  children: any;
  element: Element & Record<string, any>;
  href?: any;
  attributes: {
    "data-slate-node": "element";
    "data-slate-inline"?: true;
    "data-slate-void"?: true;
    dir?: "rtl";
    ref: any;
  };
}
