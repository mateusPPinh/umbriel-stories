import React, { useMemo, useState, useCallback, useRef, useEffect, CSSProperties } from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import { List, AutoSizer, ListRowProps } from 'react-virtualized';
import { Article } from '../../PageblockV2/types';
import debounce from 'lodash/debounce';
import ArticleCompactPreview from './ArticleCompactPreview';
import { BlockConfig } from './StyleConfigModal';
import DraggableArticle from './DraggableArticle';

// Estendendo o tipo Article para incluir featuredImage e excerpt
interface ExtendedArticle extends Article {
  featuredImage?: string;
  excerpt?: string;
}

interface ArticlesPoolProps {
  articles: Article[];
  isDarkTheme?: boolean;
  blockConfig: BlockConfig;
  usedArticleIds: (string | number)[];
  isCompact?: boolean;
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

const ArticlesPool = ({ 
  articles, 
  isDarkTheme, 
  blockConfig, 
  usedArticleIds,
  isCompact = false 
}: ArticlesPoolProps) => {
  const availableArticles = articles.filter(article => !usedArticleIds.includes(article.id));

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-3 px-2">
        <h3 className={`text-sm font-medium ${isDarkTheme ? 'text-gray-200' : 'text-gray-700'}`}>
          Artigos Disponíveis
        </h3>
        <span className={`text-xs ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>
          {availableArticles.length} artigos
        </span>
      </div>
      
      <Droppable droppableId="pool">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`rounded-lg transition-colors ${
              snapshot.isDraggingOver 
                ? isDarkTheme ? 'bg-gray-700' : 'bg-gray-100'
                : isDarkTheme ? 'bg-gray-800' : 'bg-gray-50'
            } ${availableArticles.length === 0 ? 'min-h-[100px] flex items-center justify-center' : ''}`}
          >
            {availableArticles.length > 0 ? (
              <div className="space-y-2 p-2">
                {availableArticles.map((article, index) => (
                  <DraggableArticle
                    key={article.id}
                    article={article}
                    index={index}
                    isDarkTheme={isDarkTheme}
                    blockConfig={blockConfig}
                    isCompact={isCompact}
                  />
                ))}
              </div>
            ) : (
              <div className={`text-center p-4 ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>
                <p className="text-sm">Todos os artigos foram utilizados</p>
              </div>
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

// Usar memo com comparação personalizada para evitar renders desnecessários
export default React.memo(ArticlesPool); 