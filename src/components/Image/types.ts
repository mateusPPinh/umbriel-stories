import { CSSInline } from "../styles/cssUtils";

export type ImageProps = {
  desktop_image_path?: string;
  mobile_image_path?: string;
  customCss?: CSSInline
  className?: string;
  alt: string;
} & Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src" | "alt" | "style">