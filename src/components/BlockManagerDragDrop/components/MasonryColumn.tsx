import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import DraggableArticle from './DraggableArticle';
import { Article } from '../../PageblockV2/types';

interface MasonryColumnProps {
  id: string;
  droppableId: string;
  articles: Article[];
  maxItems: number;
  isDarkTheme?: boolean;
  style?: React.CSSProperties;
  headingProps?: {
    text?: string;
    fontSize?: string;
    fontWeight?: string;
    color?: string;
  };
  subtitleProps?: {
    fontSize?: string;
    color?: string;
  };
  showExcerpt?: boolean;
}

export function MasonryColumn({
  id,
  droppableId,
  articles,
  maxItems,
  isDarkTheme,
  style,
  headingProps,
  subtitleProps,
  showExcerpt
}: MasonryColumnProps) {
  const columnIsFull = articles.length >= maxItems;

  // Classes para diferentes aspect ratios
  const aspectRatios = {
    square: 'aspect-square',
    portrait: 'aspect-[3/4]',
    landscape: 'aspect-[4/3]'
  };

  // Helper para aspect ratio aleatório
  const getRandomAspectRatio = (index: number) => {
    const variations = ['square', 'portrait', 'landscape'];
    const random = (index + 1) % variations.length; // Usa o índice para garantir consistência
    return aspectRatios[variations[random] as keyof typeof aspectRatios];
  };

  // Gera alturas aleatórias para os artigos para criar o efeito masonry
  const getRandomHeight = (index: number) => {
    // Usa o índice para garantir que a altura seja consistente para o mesmo artigo
    const heights = ['h-48', 'h-64', 'h-40', 'h-56', 'h-36', 'h-52'];
    return heights[index % heights.length];
  };

  return (
    <div style={style} className="w-full">
      {headingProps?.text && (
        <h3
          style={{
            fontSize: headingProps.fontSize,
            fontWeight: headingProps.fontWeight,
            color: headingProps.color || (isDarkTheme ? '#F9FAFB' : '#111827'),
          }}
          className="mb-4"
        >
          {headingProps.text}
        </h3>
      )}
      <Droppable droppableId={droppableId}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`min-h-[220px] rounded-lg border-2 ${
              snapshot.isDraggingOver
                ? isDarkTheme
                  ? 'border-blue-500 bg-gray-700'
                  : 'border-blue-500 bg-blue-50'
                : isDarkTheme
                ? 'border-gray-700 bg-gray-800'
                : 'border-gray-200 bg-gray-50'
            } p-4`}
            style={{ minHeight: articles.length === 0 ? '220px' : 'auto' }}
          >
            {articles.length === 0 && (
              <div className={`flex items-center justify-center h-full min-h-[180px] text-sm ${
                isDarkTheme ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Arraste artigos para esta coluna
              </div>
            )}
            
            <div className="grid grid-cols-1 gap-4">
              {articles.map((article, index) => (
                <div 
                  key={article.id} 
                  className={`${getRandomHeight(index)} ${getRandomAspectRatio(index)} transition-all duration-300`}
                >
                  <DraggableArticle
                    article={article}
                    index={index}
                    isDarkTheme={isDarkTheme}
                    isInColumn={true}
                    columnIsFull={columnIsFull}
                    isMasonry={true}
                    subtitleProps={subtitleProps}
                    showExcerpt={showExcerpt}
                  />
                </div>
              ))}
            </div>
            
            {provided.placeholder}
            {columnIsFull && articles.length > 0 && (
              <div
                className={`mt-2 rounded-md p-2 text-center text-sm ${
                  isDarkTheme ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                }`}
              >
                Maximum of {maxItems} articles reached
              </div>
            )}
          </div>
        )}
      </Droppable>
    </div>
  );
} 