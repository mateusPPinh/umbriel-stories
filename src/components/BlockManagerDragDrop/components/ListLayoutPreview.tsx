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
  const renderSkeleton = () => {
    const variantType = variant;
    const isGridLayout = blockConfig.styles.layout === 'grid';
    
    if (variantType === 'chronological') {
      // Timeline skeleton
      return (
        <div className={`${isGridLayout ? 'grid grid-cols-2 gap-6' : 'flex flex-col space-y-6'}`}>
          {Array.from({ length: isGridLayout ? 4 : 3 }).map((_, index) => (
            <div key={index} className="animate-pulse flex flex-col">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      );
    } else if (variantType === 'compact') {
      // Compact skeleton
      return (
        <div className={`w-full ${isGridLayout ? 'grid grid-cols-2 gap-6' : 'flex flex-col'}`}>
          {Array.from({ length: isGridLayout ? 6 : 5 }).map((_, index) => (
            <div 
              key={index} 
              className={`
                animate-pulse py-4
                ${!isGridLayout && index < 4 ? 'border-b border-gray-200 dark:border-gray-700' : ''}
                ${isGridLayout ? 'p-4 rounded-lg' : ''}
              `}
            >
              {/* Title */}
              <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3"></div>
              
              {/* Excerpt */}
              <div className="space-y-2 mt-2">
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
              </div>
              
              {/* Date */}
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mt-3"></div>
            </div>
          ))}
        </div>
      );
    } else {
      // Card skeleton
      return (
        <div className={`${isGridLayout ? 'grid grid-cols-2 gap-6' : 'flex flex-col space-y-6'}`}>
          {Array.from({ length: isGridLayout ? 4 : 3 }).map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-gray-200 dark:bg-gray-700 h-48 rounded-t"></div>
              <div className="p-4 border border-t-0 border-gray-200 dark:border-gray-700 rounded-b">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
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
    const isGridLayout = blockConfig.styles.layout === 'grid';
    
    if (articles.length === 0) {
      return renderSkeleton();
    }

    return (
      <div className={isGridLayout ? 'grid grid-cols-2 gap-4' : 'space-y-2'}>
        {articles.map((article, index) => (
          <div 
            key={index} 
            className={`
              flex items-start gap-4 py-4
              ${isGridLayout ? 'h-full' : ''}
            `}
          >
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
                className={`
                  font-semibold mb-1 
                  ${getTitleSizeClass(blockConfig.styles.titleSize)}
                  ${isGridLayout ? 'text-lg' : ''}
                `}
                style={{
                  fontFamily: theme.title.fontFamily,
                  color: theme.title.color,
fontSize: theme?.fontSize?.pageblockTitle
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
fontSize: theme?.fontSize?.pageblockSubtitle,

                    
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
    const isGridLayout = blockConfig.styles.layout === 'grid';
    
    if (articles.length === 0) {
      return renderSkeleton();
    }

    return (
      <div className={isGridLayout ? 'grid grid-cols-2 gap-4' : 'space-y-0'}>
        {articles.map((article, index) => (
          <div 
            key={index}
            className={`
              py-3 
              ${!isGridLayout && index !== articles.length - 1 ? getBorderStyle(blockConfig.styles.dividerStyle) : ''}
              ${getHoverEffectClass(blockConfig.styles.hoverEffect)}
              ${isGridLayout ? 'h-full' : ''}
            `}
          >
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
fontSize: theme?.fontSize?.pageblockTitle,

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
fontSize: theme?.fontSize?.pageblockSubtitle,

                  
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
      return renderSkeleton();
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
fontSize: theme?.fontSize?.pageblockTitle
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
fontSize: theme?.fontSize?.pageblockSubtitle,

                    
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