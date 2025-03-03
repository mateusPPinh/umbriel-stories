import React, { useMemo, useState, useCallback, useRef, useEffect } from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import { List, AutoSizer, ListRowProps } from 'react-virtualized';
import { Article } from '../../PageblockV2/types';
import debounce from 'lodash/debounce';
import ArticleCompactPreview from './ArticleCompactPreview';

interface BlockConfig {
  styles: {
    theme: {
      light: {
        columnStyle?: {
          background?: string;
          itemBackground?: string;
          padding?: string;
        };
        headingProps?: {
          color?: string;
        };
        subtitleProps?: {
          color?: string;
        };
      };
      dark: {
        columnStyle?: {
          background?: string;
          itemBackground?: string;
          padding?: string;
        };
        headingProps?: {
          color?: string;
        };
        subtitleProps?: {
          color?: string;
        };
      };
    };
  };
}

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

  const renderArticlePoolItem = useCallback((article: ExtendedArticle, isUsed: boolean, style: React.CSSProperties) => {
    const draggableId = `pool-article-${article.id}`;
    const index = stableArticles.findIndex(a => a.id === article.id);
    
    if (index === -1) return null;
    
    return (
      <Draggable
        key={draggableId}
        draggableId={draggableId}
        index={index}
        isDragDisabled={isUsed}
      >
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{
              ...style,
              ...provided.draggableProps.style,
              opacity: isUsed ? 0.5 : snapshot.isDragging ? 0.7 : 1,
              transform: snapshot.isDragging ? provided.draggableProps.style?.transform : 'translate3d(0, 0, 0)',
              willChange: 'transform',
              pointerEvents: isUsed ? 'none' : 'auto',
              height: style.height,
              position: 'absolute',
              top: style.top,
              left: style.left,
              right: style.right
            }}
            className={`
              rounded-md overflow-hidden transition-all duration-100
              ${isUsed ? 'cursor-not-allowed' : 'cursor-grab'}
              ${snapshot.isDragging ? 'shadow-lg z-10' : 'shadow-sm'}
            `}
          >
            {isCompact ? (
              <ArticleCompactPreview
                article={article}
                columnId="pool"
                isDarkTheme={isDarkTheme}
                blockConfig={blockConfig}
                onRemove={!isUsed && onRemoveArticle ? onRemoveArticle : undefined}
              />
            ) : (
              <div className="p-3 bg-white dark:bg-gray-800">
                <div className="font-medium text-gray-900 dark:text-white mb-2 truncate">
                  {article.title}
                </div>
                {article.excerpt && (
                  <div className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                    {article.excerpt}
                  </div>
                )}
              </div>
            )}
            {isUsed && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 dark:bg-opacity-50">
                <span className="text-xs font-medium text-white px-2 py-1 rounded-full bg-blue-500">
                  Em uso
                </span>
              </div>
            )}
          </div>
        )}
      </Draggable>
    );
  }, [stableArticles, blockConfig, isDarkTheme, isCompact, onRemoveArticle]);

  const rowRenderer = useCallback(({ index, style }: RowRendererProps) => {
    const article = filteredArticles[index];
    const isUsed = usedArticleIds.includes(article.id.toString()) || usedArticleIds.includes(article.id);
    return renderArticlePoolItem(article, isUsed, style);
  }, [filteredArticles, usedArticleIds, renderArticlePoolItem]);

  const getRowHeight = useCallback(({ index }: { index: number }) => {
    return isCompact ? 80 : 100;
  }, [isCompact]);

  return (
    <div className="articles-pool h-full flex flex-col">
      <div className="mb-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Pesquisar artigos..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 text-sm"
            onChange={handleSearchChange}
          />
        </div>
      </div>

      <Droppable
        droppableId="pool"
        mode="virtual"
        renderClone={(provided, snapshot, rubric) => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            {renderArticlePoolItem(filteredArticles[rubric.source.index], false, {})}
          </div>
        )}
      >
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            className="flex-1 p-3 rounded-lg"
            style={{
              backgroundColor: theme?.columnStyle?.background || (isDarkTheme ? '#1a202c' : '#f7fafc'),
              height: 'calc(100vh - 200px)' // Adjust this value based on your layout
            }}
          >
            {filteredArticles.length === 0 ? (
              <div className="text-center py-4">
                <p className="text-gray-500 dark:text-gray-400">
                  {searchTerm ? 'Nenhum artigo encontrado' : 'Nenhum artigo disponível'}
                </p>
              </div>
            ) : (
              <AutoSizer>
                {({ width, height }: AutoSizerProps) => (
                  <List
                    ref={listRef}
                    width={width}
                    height={height}
                    rowCount={filteredArticles.length}
                    rowHeight={getRowHeight}
                    rowRenderer={rowRenderer}
                    overscanRowCount={5}
                  />
                )}
              </AutoSizer>
            )}
          </div>
        )}
      </Droppable>
    </div>
  );
};

// Usar memo com comparação personalizada para evitar renders desnecessários
export default React.memo(ArticlesPool); 