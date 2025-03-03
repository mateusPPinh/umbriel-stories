import React, { useMemo, useCallback, useState, useEffect, useRef } from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import ArticleCompactPreview from './ArticleCompactPreview';
import { Article } from '../../PageblockV2/types';
import { BlockConfig } from './StyleConfigModal';

export interface DroppableColumnProps {
  columnId: string;
  articles: Article[];
  isDarkTheme?: boolean;
  label?: string;
  maxItems?: number;
  blockConfig: BlockConfig;
  renderPreviewItem?: (article: Article, index: number) => React.ReactNode;
  handleRemoveArticle: (columnId: string, articleId: string | number) => void;
  variant: string;
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

const DroppableColumn: React.FC<DroppableColumnProps> = ({
  columnId,
  articles,
  isDarkTheme = false,
  label,
  maxItems = 10,
  blockConfig,
  renderPreviewItem,
  handleRemoveArticle,
  variant,
  useCompactView = false,
}) => {
  const isEmpty = articles.length === 0;
  const [stableArticles, setStableArticles] = useState(articles);
  const isDraggingRef = useRef(false);
  
  // Log para depuração
  useEffect(() => {
    console.log('DroppableColumn - columnId:', columnId);
    console.log('DroppableColumn - articles:', articles);
  }, [columnId, articles]);
  
  // Update stable articles only when not dragging
  useEffect(() => {
    if (!isDraggingRef.current) {
      setStableArticles(articles);
    }
  }, [articles]);
  
  // Track drag state from parent context
  useEffect(() => {
    const handleDragStart = () => {
      isDraggingRef.current = true;
    };
    
    const handleDragEnd = () => {
      isDraggingRef.current = false;
      // Update stable articles after drag ends
      setStableArticles(articles);
    };
    
    // Listen for drag events from the DragDropContext
    document.addEventListener('dragstart', handleDragStart);
    document.addEventListener('dragend', handleDragEnd);
    
    return () => {
      document.removeEventListener('dragstart', handleDragStart);
      document.removeEventListener('dragend', handleDragEnd);
    };
  }, [articles]);
  
  // Adicionar verificação de segurança para blockConfig
  const theme = useMemo(() => {
    return blockConfig?.styles?.theme?.[isDarkTheme ? 'dark' : 'light'] || {
      columnStyle: {
        background: isDarkTheme ? '#1a202c' : '#f7fafc',
        itemBackground: isDarkTheme ? '#2d3748' : '#ffffff',
        padding: '16px',
      },
      headingProps: {
        color: isDarkTheme ? '#ffffff' : '#1a202c',
      },
      subtitleProps: {
        color: isDarkTheme ? '#e2e8f0' : '#4a5568',
      }
    };
  }, [blockConfig, isDarkTheme]);

  // Memoize the remove article handler to prevent recreating it on each render
  const handleRemoveArticleCallback = useCallback((articleId: string | number) => {
    if (!isDraggingRef.current) {
      handleRemoveArticle(columnId, articleId);
    } else {
      console.warn('Cannot remove article during drag operation');
    }
  }, [columnId, handleRemoveArticle]);

  // Otimização para evitar cálculos desnecessários durante o drag
  const renderDraggableItems = useMemo(() => {
    return stableArticles.map((article, index) => {
      // Create a stable ID that doesn't change between renders
      const draggableId = `article-${columnId}-${article.id}`;
      
      return (
        <Draggable 
          key={draggableId} 
          draggableId={draggableId} 
          index={index}
        >
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={{
                ...provided.draggableProps.style,
                ...performanceStyles.draggable,
                opacity: snapshot.isDragging ? 0.8 : 1,
                boxShadow: snapshot.isDragging ? '0 4px 8px rgba(0,0,0,0.1)' : 'none',
              }}
            >
              {useCompactView ? (
                <ArticleCompactPreview 
                  article={article} 
                  columnId={columnId} 
                  isDarkTheme={isDarkTheme} 
                  blockConfig={blockConfig}
                  variant={variant}
                  onRemove={handleRemoveArticleCallback}
                />
              ) : renderPreviewItem ? (
                renderPreviewItem(article, index)
              ) : (
                <div className="p-3 bg-white dark:bg-gray-800 rounded-md shadow mb-2 border border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between items-center">
                    <div className="font-medium truncate">{article.title}</div>
                    <button 
                      onClick={() => handleRemoveArticleCallback(article.id)}
                      className="ml-2 text-gray-500 hover:text-red-500"
                      title="Remover artigo"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </Draggable>
      );
    });
  }, [stableArticles, columnId, isDarkTheme, blockConfig, variant, useCompactView, renderPreviewItem, handleRemoveArticleCallback]);

  return (
    <div className="flex flex-col h-full">
      <div 
        className="mb-2 font-medium px-2"
        style={{ color: theme.headingProps.color }}
      >
        {label} {maxItems > 0 && `(${articles.length}/${maxItems})`}
      </div>
      
      <Droppable droppableId={columnId}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex-1 p-2 rounded-lg transition-colors duration-200 ${
              snapshot.isDraggingOver ? 'bg-blue-50 dark:bg-blue-900/20' : ''
            }`}
            style={{
              backgroundColor: theme.columnStyle.background,
              minHeight: '100px',
              // Removido maxHeight e overflow para evitar scroll containers aninhados
            }}
          >
            {isEmpty && !snapshot.isDraggingOver && (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-400 dark:text-gray-500 text-sm italic">
                  Arraste artigos para aqui
                </p>
              </div>
            )}
            
            {renderDraggableItems}
            
            {provided.placeholder}
            
            {maxItems > 0 && articles.length >= maxItems && (
              <div className="mt-2 py-2 px-3 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-200 text-xs rounded-md">
                Máximo de artigos atingido
              </div>
            )}
          </div>
        )}
      </Droppable>
    </div>
  );
};

// Optimizando o componente para evitar re-renders desnecessários
export default React.memo(DroppableColumn); 