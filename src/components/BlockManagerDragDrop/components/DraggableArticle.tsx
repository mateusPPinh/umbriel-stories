import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Article } from '../../PageblockV2/types';

interface DraggableArticleProps {
  article: Article;
  index: number;
  isDarkTheme?: boolean;
  isInColumn?: boolean;
  columnIsFull?: boolean;
  isMasonry?: boolean;
  isNewsGrid?: boolean;
  isFeatured?: boolean;
  isSidebarMain?: boolean;
  isSidebarSide?: boolean;
  isNewsFeedMain?: boolean;
  isNewsFeedSide?: boolean;
  subtitleProps?: {
    fontSize?: string;
    color?: string;
  };
  showExcerpt?: boolean;
  onRemove?: (articleId: string | number) => void;
}

const DraggableArticle: React.FC<DraggableArticleProps> = ({
  article,
  index,
  isDarkTheme,
  isInColumn,
  columnIsFull,
  isMasonry,
  isNewsGrid,
  isFeatured,
  isSidebarMain,
  isSidebarSide,
  isNewsFeedMain,
  isNewsFeedSide,
  subtitleProps,
  showExcerpt,
  onRemove
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Helper function to determine the appropriate class for the article
  const getArticleClass = () => {
    let classes = `
      rounded-md overflow-hidden relative
      ${isDarkTheme 
        ? 'bg-gray-700 hover:bg-gray-600' 
        : 'bg-white hover:bg-gray-50'
      }
      ${columnIsFull && isInColumn ? 'opacity-80 cursor-not-allowed' : 'opacity-100 cursor-grab'}
      transition-all duration-200
    `;

    if (isMasonry) {
      classes += ' h-full';
    }
    
    if (isNewsGrid) {
      classes += ' flex flex-col h-full';
    }
    
    if (isFeatured && index === 0) {
      classes += ' aspect-[16/9]';
    }
    
    if (isSidebarMain) {
      classes += ' flex flex-col';
    }
    
    if (isSidebarSide) {
      classes += ' flex items-center gap-3';
    }
    
    if (isNewsFeedMain || isNewsFeedSide) {
      classes += ' flex items-center gap-3';
    }

    return classes;
  };

  // Helper function to determine the appropriate image class
  const getImageClass = () => {
    if (isMasonry) {
      return 'h-40 md:h-48';
    }
    
    if (isNewsGrid) {
      return 'h-32 md:h-40';
    }
    
    if (isFeatured && index === 0) {
      return 'h-48 md:h-64';
    } else if (isFeatured) {
      return 'h-20 w-20 flex-shrink-0';
    }
    
    if (isSidebarMain) {
      return 'h-40';
    }
    
    if (isSidebarSide) {
      return 'h-16 w-16 flex-shrink-0';
    }
    
    if (isNewsFeedMain || isNewsFeedSide) {
      return 'h-16 w-16 flex-shrink-0';
    }
    
    return 'h-24';
  };

  // Helper function to determine the appropriate content class
  const getContentClass = () => {
    let classes = 'p-3';
    
    if (isNewsGrid) {
      classes += ' flex-grow flex flex-col';
    }
    
    if (isSidebarSide || isNewsFeedSide) {
      classes += ' flex-1 min-w-0';
    }
    
    return classes;
  };

  // Helper function to determine the appropriate title class
  const getTitleClass = () => {
    let classes = 'font-medium line-clamp-2 mb-1';
    
    if (isDarkTheme) {
      classes += ' text-white';
    } else {
      classes += ' text-gray-900';
    }
    
    if (isNewsGrid || isFeatured && index === 0) {
      classes += ' text-base';
    } else {
      classes += ' text-sm';
    }
    
    if (isSidebarSide || isNewsFeedSide) {
      classes += ' text-xs line-clamp-1';
    }
    
    return classes;
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (onRemove) {
      onRemove(article.id);
    }
  };

  return (
    <Draggable 
      draggableId={article.id.toString()} 
      index={index}
      isDragDisabled={isInColumn && columnIsFull}
    >
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={getArticleClass()}
          style={{
            ...provided.draggableProps.style,
            ...(columnIsFull && isInColumn ? { pointerEvents: 'none' } : {})
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Botão de remoção */}
          {isInColumn && isHovered && onRemove && (
            <button
              onClick={handleRemove}
              className={`
                absolute top-1 right-1 z-10 rounded-full p-1
                ${isDarkTheme 
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-900 hover:text-white' 
                  : 'bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700'}
                shadow-md transition-all duration-200
              `}
              aria-label="Remover artigo"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
          
          {/* Imagem do artigo */}
          {article.content?.image?.desktop_image_path && (
            <div className={`
              ${getImageClass()}
              overflow-hidden relative
              ${columnIsFull && isInColumn ? 'filter grayscale-[30%]' : ''}
            `}>
              <img
                src={article.content.image.desktop_image_path}
                alt={article.title}
                className="w-full h-full object-cover"
              />
              {columnIsFull && isInColumn && (
                <div className="absolute inset-0 bg-black bg-opacity-10"></div>
              )}
            </div>
          )}
          
          {/* Conteúdo do artigo */}
          <div className={getContentClass()}>
            <h3 className={getTitleClass()}>
              {article.title}
            </h3>
            
            {article.subtitle && (
              <p 
                className="line-clamp-1 mb-2"
                style={{
                  fontSize: subtitleProps?.fontSize || '0.75rem',
                  color: subtitleProps?.color || (isDarkTheme ? '#9CA3AF' : '#6B7280')
                }}
              >
                {article.subtitle}
              </p>
            )}
            
            {showExcerpt && article.content?.description && (
              <p className={`
                line-clamp-2 text-xs
                ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}
                ${isNewsGrid ? 'mt-auto pt-2' : ''}
              `}>
                {article.content.description}
              </p>
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default DraggableArticle;
