import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { Article } from '../../PageblockV2/types';
import { BlockConfig } from './StyleConfigModal';
import ArticleCompactPreview from './ArticleCompactPreview';

interface SelectableDraggableArticleProps {
  article: Article;
  index: number;
  isDarkTheme?: boolean;
  isCompact?: boolean;
  isSelected?: boolean;
  onSelect?: (articleId: string | number) => void;
  isSelectionEnabled?: boolean;
  selectedCount?: number;
}

const SelectableDraggableArticle: React.FC<SelectableDraggableArticleProps> = ({
  article,
  index,
  isDarkTheme = false,
  isCompact = false,
  isSelected = false,
  onSelect,
  isSelectionEnabled = true,
  selectedCount = 1
}) => {
  const handleClick = (e: React.MouseEvent) => {
    if (!isSelectionEnabled) return;
    
    // Se pressionou Ctrl/Cmd, permite seleção
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      onSelect?.(article.id);
    }
  };

  // Função para renderizar os indicadores de múltiplos artigos
  const renderStackIndicators = (isDragging: boolean) => {
    if (!isDragging || !isSelected || selectedCount <= 1) return null;

    // Limita a quantidade de indicadores visuais para não ficar muito grande
    const maxVisualLayers = Math.min(selectedCount - 1, 3);
    
    return Array.from({ length: maxVisualLayers }).map((_, i) => (
      <div
        key={i}
        className="absolute rounded-lg border-2 bg-white dark:bg-gray-800"
        style={{
          top: -(i + 1) * 3,
          right: -(i + 1) * 3,
          left: 0,
          height: '100%',
          zIndex: -1,
          opacity: 0.6 - i * 0.15,
          transform: `scale(${1 + (i + 1) * 0.03})`,
          borderColor: isDarkTheme ? '#4B5563' : '#E5E7EB'
        }}
      />
    ));
  };

  return (
    <Draggable draggableId={`pool-${article.id}`} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={handleClick}
          className={`
            relative transition-all duration-200 cursor-pointer
            ${snapshot.isDragging ? 'shadow-lg scale-105 z-50' : ''}
            ${isSelected ? isDarkTheme ? 'bg-blue-900/30' : 'bg-blue-100' : ''}
            ${isSelectionEnabled ? 'hover:bg-gray-100 dark:hover:bg-gray-700' : ''}
          `}
          style={{
            ...provided.draggableProps.style,
          }}
        >
          {renderStackIndicators(snapshot.isDragging)}
          
          <div className={`
            relative rounded-lg overflow-hidden
            ${snapshot.isDragging ? 'shadow-xl' : ''}
          `}>
            <ArticleCompactPreview
              article={article}
              isDarkTheme={isDarkTheme}
              isCompact={isCompact}
            />
          </div>

          {/* Contador de seleção durante o drag */}
          {snapshot.isDragging && isSelected && selectedCount > 1 && (
            <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
              {selectedCount}
            </div>
          )}

          {/* Indicador de seleção */}
          {isSelected && !snapshot.isDragging && (
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
        </div>
      )}
    </Draggable>
  );
};

export default SelectableDraggableArticle; 