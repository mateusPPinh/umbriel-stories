import React from 'react';

export type CSSInline = {
  alignX?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around';
  alignY?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  bgColor?: string;
  mb?: string | number;
  mx?: string | number;
  mt?: string | number;
  slot_left?: React.ReactNode;
  slot_right?: React.ReactNode;
  py?: string | number;
  boxShadow?: string;
  maxWidth?: string;
  width_container?: [string, string];
} & React.CSSProperties;

export const processInlineStyles = (css: CSSInline = {}): React.CSSProperties => {
  const inlineStyles: React.CSSProperties = {
    ...css,
    backgroundColor: css.bgColor,
    marginBottom: css.mb,
    marginLeft: css.mx,
    marginRight: css.mx,
    marginTop: css.mt,
    paddingTop: css.py,
    paddingBottom: css.py,
    boxShadow: css.boxShadow,
    maxWidth: css.maxWidth,
  };

  if (css.alignX || css.alignY) {
    inlineStyles.display = 'flex';
    if (css.alignX) inlineStyles.justifyContent = css.alignX;
    if (css.alignY) inlineStyles.alignItems = css.alignY;
  }

  return inlineStyles;
};
