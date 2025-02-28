import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { Article } from '../../PageblockV2/types';
import DraggableArticle from './DraggableArticle';

interface DroppableColumnProps {
  id: string;
  title: string;
  articles: Article[];
  maxItems: number;
  isDarkTheme?: boolean;
  width: string;
}

const DroppableColumn: React.FC<DroppableColumnProps> = ({
  id,
  title,
  articles,
  maxItems,
  isDarkTheme,
  width
}) => {
  const isFull = articles.length >= maxItems;
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div 
      className={`${width} p-2`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <h3 className={`text-lg font-medium ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
            {title}
          </h3>
          {/* Tooltip com informações da coluna */}
          {isHovered && (
            <div className={`
              px-2 py-1 rounded text-xs
              ${isDarkTheme ? 'bg-gray-800 text-gray-300' : 'bg-gray-700 text-gray-100'}
            `}>
              Máximo: {maxItems} artigos
            </div>
          )}
        </div>
        <span className={`
          text-sm font-medium transition-colors duration-200
          ${isFull ? 'text-red-500 dark:text-red-400' : 'text-gray-500 dark:text-gray-400'}
          ${articles.length === 0 ? 'animate-pulse' : ''}
        `}>
          {articles.length}/{maxItems}
        </span>
      </div>

      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`
              relative p-4 rounded-lg min-h-[200px]
              transition-all duration-300
              ${isFull ? 'bg-red-50 dark:bg-red-900/10' : 'bg-gray-100 dark:bg-gray-800'}
              ${snapshot.isDraggingOver && !isFull ? 'bg-blue-50 dark:bg-blue-900/10 scale-[1.02] ring-2 ring-blue-500' : ''}
              ${isFull ? 'border-2 border-red-200 dark:border-red-800' : 'border-2 border-transparent'}
            `}
          >
            {/* Drop Indicator */}
            {snapshot.isDraggingOver && !isFull && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className={`
                  w-full h-full rounded-lg
                  border-2 border-dashed
                  ${isDarkTheme ? 'border-blue-400/50' : 'border-blue-500/50'}
                  animate-pulse
                `} />
              </div>
            )}

            {/* Empty State */}
            {articles.length === 0 && !snapshot.isDraggingOver && (
              <div className={`
                absolute inset-0 flex items-center justify-center
                text-sm ${isDarkTheme ? 'text-gray-500' : 'text-gray-400'}
                pointer-events-none
              `}>
                <div className="flex flex-col items-center gap-2">
                  <svg
                    className="w-6 h-6 opacity-50"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  <span>Arraste artigos para aqui</span>
                </div>
              </div>
            )}

            {/* Full Column Warning */}
            {isFull && (
              <div className={`
                absolute -top-1 left-1/2 transform -translate-x-1/2 -translate-y-full
                px-2 py-1 rounded-full text-xs font-medium bg-red-500 text-white
                ${snapshot.isDraggingOver ? 'animate-bounce' : ''}
              `}>
                Limite atingido
              </div>
            )}

            {/* Articles */}
            <div className={`
              space-y-2 relative z-10
              ${snapshot.isDraggingOver ? 'opacity-75' : 'opacity-100'}
              transition-opacity duration-200
            `}>
              {articles.map((article, index) => (
                <DraggableArticle
                  key={article.id}
                  article={article}
                  index={index}
                  isDarkTheme={isDarkTheme}
                  isInColumn
                  columnIsFull={isFull}
                />
              ))}
            </div>

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default DroppableColumn; 