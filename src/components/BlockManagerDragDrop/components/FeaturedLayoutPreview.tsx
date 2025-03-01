import React from 'react';
import { Article } from '../../PageblockV2/types';
import { BlockConfig } from './StyleConfigModal';

interface FeaturedLayoutPreviewProps {
  variantType: string;
  isDarkTheme?: boolean;
  columns: { [key: string]: Article[] };
  blockConfig: BlockConfig;
}

const FeaturedLayoutPreview: React.FC<FeaturedLayoutPreviewProps> = ({ variantType, isDarkTheme, columns, blockConfig }) => {
  const theme = blockConfig.styles.theme[isDarkTheme ? 'dark' : 'light'];
  const heroHeight = blockConfig.styles.heroHeight || '400px';
  const splitRatio = blockConfig.styles.splitRatio || '1:1';
  
  const variants = [
    { 
      id: 'hero', 
      skeleton: (
        <div className="w-full aspect-[21/9] rounded-lg overflow-hidden">
          <div className={`w-full h-full ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'} animate-pulse`} />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="space-y-2">
              <div className={`h-6 ${isDarkTheme ? 'bg-gray-600' : 'bg-gray-300'} rounded w-3/4 animate-pulse`} />
              <div className={`h-4 ${isDarkTheme ? 'bg-gray-600' : 'bg-gray-300'} rounded w-1/2 animate-pulse`} />
            </div>
          </div>
        </div>
      )
    },
    { 
      id: 'split',
      skeleton: (
        <div className="grid grid-cols-2 gap-4">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-4">
              <div className="w-1/2">
                <div className={`aspect-video rounded-lg ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'} animate-pulse`} />
              </div>
              <div className="w-1/2 space-y-2">
                <div className={`h-4 ${isDarkTheme ? 'bg-gray-600' : 'bg-gray-300'} rounded w-full animate-pulse`} />
                <div className={`h-4 ${isDarkTheme ? 'bg-gray-600' : 'bg-gray-300'} rounded w-2/3 animate-pulse`} />
              </div>
            </div>
          ))}
        </div>
      )
    },
    { 
      id: 'triple',
      skeleton: (
        <div className="grid grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-2">
              <div className={`aspect-video rounded-lg ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'} animate-pulse`} />
              <div className={`h-4 ${isDarkTheme ? 'bg-gray-600' : 'bg-gray-300'} rounded w-full animate-pulse`} />
              <div className={`h-4 ${isDarkTheme ? 'bg-gray-600' : 'bg-gray-300'} rounded w-2/3 animate-pulse`} />
            </div>
          ))}
        </div>
      )
    }
  ];

  const currentVariant = variants.find(v => v.id === variantType) || variants[0];

  const renderHeroPreview = () => {
    console.log('Columns:', columns);
    const article = columns['col-0']?.[0];
    console.log('Selected Article:', article);
    
    if (!article) {
      return currentVariant.skeleton;
    }
    
    return (
      <div className="w-full aspect-[21/9] rounded-lg overflow-hidden">
        <div className="relative w-full h-full">
          {article.content?.image?.desktop_image_path && (
            <>
              <img
                src={article.content.image.desktop_image_path}
                alt={article.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            </>
          )}
          
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <h2 className="text-white text-2xl font-bold mb-2">
              {article.title}
            </h2>
            {article.subtitle && (
              <p className="text-white/80 text-base">
                {article.subtitle}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderSplitPreview = () => {
    const articles = columns['col-0'] || [];
    
    if (articles.length === 0) {
      return currentVariant.skeleton;
    }
    
    return (
      <div className="grid grid-cols-2 gap-4">
        {[...Array(2)].map((_, i) => {
          const article = columns['col-0']?.[i];
          
          return (
            <div key={i} className="flex gap-4">
              {/* Image */}
              <div className="w-1/2">
                <div className={`
                  aspect-video rounded-lg overflow-hidden
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
                    <div 
                      className="text-base font-medium text-gray-900 dark:text-white mb-2"
                      style={{
                        fontSize: theme.headingProps.fontSize,
                        fontWeight: theme.headingProps.fontWeight,
                        color: theme.headingProps.color
                      }}
                    >
                      {article.title}
                    </div>
                    {article.subtitle && (
                      <div 
                        className="text-sm text-gray-500 dark:text-gray-400"
                        style={{
                          fontSize: theme.subtitleProps.fontSize,
                          color: theme.subtitleProps.color
                        }}
                      >
                        {article.subtitle}
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div className={`h-4 w-full rounded mb-2 ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'}`} />
                    <div className={`h-3 w-2/3 rounded ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'}`} />
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
    const articles = columns['col-0'] || [];
    
    if (articles.length === 0) {
      return currentVariant.skeleton;
    }
    
    return (
      <div className="grid grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => {
          const article = columns['col-0']?.[i];
          
          return (
            <div key={i} className="flex flex-col">
              {/* Image */}
              <div className={`
                aspect-video rounded-lg overflow-hidden mb-3
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
                  <div 
                    className="font-medium text-gray-900 dark:text-white mb-2"
                    style={{
                      fontSize: theme.headingProps.fontSize,
                      fontWeight: theme.headingProps.fontWeight,
                      color: theme.headingProps.color
                    }}
                  >
                    {article.title}
                  </div>
                  {article.subtitle && (
                    <div 
                      className="text-gray-500 dark:text-gray-400"
                      style={{
                        fontSize: theme.subtitleProps.fontSize,
                        color: theme.subtitleProps.color
                      }}
                    >
                      {article.subtitle}
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className={`h-4 w-full rounded mb-2 ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'}`} />
                  <div className={`h-3 w-2/3 rounded ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'}`} />
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
        return currentVariant.skeleton;
    }
  };

  return (
    <div className="relative">
      <div className="text-sm font-medium mb-2 text-gray-600 dark:text-gray-400">
        Preview do Layout
      </div>
      <div 
        className={`
          w-full p-6 rounded-lg overflow-hidden
          border border-gray-200 dark:border-gray-700
          hover:border-blue-500/50 dark:hover:border-blue-500/50
          transition-colors duration-200
          min-h-[500px] flex flex-col
        `}
        style={{
          backgroundColor: blockConfig.layout.styles.backgroundColor || (isDarkTheme ? 'rgba(31, 41, 55, 0.5)' : 'rgba(243, 244, 246, 0.5)')
        }}
      >
        <div className="w-full h-full flex-1 flex items-center justify-center">
          {getLayoutPreview()}
        </div>
      </div>
    </div>
  );
};

export default FeaturedLayoutPreview; 