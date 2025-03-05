import React, { useMemo, useCallback, useState } from 'react';
import { Droppable } from '@hello-pangea/dnd';
import { Article } from '../../PageblockV2/types';
import { BlockConfig } from './StyleConfigModal';
import DraggableArticle from './DraggableArticle';

export interface DroppableColumnProps {
  columnId: string;
  articles: Article[];
  maxItems: number;
  isDarkTheme?: boolean;
  label?: string;
  blockConfig: BlockConfig;
  handleRemoveArticle?: (columnId: string, articleId: string | number) => void;
  handleRemoveArticles?: (columnId: string, articleIds: (string | number)[]) => void;
  variant?: string;
  useCompactView?: boolean;
}

// Performance styles para animações
const performanceStyles = {
  draggable: {
    // Hardware acceleration para animações
    transform: 'translate3d(0, 0, 0)',
    willChange: 'transform',
    transition: 'transform 0.2s ease',
  },
  dropPlaceholder: {
    transition: 'background-color 0.2s ease, min-height 0.2s ease',
  }
};

const DroppableColumn = ({
  columnId,
  articles,
  maxItems,
  isDarkTheme = false,
  label,
  blockConfig,
  handleRemoveArticle,
  handleRemoveArticles,
  variant = 'standard',
  useCompactView = false
}: DroppableColumnProps) => {
  const [selectedArticleIds, setSelectedArticleIds] = useState<(string | number)[]>([]);
  const isAtLimit = articles.length >= maxItems;

  const handleArticleSelect = useCallback((articleId: string | number) => {
    setSelectedArticleIds(prev => {
      const newSelection = prev.includes(articleId)
        ? prev.filter(id => id !== articleId)
        : [...prev, articleId];
      return newSelection;
    });
  }, []);

  const handleRemoveSelected = useCallback(() => {
    if (handleRemoveArticles) {
      handleRemoveArticles(columnId, selectedArticleIds);
    } else if (handleRemoveArticle) {
      // Fallback para o método antigo se handleRemoveArticles não estiver disponível
      selectedArticleIds.forEach(articleId => {
        handleRemoveArticle(columnId, articleId);
      });
    }
    
    // Limpa a seleção
    setSelectedArticleIds([]);
  }, [columnId, handleRemoveArticle, handleRemoveArticles, selectedArticleIds]);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-3 px-2">
        <h3 className={`text-sm font-medium ${isDarkTheme ? 'text-gray-200' : 'text-gray-700'}`}>
          {label}
        </h3>
        <div className="flex items-center gap-2">
          {selectedArticleIds.length > 0 && (
            <button
              onClick={handleRemoveSelected}
              className={`
                inline-flex items-center px-2 py-1 text-xs font-medium rounded
                ${isDarkTheme 
                  ? 'bg-red-900/30 text-red-300 hover:bg-red-900/50' 
                  : 'bg-red-100 text-red-700 hover:bg-red-200'
                }
                transition-colors duration-150
              `}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-3 w-3 mr-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                />
              </svg>
              Remover {selectedArticleIds.length} selecionado(s)
            </button>
          )}
          <span className={`text-xs flex items-center gap-2 ${
            isAtLimit 
              ? isDarkTheme ? 'text-red-300' : 'text-red-500'
              : isDarkTheme ? 'text-gray-400' : 'text-gray-500'
          }`}>
            {articles.length}/{maxItems} artigos
            {isAtLimit && (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                Limite atingido
              </span>
            )}
          </span>
        </div>
      </div>

      <Droppable droppableId={columnId} isDropDisabled={isAtLimit}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`
              rounded-lg min-h-[200px] transition-all duration-200
              ${snapshot.isDraggingOver 
                ? isDarkTheme 
                  ? 'bg-gray-700 border-2 border-dashed border-gray-600' 
                  : 'bg-gray-100 border-2 border-dashed border-gray-300'
                : isDarkTheme 
                  ? 'bg-gray-800' 
                  : 'bg-gray-50'
              }
              ${isAtLimit 
                ? isDarkTheme
                  ? 'opacity-75 cursor-not-allowed border border-red-800'
                  : 'opacity-75 cursor-not-allowed border border-red-200'
                : ''
              }
              ${articles.length === 0 ? 'flex items-center justify-center' : 'p-2'}
            `}
          >
            {articles.length > 0 ? (
              <div className="space-y-2">
                {articles.map((article, index) => (
                  <DraggableArticle
                    key={article.id}
                    article={article}
                    index={index}
                    isDarkTheme={isDarkTheme}
                    onRemove={handleRemoveArticle ? (articleId) => handleRemoveArticle(columnId, articleId) : undefined}
                    variant={variant}
                    isCompact={useCompactView}
                    isSelected={selectedArticleIds.includes(article.id)}
                    onSelect={handleArticleSelect}
                    isSelectionEnabled={true}
                  />
                ))}
              </div>
            ) : (
              <div className={`text-center p-4 ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>
                <svg 
                  className="mx-auto h-12 w-12 mb-2 opacity-50" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                <p className="text-sm font-medium mb-1">Área para artigos</p>
                <p className="text-xs">Arraste artigos para esta coluna</p>
              </div>
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

// Optimizando o componente para evitar re-renders desnecessários
export default React.memo(DroppableColumn); 