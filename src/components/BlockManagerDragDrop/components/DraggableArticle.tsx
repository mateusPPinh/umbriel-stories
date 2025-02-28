import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Article } from '../../PageblockV2/types';

interface DraggableArticleProps {
  article: Article;
  index: number;
  isDarkTheme?: boolean;
  isInColumn?: boolean;
  columnIsFull?: boolean;
}

const DraggableArticle: React.FC<DraggableArticleProps> = ({
  article,
  index,
  isDarkTheme,
  isInColumn,
  columnIsFull
}) => {
  const [showTooltip, setShowTooltip] = React.useState(false);

  return (
    <Draggable 
      key={article.id} 
      draggableId={article.id} 
      index={index}
      isDragDisabled={columnIsFull}
    >
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`
            relative
            p-2 rounded shadow-sm flex items-center gap-2
            transition-all duration-200
            ${isInColumn ? 'mb-2' : 'w-[200px]'}
            ${snapshot.isDragging ? 'scale-105 rotate-1 ring-2 ring-blue-500 z-50' : ''}
            ${isDarkTheme ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-50'}
            ${columnIsFull ? 'opacity-50 cursor-not-allowed' : 'cursor-grab active:cursor-grabbing'}
            group
          `}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          {/* Tooltip */}
          {showTooltip && (
            <div className={`
              absolute -top-2 left-1/2 transform -translate-x-1/2 -translate-y-full
              px-2 py-1 rounded text-xs font-medium
              ${isDarkTheme ? 'bg-gray-800 text-white' : 'bg-gray-900 text-white'}
              z-50
            `}>
              {columnIsFull ? 'Coluna cheia' : 'Arraste para uma coluna'}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-inherit" />
            </div>
          )}

          {/* Drag Handle Indicator */}
          <div className={`
            absolute inset-y-0 left-0 w-1 rounded-l
            transition-colors duration-200
            ${snapshot.isDragging ? 'bg-blue-500' : 'bg-transparent group-hover:bg-gray-200 dark:group-hover:bg-gray-600'}
          `} />

          {/* Article Content */}
          <div className="flex items-center gap-2 w-full min-w-0">
            {article.content?.image?.desktop_image_path && (
              <img
                src={article.content.image.desktop_image_path}
                alt={article.title}
                className={`
                  w-10 h-10 object-cover rounded
                  transition-transform duration-200
                  ${snapshot.isDragging ? 'scale-110' : ''}
                `}
              />
            )}
            <span className={`
              text-sm truncate flex-1
              ${isDarkTheme ? 'text-white' : 'text-gray-900'}
            `}>
              {article.title}
            </span>
          </div>

          {/* Status Indicator */}
          {isInColumn && (
            <div className={`
              w-2 h-2 rounded-full shrink-0
              ${columnIsFull ? 'bg-red-500' : 'bg-green-500'}
            `} />
          )}
        </div>
      )}
    </Draggable>
  );
};

export default DraggableArticle;
