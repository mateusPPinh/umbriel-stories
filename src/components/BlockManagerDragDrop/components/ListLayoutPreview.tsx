import React from 'react';
import { Article } from '../../PageblockV2/types';
import { BlockConfig } from './StyleConfigModal';

interface ListLayoutPreviewProps {
  variantType: string;
  isDarkTheme?: boolean;
  columns: { [key: string]: Article[] };
  blockConfig: BlockConfig;
}

const ListLayoutPreview: React.FC<ListLayoutPreviewProps> = ({ variantType, isDarkTheme, columns, blockConfig }) => {
  const theme = blockConfig.styles.theme[isDarkTheme ? 'dark' : 'light'];
  
  const renderTimelinePreview = () => {
    return (
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-300 dark:bg-gray-700" />
        
        {/* Articles */}
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => {
            const article = columns['col-0']?.[i];
            
            return (
              <div key={i} className="flex items-start gap-6 pl-4">
                {/* Marker */}
                <div className={`
                  w-2 h-2 rounded-full mt-2 shrink-0
                  ${article 
                    ? 'bg-blue-500 ring-4 ring-blue-100 dark:ring-blue-900/30' 
                    : 'bg-gray-300 dark:bg-gray-700'}
                `} />

                {/* Content */}
                <div className="flex-1 min-w-0">
                  {article ? (
                    <>
                      <div className="text-[12px] text-gray-500 dark:text-gray-400 mb-1">
                        {new Date(article.created_at || '').toLocaleDateString('pt-BR')}
                      </div>
                      <div className="text-[17px] font-medium text-gray-900 dark:text-white truncate">
                        {article.title}
                      </div>
                      {article.subtitle && (
                        <div className="text-[12px] text-gray-500 dark:text-gray-400 truncate mt-0.5">
                          {article.subtitle}
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <div className={`h-1 rounded mb-1 w-12 ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'}`} />
                      <div className={`h-2 rounded w-full ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'}`} />
                      <div className={`h-1 rounded mt-1 w-2/3 ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'}`} />
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderCompactPreview = () => {
    return (
      <div className="space-y-2">
        {[...Array(8)].map((_, i) => {
          const article = columns['col-0']?.[i];
          
          return (
            <div key={i} className="flex items-center gap-3">
              {/* Bullet */}
              <div className={`
                w-1 h-1 rounded-full
                ${article ? 'bg-blue-500' : `${isDarkTheme ? 'bg-gray-700' : 'bg-gray-300'}`}
              `} />

              {/* Content */}
              {article ? (
                <div className="text-[17px] font-medium text-gray-900 dark:text-white truncate flex-1">
                  {article.title}
                </div>
              ) : (
                <div className={`h-2 rounded w-full ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'}`} />
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const renderCardPreview = () => {
    const itemSpacing = blockConfig.styles.itemSpacing || '1rem';
    const cardSize = blockConfig.styles.cardSize || 'medium';
    
    const cardSizeClasses = {
      small: 'h-24',
      medium: 'h-32',
      large: 'h-40'
    };
    
    return (
      <div className="space-y-4" style={{ gap: itemSpacing }}>
        {[...Array(4)].map((_, i) => {
          const article = columns['col-0']?.[i];
          
          return (
            <div 
              key={i} 
              className={`
                flex gap-4 p-4 rounded-lg border
                ${isDarkTheme ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-white'}
                ${cardSizeClasses[cardSize as keyof typeof cardSizeClasses]}
              `}
              style={{
                backgroundColor: theme.columnStyle.background,
                padding: theme.columnStyle.padding
              }}
            >
              {/* Image */}
              <div className="w-1/3 rounded overflow-hidden">
                {article?.content?.image?.desktop_image_path ? (
                  <div className="relative w-full h-full">
                    <img
                      src={article.content.image.desktop_image_path}
                      alt={article.title}
                      className={`w-full h-full object-${blockConfig.mediaConfig?.imageConfig?.fit || 'cover'} object-${blockConfig.mediaConfig?.imageConfig?.position || 'center'}`}
                    />
                    {blockConfig.mediaConfig?.imageConfig?.overlay?.enabled && (
                      <div 
                        className="absolute inset-0" 
                        style={{
                          backgroundColor: blockConfig.mediaConfig.imageConfig.overlay.color || 'rgba(0,0,0,0.5)',
                          opacity: blockConfig.mediaConfig.imageConfig.overlay.opacity || 0.5
                        }}
                      />
                    )}
                  </div>
                ) : (
                  <div className={`w-full h-full ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'}`} />
                )}
              </div>
              
              {/* Content */}
              <div className="w-2/3 flex flex-col">
                <div 
                  className="line-clamp-2"
                  style={{
                    fontSize: theme.headingProps.fontSize,
                    fontWeight: theme.headingProps.fontWeight,
                    color: theme.headingProps.color
                  }}
                >
                  {article?.title || 'Título do artigo'}
                </div>
                
                {blockConfig.styles.showExcerpt && (
                  <div 
                    className="mt-1 line-clamp-2"
                    style={{
                      fontSize: theme.subtitleProps.fontSize,
                      color: theme.subtitleProps.color
                    }}
                  >
                    {article?.content?.description || 'Descrição do artigo...'}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const getLayoutPreview = () => {
    switch (variantType) {
      case 'chronological':
        return renderTimelinePreview();
      case 'compact':
        return renderCompactPreview();
      case 'card':
        return renderCardPreview();
      default:
        return null;
    }
  };

  return (
    <div className="relative">
      <div className="text-sm font-medium mb-2 text-gray-600 dark:text-gray-400">
        Preview do Layout
      </div>
      <div 
        className={`
          w-full aspect-[16/9] p-4 rounded-lg overflow-y-auto h-full
          border border-gray-200 dark:border-gray-700
          hover:border-blue-500/50 dark:hover:border-blue-500/50
          transition-colors duration-200
        `}
        style={{
          backgroundColor: blockConfig.layout.styles.backgroundColor || (isDarkTheme ? 'rgba(31, 41, 55, 0.5)' : 'rgba(243, 244, 246, 0.5)')
        }}
      >
        <div className="w-full h-full">
          {getLayoutPreview()}
        </div>
      </div>
    </div>
  );
};

export default ListLayoutPreview; 