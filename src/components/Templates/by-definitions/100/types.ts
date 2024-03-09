import { ReactNode } from "react";

type Menu = {
  title: string;
  href: string;
};

type Footer = {
  footer?: {
    title_top: string;
    title_bottom: string;
  };
}

type Carrousel = {
  layoutCarrousel?: {
    image_middle_desktop_path?: string;
    image_mobile_path?: string;
  };
}

export type SlotDefinitions = {
  bgColor: string;
  children: ReactNode;
  minHeight: [string, string];
  transparent: boolean;
  genericMenu?: Menu[];
  genericFooter?: Footer[];
  genericCarrousel?: Carrousel[];
  template: 'Template100';
}