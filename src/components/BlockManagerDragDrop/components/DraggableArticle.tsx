import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { Article } from '../../PageblockV2/types';

interface DraggableArticleProps {
  article: Article;
  index: number;
  isDarkTheme?: boolean;
  onRemove?: (articleId: string | number) => void;
  variant?: string;
  isCompact?: boolean;
  isSelected?: boolean;
  onSelect?: (articleId: string | number) => void;
  isSelectionEnabled?: boolean;
}

const DraggableArticle = ({
  article,
  index,
  isDarkTheme = false,
  onRemove,
  variant = 'standard',
  isCompact = false,
  isSelected = false,
  onSelect,
  isSelectionEnabled = true
}: DraggableArticleProps) => {
  const handleClick = (e: React.MouseEvent) => {
    if (!isSelectionEnabled) return;
    
    // Se pressionou Ctrl/Cmd, permite seleção
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      onSelect?.(article.id);
    }
  };

  return (
    <Draggable draggableId={`article-${article.id}`} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={handleClick}
          className={`
            relative rounded-lg overflow-hidden transition-all duration-200 ease-in-out
            border cursor-grab active:cursor-grabbing
            ${snapshot.isDragging 
              ? 'shadow-2xl z-20 scale-[1.02] rotate-1' 
              : 'shadow-sm hover:shadow-md'
            }
            ${isDarkTheme 
              ? 'bg-gray-700 border-gray-600 hover:bg-gray-650' 
              : 'bg-white border-gray-200 hover:bg-gray-50'
            }
            ${isCompact ? 'p-3' : 'p-4'}
            ${snapshot.isDragging 
              ? (isDarkTheme ? 'bg-gray-600' : 'bg-blue-50 border-blue-100') 
              : ''
            }
            ${isSelected 
              ? (isDarkTheme ? 'bg-blue-900/30 border-blue-500' : 'bg-blue-50 border-blue-200')
              : ''
            }
          `}
        >
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 mr-2">
              <div className={`
                w-1.5 h-12 rounded-full opacity-30
                ${isDarkTheme ? 'bg-gray-400' : 'bg-gray-400'}
                ${snapshot.isDragging ? 'opacity-50' : 'group-hover:opacity-40'}
              `}/>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className={`font-medium truncate text-sm leading-5 ${isDarkTheme ? 'text-gray-100' : 'text-gray-900'}`}>
                {article.title}
              </h4>
              {!isCompact && article.excerpt && (
                <p className={`text-xs truncate mt-1.5 ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>
                  {article.excerpt}
                </p>
              )}
            </div>
            {/* Indicador de seleção */}
            {isSelected && (
              <div className="absolute top-2 right-2">
                <div className={`
                  w-4 h-4 rounded-full border-2
                  ${isDarkTheme ? 'border-blue-400 bg-blue-600' : 'border-blue-500 bg-blue-600'}
                `}>
                  <svg 
                    className="w-3 h-3 text-white" 
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            )}
            {/* Botão de remover */}
            {onRemove && !isSelected && (
              <button
                onClick={() => onRemove(article.id)}
                className={`
                  shrink-0 p-1.5 rounded-full transition-colors duration-150
                  hover:bg-gray-100 dark:hover:bg-gray-600 
                  ${isDarkTheme ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'}
                `}
                title="Remover artigo"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default DraggableArticle;
