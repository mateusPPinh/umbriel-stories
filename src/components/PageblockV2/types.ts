export interface Theme {
  dark: {
    columnStyle: {
      background: string;
    };
    headingProps: {
      fontSize: string;
      fontWeight?: number;
      color?: string;
    };
    subtitleProps: {
      fontSize: string;
      fontWeight?: string;
      color: string;
    };
  };
  light: {
    columnStyle: {
      background: string;
    };
    headingProps: {
      fontSize: string;
      fontWeight?: number;
      color: string;
    };
    subtitleProps: {
      fontSize: string;
      fontWeight?: string;
      color: string;
    };
  };
}

export interface MediaConfig {
  type: string;
  customUrl: string;
  videoConfig?: {
    loop: boolean;
    muted: boolean;
    autoplay: boolean;
    controls: boolean;
  };
  useArticleMedia: boolean;
}

export interface Article {
  id: string;
  title: string;
  subtitle?: string;
  content: {
    image?: {
      desktop_image_path?: string;
    };
  };
  publishedAt?: string;
}

export type FontSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
export type FontWeight = 'normal' | 'medium' | 'semibold' | 'bold';

export interface StyleProps {
  fontSize?: FontSize;
  fontWeight?: FontWeight;
  color?: string;
}

export interface ColumnStyleProps {
  background: string;
  padding?: string;
  borderRadius?: string;
  mainColumnStyle?: ColumnStyleProps;
  secondaryColumnStyle?: ColumnStyleProps;
  compactListStyle?: {
    background: string;
    borderTop?: string;
  };
}

export interface ThemeProps {
  columnStyle: ColumnStyleProps;
  mainColumnStyle?: ColumnStyleProps;
  secondaryColumnStyle?: ColumnStyleProps;
  compactListStyle?: {
    background: string;
    borderTop?: string;
  };
  headingProps: StyleProps;
  subtitleProps: StyleProps;
  bodyProps: Record<string, unknown>;
  linkProps: {
    color: string;
    hoverColor: string;
  };
}

export interface ImageStyle {
  main?: {
    aspectRatio: string;
    borderRadius?: string;
  };
  secondary?: {
    aspectRatio: string;
    borderRadius?: string;
  };
  compact?: {
    aspectRatio: string;
    borderRadius?: string;
  };
}

export interface ShowConfig {
  main?: boolean;
  secondary?: boolean;
  compact?: boolean;
}

export interface BlockStyles {
  theme: Theme;
  titleSize: string;
  columnStyle: Record<string, any>;
  imageHeight: string;
  showExcerpt: ShowConfig;
  showImage: ShowConfig;
  imageStyle: ImageStyle;
  showMetadata: boolean;
}

export interface BlockVariant {
  variantType: string;
  variantPosition: number;
  config: BlockConfig;
}

export interface BlockConfig {
  layout: {
    gap: string;
    styles: {
      grid: {
        autoRows: string;
        templateColumns: string;
      };
      width: string;
      columnStyles: Record<string, any>;
      backgroundColor: string;
      gridFlow?: string;
      minColumnWidth?: string;
    };
    columns: number;
    padding: string;
    imageSize: string;
    responsive: {
      mobile: number;
      tablet: number;
      desktop: number;
    };
    aspectRatio: string;
  };
  styles: {
    theme: Theme;
    titleSize: string;
    columnStyle: Record<string, any>;
    imageHeight: string;
    showExcerpt: boolean;
    showMetadata: boolean;
  };
  articles: Record<string, Article[]>;
  mediaConfig: MediaConfig;
  timelineStyle?: string;
}

export interface PageBlock {
  id: string;
  tenantId: string;
  blockType: string;
  blockPosition: number;
  template: string;
  articlesPerRow?: number;
  variants: BlockVariant[];
  metadata: {
    tags: string[];
    title: string;
    description: string;
  };
  pageId: string;
} 

export interface TimelineStyles {
  timelineStyle?: 'solid' | 'dashed' | 'dotted';
  markerStyle?: 'circle' | 'square' | 'diamond';
  hoverEffect?: 'highlight' | 'scale' | 'none';
  showDate?: boolean;
  theme?: BlockConfig['styles']['theme'];
  showExcerpt?: boolean;
  showMetadata?: boolean;
}
export interface MasonryStyles {
  masonryStyle?: 'masonry' | 'grid';
  columnCount?: number;
  gap?: string;
  itemWidth?: string;
  itemHeight?: string;
  showExcerpt?: boolean;
  showMetadata?: boolean;
  showImage?: boolean;
  showTitle?: boolean;
  showSubtitle?: boolean;
  imageVariations?: string[];
  hoverEffect?: string;
}

export interface GridStyles {
  gridStyle?: 'standard' | 'featured';
  showExcerpt?: boolean;
  showMetadata?: boolean;
  showImage?: boolean;
  showTitle?: boolean;
  showSubtitle?: boolean;
  imageVariations?: string[];
  hoverEffect?: string;
  featuredImageOverlay?: boolean;
}
