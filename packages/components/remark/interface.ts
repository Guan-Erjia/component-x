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

export interface ToggleOption {
  depth: number;
  ordered: boolean;
  checked: boolean;
}

export interface BlockButtonProps extends Partial<ToggleOption> {
  format: string;
  icon: string;
}
