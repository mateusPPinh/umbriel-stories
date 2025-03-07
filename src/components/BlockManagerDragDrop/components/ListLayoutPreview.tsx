import React from 'react';
import { Article } from '../../../components/PageblockV2/types';
import { BlockConfig } from '../components/StyleConfigModal';
import { defaultClasses } from '../../../components/PageblockV2/constants/defaultClasses';
import { generateArticleUrl } from '../../../components/PageblockV2/utils/generateArticleUrl';
import { formatDistanceToNow } from 'date-fns';
import { DisplayConfig } from './StyleConfigModal/MediaConfig';
import { useClientTheme } from '../hooks/useClientTheme';
import { ClientTheme } from '../types';

// Definindo a interface ThemeConfig localmente para evitar problemas de importação
interface ThemeConfig {
  columnStyle: {
    background: string;
    padding: string;
  };
  headingProps: {
    fontSize: string;
    fontWeight: string;
    color: string;
  };
  subtitleProps: {
    fontSize: string;
    color: string;
  };
}

interface ExtendedBlockConfig extends Omit<BlockConfig, 'mediaConfig'> {
  styles: {
    theme: {
      light: ThemeConfig;
      dark: ThemeConfig;
    }
    showExcerpt: boolean
    showMetadata: boolean
    titleSize: string
    columnStyle: Record<string, any>
    imageHeight: string
    timelineStyle?: 'solid' | 'dashed' | 'dotted'
    markerStyle?: MarkerStyle
    hoverEffect?: HoverEffect
    dividerStyle?: DividerStyle
    thumbnailShape?: ThumbnailShape
    layout?: 'single' | 'grid'
    gridGap?: string
  }
  variant?: 'chronological' | 'compact' | 'card'
  mediaConfig?: {
    displayConfig?: DisplayConfig;
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

interface ListLayoutPreviewProps {
  blockConfig: ExtendedBlockConfig;
  columns?: Article[][];
  articles?: Article[];
  variant?: 'chronological' | 'compact' | 'card';
  isDarkTheme?: boolean;
  clientGeneralSettingsData: ClientTheme;
}

type HoverEffect = 'highlight' | 'scale' | 'background' | 'translate' | 'none';
type MarkerStyle = 'circle' | 'square' | 'diamond';
type DividerStyle = 'solid' | 'dashed' | 'dotted';
type ThumbnailShape = 'square' | 'rounded' | 'circle';

const ListLayoutPreview = ({ 
  blockConfig, 
  columns = [], 
  articles = [], 
  variant = 'chronological',
  isDarkTheme = false,
  clientGeneralSettingsData
}: ListLayoutPreviewProps) => {
  const theme = useClientTheme({ clientGeneralSettingsData, isDarkTheme });
  
  // Configurações globais de exibição
  const globalDisplayConfig = blockConfig.mediaConfig?.displayConfig || {
    showImage: true,
    showSubtitle: true,
    showPublishDate: true,
    showAuthor: false,
    showCategory: false
  };

  // Função para obter configurações específicas de uma coluna
  const getColumnDisplayConfig = (columnId: string): DisplayConfig => {
    const columnConfig = globalDisplayConfig.columnConfig?.[columnId];
    
    if (!columnConfig) {
      return globalDisplayConfig;
    }
    
    return {
      showImage: columnConfig.showImage ?? globalDisplayConfig.showImage,
      showSubtitle: columnConfig.showSubtitle ?? globalDisplayConfig.showSubtitle,
      showPublishDate: columnConfig.showPublishDate ?? globalDisplayConfig.showPublishDate,
      showAuthor: columnConfig.showAuthor ?? globalDisplayConfig.showAuthor,
      showCategory: columnConfig.showCategory ?? globalDisplayConfig.showCategory
    };
  };

  // Preparar os dados de artigos para compatibilidade
  const articlesData = columns.length > 0 ? columns : articles.length > 0 ? [articles] : [[]];

  console.log('ListLayoutPreview:', { variant, itemsLength: articlesData[0]?.length, articlesData });

  // Move renderSkeleton inside the component
  const renderSkeleton = (type: 'timeline' | 'compact' | 'card') => {
    const isGridLayout = type === 'card' && blockConfig.styles.layout === 'grid';
    
    if (type === 'timeline') {
      return Array(5).fill(0).map((_, index) => (
        <div key={index} className="flex items-start gap-4 py-4">
          <div className="w-3 h-3 rounded-full bg-gray-700/50 dark:bg-gray-200/50 mt-2" />
          <div className="flex-1">
            <div className="flex gap-2 mb-2">
              <div className="w-24 h-4 bg-gray-700/50 dark:bg-gray-200/50 rounded animate-pulse" />
              <div className="w-16 h-4 bg-gray-700/50 dark:bg-gray-200/50 rounded animate-pulse" />
            </div>
            <div className="w-3/4 h-6 bg-gray-700/50 dark:bg-gray-200/50 rounded animate-pulse" />
            <div className="w-1/2 h-4 bg-gray-700/50 dark:bg-gray-200/50 rounded animate-pulse mt-2" />
          </div>
        </div>
      ));
    } else if (type === 'compact') {
      return Array(5).fill(0).map((_, index) => (
        <div key={index} className="py-3 border-b border-gray-700/50 dark:border-gray-200/50">
          <div className="w-3/4 h-5 bg-gray-700/50 dark:bg-gray-200/50 rounded animate-pulse" />
          <div className="w-1/2 h-4 bg-gray-700/50 dark:bg-gray-200/50 rounded animate-pulse mt-2" />
        </div>
      ));
    } else {
      // Card skeleton - update for grid support
      return (
        <div className={`${isGridLayout ? 'grid grid-cols-2 gap-4' : 'space-y-4'}`}>
          {Array.from({ length: 4 }).map((_, i) => (
            <div 
              key={i}
              className={`
                flex gap-4 p-4 animate-pulse
                ${!isGridLayout && i !== 3 ? 'border-b border-gray-200 dark:border-gray-700 pb-4' : ''}
                ${isGridLayout ? 'h-full' : ''}
              `}
            >
              <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded flex-shrink-0"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
              </div>
            </div>
          ))}
        </div>
      );
    }
  };

  // Funções auxiliares
  const getMarkerShape = (markerStyle?: MarkerStyle) => {
    switch (markerStyle) {
      case 'circle':
        return 'rounded-full';
      case 'square':
        return 'rounded-none';
      case 'diamond':
        return 'rotate-45';
      default:
        return 'rounded-full';
    }
  };

  const getTitleSizeClass = (titleSize?: string) => {
    switch (titleSize) {
      case 'sm':
        return 'text-sm';
      case 'md':
        return 'text-base';
      case 'lg':
        return 'text-lg';
      case 'xl':
        return 'text-xl';
      default:
        return 'text-base';
    }
  };

  const getBorderStyle = (dividerStyle?: DividerStyle) => {
    switch (dividerStyle) {
      case 'solid':
        return 'border-b border-gray-200 dark:border-gray-700';
      case 'dashed':
        return 'border-b border-dashed border-gray-200 dark:border-gray-700';
      case 'dotted':
        return 'border-b border-dotted border-gray-200 dark:border-gray-700';
      default:
        return 'border-b border-gray-200 dark:border-gray-700';
    }
  };

  const getHoverEffectClass = (hoverEffect?: HoverEffect) => {
    switch (hoverEffect) {
      case 'highlight':
        return 'hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors';
      case 'scale':
        return 'hover:scale-[1.02] transition-transform';
      case 'background':
        return 'hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors';
      case 'translate':
        return 'hover:translate-x-2 transition-transform';
      default:
        return '';
    }
  };

  const getThumbnailShape = (thumbnailShape?: ThumbnailShape) => {
    switch (thumbnailShape) {
      case 'square':
        return 'rounded-none';
      case 'rounded':
        return 'rounded-lg';
      case 'circle':
        return 'rounded-full';
      default:
        return 'rounded-lg';
    }
  };

  const renderChronologicalList = () => {
    const articles = articlesData[0] || [];
    const displayConfig = getColumnDisplayConfig('col-0');
    
    if (articles.length === 0) {
      return renderSkeleton('timeline');
    }

    return (
      <div className="space-y-2">
        {articles.map((article, index) => (
          <div key={index} className="flex items-start gap-4 py-4">
            {/* Timeline marker */}
            <div 
              className={`
                w-3 h-3 mt-2 shrink-0
                ${getMarkerShape(blockConfig.styles.markerStyle)}
                ${isDarkTheme ? 'bg-gray-200' : 'bg-gray-700'}
              `}
            />
            
            <div className="flex-1">
              {/* Date */}
              {displayConfig.showPublishDate && blockConfig.styles.showMetadata && article.created_at && (
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  {formatDistanceToNow(new Date(article.created_at), { addSuffix: true })}
                </div>
              )}
              
              {/* Title */}
              <h3 
                className={`font-semibold mb-1 ${getTitleSizeClass(blockConfig.styles.titleSize)}`}
                style={{
                  fontFamily: theme.title.fontFamily,
                  color: theme.title.color,
                }}
              >
                {article.title}
              </h3>
              
              {/* Excerpt */}
              {displayConfig.showSubtitle && blockConfig.styles.showExcerpt && article.subtitle && (
                <p 
                  className="text-sm line-clamp-2"
                  style={{
                    fontFamily: theme.subtitle.fontFamily,
                    color: theme.subtitle.color,
                  }}
                >
                  {article.subtitle}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderCompactList = () => {
    const articles = articlesData[0] || [];
    const displayConfig = getColumnDisplayConfig('col-0');
    
    if (articles.length === 0) {
      return renderSkeleton('compact');
    }

    return (
      <div className="space-y-0">
        {articles.map((article, index) => (
          <div 
            key={index}
            className={`
              py-3 
              ${index !== articles.length - 1 ? getBorderStyle(blockConfig.styles.dividerStyle) : ''}
              ${getHoverEffectClass(blockConfig.styles.hoverEffect)}
            `}
          >
            {/* Title */}
            <h3 
              className={`font-semibold mb-1 ${getTitleSizeClass(blockConfig.styles.titleSize)}`}
              style={{
                fontFamily: theme.title.fontFamily,
                color: theme.title.color,
              }}
            >
              {article.title}
            </h3>
            
            {/* Excerpt */}
            {displayConfig.showSubtitle && blockConfig.styles.showExcerpt && article.subtitle && (
              <p 
                className="text-sm line-clamp-2"
                style={{
                  fontFamily: theme.subtitle.fontFamily,
                  color: theme.subtitle.color,
                }}
              >
                {article.subtitle}
              </p>
            )}
            
            {/* Date */}
            {displayConfig.showPublishDate && blockConfig.styles.showMetadata && article.created_at && (
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {formatDistanceToNow(new Date(article.created_at), { addSuffix: true })}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderCardList = () => {
    const articles = articlesData[0] || [];
    const displayConfig = getColumnDisplayConfig('col-0');
    
    if (articles.length === 0) {
      return renderSkeleton('card');
    }

    const isGridLayout = blockConfig.styles.layout === 'grid';

    return (
      <div 
        className={`
          ${isGridLayout ? 'grid grid-cols-2 gap-4' : 'space-y-4'}
        `}
      >
        {articles.map((article, index) => (
          <div 
            key={index}
            className={`
              flex gap-4 py-4
              ${!isGridLayout && index !== articles.length - 1 ? getBorderStyle(blockConfig.styles.dividerStyle) : ''}
              ${getHoverEffectClass(blockConfig.styles.hoverEffect)}
              ${isGridLayout ? 'h-full' : ''}
            `}
          >
            {/* Thumbnail */}
            {displayConfig.showImage && article.content?.image?.desktop_image_path && (
              <div 
                className={`
                  ${isGridLayout ? 'w-32 h-32' : 'w-24 h-24'} 
                  shrink-0 overflow-hidden
                  ${getThumbnailShape(blockConfig.styles.thumbnailShape)}
                `}
              >
                <img
                  src={article.content.image.desktop_image_path}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <div className="flex-1 min-w-0">
              {/* Title */}
              <h3 
                className={`
                  font-semibold mb-1 
                  ${getTitleSizeClass(blockConfig.styles.titleSize)}
                  ${isGridLayout ? 'text-lg' : ''}
                `}
                style={{
                  fontFamily: theme.title.fontFamily,
                  color: theme.title.color,
                }}
              >
                {article.title}
              </h3>
              
              {/* Excerpt */}
              {displayConfig.showSubtitle && blockConfig.styles.showExcerpt && article.subtitle && (
                <p 
                  className={`
                    text-sm 
                    ${isGridLayout ? 'line-clamp-3' : 'line-clamp-2'}
                  `}
                  style={{
                    fontFamily: theme.subtitle.fontFamily,
                    color: theme.subtitle.color,
                  }}
                >
                  {article.subtitle}
                </p>
              )}
              
              {/* Date */}
              {displayConfig.showPublishDate && blockConfig.styles.showMetadata && article.created_at && (
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {formatDistanceToNow(new Date(article.created_at), { addSuffix: true })}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  switch (variant) {
    case 'chronological':
      return renderChronologicalList();
    case 'compact':
      return renderCompactList();
    case 'card':
      return renderCardList();
    default:
      return null;
  }
};

export default ListLayoutPreview; 