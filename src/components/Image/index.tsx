import { ImageProps } from "./types";
import { processInlineStyles } from "../styles/cssUtils";
import React, { useEffect, useState } from "react";

export const Image = React.forwardRef<HTMLImageElement, ImageProps>((props, ref) => {
  const {alt, desktop_image_path, mobile_image_path, customCss, ...rest} = props;
  const [src, setSrc] = useState<string>();
  console.log(src, 'src')

  useEffect(() => {
    const matchMobile = window.matchMedia("(max-width: 768px)").matches;
    if (matchMobile && mobile_image_path) {
      setSrc(mobile_image_path);
    } else if (desktop_image_path) {
      setSrc(desktop_image_path);
    }
  }, [desktop_image_path, mobile_image_path]);

  const inlineStyles = processInlineStyles(customCss);
  
  return (
    <img 
      ref={ref}
      alt={alt}
      style={inlineStyles}
      src={src}
      {...rest}
    />
  )
})