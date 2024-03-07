import { CSSInline } from "../styles/cssUtils";
import { DefaultTheme } from "styled-components";

export type TextProps<C extends React.ElementType> = {
  as?: C;
  children: React.ReactNode;
  css?: CSSInline;
  color?: keyof DefaultTheme['colors']['base'];
} & React.ComponentPropsWithoutRef<C>;