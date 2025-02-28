import React from 'react';
import { Article } from '../../PageblockV2/types';

interface LayoutPreviewProps {
  variantType: string;
  isDarkTheme?: boolean;
  columns: { [key: string]: Article[] };
}

const LayoutPreview: React.FC<LayoutPreviewProps> = ({ variantType, isDarkTheme, columns }) => {
  // Helper function to render a preview item
  const renderPreviewItem = (article?: Article) => {
    if (!article) {
      return (
        <>
          <div className={`aspect-[16/10] rounded h-full ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'}`} />
          <div className="space-y-1">
            <div className={`h-2 rounded ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'}`} />
            <div className={`h-2 rounded w-2/3 ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'}`} />
          </div>
        </>
      );
    }

    return (
      <>
        <div className="aspect-[16/10] h-full rounded overflow-hidden relative">
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
        <div className="space-y-1">
          <div className="h-2 overflow-hidden">
            <div className={`text-[8px] font-medium truncate ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
              {article.title}
            </div>
          </div>
          {article.content?.description && (
            <div className="h-2 overflow-hidden">
              <div className={`text-[6px] truncate ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>
                {article.content.description}
              </div>
            </div>
          )}
        </div>
      </>
    );
  };

  const getLayoutPreview = () => {
    switch (variantType) {
      case 'newsgrid':
        return (
          <div className="grid grid-cols-5 gap-1 h-full">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex flex-col gap-1">
                {renderPreviewItem(columns[`col-${i}`]?.[0])}
              </div>
            ))}
          </div>
        );

      case 'newsfeed':
        return (
          <div className="grid grid-cols-2 gap-2 h-full">
            <div className="space-y-2">
              {renderPreviewItem(columns['col-0']?.[0])}
            </div>
            <div className="space-y-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex gap-2">
                  {columns['col-1']?.[i] ? (
                    <>
                      <div className="w-16 h-12 rounded overflow-hidden shrink-0 max-h-[300px]">
                        {columns['col-1'][i].content?.image?.desktop_image_path ? (
                          <img
                            src={columns['col-1'][i].content.image.desktop_image_path}
                            alt={columns['col-1'][i].title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className={`w-full h-full ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'}`} />
                        )}
                      </div>
                      <div className="space-y-1 flex-1 overflow-hidden">
                        <div className="h-2">
                          <div className={`text-[8px] font-medium truncate ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
                            {columns['col-1'][i].title}
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className={`w-16 h-12 rounded shrink-0 ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'}`} />
                      <div className="space-y-1 flex-1">
                        <div className={`h-2 rounded ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'}`} />
                        <div className={`h-2 rounded w-2/3 ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'}`} />
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 'standard':
        return (
          <div className="grid grid-cols-3 gap-2 h-full">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-2">
                {renderPreviewItem(columns['col-0']?.[i])}
              </div>
            ))}
          </div>
        );

      case 'featured':
        return (
          <div className="grid grid-cols-3 gap-2 h-full">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="relative">
                {columns['col-0']?.[i] ? (
                  <>
                    <div className="aspect-[16/10] rounded overflow-hidden">
                      {columns['col-0'][i].content?.image?.desktop_image_path ? (
                        <img
                          src={columns['col-0'][i].content.image.desktop_image_path}
                          alt={columns['col-0'][i].title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className={`w-full h-full ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'}`} />
                      )}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-2 space-y-1 bg-gradient-to-t from-black/60 to-transparent">
                      <div className="h-2 overflow-hidden">
                        <div className="text-[8px] font-medium truncate text-white">
                          {columns['col-0'][i].title}
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className={`aspect-[16/10] rounded  ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'}`} />
                    <div className="absolute bottom-0 left-0 right-0 p-2 space-y-1">
                      <div className={`h-2 rounded bg-white/80`} />
                      <div className={`h-2 rounded w-2/3 bg-white/60`} />
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        );

      case 'masonry':
        return (
          <div className="columns-3 gap-2 h-full">
            {[...Array(9)].map((_, i) => {
              const colIndex = Math.floor(i / 3);
              const itemIndex = i % 3;
              const article = columns[`col-${colIndex}`]?.[itemIndex];

              return (
                <div key={i} className="break-inside-avoid mb-2">
                  {article ? (
                    <>
                      <div className={`rounded overflow-hidden ${i % 3 === 0 ? 'aspect-square' : i % 3 === 1 ? 'aspect-[3/4]' : 'aspect-[4/3]'}`}>
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
                      <div className="mt-1 space-y-1">
                        <div className="h-2 overflow-hidden">
                          <div className={`text-[8px] font-medium truncate ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
                            {article.title}
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className={`rounded ${i % 3 === 0 ? 'aspect-square' : i % 3 === 1 ? 'aspect-[3/4]' : 'aspect-[4/3]'} ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'}`} />
                      <div className="mt-1 space-y-1">
                        <div className={`h-2 rounded ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'}`} />
                        <div className={`h-2 rounded w-2/3 ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'}`} />
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        );

      case 'sidebargrid':
        return (
          <div className="grid grid-cols-3 gap-2 h-full">
            <div className="col-span-2 space-y-2">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="space-y-2">
                  {renderPreviewItem(columns['col-0']?.[i])}
                </div>
              ))}
            </div>
            <div className="space-y-2 border-l border-gray-200 dark:border-gray-700 pl-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex gap-2">
                  {columns['col-1']?.[i] ? (
                    <>
                      <div className="w-16 h-12 rounded overflow-hidden shrink-0">
                        {columns['col-1'][i].content?.image?.desktop_image_path ? (
                          <img
                            src={columns['col-1'][i].content.image.desktop_image_path}
                            alt={columns['col-1'][i].title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className={`w-full h-full ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'}`} />
                        )}
                      </div>
                      <div className="space-y-1 flex-1 overflow-hidden">
                        <div className="h-2">
                          <div className={`text-[8px] font-medium truncate ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
                            {columns['col-1'][i].title}
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className={`w-16 h-12 rounded shrink-0 ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'}`} />
                      <div className="space-y-1 flex-1">
                        <div className={`h-2 rounded ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'}`} />
                        <div className={`h-2 rounded w-2/3 ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'}`} />
                      </div>
                    </>
                  )}
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
        w-full aspect-[21/9] p-2 rounded-lg
        ${isDarkTheme ? 'bg-gray-800' : 'bg-gray-100'}
        border-2 border-transparent hover:border-blue-500/50
        transition-colors duration-200
      `}>
        {getLayoutPreview()}
      </div>
    </div>
  );
};

export default LayoutPreview; 