import { BlockConfig } from '../components/StyleConfigModal';

// Definição dos tipos necessários
type MarkerStyle = 'circle' | 'square' | 'diamond';
type HoverEffect = 'highlight' | 'scale' | 'background' | 'translate' | 'none';
type DividerStyle = 'solid' | 'dashed' | 'dotted';
type ThumbnailShape = 'square' | 'rounded' | 'circle';

// Interface ExtendedBlockConfig para compatibilidade com ListLayoutPreview
export interface ExtendedBlockConfig {
  layout: {
    columns: string;
    gap: string;
    styles: {
      width: string;
      backgroundColor: string;
    }
  };
  styles: {
    theme: {
      light: {
        columnStyle: {
          background: string;
          padding: string;
        };
        headingProps: {
          fontSize: string;
          fontWeight: string | number;
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
          padding: string;
        };
        headingProps: {
          fontSize: string;
          fontWeight: string | number;
          color: string;
        };
        subtitleProps: {
          fontSize: string;
          color: string;
        };
      };
    };
    showExcerpt: boolean;
    showMetadata: boolean;
    titleSize: string;
    columnStyle: Record<string, any>;
    imageHeight: string;
    timelineStyle?: 'solid' | 'dashed' | 'dotted';
    markerStyle?: MarkerStyle;
    hoverEffect?: HoverEffect;
    dividerStyle?: DividerStyle;
    thumbnailShape?: ThumbnailShape;
  };
  variant?: 'chronological' | 'compact' | 'card';
  mediaConfig?: {
    type?: string;
    customUrl?: string;
    videoConfig?: {
      loop: boolean;
      muted: boolean;
      autoplay: boolean;
      controls: boolean;
    };
    useArticleMedia?: boolean;
  };
}

/**
 * Adapta um objeto BlockConfig para o formato ExtendedBlockConfig
 * necessário para o componente ListLayoutPreview
 */
export const adaptBlockConfig = (config: BlockConfig): ExtendedBlockConfig => {
  return {
    layout: config.layout,
    styles: {
      theme: {
        light: {
          columnStyle: {
            background: config.styles.theme.light.columnStyle?.background || '#ffffff',
            padding: config.styles.theme.light.columnStyle?.padding || '1rem'
          },
          headingProps: {
            fontSize: config.styles.theme.light.headingProps?.fontSize || '1.125rem',
            fontWeight: config.styles.theme.light.headingProps?.fontWeight || 500,
            color: config.styles.theme.light.headingProps?.color || '#111827'
          },
          subtitleProps: {
            fontSize: config.styles.theme.light.subtitleProps?.fontSize || '0.875rem',
            color: config.styles.theme.light.subtitleProps?.color || '#6B7280'
          }
        },
        dark: {
          columnStyle: {
            background: config.styles.theme.dark.columnStyle?.background || '#1F2937',
            padding: config.styles.theme.dark.columnStyle?.padding || '1rem'
          },
          headingProps: {
            fontSize: config.styles.theme.dark.headingProps?.fontSize || '1.125rem',
            fontWeight: config.styles.theme.dark.headingProps?.fontWeight || 500,
            color: config.styles.theme.dark.headingProps?.color || '#F9FAFB'
          },
          subtitleProps: {
            fontSize: config.styles.theme.dark.subtitleProps?.fontSize || '0.875rem',
            color: config.styles.theme.dark.subtitleProps?.color || '#9CA3AF'
          }
        }
      },
      showExcerpt: config.styles.showExcerpt,
      showMetadata: config.styles.showMetadata || true,
      titleSize: config.styles.titleSize || 'text-lg',
      columnStyle: {},
      imageHeight: 'h-48',
      timelineStyle: config.styles.timelineStyle,
      markerStyle: config.styles.markerStyle as MarkerStyle,
      hoverEffect: config.styles.hoverEffect as HoverEffect,
      dividerStyle: config.styles.dividerStyle as DividerStyle,
      thumbnailShape: config.styles.thumbnailShape as ThumbnailShape
    },
    variant: config.variant as 'chronological' | 'compact' | 'card',
    mediaConfig: config.mediaConfig
  };
}; 