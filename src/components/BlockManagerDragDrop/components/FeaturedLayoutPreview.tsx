import React from 'react';
import { Article } from '../../PageblockV2/types';

interface FeaturedLayoutPreviewProps {
  variantType: string;
  isDarkTheme?: boolean;
  columns: { [key: string]: Article[] };
}

const FeaturedLayoutPreview: React.FC<FeaturedLayoutPreviewProps> = ({ variantType, isDarkTheme, columns }) => {
  const renderHeroPreview = () => {
    const article = columns['col-0']?.[0];
    
    return (
      <div className="relative aspect-[21/9] rounded overflow-hidden">
        {/* Background */}
        <div className={`absolute inset-0 ${isDarkTheme ? 'bg-gray-800' : 'bg-gray-200'}`}>
          {article?.content?.image?.desktop_image_path && (
            <img
              src={article.content.image.desktop_image_path}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          {article ? (
            <>
              <div className="text-[10px] font-medium text-white mb-1">
                {article.title}
              </div>
              {article.subtitle && (
                <div className="text-[8px] text-white/80">
                  {article.subtitle}
                </div>
              )}
            </>
          ) : (
            <>
              <div className="h-2 w-2/3 bg-white/20 rounded mb-1" />
              <div className="h-1.5 w-1/2 bg-white/20 rounded" />
            </>
          )}
        </div>
      </div>
    );
  };

  const renderSplitPreview = () => {
    return (
      <div className="grid grid-cols-2 gap-3">
        {[...Array(2)].map((_, i) => {
          const article = columns['col-0']?.[i];
          
          return (
            <div key={i} className="flex gap-2">
              {/* Image */}
              <div className="w-1/2">
                <div className={`
                  aspect-video rounded overflow-hidden
                  ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'}
                `}>
                  {article?.content?.image?.desktop_image_path && (
                    <img
                      src={article.content.image.desktop_image_path}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="w-1/2">
                {article ? (
                  <>
                    <div className="text-[8px] font-medium text-gray-900 dark:text-white mb-1">
                      {article.title}
                    </div>
                    {article.subtitle && (
                      <div className="text-[6px] text-gray-500 dark:text-gray-400">
                        {article.subtitle}
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div className={`h-1.5 w-full rounded mb-1 ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'}`} />
                    <div className={`h-1 w-2/3 rounded ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'}`} />
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderTriplePreview = () => {
    return (
      <div className="grid grid-cols-3 gap-2">
        {[...Array(3)].map((_, i) => {
          const article = columns['col-0']?.[i];
          
          return (
            <div key={i} className="flex flex-col">
              {/* Image */}
              <div className={`
                aspect-video rounded overflow-hidden mb-1
                ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'}
              `}>
                {article?.content?.image?.desktop_image_path && (
                  <img
                    src={article.content.image.desktop_image_path}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              {/* Content */}
              {article ? (
                <>
                  <div className="text-[8px] font-medium text-gray-900 dark:text-white mb-0.5">
                    {article.title}
                  </div>
                  {article.subtitle && (
                    <div className="text-[6px] text-gray-500 dark:text-gray-400">
                      {article.subtitle}
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className={`h-1.5 w-full rounded mb-1 ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'}`} />
                  <div className={`h-1 w-2/3 rounded ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'}`} />
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
      case 'hero':
        return renderHeroPreview();
      case 'split':
        return renderSplitPreview();
      case 'triple':
        return renderTriplePreview();
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
        w-full aspect-[21/9] p-4 rounded-lg
        ${isDarkTheme ? 'bg-gray-800' : 'bg-gray-100'}
        border-2 border-transparent hover:border-blue-500/50
        transition-colors duration-200
      `}>
        {getLayoutPreview()}
      </div>
    </div>
  );
};

export default FeaturedLayoutPreview; 