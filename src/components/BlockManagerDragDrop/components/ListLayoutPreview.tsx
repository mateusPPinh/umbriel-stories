import React from 'react';
import { Article } from '../../PageblockV2/types';

interface ListLayoutPreviewProps {
  variantType: string;
  isDarkTheme?: boolean;
  columns: { [key: string]: Article[] };
}

const ListLayoutPreview: React.FC<ListLayoutPreviewProps> = ({ variantType, isDarkTheme, columns }) => {
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
    return (
      <div className="grid grid-cols-2 gap-3">
        {[...Array(4)].map((_, i) => {
          const article = columns['col-0']?.[i];
          
          return (
            <div key={i} className={`
              p-2 rounded
              ${isDarkTheme ? 'bg-gray-700' : 'bg-white'}
              ${article ? 'ring-1 ring-blue-500/20' : ''}
            `}>
              {article ? (
                <>
                  {article.content?.image?.desktop_image_path && (
                    <div className="aspect-[2/1] rounded overflow-hidden mb-2">
                      <img
                        src={article.content.image.desktop_image_path}
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
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
                  <div className={`aspect-[2/1] rounded mb-2 ${isDarkTheme ? 'bg-gray-600' : 'bg-gray-200'}`} />
                  <div className={`h-2 rounded w-full mb-1 ${isDarkTheme ? 'bg-gray-600' : 'bg-gray-200'}`} />
                  <div className={`h-1.5 rounded w-2/3 ${isDarkTheme ? 'bg-gray-600' : 'bg-gray-200'}`} />
                </>
              )}
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
      <div className={`
        w-full aspect-[21/9] p-4 rounded-lg max-h-[600px] h-full overflow-y-auto
        ${isDarkTheme ? 'bg-gray-800' : 'bg-gray-100'}
        border-2 border-transparent hover:border-blue-500/50
        transition-colors duration-200
      `}>
        {getLayoutPreview()}
      </div>
    </div>
  );
};

export default ListLayoutPreview; 