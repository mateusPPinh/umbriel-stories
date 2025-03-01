import { Article } from '../PageblockV2/types';

export type BlockType = 'articles';
export type TemplateType = 'featured' | 'grid' | 'list' | 'mixed';
export type VariantType = 'hero' | 'split' | 'triple' | 'standard' | 'masonry' | 'sidebargrid' | 'newsgrid' | 'newsfeed' | 'chronological' | 'compact' | 'card' | 'sidebar' | 'showcase' | 'newspaper' | 'magazine' | 'videogrid';

export interface ColumnStyle {
  background: string;
  padding: string;
}

export interface ThemeProps {
  fontSize: string;
  fontWeight?: string;
  color: string;
}

export interface ThemeConfig {
  columnStyle: ColumnStyle;
  headingProps: ThemeProps;
  subtitleProps: ThemeProps;
}

export interface StyleConfig {
  theme: {
    light: ThemeConfig;
    dark: ThemeConfig;
  };
  showExcerpt: boolean;
}

export interface LayoutConfig {
  columns: string;
  gap: string;
  styles: {
    width: string;
    backgroundColor: string;
  };
}

export interface MediaConfig {
  videoConfig?: {
    autoplay: boolean;
    loop: boolean;
    muted: boolean;
    controls: boolean;
    customUrl?: string;
  };
  imageConfig?: {
    fit?: 'cover' | 'contain';
    position?: 'center' | 'top' | 'bottom';
    overlay?: {
      enabled: boolean;
      color: string;
      opacity: number;
    };
  };
}

export interface BlockConfig {
  layout: LayoutConfig;
  articles: {
    [key: string]: string[];
  };
  mediaConfig?: MediaConfig;
  styles: StyleConfig;
}

export interface BlockVariant {
  variantType: VariantType;
  variantPosition: number;
  config: BlockConfig;
}

export interface PageBlock {
  pageId: string;
  blockType: BlockType;
  blockPosition: number;
  template: TemplateType;
  variants: BlockVariant[];
}

// Interface para o estado local que será usado no componente
export interface LocalBlockState extends Omit<PageBlock, 'variants'> {
  currentVariant: BlockVariant;
  articles: {
    [key: string]: Article[];
  };
}
