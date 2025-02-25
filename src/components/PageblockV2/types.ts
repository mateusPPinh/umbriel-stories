export interface Theme {
  dark: {
    columnStyle: {
      background: string;
    };
    headingProps: {
      fontSize: string;
      fontWeight?: string;
      color?: string;
    };
    subtitleProps: {
      fontSize?: string;
      fontWeight?: string;
      color?: string;
    };
  };
  light: {
    columnStyle: {
      background: string;
    };
    headingProps: {
      fontSize?: string;
      fontWeight?: string;
      color?: string;
    };
    subtitleProps: {
      fontSize?: string;
      fontWeight?: string;
      color?: string;
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
  tenant_id: string;
  title: string;
  subtitle: string;
  content: {
    image: {
      desktop_image_path: string | null;
      image_mobile_path: string | null;
    };
  };
  publishedAt?: string;
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
}

export interface BlockVariant {
  config: BlockConfig;
  variantType: string;
  variantPosition: number;
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