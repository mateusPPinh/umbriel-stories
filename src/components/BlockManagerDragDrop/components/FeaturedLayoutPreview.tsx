import React from 'react';
import { Article } from '../../PageblockV2/types';
import { BlockConfig } from './StyleConfigModal';
import { useClientTheme } from '../hooks/useClientTheme';
import { ClientTheme } from '../types';

// Estendendo o tipo Article para incluir propriedades adicionais
interface ExtendedArticle extends Article {
  featuredImage?: string;
  image?: string;
}

interface FeaturedLayoutPreviewProps {
  variantType: string;
  isDarkTheme?: boolean;
  columns: { [key: string]: ExtendedArticle[] };
  blockConfig: BlockConfig;
  clientGeneralSettingsData: ClientTheme;
}

const FeaturedLayoutPreview: React.FC<FeaturedLayoutPreviewProps> = ({ variantType, isDarkTheme, columns, blockConfig, clientGeneralSettingsData }) => {
  const theme = useClientTheme({ clientGeneralSettingsData, isDarkTheme });
  
  // Log para depuração
  console.log('FeaturedLayoutPreview - variantType:', variantType);
  console.log('FeaturedLayoutPreview - columns:', columns);
  console.log('FeaturedLayoutPreview - col-0:', columns['col-0']);

  const renderHeroPreview = () => {
    const mainArticles = columns['col-0'] || [];
    const article = mainArticles[0];
    const imagePath = article?.content?.image?.desktop_image_path;
    
    // Log para depuração do artigo
    console.log('FeaturedLayoutPreview - Hero article:', article);
    console.log('FeaturedLayoutPreview - Hero image path:', imagePath);
    
    return (
      <div className="w-full aspect-[21/9] rounded-lg overflow-hidden">
        <div className="relative w-full h-full">
          {imagePath ? (
            <>
              <img
                src={imagePath}
                alt={article.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h2 className="text-2xl font-bold mb-2" style={{
                  fontFamily: theme.title.fontFamily,
                  color: theme.title.color,
fontSize: theme?.fontSize?.pageblockTitle
                }}>
                  {article.title}
                </h2>
                {article.subtitle && (
                  <p className="text-base" style={{
                    fontFamily: theme.subtitle.fontFamily,
                    color: theme.subtitle.color,
fontSize: theme?.fontSize?.pageblockSubtitle,

                    
                  }}>
                    {article.subtitle}
                  </p>
                )}
              </div>
            </>
          ) : (
            <>
              <div className={`w-full h-full ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'} animate-pulse`} />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="space-y-2">
                  <div className={`h-6 ${isDarkTheme ? 'bg-gray-600' : 'bg-gray-300'} rounded w-3/4 animate-pulse`} />
                  <div className={`h-4 ${isDarkTheme ? 'bg-gray-600' : 'bg-gray-300'} rounded w-1/2 animate-pulse`} />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  const renderSplitPreview = () => {
    const mainArticles = columns['col-0'] || [];

    return (
      <div className="grid grid-cols-2 gap-6">
        {[...Array(2)].map((_, i) => {
          const article = mainArticles[i];
          const imagePath = article?.content?.image?.desktop_image_path;

          return (
            <div key={i} className="relative">
              {imagePath ? (
                <img
                  src={imagePath}
                  alt={article.title}
                  className="w-full aspect-[16/9] object-cover rounded-lg mb-4"
                />
              ) : (
                <div className={`w-full aspect-[16/9] ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'} rounded-lg mb-4 animate-pulse`} />
              )}

              {article ? (
                <>
                  <div 
                    className="text-base font-medium mb-2"
                    style={{
                      fontFamily: theme.title.fontFamily,
                      color: theme.title.color,
fontSize: theme?.fontSize?.pageblockTitle,

                      
                    }}
                  >
                    {article.title}
                  </div>
                  {article.subtitle && (
                    <div 
                      className="text-sm"
                      style={{
                        fontFamily: theme.subtitle.fontFamily,
                        color: theme.subtitle.color,
fontSize: theme?.fontSize?.pageblockSubtitle,

                        
                      }}
                    >
                      {article.subtitle}
                    </div>
                  )}
                </>
              ) : (
                <div className="space-y-2">
                  <div className={`h-4 ${isDarkTheme ? 'bg-gray-600' : 'bg-gray-300'} rounded w-full animate-pulse`} />
                  <div className={`h-4 ${isDarkTheme ? 'bg-gray-600' : 'bg-gray-300'} rounded w-2/3 animate-pulse`} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const renderTriplePreview = () => {
    const mainArticles = columns['col-0'] || [];

    return (
      <div className="grid grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => {
          const article = mainArticles[i];
          const imagePath = article?.content?.image?.desktop_image_path;

          return (
            <div key={i} className="relative">
              {imagePath ? (
                <img
                  src={imagePath}
                  alt={article.title}
                  className="w-full aspect-[16/9] object-cover rounded-lg mb-4"
                />
              ) : (
                <div className={`w-full aspect-[16/9] ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'} rounded-lg mb-4 animate-pulse`} />
              )}

              {article ? (
                <>
                  <div 
                    className="font-medium mb-2"
                    style={{
                      fontFamily: theme.title.fontFamily,
                      color: theme.title.color,
fontSize: theme?.fontSize?.pageblockTitle,

                      
                    }}
                  >
                    {article.title}
                  </div>
                  {article.subtitle && (
                    <div 
                      className="text-sm"
                      style={{
                        fontFamily: theme.subtitle.fontFamily,
                        color: theme.subtitle.color,
fontSize: theme?.fontSize?.pageblockSubtitle,

                        
                      }}
                    >
                      {article.subtitle}
                    </div>
                  )}
                </>
              ) : (
                <div className="space-y-2">
                  <div className={`h-4 ${isDarkTheme ? 'bg-gray-600' : 'bg-gray-300'} rounded w-full animate-pulse`} />
                  <div className={`h-4 ${isDarkTheme ? 'bg-gray-600' : 'bg-gray-300'} rounded w-2/3 animate-pulse`} />
                </div>
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
        return renderHeroPreview();
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