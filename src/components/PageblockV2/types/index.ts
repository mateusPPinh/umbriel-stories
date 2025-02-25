export type DeviceType = 'mobile' | 'tablet' | 'desktop';

export interface Article {
  id: string;
  tenant_id: string;
  title: string;
  subtitle: string;
  content: {
    image: {
      desktop_image_path: string;
      image_mobile_path?: string;
    };
  };
}

export interface BlockConfig {
  layout: {
    responsive: Record<DeviceType, number>;
    gap: string;
    padding?: string;
    columns?: number;
    styles: {
      backgroundColor?: string;
      columnStyles?: Record<string, any>;
      gridFlow?: string;
      minColumnWidth?: string;
    };
  };
  styles: {
    theme: {
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
          color: string;
        };
      };
      dark: {
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
          color: string;
        };
      };
    };
    showExcerpt?: boolean;
  };
  articles: Record<string, Article[]>;
}

export interface BlockVariant {
  variantType: string;
  variantPosition: number;
  config: BlockConfig;
}

export interface PageBlock {
  id: string;
  tenantId: string;
  blockType: string;
  template: string;
  blockPosition: number;
  pageId: string;
  metadata: {
    title: string;
    description: string;
    tags: string[];
  };
  variants: BlockVariant[];
}

export interface BaseVariantProps {
  variant: BlockVariant;
  isDarkTheme?: boolean;
}

export interface BaseBlockProps {
  block: PageBlock;
  isDarkTheme?: boolean;
}

export interface BorderConfig {
  enabled: boolean;
  color: string;
  width: string;
  style: 'solid' | 'dashed' | 'dotted';
}

export interface StyleProps {
  fontSize?: 'sm' | 'md' | 'lg' | 'xl';
  fontWeight?: 'normal' | 'medium' | 'bold';
  color?: string;
}

export interface ThemeProps {
  columnStyle: {
    background: string;
    padding?: number;
    border?: {
      width: number;
      style: 'solid' | 'dashed' | 'dotted';
      color: string;
    };
  };
  borderBottom?: BorderConfig;
  headingProps: StyleProps;
  subtitleProps: StyleProps;
  bodyProps: StyleProps;
  linkProps: {
    color: string;
    hoverColor: string;
  };
}

export interface UseBlockStylesProps {
  config: {
    styles?: {
      theme?: {
        light: ThemeProps;
        dark: ThemeProps;
      };
      columnStyles?: {
        [key: string]: {
          background?: string;
          padding?: number;
          border?: {
            width: number;
            style: 'solid' | 'dashed' | 'dotted';
            color: string;
          };
        };
      };
      backgroundColor?: string;
      headingProps?: StyleProps;
      subtitleProps?: StyleProps;
      bodyProps?: StyleProps;
      linkProps?: {
        color: string;
        hoverColor: string;
      };
    };
  };
  isDarkTheme?: boolean;
} 