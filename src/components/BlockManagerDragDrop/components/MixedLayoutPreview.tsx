import React from 'react';
import { Article } from '../../PageblockV2/types';
import { BlockConfig } from './StyleConfigModal';

type LayoutVariant = 'sidebar' | 'showcase' | 'newspaper' | 'magazine' | 'videogrid';

interface MixedLayoutPreviewProps {
  variant: LayoutVariant;
  isDarkTheme?: boolean;
  columns: { [key: string]: Article[] };
  blockConfig: BlockConfig;
}

const MixedLayoutPreview: React.FC<MixedLayoutPreviewProps> = ({ variant, isDarkTheme, columns, blockConfig }) => {
  const theme = blockConfig.styles.theme[isDarkTheme ? 'dark' : 'light'];
  
  const renderSidebarPreview = () => {
    const mainArticle = columns['col-0']?.[0];
    const sidebarArticles = columns['col-1'] || [];
    
    return (
      <div className="grid grid-cols-[2fr,1fr] gap-6">
        {/* Main Content */}
        <div className="space-y-4">
          {/* Featured Article */}
          <article className="flex flex-col">
          <div className={`
              aspect-[16/9] rounded overflow-hidden
            ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'}
          `}>
            {mainArticle?.content?.image?.desktop_image_path && (
                <div className="relative w-full h-full">
              <img
                src={mainArticle.content.image.desktop_image_path}
                alt={mainArticle.title}
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
            </div>
            
            <div className="p-4">
              <div 
                className="text-xl font-semibold mb-2 line-clamp-2"
                style={{
                  fontSize: theme.headingProps.fontSize,
                  fontWeight: theme.headingProps.fontWeight,
                  color: theme.headingProps.color
                }}
              >
                {mainArticle?.title || 'Título do artigo principal'}
              </div>
              
              {blockConfig.styles.showExcerpt && (
                <div 
                  className="line-clamp-2"
                  style={{
                    fontSize: theme.subtitleProps.fontSize,
                    color: theme.subtitleProps.color
                  }}
                >
                  {mainArticle?.subtitle || 'Descrição do artigo principal...'}
                </div>
              )}
            </div>
          </article>
        </div>

        {/* Sidebar */}
        <div className="space-y-4 border-l border-gray-200 dark:border-gray-700 pl-6">
          {[...Array(4)].map((_, i) => {
            const article = sidebarArticles[i];
            
            return (
              <article 
                key={i} 
                className={[
                  'flex gap-4',
                  i !== 3 ? 'border-b border-gray-200 dark:border-gray-700 pb-4' : ''
                ].filter(Boolean).join(' ')}
              >
                {/* Thumbnail */}
                <div className="w-24 aspect-[4/3] rounded overflow-hidden shrink-0">
                  {article?.content?.image?.desktop_image_path ? (
                    <div className="relative w-full h-full">
                    <img
                      src={article.content.image.desktop_image_path}
                      alt={article.title}
                        className={`w-full h-full object-${blockConfig.mediaConfig?.imageConfig?.fit || 'cover'} object-${blockConfig.mediaConfig?.imageConfig?.position || 'center'}`}
                    />
                    </div>
                  ) : (
                    <div className={`w-full h-full ${isDarkTheme ? 'bg-gray-600' : 'bg-gray-300'}`} />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div 
                    className="text-sm font-medium line-clamp-2 mb-1"
                    style={{
                      fontSize: theme.headingProps.fontSize,
                      fontWeight: theme.headingProps.fontWeight,
                      color: theme.headingProps.color
                    }}
                  >
                    {article?.title || 'Título do artigo relacionado'}
                  </div>
                  
                  {blockConfig.styles.showExcerpt && article?.subtitle && (
                    <div 
                      className="text-xs line-clamp-2"
                      style={{
                        fontSize: theme.subtitleProps.fontSize,
                        color: theme.subtitleProps.color
                      }}
                    >
                      {article.subtitle}
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    );
  };

  const renderShowcasePreview = () => {
    const mainArticle = columns['col-0']?.[0];
    const gridArticles = columns['col-1'] || [];
    const listArticles = columns['col-2'] || [];
    
    return (
      <div className="grid grid-cols-12 gap-6">
        {/* Featured Article */}
        <div className="col-span-7">
          <article className="flex flex-col">
            <div className={`
              aspect-[16/9] rounded overflow-hidden
              ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'}
            `}>
            {mainArticle?.content?.image?.desktop_image_path && (
                <div className="relative w-full h-full">
              <img
                src={mainArticle.content.image.desktop_image_path}
                alt={mainArticle.title}
                    className={`w-full h-full object-${blockConfig.mediaConfig?.imageConfig?.fit || 'cover'} object-${blockConfig.mediaConfig?.imageConfig?.position || 'center'}`}
                  />
                  {blockConfig.mediaConfig?.imageConfig?.overlay?.enabled && (
                    <div 
                      className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" 
                      style={{
                        backgroundColor: blockConfig.mediaConfig.imageConfig.overlay.color || 'rgba(0,0,0,0.5)',
                        opacity: blockConfig.mediaConfig.imageConfig.overlay.opacity || 0.5
                      }}
                    />
                  )}
                </div>
              )}
            </div>
            
            <div className="p-4">
              <div 
                className="text-2xl font-bold mb-2 line-clamp-2"
                style={{
                  fontSize: theme.headingProps.fontSize,
                  fontWeight: theme.headingProps.fontWeight,
                  color: theme.headingProps.color
                }}
              >
                {mainArticle?.title || 'Título do artigo principal'}
              </div>
              
              {blockConfig.styles.showExcerpt && (
                <div 
                  className="line-clamp-3"
                  style={{
                    fontSize: theme.subtitleProps.fontSize,
                    color: theme.subtitleProps.color
                  }}
                >
                  {mainArticle?.subtitle || 'Descrição do artigo principal...'}
                  </div>
            )}
          </div>
          </article>
        </div>

        {/* Grid Articles */}
        <div className="col-span-3">
          <div className="grid grid-cols-1 gap-6">
          {[...Array(3)].map((_, i) => {
              const article = gridArticles[i];
            
            return (
                <article key={i} className="flex flex-col">
                <div className={`
                    aspect-[4/3] rounded overflow-hidden mb-3
                  ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'}
                `}>
                  {article?.content?.image?.desktop_image_path && (
                      <div className="relative w-full h-full">
                    <img
                      src={article.content.image.desktop_image_path}
                      alt={article.title}
                          className={`w-full h-full object-${blockConfig.mediaConfig?.imageConfig?.fit || 'cover'} object-${blockConfig.mediaConfig?.imageConfig?.position || 'center'}`}
                        />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div 
                      className="text-sm font-medium line-clamp-2 mb-1"
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
                        className="text-xs line-clamp-2"
                        style={{
                          fontSize: theme.subtitleProps.fontSize,
                          color: theme.subtitleProps.color
                        }}
                      >
                        {article?.subtitle || 'Descrição do artigo...'}
                      </div>
                  )}
                </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* List Articles */}
        <div className="col-span-2 border-l border-gray-200 dark:border-gray-700 pl-6">
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => {
              const article = listArticles[i];
              
              return (
                <article 
                  key={i} 
                  className={[
                    'flex flex-col',
                    i !== 3 ? 'border-b border-gray-200 dark:border-gray-700 pb-4' : ''
                  ].filter(Boolean).join(' ')}
                >
                  <div 
                    className="text-sm font-medium line-clamp-2 mb-1"
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
                      className="text-xs line-clamp-2"
                      style={{
                        fontSize: theme.subtitleProps.fontSize,
                        color: theme.subtitleProps.color
                      }}
                    >
                      {article?.subtitle || 'Descrição do artigo...'}
                    </div>
                  )}
                </article>
            );
          })}
          </div>
        </div>
      </div>
    );
  };

  const renderNewspaperPreview = () => {
    const mainArticles = columns['col-0'] || [];
    const secondaryArticles = columns['col-1'] || [];
    const tertiaryArticles = columns['col-2'] || [];
    
    return (
      <div className="grid grid-cols-12 gap-6">
        {/* Main Articles */}
        <div className="col-span-6">
          {[...Array(2)].map((_, i) => {
            const article = mainArticles[i];
            
            return (
              <article 
                key={i} 
                className={[
                  'flex flex-col',
                  i === 0 ? 'mb-6' : ''
                ].filter(Boolean).join(' ')}
              >
                {article?.content?.image?.desktop_image_path && (
                <div className={`
                    aspect-[16/9] rounded overflow-hidden mb-4
                  ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'}
                `}>
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
                        </div>
                      )}
                
                <div className="p-4">
                  <div 
                    className="text-xl font-semibold mb-2 line-clamp-2"
                    style={{
                      fontSize: theme.headingProps.fontSize,
                      fontWeight: theme.headingProps.fontWeight,
                      color: theme.headingProps.color
                    }}
                  >
                    {article?.title || 'Título do artigo principal'}
                  </div>
                  
                  {blockConfig.styles.showExcerpt && (
                    <div 
                      className="line-clamp-3"
                      style={{
                        fontSize: theme.subtitleProps.fontSize,
                        color: theme.subtitleProps.color
                      }}
                    >
                      {article?.subtitle || 'Descrição do artigo principal...'}
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        {/* Secondary Articles */}
        <div className="col-span-3 border-l border-gray-200 dark:border-gray-700 pl-6">
          <div className="space-y-6">
          {[...Array(4)].map((_, i) => {
            const article = secondaryArticles[i];
            
            return (
                <article 
                  key={i} 
                  className={[
                    'flex flex-col',
                    i !== 3 ? 'border-b border-gray-200 dark:border-gray-700 pb-6' : ''
                  ].filter(Boolean).join(' ')}
                >
                  {article?.content?.image?.desktop_image_path && (
                    <div className={`
                      aspect-[4/3] rounded overflow-hidden mb-4
                      ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'}
                    `}>
                      <div className="relative w-full h-full">
                        <img
                          src={article.content.image.desktop_image_path}
                          alt={article.title}
                          className={`w-full h-full object-${blockConfig.mediaConfig?.imageConfig?.fit || 'cover'} object-${blockConfig.mediaConfig?.imageConfig?.position || 'center'}`}
                        />
                      </div>
                    </div>
                  )}
                  
                  <div className="flex-1">
                    <div 
                      className="text-base font-medium line-clamp-2 mb-1"
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
                        className="text-sm line-clamp-2"
                        style={{
                          fontSize: theme.subtitleProps.fontSize,
                          color: theme.subtitleProps.color
                        }}
                      >
                        {article?.subtitle || 'Descrição do artigo...'}
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Tertiary Articles */}
        <div className="col-span-3 border-l border-gray-200 dark:border-gray-700 pl-6">
          <div className="space-y-6">
            {[...Array(4)].map((_, i) => {
              const article = tertiaryArticles[i];
              
              return (
                <article 
                  key={i} 
                  className={[
                    'flex flex-col',
                    i !== 3 ? 'border-b border-gray-200 dark:border-gray-700 pb-6' : ''
                  ].filter(Boolean).join(' ')}
                >
                  {article?.content?.image?.desktop_image_path && (
                    <div className={`
                      aspect-[4/3] rounded overflow-hidden mb-4
                      ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'}
                    `}>
                      <div className="relative w-full h-full">
                        <img
                          src={article.content.image.desktop_image_path}
                          alt={article.title}
                          className={`w-full h-full object-${blockConfig.mediaConfig?.imageConfig?.fit || 'cover'} object-${blockConfig.mediaConfig?.imageConfig?.position || 'center'}`}
                        />
                      </div>
                    </div>
                  )}
                  
                  <div className="flex-1">
                    <div 
                      className="text-base font-medium line-clamp-2 mb-1"
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
                        className="text-sm line-clamp-2"
                        style={{
                          fontSize: theme.subtitleProps.fontSize,
                          color: theme.subtitleProps.color
                        }}
                      >
                        {article?.subtitle || 'Descrição do artigo...'}
                      </div>
                )}
              </div>
                </article>
            );
          })}
          </div>
        </div>
      </div>
    );
  };

  const renderMagazinePreview = () => {
    const mainArticle = columns['col-0']?.[0];
    const secondaryArticles = columns['col-1'] || [];
    const tertiaryArticles = columns['col-2'] || [];
    
    return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Article */}
        <div className="lg:col-span-6">
          <article className="flex flex-col">
            <div className={`
              aspect-[16/9] rounded overflow-hidden
              ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'}
            `}>
              {mainArticle?.content?.image?.desktop_image_path && (
                <div className="relative w-full h-full">
                  <img
                    src={mainArticle.content.image.desktop_image_path}
                    alt={mainArticle.title}
                    className={`w-full h-full object-${blockConfig.mediaConfig?.imageConfig?.fit || 'cover'} object-${blockConfig.mediaConfig?.imageConfig?.position || 'center'}`}
                  />
                </div>
              )}
            </div>
            
            <div className="p-4">
              <div 
                className="text-2xl font-bold mb-3"
                style={{
                  fontSize: theme.headingProps.fontSize,
                  fontWeight: theme.headingProps.fontWeight,
                  color: theme.headingProps.color
                }}
              >
                {mainArticle?.title || 'Título do artigo principal'}
              </div>
              
              {blockConfig.styles.showExcerpt && (
                <div 
                  className="text-lg line-clamp-3"
                  style={{
                    fontSize: theme.subtitleProps.fontSize,
                    color: theme.subtitleProps.color
                  }}
                >
                  {mainArticle?.subtitle || 'Descrição do artigo principal...'}
                </div>
              )}
            </div>
          </article>
        </div>

        {/* Secondary Articles */}
        <div className="lg:col-span-3">
          <div className="space-y-6">
            {[...Array(3)].map((_, i) => {
              const article = secondaryArticles[i];
              
              return (
                <article key={i} className="flex flex-col">
                  <div className={`
                    aspect-[4/3] rounded overflow-hidden mb-4
                    ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'}
                  `}>
                    {article?.content?.image?.desktop_image_path && (
                      <div className="relative w-full h-full">
                        <img
                          src={article.content.image.desktop_image_path}
                          alt={article.title}
                          className={`w-full h-full object-${blockConfig.mediaConfig?.imageConfig?.fit || 'cover'} object-${blockConfig.mediaConfig?.imageConfig?.position || 'center'}`}
                        />
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4">
                    <div 
                      className="text-xl font-semibold mb-2"
                      style={{
                        fontSize: theme.headingProps.fontSize,
                        fontWeight: theme.headingProps.fontWeight,
                        color: theme.headingProps.color
                      }}
                    >
                      {article?.title || 'Título do artigo secundário'}
                    </div>
                    
                    {blockConfig.styles.showExcerpt && (
                      <div 
                        className="text-base line-clamp-2"
                        style={{
                          fontSize: theme.subtitleProps.fontSize,
                          color: theme.subtitleProps.color
                        }}
                      >
                        {article?.subtitle || 'Descrição do artigo secundário...'}
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Tertiary Articles */}
        <div className="lg:col-span-3">
          <div className="space-y-6">
            {[...Array(4)].map((_, i) => {
              const article = tertiaryArticles[i];
              
              return (
                <article key={i} className="flex flex-col">
                  <div className={`
                    aspect-[4/3] rounded overflow-hidden mb-4
                    ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'}
                  `}>
                    {article?.content?.image?.desktop_image_path && (
                      <div className="relative w-full h-full">
                        <img
                          src={article.content.image.desktop_image_path}
                          alt={article.title}
                          className={`w-full h-full object-${blockConfig.mediaConfig?.imageConfig?.fit || 'cover'} object-${blockConfig.mediaConfig?.imageConfig?.position || 'center'}`}
                        />
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4">
                    <div 
                      className="text-xl font-semibold mb-2"
                      style={{
                        fontSize: theme.headingProps.fontSize,
                        fontWeight: theme.headingProps.fontWeight,
                        color: theme.headingProps.color
                      }}
                    >
                      {article?.title || 'Título do artigo terciário'}
                    </div>
                    
                    {blockConfig.styles.showExcerpt && (
                      <div 
                        className="text-base line-clamp-2"
                        style={{
                          fontSize: theme.subtitleProps.fontSize,
                          color: theme.subtitleProps.color
                        }}
                      >
                        {article?.subtitle || 'Descrição do artigo terciário...'}
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const renderVideoGridPreview = () => {
    const mainArticle = columns['col-0']?.[0];
    const secondaryArticles = columns['col-1'] || [];
    const tertiaryArticles = columns['col-2'] || [];
    
    return (
      <div className="grid grid-cols-12 gap-6">
        {/* Main Video */}
        <div className="col-span-6">
          <article className="flex flex-col">
          <div className={`
              aspect-[16/9] rounded overflow-hidden relative
            ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'}
          `}>
              {mainArticle?.content?.image?.desktop_image_path && (
                <div className="relative w-full h-full">
                  <img
                    src={mainArticle.content.image.desktop_image_path}
                    alt={mainArticle.title}
                    className={`w-full h-full object-${blockConfig.mediaConfig?.imageConfig?.fit || 'cover'} object-${blockConfig.mediaConfig?.imageConfig?.position || 'center'}`}
                />
                <div className="absolute inset-0 bg-black/20" />
                </div>
            )}
              
            {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className={`
                  w-16 h-16 rounded-full flex items-center justify-center
                  ${isDarkTheme ? 'bg-white/20' : 'bg-black/20'}
                  hover:scale-110 transition-transform duration-200
                `}>
                  <div className={`
                    w-0 h-0 border-t-[12px] border-t-transparent
                    border-l-[20px] border-r-0
                    border-b-[12px] border-b-transparent
                    ${isDarkTheme ? 'border-l-white' : 'border-l-white'}
                    ml-1
                  `} />
                </div>
              </div>
            </div>
            
            <div className="p-4">
              <div 
                className="text-xl font-semibold mb-2 line-clamp-2"
                style={{
                  fontSize: theme.headingProps.fontSize,
                  fontWeight: theme.headingProps.fontWeight,
                  color: theme.headingProps.color
                }}
              >
                {mainArticle?.title || 'Título do vídeo principal'}
              </div>
              
              {blockConfig.styles.showExcerpt && (
                <div 
                  className="line-clamp-2"
                  style={{
                    fontSize: theme.subtitleProps.fontSize,
                    color: theme.subtitleProps.color
                  }}
                >
                  {mainArticle?.subtitle || 'Descrição do vídeo principal...'}
                </div>
              )}
            </div>
          </article>
        </div>

        {/* Secondary Videos */}
        <div className="col-span-3 border-l border-gray-200 dark:border-gray-700 pl-6">
          <div className="space-y-6">
            {[...Array(3)].map((_, i) => {
              const article = secondaryArticles[i];
              
              return (
                <article 
                  key={i} 
                  className={[
                    'flex gap-4',
                    i !== 2 ? 'border-b border-gray-200 dark:border-gray-700 pb-6' : ''
                  ].filter(Boolean).join(' ')}
                >
                  <div className={`
                    w-32 aspect-[16/9] rounded overflow-hidden relative shrink-0
                    ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'}
                  `}>
                    {article?.content?.image?.desktop_image_path && (
                      <div className="relative w-full h-full">
                        <img
                          src={article.content.image.desktop_image_path}
                          alt={article.title}
                          className={`w-full h-full object-${blockConfig.mediaConfig?.imageConfig?.fit || 'cover'} object-${blockConfig.mediaConfig?.imageConfig?.position || 'center'}`}
                        />
                        <div className="absolute inset-0 bg-black/20" />
                      </div>
                    )}
                    
                    {/* Small Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center
                ${isDarkTheme ? 'bg-white/20' : 'bg-black/20'}
                        hover:scale-110 transition-transform duration-200
              `}>
                <div className={`
                  w-0 h-0 border-t-[6px] border-t-transparent
                  border-l-[10px] border-r-0
                  border-b-[6px] border-b-transparent
                  ${isDarkTheme ? 'border-l-white' : 'border-l-white'}
                  ml-0.5
                `} />
              </div>
            </div>
          </div>
                  
                  <div className="flex-1 min-w-0">
                    <div 
                      className="text-sm font-medium line-clamp-2 mb-1"
                      style={{
                        fontSize: theme.headingProps.fontSize,
                        fontWeight: theme.headingProps.fontWeight,
                        color: theme.headingProps.color
                      }}
                    >
                      {article?.title || 'Título do vídeo'}
              </div>
                    
                    {blockConfig.styles.showExcerpt && (
                      <div 
                        className="text-xs line-clamp-2"
                        style={{
                          fontSize: theme.subtitleProps.fontSize,
                          color: theme.subtitleProps.color
                        }}
                      >
                        {article?.subtitle || 'Descrição do vídeo...'}
                </div>
              )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Tertiary Videos */}
        <div className="col-span-3 border-l border-gray-200 dark:border-gray-700 pl-6">
          <div className="space-y-6">
          {[...Array(3)].map((_, i) => {
              const article = tertiaryArticles[i];
            
            return (
                <article 
                  key={i} 
                  className={[
                    'flex gap-4',
                    i !== 2 ? 'border-b border-gray-200 dark:border-gray-700 pb-6' : ''
                  ].filter(Boolean).join(' ')}
                >
                <div className={`
                    w-32 aspect-[16/9] rounded overflow-hidden relative shrink-0
                  ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'}
                `}>
                    {article?.content?.image?.desktop_image_path && (
                      <div className="relative w-full h-full">
                        <img
                          src={article.content.image.desktop_image_path}
                          alt={article.title}
                          className={`w-full h-full object-${blockConfig.mediaConfig?.imageConfig?.fit || 'cover'} object-${blockConfig.mediaConfig?.imageConfig?.position || 'center'}`}
                      />
                      <div className="absolute inset-0 bg-black/20" />
                      </div>
                  )}
                    
                  {/* Small Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className={`
                        w-8 h-8 rounded-full flex items-center justify-center
                      ${isDarkTheme ? 'bg-white/20' : 'bg-black/20'}
                        hover:scale-110 transition-transform duration-200
                    `}>
                      <div className={`
                          w-0 h-0 border-t-[6px] border-t-transparent
                          border-l-[10px] border-r-0
                          border-b-[6px] border-b-transparent
                        ${isDarkTheme ? 'border-l-white' : 'border-l-white'}
                        ml-0.5
                      `} />
                    </div>
                  </div>
                </div>
                  
                  <div className="flex-1 min-w-0">
                    <div 
                      className="text-sm font-medium line-clamp-2 mb-1"
                      style={{
                        fontSize: theme.headingProps.fontSize,
                        fontWeight: theme.headingProps.fontWeight,
                        color: theme.headingProps.color
                      }}
                    >
                      {article?.title || 'Título do vídeo'}
                    </div>
                    
                    {blockConfig.styles.showExcerpt && (
                      <div 
                        className="text-xs line-clamp-2"
                        style={{
                          fontSize: theme.subtitleProps.fontSize,
                          color: theme.subtitleProps.color
                        }}
                      >
                        {article?.subtitle || 'Descrição do vídeo...'}
                      </div>
                  )}
                </div>
                </article>
            );
          })}
          </div>
        </div>
      </div>
    );
  };

  const getLayoutPreview = () => {
    switch (variant) {
      case 'sidebar':
        return renderSidebarPreview();
      case 'showcase':
        return renderShowcasePreview();
      case 'newspaper':
        return renderNewspaperPreview();
      case 'magazine':
        return renderMagazinePreview();
      case 'videogrid':
        return renderVideoGridPreview();
      default:
        return renderSidebarPreview();
    }
  };

  return (
    <div className={`
      rounded-lg overflow-hidden border
      ${isDarkTheme ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
    `}>
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Preview do Layout {variant}
        </h3>
      </div>
      <div className="p-4">
        {getLayoutPreview()}
      </div>
    </div>
  );
};

export default MixedLayoutPreview; 