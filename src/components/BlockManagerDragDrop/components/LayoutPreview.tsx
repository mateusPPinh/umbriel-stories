import React from 'react';
import { Article } from '../../PageblockV2/types';

interface LayoutPreviewProps {
  variantType: string;
  isDarkTheme?: boolean;
  columns: { [key: string]: Article[] };
}

const LayoutPreview: React.FC<LayoutPreviewProps> = ({ variantType, isDarkTheme, columns }) => {
  // Helper function to render a preview item
  const renderPreviewItem = (article?: Article, size: 'small' | 'medium' | 'large' = 'medium') => {
    const aspectRatio = size === 'small' ? 'aspect-[4/3]' : size === 'large' ? 'aspect-[16/9]' : 'aspect-[16/10]';
    
    if (!article) {
      return (
        <div className="flex flex-col gap-2">
          <div className={`${aspectRatio} rounded ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'}`} />
          <div className="space-y-1.5">
            <div className={`h-2.5 rounded ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'}`} />
            <div className={`h-2 rounded w-2/3 ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'}`} />
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-2">
        <div className={`${aspectRatio} rounded overflow-hidden`}>
          {article.content?.image?.desktop_image_path ? (
            <img
              src={article.content.image.desktop_image_path}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className={`w-full h-full ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'}`} />
          )}
        </div>
        <div className="space-y-1.5">
          <div className="h-2.5 overflow-hidden">
            <div className={`text-xs font-medium line-clamp-1 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
              {article.title}
            </div>
          </div>
          {article.content?.description && (
            <div className="h-2 overflow-hidden">
              <div className={`text-[10px] line-clamp-1 ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>
                {article.content.description}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const getLayoutPreview = () => {
    switch (variantType) {
      case 'newsgrid':
        return (
          <div className="grid grid-cols-4 gap-4 h-full">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex flex-col">
                {renderPreviewItem(columns[`col-0`]?.[i], 'medium')}
              </div>
            ))}
          </div>
        );

      case 'newsfeed':
        return (
          <div className="grid grid-cols-2 gap-6 h-full">
            <div>
              {renderPreviewItem(columns['col-0']?.[0], 'large')}
            </div>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-24 shrink-0">
                    {renderPreviewItem(columns['col-0']?.[i + 1], 'small')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="space-y-1.5">
                      <div className="h-2.5">
                        <div className={`text-xs font-medium line-clamp-2 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
                          {columns['col-0']?.[i + 1]?.title || ''}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'standard':
        return (
          <div className="grid grid-cols-3 gap-4 h-full">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="space-y-4">
                {[...Array(2)].map((_, j) => (
                  <div key={j}>
                    {renderPreviewItem(columns[`col-${i}`]?.[j], 'medium')}
                  </div>
                ))}
              </div>
            ))}
          </div>
        );

      case 'featured':
        return (
          <div className="grid grid-cols-3 gap-4 h-full">
            <div className="col-span-2">
              {renderPreviewItem(columns['col-0']?.[0], 'large')}
            </div>
            <div className="space-y-4">
              {[...Array(2)].map((_, i) => (
                <div key={i}>
                  {renderPreviewItem(columns['col-1']?.[i], 'small')}
                </div>
              ))}
            </div>
          </div>
        );

      case 'masonry':
        return (
          <div className="grid grid-cols-3 gap-4 h-full">
            {[...Array(6)].map((_, i) => (
              <div key={i} className={`${i < 3 ? 'mb-4' : ''}`}>
                {renderPreviewItem(columns[`col-${Math.floor(i/2)}`]?.[i % 2], 'medium')}
              </div>
            ))}
          </div>
        );

      case 'sidebargrid':
        return (
          <div className="grid grid-cols-3 gap-4 h-full">
            <div className="col-span-2 grid grid-cols-2 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i}>
                  {renderPreviewItem(columns['col-0']?.[i], 'medium')}
                </div>
              ))}
            </div>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i}>
                  {renderPreviewItem(columns['col-1']?.[i], 'small')}
                </div>
              ))}
            </div>
          </div>
        );

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
        w-full aspect-[16/9] p-4 rounded-lg overflow-hidden
        ${isDarkTheme ? 'bg-gray-800/50' : 'bg-gray-100/50'}
        border border-gray-200 dark:border-gray-700
        hover:border-blue-500/50 dark:hover:border-blue-500/50
        transition-colors duration-200
      `}>
        <div className="w-full h-full">
          {getLayoutPreview()}
        </div>
      </div>
    </div>
  );
};

export default LayoutPreview; 