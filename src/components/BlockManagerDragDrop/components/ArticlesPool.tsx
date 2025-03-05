import React, { useMemo, useState, useCallback, useRef, useEffect, CSSProperties } from 'react';
import { Droppable } from '@hello-pangea/dnd';
import { Article } from '../../PageblockV2/types';
import { BlockConfig } from './StyleConfigModal';
import SelectableDraggableArticle from './SelectableDraggableArticle';

interface ArticlesPoolProps {
  articles: Article[];
  isDarkTheme?: boolean;
  blockConfig: BlockConfig;
  usedArticleIds: (string | number)[];
  isCompact?: boolean;
  isMultiSelectEnabled?: boolean;
  onSelectionChange?: (selectedIds: (string | number)[]) => void;
}

const ArticlesPool = ({ 
  articles, 
  isDarkTheme, 
  blockConfig, 
  usedArticleIds,
  isCompact = false,
  isMultiSelectEnabled = true,
  onSelectionChange
}: ArticlesPoolProps) => {
  const [selectedArticleIds, setSelectedArticleIds] = useState<(string | number)[]>([]);
  
  // Memoize availableArticles para evitar recálculos desnecessários
  const availableArticles = useMemo(() => 
    articles.filter(article => !usedArticleIds.includes(article.id)),
    [articles, usedArticleIds]
  );

  const handleArticleSelect = useCallback((articleId: string | number) => {
    setSelectedArticleIds(prev => {
      const newSelection = prev.includes(articleId)
        ? prev.filter(id => id !== articleId)
        : [...prev, articleId];
      return newSelection;
    });
  }, []);

  // Notifica mudanças na seleção
  useEffect(() => {
    if (onSelectionChange) {
      onSelectionChange(selectedArticleIds);
    }
  }, [selectedArticleIds, onSelectionChange]);

  // Limpa a seleção quando a lista de artigos disponíveis muda significativamente
  useEffect(() => {
    // Verifica se algum artigo selecionado não está mais disponível
    const hasUnavailableSelection = selectedArticleIds.some(
      id => !availableArticles.find(article => article.id === id)
    );

    if (hasUnavailableSelection) {
      setSelectedArticleIds([]);
    }
  }, [availableArticles, selectedArticleIds]);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-3 px-2">
        <h3 className={`text-sm font-medium ${isDarkTheme ? 'text-gray-200' : 'text-gray-700'}`}>
          Artigos Disponíveis
        </h3>
        <div className="flex items-center gap-2">
          {selectedArticleIds.length > 0 && (
            <span className={`text-xs ${isDarkTheme ? 'text-blue-400' : 'text-blue-600'}`}>
              {selectedArticleIds.length} selecionado(s)
            </span>
          )}
          <span className={`text-xs ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>
            {availableArticles.length} artigos
          </span>
        </div>
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
                  <SelectableDraggableArticle
                    key={article.id}
                    article={article}
                    index={index}
                    isDarkTheme={isDarkTheme}
                    isCompact={isCompact}
                    isSelected={selectedArticleIds.includes(article.id)}
                    onSelect={handleArticleSelect}
                    isSelectionEnabled={isMultiSelectEnabled}
                    selectedCount={selectedArticleIds.length}
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

// Otimiza re-renders comparando apenas as props que realmente importam
export default React.memo(ArticlesPool, (prevProps, nextProps) => {
  return (
    prevProps.articles === nextProps.articles &&
    prevProps.usedArticleIds === nextProps.usedArticleIds &&
    prevProps.isDarkTheme === nextProps.isDarkTheme &&
    prevProps.isCompact === nextProps.isCompact &&
    prevProps.isMultiSelectEnabled === nextProps.isMultiSelectEnabled &&
    prevProps.onSelectionChange === nextProps.onSelectionChange
  );
}); 