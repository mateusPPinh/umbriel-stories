import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { Article } from '../../PageblockV2/types';
import DraggableArticle from './DraggableArticle';

interface DroppableColumnProps {
  id: string;
  droppableId: string;
  title: string;
  articles: Article[];
  maxItems: number;
  isDarkTheme?: boolean;
  width?: string;
  style?: React.CSSProperties;
  headingProps?: {
    fontSize: string;
    fontWeight: string;
    color: string;
  };
  subtitleProps?: {
    fontSize: string;
    color: string;
  };
  showExcerpt?: boolean;
  isMasonry?: boolean;
  isNewsGrid?: boolean;
  isFeatured?: boolean;
  isSidebarMain?: boolean;
  isSidebarSide?: boolean;
  isNewsFeedMain?: boolean;
  isNewsFeedSide?: boolean;
  isChronological?: boolean;
  isCompact?: boolean;
  isCard?: boolean;
  onRemoveArticle?: (columnId: string, articleId: string | number) => void;
}

const DroppableColumn: React.FC<DroppableColumnProps> = ({
  id,
  droppableId,
  title,
  articles,
  maxItems,
  isDarkTheme,
  width,
  style,
  headingProps,
  subtitleProps,
  showExcerpt,
  isMasonry = false,
  isNewsGrid = false,
  isFeatured = false,
  isSidebarMain = false,
  isSidebarSide = false,
  isNewsFeedMain = false,
  isNewsFeedSide = false,
  isChronological = false,
  isCompact = false,
  isCard = false,
  onRemoveArticle
}) => {
  const isFull = articles.length >= maxItems;

  // Helper function to determine the appropriate class for the droppable area
  const getDroppableAreaClass = () => {
    if (isNewsGrid) {
      return 'grid grid-cols-1 md:grid-cols-2 gap-4';
    }
    if (isFeatured) {
      // Para o artigo principal do Showcase, usamos um layout de coluna única
      return 'flex flex-col';
    }
    if (isSidebarMain) {
      return 'grid grid-cols-1 gap-4';
    }
    if (isSidebarSide) {
      return 'space-y-4';
    }
    if (isNewsFeedMain || isNewsFeedSide) {
      return 'space-y-4';
    }
    if (isMasonry) {
      // Match the column count and gap from the real implementation
      const columnCount = 3; // Default from the real implementation
      const gap = '24px'; // Default from the real implementation
      return `columns-1 md:columns-2 lg:columns-${columnCount} gap-x-[${gap}] space-y-0`;
    }
    return 'space-y-4';
  };

  const handleRemoveArticle = (articleId: string | number) => {
    if (onRemoveArticle) {
      onRemoveArticle(droppableId, articleId);
    }
  };

  const renderSkeleton = () => {
    // List variants
    if (isChronological) {
      return (
        <div className="relative space-y-6 pl-6">
          <div className="absolute left-[11px] top-0 bottom-0 w-[2px] bg-gray-200 dark:bg-gray-700" />
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
      );
    }

    if (isCompact) {
      return (
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {Array(5).fill(0).map((_, index) => (
            <div key={index} className="py-3 border-b border-gray-700/50 dark:border-gray-200/50">
              <div className="w-3/4 h-5 bg-gray-700/50 dark:bg-gray-200/50 rounded animate-pulse" />
              <div className="w-1/2 h-4 bg-gray-700/50 dark:bg-gray-200/50 rounded animate-pulse mt-2" />
            </div>
          ))}
        </div>
      );
    }

    if (isCard) {
      return (
        <div className="space-y-4">
          {Array(5).fill(0).map((_, index) => (
            <div key={index} className="flex gap-4 py-4">
              <div className="w-24 h-24 bg-gray-700/50 dark:bg-gray-200/50 rounded animate-pulse shrink-0" />
              <div className="flex-1">
                <div className="w-3/4 h-5 bg-gray-700/50 dark:bg-gray-200/50 rounded animate-pulse" />
                <div className="w-1/2 h-4 bg-gray-700/50 dark:bg-gray-200/50 rounded animate-pulse mt-2" />
              </div>
            </div>
          ))}
        </div>
      );
    }

    // Mixed Layout - Sidebar
    if (isSidebarMain) {
      return (
        <div className="grid grid-cols-1 gap-4">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex flex-col">
              <div className="relative aspect-[16/9] overflow-hidden mb-2">
                <div className={`w-full h-full bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse`} />
              </div>
              <div className="p-4">
                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2" />
                <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      );
    }
    
    if (isSidebarSide) {
      return (
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse flex-shrink-0" />
              <div className="flex-1">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2" />
                <div className="h-3 w-2/3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      );
    }
    
    // Mixed Layout - Showcase, Newspaper, VideoGrid
    if (isNewsGrid) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex flex-col">
              <div className="relative aspect-[16/10] overflow-hidden mb-2">
                <div className={`w-full h-full bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse`} />
              </div>
              <div className="p-4">
                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2" />
                <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      );
    }
    
    // Featured Grid (usado para o artigo principal do Showcase)
    if (isFeatured) {
      return (
        <div className="flex flex-col">
          <div className="relative aspect-[16/9] overflow-hidden mb-4">
            <div className={`w-full h-full bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse`} />
          </div>
          <div className="p-4">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-3" />
            <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2" />
            <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          </div>
        </div>
      );
    }

    if (isNewsFeedMain || isNewsFeedSide) {
      return (
        <div className="flex flex-col gap-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <div className="w-full h-32 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
          <div className="w-3/4 h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="w-1/2 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        </div>
      );
    }

    if (isMasonry) {
      return (
        <div className="columns-1 md:columns-2 lg:columns-3 gap-x-[24px]">
          {[...Array(6)].map((_, index) => (
            <article 
              key={index} 
              className="break-inside-avoid mb-6"
            >
              <div className="relative w-full overflow-hidden mb-4">
                <div 
                  className={`w-full ${['h-48', 'h-64', 'h-56'][index % 3]} bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse`}
                />
              </div>
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2" />
                <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              </div>
            </article>
          ))}
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-3 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <div className="w-full h-24 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
        <div className="w-2/3 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
      </div>
    );
  };

  return (
    <div className={`${width} mb-4`} style={style}>
      {/* Cabeçalho da coluna */}
      <div className={`
        flex items-center justify-between mb-2
        ${isDarkTheme ? 'text-white' : 'text-gray-900'}
      `}>
        <h3 
          className="font-medium"
          style={{
            fontSize: headingProps?.fontSize || '1rem',
            fontWeight: headingProps?.fontWeight || '500',
            color: headingProps?.color || (isDarkTheme ? '#F9FAFB' : '#111827')
          }}
        >
          {title}
        </h3>
        {articles.length > 0 && (
          <span className={`text-xs ${isFull ? 'text-red-500 dark:text-red-400 font-medium' : 'text-gray-500 dark:text-gray-400'}`}>
            {articles.length}/{maxItems}
          </span>
        )}
      </div>

      {/* Área de drop */}
      <Droppable droppableId={droppableId} isDropDisabled={isFull}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`
              rounded-lg border-2 p-4 h-full max-h-[400px] overflow-y-auto
              ${snapshot.isDraggingOver
                ? isDarkTheme
                  ? 'border-blue-500 bg-gray-700'
                  : 'border-blue-500 bg-blue-50'
                : isFull
                  ? isDarkTheme
                    ? 'border-red-500/30 bg-gray-800/90'
                    : 'border-red-200 bg-gray-50/90'
                  : isDarkTheme
                    ? 'border-gray-700 bg-gray-800'
                    : 'border-gray-200 bg-gray-50'
              }
              ${getDroppableAreaClass()}
              ${isFull ? 'opacity-90' : 'opacity-100'}
              transition-all duration-200
            `}
            style={{ minHeight: articles.length === 0 ? '220px' : 'auto' }}
          >
            {articles.length === 0 ? (
              renderSkeleton()
            ) : (
              articles.filter(article => article && article.id).map((article, index) => (
                <DraggableArticle
                  key={article.id}
                  article={article}
                  index={index}
                  isDarkTheme={isDarkTheme}
                  isMasonry={isMasonry}
                  subtitleProps={{
                    fontSize: subtitleProps?.fontSize || 'sm',
                    color: subtitleProps?.color || (isDarkTheme ? 'gray-300' : 'gray-600')
                  }}
                  showExcerpt={showExcerpt}
                  onRemove={handleRemoveArticle}
                />
              ))
            )}
            {provided.placeholder}
            {isFull && articles.length > 0 && (
              <div
                className={`
                  mt-2 rounded-md p-2 text-center text-sm
                  ${isDarkTheme ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}
                  ${isNewsGrid ? 'col-span-full' : ''}
                `}
              >
                Máximo de {maxItems} artigos atingido
              </div>
            )}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default DroppableColumn; 