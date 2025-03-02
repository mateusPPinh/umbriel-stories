import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
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
  isMagazineMain?: boolean;
  isMagazineSecondary?: boolean;
  isMagazineTertiary?: boolean;
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
  isMagazineMain = false,
  isMagazineSecondary = false,
  isMagazineTertiary = false,
  onRemoveArticle
}) => {
  const isFull = articles.length >= maxItems;

  // Helper function to determine the appropriate class for the droppable area
  const getDroppableAreaClass = () => {
    let baseClasses = `min-h-[100px] p-3 rounded-md transition-colors duration-200 ${
      isDarkTheme 
        ? 'bg-gray-800 border-gray-700' 
        : 'bg-white border-gray-200'
    }`;

    if (isMasonry) {
      return `${baseClasses} columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4`;
    }

    if (isFeatured) {
      return baseClasses;
    }

    if (isSidebarMain || isSidebarSide) {
      return baseClasses;
    }

    if (isNewsFeedMain || isNewsFeedSide) {
      return baseClasses;
    }

    if (isChronological) {
      return `${baseClasses} space-y-4`;
    }

    if (isCompact) {
      return `${baseClasses} space-y-2`;
    }

    if (isCard) {
      return `${baseClasses} grid grid-cols-1 sm:grid-cols-2 gap-4`;
    }

    return `${baseClasses} space-y-4`;
  };

  const handleRemoveArticle = (articleId: string | number) => {
    if (onRemoveArticle) {
      onRemoveArticle(droppableId, articleId);
    }
  };

  const renderSkeleton = () => {
    // Magazine Layout
    if (isMagazineMain) {
      return (
        <article className="flex flex-col">
          <div className="aspect-[16/9] bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse mb-4" />
          <div className="p-4">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-3" />
            <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          </div>
        </article>
      );
    }

    if (isMagazineSecondary || isMagazineTertiary) {
      return (
        <div className="space-y-6">
          {[...Array(isMagazineSecondary ? 3 : 4)].map((_, i) => (
            <article key={i} className="flex flex-col">
              <div className="aspect-[4/3] bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse mb-4" />
              <div className="p-4">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2" />
                <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              </div>
            </article>
          ))}
        </div>
      );
    }

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
    <div className={`${width || 'w-full'} mb-4`} style={style}>
      <div className="flex justify-between items-center mb-2">
        <h3 
          style={{
            fontSize: headingProps?.fontSize || '1rem',
            fontWeight: headingProps?.fontWeight || '600',
            color: headingProps?.color || 'inherit'
          }}
          className="font-medium"
        >
          {title}
        </h3>
        <span 
          className={`text-xs px-2 py-0.5 rounded-full ${
            isDarkTheme ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
          }`}
        >
          {articles.length}/{maxItems}
        </span>
      </div>

      <Droppable droppableId={droppableId}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`${getDroppableAreaClass()} ${
              snapshot.isDraggingOver 
                ? isDarkTheme ? 'bg-blue-900/20' : 'bg-blue-50' 
                : ''
            } border`}
            style={{ overflow: 'visible' }}
          >
            {articles.length > 0 ? (
              <>
                {articles.map((article, index) => (
                  <DraggableArticle
                    key={article.id}
                    article={article}
                    index={index}
                    isDarkTheme={isDarkTheme}
                    isMasonry={isMasonry}
                    showExcerpt={showExcerpt}
                    subtitleProps={subtitleProps}
                    onRemove={() => handleRemoveArticle(article.id)}
                  />
                ))}
              </>
            ) : (
              <div className={`flex flex-col items-center justify-center py-6 ${
                isDarkTheme ? 'text-gray-400' : 'text-gray-500'
              }`}>
                <svg className="w-8 h-8 mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                </svg>
                <p className="text-sm">Arraste artigos para esta coluna</p>
              </div>
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default DroppableColumn; 