import React, { useMemo, useState, useCallback, useRef, useEffect, CSSProperties } from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import { List, AutoSizer, ListRowProps } from 'react-virtualized';
import { Article } from '../../PageblockV2/types';
import debounce from 'lodash/debounce';
import ArticleCompactPreview from './ArticleCompactPreview';
import { BlockConfig } from '../components/StyleConfigModal';

// Estendendo o tipo Article para incluir featuredImage e excerpt
interface ExtendedArticle extends Article {
  featuredImage?: string;
  excerpt?: string;
}

interface ArticlesPoolProps {
  articles: ExtendedArticle[];
  isDarkTheme?: boolean;
  isCompact?: boolean;
  blockConfig: BlockConfig;
  usedArticleIds: (string | number)[]; // IDs dos artigos que já estão em uso
  onRemoveArticle?: (articleId: string | number) => void; // Função para remover artigos
}

interface RowRendererProps extends ListRowProps {
  style: React.CSSProperties;
}

interface AutoSizerProps {
  width: number;
  height: number;
}

interface VirtualItem {
  index: number;
  style: {
    height: number;
    top: number;
    left: number;
    right: number;
  };
}

// Componente otimizado para renderizar artigos em pool
const ArticlesPool: React.FC<ArticlesPoolProps> = ({
  articles,
  isDarkTheme = false,
  isCompact = false,
  blockConfig,
  usedArticleIds = [],
  onRemoveArticle
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const isDraggingRef = useRef(false);
  const [stableArticles, setStableArticles] = useState(articles);
  const listRef = useRef<List>(null);
  
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
      setStableArticles(articles);
      if (listRef.current) {
        listRef.current.recomputeRowHeights();
      }
    };
    
    document.addEventListener('dragstart', handleDragStart);
    document.addEventListener('dragend', handleDragEnd);
    
    return () => {
      document.removeEventListener('dragstart', handleDragStart);
      document.removeEventListener('dragend', handleDragEnd);
    };
  }, [articles]);

  const handleSearchChange = useCallback(
    debounce((e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value.toLowerCase());
      if (listRef.current) {
        listRef.current.recomputeRowHeights();
      }
    }, 300),
    []
  );

  const filteredArticles = useMemo(() => {
    return stableArticles.filter(article => 
      article.title.toLowerCase().includes(searchTerm) || 
      (article.excerpt && article.excerpt.toLowerCase().includes(searchTerm))
    );
  }, [stableArticles, searchTerm]);

  const theme = useMemo(() => {
    return blockConfig?.styles?.theme?.[isDarkTheme ? 'dark' : 'light'] || {
      columnStyle: {
        background: isDarkTheme ? '#1a202c' : '#f7fafc',
        itemBackground: isDarkTheme ? '#2d3748' : '#ffffff'
      },
      headingProps: {
        color: isDarkTheme ? '#ffffff' : '#1a202c'
      }
    };
  }, [blockConfig, isDarkTheme]);

  const renderArticle = (article: Article, style: ListRowProps['style']) => {
    const isUsed = usedArticleIds.includes(article.id);
    
    // Criar um ID estável para o draggable
    const draggableId = `article-${article.id}`;
    
    // Garantir que o estilo tenha as propriedades necessárias
    const safeStyle = {
      position: 'absolute' as const,
      top: 0,
      left: 0,
      width: '100%',
      height: isCompact ? '80px' : '100px',
      ...style
    };

    return (
      <Draggable
        key={article.id}
        draggableId={draggableId}
        index={articles.findIndex(a => a.id === article.id)}
        isDragDisabled={isUsed}
      >
        {(provided, snapshot) => {
          const combinedStyle = {
            ...provided.draggableProps.style,
            opacity: isUsed ? 0.5 : snapshot.isDragging ? 0.7 : 1,
            transform: snapshot.isDragging ? provided.draggableProps.style?.transform : 'translate3d(0, 0, 0)',
            willChange: 'transform',
            pointerEvents: isUsed ? 'none' : 'auto',
            ...safeStyle,
            zIndex: snapshot.isDragging ? 9999 : 'auto',
          } as React.CSSProperties;

          return (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={combinedStyle}
              className={`
                rounded-md overflow-hidden transition-all duration-100
                ${isUsed ? 'cursor-not-allowed' : 'cursor-grab'}
                ${snapshot.isDragging ? 'shadow-lg z-10' : 'shadow-sm'}
              `}
              data-article-id={article.id}
            >
              <ArticleCompactPreview
                article={article}
                columnId="pool"
                isDarkTheme={isDarkTheme}
                blockConfig={blockConfig}
              />
              {usedArticleIds.includes(article.id) && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                  <span className="text-xs font-medium text-white px-2 py-1 rounded-full bg-blue-500">
                    Em uso
                  </span>
                </div>
              )}
            </div>
          );
        }}
      </Draggable>
    );
  };

  const rowRenderer = useCallback(({ index, style }: ListRowProps) => {
    const article = filteredArticles[index];
    if (!article) return null;
    
    // Garantir que o estilo tenha as propriedades necessárias
    const safeStyle = {
      ...style,
      position: 'absolute' as const,
      top: style.top || 0,
      left: style.left || 0,
      width: style.width || '100%',
      height: isCompact ? 80 : 100,
    };
    
    return renderArticle(article, safeStyle as React.CSSProperties);
  }, [filteredArticles, renderArticle, isCompact]);

  const getRowHeight = useCallback(() => {
    return isCompact ? 80 : 100;
  }, [isCompact]);

  return (
    <div className="articles-pool w-full">
      <Droppable
        droppableId="pool"
        isDropDisabled={true}
      >
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="rounded-lg"
            style={{
              backgroundColor: theme?.columnStyle?.background || (isDarkTheme ? '#1a202c' : '#f7fafc'),
              minHeight: '200px',
              height: '100%',
              padding: '8px',
            }}
            data-droppable-id="pool"
          >
            {filteredArticles.length === 0 ? (
              <div className="text-center py-4">
                <p className="text-gray-500 dark:text-gray-400">
                  {searchTerm ? 'Nenhum artigo encontrado' : 'Nenhum artigo disponível'}
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {filteredArticles.map((article, index) => {
                  const isUsed = usedArticleIds.includes(article.id);
                  return (
                    <Draggable
                      key={article.id}
                      draggableId={`article-${article.id}`}
                      index={index}
                      isDragDisabled={isUsed}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`
                            relative rounded-md overflow-hidden transition-all duration-100
                            ${isUsed ? 'opacity-50' : ''}
                            ${snapshot.isDragging ? 'shadow-lg z-10' : 'shadow-sm'}
                          `}
                          style={{
                            ...provided.draggableProps.style,
                            height: isCompact ? '30px' : '30px',
                            cursor: isUsed ? 'not-allowed' : 'grab'
                          }}
                          data-article-id={article.id}
                        >
                          <ArticleCompactPreview
                            article={article}
                            columnId="pool"
                            isDarkTheme={isDarkTheme}
                            blockConfig={blockConfig}
                          />
                          {isUsed && (
                            <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center">
                              <span className="text-xs font-medium text-gray-600 px-2 py-1 rounded-full bg-gray-200">
                                Em uso
                              </span>
                            </div>
                          )}
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </div>
        )}
      </Droppable>
    </div>
  );
};

// Usar memo com comparação personalizada para evitar renders desnecessários
export default React.memo(ArticlesPool); 