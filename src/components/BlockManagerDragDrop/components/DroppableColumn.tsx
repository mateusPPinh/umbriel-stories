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
  width: string;
  style?: React.CSSProperties;
  headingProps?: {
    fontSize?: string;
    fontWeight?: string;
    color?: string;
  };
  subtitleProps?: {
    fontSize?: string;
    color?: string;
  };
  showExcerpt?: boolean;
  isNewsGrid?: boolean;
  isFeatured?: boolean;
  isSidebarMain?: boolean;
  isSidebarSide?: boolean;
  isNewsFeedMain?: boolean;
  isNewsFeedSide?: boolean;
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
  isNewsGrid = false,
  isFeatured = false,
  isSidebarMain = false,
  isSidebarSide = false,
  isNewsFeedMain = false,
  isNewsFeedSide = false
}) => {
  const isFull = articles.length >= maxItems;

  // Helper function to determine the appropriate class for the droppable area
  const getDroppableAreaClass = () => {
    if (isNewsGrid) {
      return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4';
    }
    if (isFeatured) {
      return 'space-y-4';
    }
    if (isSidebarMain) {
      return 'grid grid-cols-1 md:grid-cols-2 gap-4';
    }
    if (isSidebarSide) {
      return 'space-y-4';
    }
    if (isNewsFeedMain || isNewsFeedSide) {
      return 'space-y-4';
    }
    return 'space-y-4';
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
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {articles.length}/{maxItems}
        </span>
      </div>

      {/* Área de drop */}
      <Droppable droppableId={droppableId}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`
              min-h-[220px] rounded-lg border-2 p-4
              ${snapshot.isDraggingOver
                ? isDarkTheme
                  ? 'border-blue-500 bg-gray-700'
                  : 'border-blue-500 bg-blue-50'
                : isDarkTheme
                ? 'border-gray-700 bg-gray-800'
                : 'border-gray-200 bg-gray-50'
              }
              ${getDroppableAreaClass()}
            `}
            style={{ minHeight: articles.length === 0 ? '220px' : 'auto' }}
          >
            {articles.length === 0 && (
              <div className={`
                flex items-center justify-center h-full min-h-[180px] text-sm
                ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}
                ${isNewsGrid ? 'col-span-full' : ''}
              `}>
                Arraste artigos para esta coluna
              </div>
            )}
            
            {articles.map((article, index) => (
              <DraggableArticle
                key={article.id}
                article={article}
                index={index}
                isDarkTheme={isDarkTheme}
                isInColumn={true}
                columnIsFull={isFull}
                subtitleProps={subtitleProps}
                showExcerpt={showExcerpt}
                isNewsGrid={isNewsGrid}
                isFeatured={isFeatured}
                isSidebarMain={isSidebarMain}
                isSidebarSide={isSidebarSide}
                isNewsFeedMain={isNewsFeedMain}
                isNewsFeedSide={isNewsFeedSide}
              />
            ))}
            {provided.placeholder}
            {isFull && articles.length > 0 && (
              <div
                className={`
                  mt-2 rounded-md p-2 text-center text-sm
                  ${isDarkTheme ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}
                  ${isNewsGrid ? 'col-span-full' : ''}
                `}
              >
                Maximum of {maxItems} articles reached
              </div>
            )}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default DroppableColumn; 