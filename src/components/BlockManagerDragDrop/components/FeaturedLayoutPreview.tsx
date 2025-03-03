import React from 'react';
import { Article } from '../../PageblockV2/types';
import { BlockConfig } from './StyleConfigModal';

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
}

const FeaturedLayoutPreview: React.FC<FeaturedLayoutPreviewProps> = ({ variantType, isDarkTheme, columns, blockConfig }) => {
  const theme = blockConfig.styles.theme[isDarkTheme ? 'dark' : 'light'];
  
  // Log para depuração
  console.log('FeaturedLayoutPreview - variantType:', variantType);
  console.log('FeaturedLayoutPreview - columns:', columns);
  console.log('FeaturedLayoutPreview - col-0:', columns['col-0']);

  const renderHeroPreview = () => {
    const article = columns['col-0']?.[0];
    
    // Log para depuração do artigo
    console.log('FeaturedLayoutPreview - Hero article:', article);
    console.log('FeaturedLayoutPreview - Hero image path:', article?.content?.image?.desktop_image_path);
    
    // Tentar obter a imagem de diferentes propriedades possíveis
    const imagePath = article?.content?.image?.desktop_image_path || 
                      article?.featuredImage || 
                      article?.image || 
                      (article?.content?.image && typeof article.content.image === 'string' ? article.content.image : null);
    
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
                <h2 className="text-white text-2xl font-bold mb-2">
                  {article.title}
                </h2>
                {article.subtitle && (
                  <p className="text-white/80 text-base">
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
      <div className="grid grid-cols-2 gap-4 w-full">
        {[...Array(2)].map((_, i) => {
          const article = mainArticles[i];
          
          // Tentar obter a imagem de diferentes propriedades possíveis
          const imagePath = article?.content?.image?.desktop_image_path || 
                          article?.featuredImage || 
                          article?.image || 
                          (article?.content?.image && typeof article.content.image === 'string' ? article.content.image : null);
          
          return (
            <div key={i} className="flex flex-col gap-4 h-full">
              <div className={`
                aspect-video rounded-lg overflow-hidden
                ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'}
                w-full
              `}>
                {imagePath ? (
                  <img
                    src={imagePath}
                    alt={article?.title || 'Preview image'}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className={`w-full h-full ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'} animate-pulse flex items-center justify-center`}>
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
              </div>

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
      <div className="grid grid-cols-3 gap-4 w-full">
        {[...Array(3)].map((_, i) => {
          const article = mainArticles[i];
          
          // Tentar obter a imagem de diferentes propriedades possíveis
          const imagePath = article?.content?.image?.desktop_image_path || 
                          article?.featuredImage || 
                          article?.image || 
                          (article?.content?.image && typeof article.content.image === 'string' ? article.content.image : null);
          
          return (
            <div key={i} className="flex flex-col h-full">
              <div className={`
                aspect-video rounded-lg overflow-hidden mb-3
                ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'}
                w-full
              `}>
                {imagePath ? (
                  <img
                    src={imagePath}
                    alt={article?.title || 'Preview image'}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className={`w-full h-full ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'} animate-pulse flex items-center justify-center`}>
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
              </div>

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