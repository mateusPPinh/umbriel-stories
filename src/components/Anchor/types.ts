import { CSSInline } from "../styles/cssUtils";

export type AnchorType = {
  href?: string,
  target?: string,
  customCss?: CSSInline,
  children?: React.ReactNode,
  className?: string;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'target' | 'style'>;