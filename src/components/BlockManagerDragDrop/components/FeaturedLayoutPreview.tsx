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
  
  const renderHeroPreview = () => {
    const article = columns['col-0']?.[0];
    
    return (
      <div 
        className="relative rounded overflow-hidden"
        style={{ height: heroHeight }}
      >
        {/* Background */}
        <div className={`absolute inset-0 ${isDarkTheme ? 'bg-gray-800' : 'bg-gray-200'}`}>
          {article?.content?.image?.desktop_image_path && (
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
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          {article ? (
            <div className="max-w-3xl">
              <div 
                className="text-white text-xl md:text-2xl font-bold mb-2"
                style={{
                  fontSize: theme.headingProps.fontSize,
                  fontWeight: theme.headingProps.fontWeight,
                  color: 'white' // Mantém branco para legibilidade
                }}
              >
                {article.title}
              </div>
              {blockConfig.styles.showExcerpt && article.content?.description && (
                <div 
                  className="text-white/80 text-sm md:text-base line-clamp-2"
                  style={{
                    fontSize: theme.subtitleProps.fontSize,
                    color: 'rgba(255, 255, 255, 0.8)' // Mantém branco com transparência para legibilidade
                  }}
                >
                  {article.content.description}
                </div>
              )}
            </div>
          ) : (
            <div className="max-w-3xl">
              <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
            </div>
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
      <div 
        className={`
          w-full p-4 rounded-lg overflow-hidden
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

export default FeaturedLayoutPreview; 