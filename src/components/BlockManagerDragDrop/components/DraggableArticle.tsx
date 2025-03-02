import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { Article } from '../../PageblockV2/types';

interface DraggableArticleProps {
  article: Article;
  index: number;
  isDarkTheme?: boolean;
  isMasonry?: boolean;
  showExcerpt?: boolean;
  showRemoveButton?: boolean;
  subtitleProps?: {
    fontSize?: string;
    color?: string;
  };
  onRemove: (articleId: string | number) => void;
}

const XMarkIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="16" 
    height="16" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const DraggableArticle: React.FC<DraggableArticleProps> = ({
  article,
  index,
  isDarkTheme = false,
  isMasonry = false,
  showExcerpt = false,
  showRemoveButton = true,
  subtitleProps = { fontSize: '1rem', color: 'inherit' },
  onRemove
}) => {
  // Helper para gerar alturas aleatórias mas consistentes baseadas no índice
  const getRandomHeight = (index: number) => {
    const heights = ['h-48', 'h-64', 'h-56'];
    return heights[index % heights.length];
  };

  // Helper para gerar aspect ratios aleatórios mas consistentes
  const getRandomAspectRatio = (index: number) => {
    const ratios = ['aspect-square', 'aspect-[3/4]', 'aspect-[4/3]'];
    return ratios[index % ratios.length];
  };

  return (
    <Draggable draggableId={article.id.toString()} index={index}>
      {(provided: any, snapshot: any) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`
            ${isMasonry ? 'break-inside-avoid mb-6' : 'w-full'}
            relative
            group
            ${snapshot.isDragging ? 'opacity-50' : 'opacity-100'}
          `}
        >
          {/* Article content */}
          {isMasonry ? (
            <article className="relative">
              {article.content?.image?.desktop_image_path && (
                <div className="relative w-full overflow-hidden mb-2">
                  <img
                    src={article.content.image.desktop_image_path}
                    alt={article.title}
                    className={`w-full ${getRandomHeight(index)} object-cover`}
                  />
                </div>
              )}
              
              <div className="p-2 bg-white dark:bg-gray-800 rounded-lg">
                <h2 className="text-[1rem] font-semibold mb-2 text-gray-900 dark:text-white">
                  {article.title}
                </h2>
                {showExcerpt && article.subtitle && (
                  <p className="text-[0.8rem] text-gray-700 dark:text-gray-300">
                    {article.subtitle}
                  </p>
                )}
              </div>
              
              {/* Remove button */}
              {showRemoveButton && (
                <button
                  onClick={() => onRemove(article.id)}
                  className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              )}
            </article>
          ) : (
            <div className={`
              relative
              bg-white dark:bg-gray-800
              border border-gray-200 dark:border-gray-700
              hover:border-blue-500/50 dark:hover:border-blue-500/50
              transition-all duration-200
              rounded-md
            `}>
              {/* Image */}
              {article.content?.image?.desktop_image_path && (
                <div className="relative aspect-[16/9] overflow-hidden rounded-t-md">
                  <img
                    src={article.content.image.desktop_image_path}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Content */}
              <div className="p-1">
                <h4 className={`
                  text-gray-900 dark:text-white
                  font-semibold
                  mb-0.5
                  line-clamp-2
                  ${subtitleProps?.fontSize || 'text-[0.7rem]'}
                `}>
                  {article.title}
                </h4>
                {showExcerpt && article.subtitle && (
                  <p className={`
                    text-gray-600 dark:text-gray-300
                    line-clamp-1
                    ${subtitleProps?.fontSize || 'text-[0.65rem]'}
                  `}>
                    {article.subtitle}
                  </p>
                )}
              </div>

              {/* Remove button */}
              {showRemoveButton && (
                <button
                  onClick={() => onRemove(article.id)}
                  className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-2 w-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default DraggableArticle;
