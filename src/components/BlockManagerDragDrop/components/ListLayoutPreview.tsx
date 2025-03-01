import React from 'react';
import { Article, BlockConfig } from '../../../components/PageblockV2/types';
import { defaultClasses } from '../../../components/PageblockV2/constants/defaultClasses';
import { generateArticleUrl } from '../../../components/PageblockV2/utils/generateArticleUrl';
import { formatDistanceToNow } from 'date-fns';

interface ExtendedBlockConfig extends BlockConfig {
  styles: {
    theme: {
      light: {
        columnStyle: {
          background: string
        }
        headingProps: {
          fontSize: string
          fontWeight?: number
          color: string
        }
        subtitleProps: {
          fontSize: string
          color: string
        }
      }
      dark: {
        columnStyle: {
          background: string
        }
        headingProps: {
          fontSize: string
          fontWeight?: number
          color: string
        }
        subtitleProps: {
          fontSize: string
          color: string
        }
      }
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
  }
  variant?: 'chronological' | 'compact' | 'card'
}

interface ListLayoutPreviewProps {
  blockConfig: ExtendedBlockConfig;
  columns: Article[][];
}

type HoverEffect = 'highlight' | 'scale' | 'background' | 'translate' | 'none';
type MarkerStyle = 'circle' | 'square' | 'diamond';
type DividerStyle = 'solid' | 'dashed' | 'dotted';
type ThumbnailShape = 'square' | 'rounded' | 'circle';

const renderSkeleton = (type: 'timeline' | 'compact' | 'card') => {
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
  }

  if (type === 'compact') {
    return Array(5).fill(0).map((_, index) => (
      <div key={index} className="py-3 border-b border-gray-700/50 dark:border-gray-200/50">
        <div className="w-3/4 h-5 bg-gray-700/50 dark:bg-gray-200/50 rounded animate-pulse" />
        <div className="w-1/2 h-4 bg-gray-700/50 dark:bg-gray-200/50 rounded animate-pulse mt-2" />
      </div>
    ));
  }

  // card type (previously thumbnail)
  return Array(5).fill(0).map((_, index) => (
    <div key={index} className="flex gap-4 py-4">
      <div className="w-24 h-24 bg-gray-700/50 dark:bg-gray-200/50 rounded animate-pulse shrink-0" />
      <div className="flex-1">
        <div className="w-3/4 h-5 bg-gray-700/50 dark:bg-gray-200/50 rounded animate-pulse" />
        <div className="w-1/2 h-4 bg-gray-700/50 dark:bg-gray-200/50 rounded animate-pulse mt-2" />
      </div>
    </div>
  ));
};

const renderTimelinePreview = (items: Article[], blockConfig: ExtendedBlockConfig) => {
  const timelineStyle = blockConfig.styles?.timelineStyle || 'solid';
  const markerStyle = (blockConfig.styles?.markerStyle || 'circle') as MarkerStyle;
  const hoverEffect = (blockConfig.styles?.hoverEffect || 'none') as HoverEffect;

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="relative space-y-6 pl-6">
        {/* Vertical line */}
        <div className={`absolute left-[11px] top-0 bottom-0 w-[2px] ${
          timelineStyle === 'solid' ? 'bg-gray-200 dark:bg-gray-700' :
          timelineStyle === 'dashed' ? 'bg-gray-200 dark:bg-gray-700 border-dashed' :
          'bg-gray-200 dark:bg-gray-700 border-dotted'
        }`} />
        
        {items.length > 0 ? items.map((article, index) => {
          const publishDate = article.created_at ? new Date(article.created_at) : new Date();
          const relativeTime = formatDistanceToNow(publishDate, { addSuffix: true });

          return (
            <div key={index} className="relative">
              <div className={`absolute left-[-24px] top-2 w-3 h-3 ${
                markerStyle === 'circle' ? 'rounded-full' :
                markerStyle === 'square' ? 'rounded-none' :
                'rotate-45'
              } bg-gray-900 dark:bg-white z-10`} />
              
              <a
                href={generateArticleUrl(article)}
                className={`block p-4 rounded-lg transition-all ${
                  hoverEffect === 'highlight' ? 'hover:bg-gray-100 dark:hover:bg-gray-800' :
                  hoverEffect === 'scale' ? 'hover:scale-[1.02]' :
                  hoverEffect === 'background' ? 'hover:bg-gray-50 dark:hover:bg-gray-900' :
                  hoverEffect === 'translate' ? 'hover:translate-x-2' : ''
                }`}
              >
                <div className="flex gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
                  <span>{publishDate.toLocaleDateString('pt-BR', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}</span>
                  <span>•</span>
                  <span>{relativeTime}</span>
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">{article.title}</h3>
                {article.subtitle && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{article.subtitle}</p>
                )}
              </a>
            </div>
          );
        }) : (
          <div className="space-y-6">
            {Array(5).fill(0).map((_, index) => (
              <div key={index} className="relative">
                <div className="absolute left-[-24px] top-2 w-3 h-3 rounded-full bg-gray-700/50 dark:bg-gray-200/50 z-10" />
                <div className="p-4">
                  <div className="flex gap-2 mb-2">
                    <div className="w-24 h-4 bg-gray-700/50 dark:bg-gray-200/50 rounded animate-pulse" />
                    <div className="w-16 h-4 bg-gray-700/50 dark:bg-gray-200/50 rounded animate-pulse" />
                  </div>
                  <div className="w-3/4 h-6 bg-gray-700/50 dark:bg-gray-200/50 rounded animate-pulse" />
                  <div className="w-1/2 h-4 bg-gray-700/50 dark:bg-gray-200/50 rounded animate-pulse mt-2" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const renderCompactPreview = (items: Article[], blockConfig: ExtendedBlockConfig) => {
  const dividerStyle = blockConfig.styles?.dividerStyle || 'solid';
  const hoverEffect = (blockConfig.styles?.hoverEffect || 'none') as HoverEffect;

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {items && items.length > 0 ? items.map((article, index) => (
          <a
            key={index}
            href={generateArticleUrl(article)}
            className={`block py-3 transition-all ${
              hoverEffect === 'highlight' ? 'hover:bg-gray-100 dark:hover:bg-gray-800' :
              hoverEffect === 'scale' ? 'hover:scale-[1.02]' :
              hoverEffect === 'background' ? 'hover:bg-gray-50 dark:hover:bg-gray-900' :
              hoverEffect === 'translate' ? 'hover:translate-x-2' : ''
            }`}
          >
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">{article.title}</h3>
            {article.subtitle && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{article.subtitle}</p>
            )}
          </a>
        )) : renderSkeleton('compact')}
      </div>
    </div>
  );
};

const renderCardPreview = (items: Article[], blockConfig: ExtendedBlockConfig) => {
  const shape = blockConfig.styles?.thumbnailShape || 'rounded';
  const hoverEffect = (blockConfig.styles?.hoverEffect || 'none') as HoverEffect;

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="space-y-4">
        {items && items.length > 0 ? items.map((article, index) => (
          <a
            key={index}
            href={generateArticleUrl(article)}
            className={`flex gap-4 p-4 transition-all ${
              hoverEffect === 'highlight' ? 'hover:bg-gray-100 dark:hover:bg-gray-800' :
              hoverEffect === 'scale' ? 'hover:scale-[1.02]' :
              hoverEffect === 'background' ? 'hover:bg-gray-50 dark:hover:bg-gray-900' :
              hoverEffect === 'translate' ? 'hover:translate-x-2' : ''
            }`}
          >
            <div className={`w-24 h-24 shrink-0 overflow-hidden ${
              shape === 'rounded' ? 'rounded-lg' :
              shape === 'circle' ? 'rounded-full' :
              'rounded-none'
            }`}>
              {article.content?.image?.desktop_image_path && (
                <img
                  src={article.content.image.desktop_image_path}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">{article.title}</h3>
              {article.subtitle && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{article.subtitle}</p>
              )}
            </div>
          </a>
        )) : renderSkeleton('card')}
      </div>
    </div>
  );
};

export function ListLayoutPreview({ blockConfig, columns }: ListLayoutPreviewProps) {
  // Ensure we get the first column's articles or an empty array
  const items = columns?.[0] ?? [];
  const variant = blockConfig?.variant || 'chronological';

  // Debug log to check what's being received
  console.log('ListLayoutPreview:', { variant, itemsLength: items.length, columns });

  switch (variant) {
    case 'chronological':
      return renderTimelinePreview(items, blockConfig);
    case 'compact':
      return renderCompactPreview(items, blockConfig);
    case 'card':
      return renderCardPreview(items, blockConfig);
    default:
      return null;
  }
}

export default ListLayoutPreview; 