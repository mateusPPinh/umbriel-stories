import React from 'react';
import { Article } from '../../PageblockV2/types';

type LayoutVariant = 'sidebar' | 'showcase' | 'newspaper' | 'magazine' | 'videogrid';

interface MixedLayoutPreviewProps {
  variantType: LayoutVariant;
  isDarkTheme?: boolean;
  columns: { [key: string]: Article[] };
}

const MixedLayoutPreview: React.FC<MixedLayoutPreviewProps> = ({ variantType, isDarkTheme, columns }) => {
  const renderSidebarPreview = () => {
    const mainArticle = columns['col-0']?.[0];
    const sidebarArticles = columns['col-1'] || [];
    
    return (
      <div className="grid grid-cols-[2fr,1fr] gap-3">
        {/* Main Content */}
        <div className="space-y-3">
          {/* Featured Article */}
          <div className={`
            aspect-video rounded overflow-hidden max-h-[300px]
            ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'}
          `}>
            {mainArticle?.content?.image?.desktop_image_path && (
              <img
                src={mainArticle.content.image.desktop_image_path}
                alt={mainArticle.title}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          {mainArticle ? (
            <>
              <div className="text-[20px] font-medium text-gray-900 dark:text-white">
                {mainArticle.title}
              </div>
              {mainArticle.subtitle && (
                <div className="text-[10px] text-gray-500 dark:text-gray-400">
                  {mainArticle.subtitle}
                </div>
              )}
            </>
          ) : (
            <>
              <div className={`h-2 rounded w-full ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'}`} />
              <div className={`h-1.5 rounded w-2/3 ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'}`} />
            </>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-2">
          {[...Array(4)].map((_, i) => {
            const article = sidebarArticles[i];
            
            return (
              <div key={i} className="flex gap-2">
                <div className={`
                  w-16 aspect-square rounded overflow-hidden shrink-0
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
                <div className="min-w-0">
                  {article ? (
                    <div className="text-[18px] font-medium text-gray-900 dark:text-white line-clamp-2">
                      {article.title}
                    </div>
                  ) : (
                    <>
                      <div className={`h-1.5 rounded w-full mb-1 ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'}`} />
                      <div className={`h-1.5 rounded w-2/3 ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'}`} />
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

  const renderShowcasePreview = () => {
    const mainArticle = columns['col-0']?.[0];
    const secondaryArticles = columns['col-1'] || [];
    
    return (
      <div className="space-y-3">
        {/* Hero Article */}
        <div className="relative aspect-[21/9] rounded overflow-hidden max-h-[300px]">
          <div className={`absolute inset-0 ${isDarkTheme ? 'bg-gray-800' : 'bg-gray-200'}`}>
            {mainArticle?.content?.image?.desktop_image_path && (
              <img
                src={mainArticle.content.image.desktop_image_path}
                alt={mainArticle.title}
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-3">
            {mainArticle ? (
              <>
                <div className="text-[20px] font-medium text-white mb-1">
                  {mainArticle.title}
                </div>
                {mainArticle.subtitle && (
                  <div className="text-[12px] text-white/80">
                    {mainArticle.subtitle}
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

        {/* Secondary Articles */}
        <div className="grid grid-cols-3 gap-2">
          {[...Array(3)].map((_, i) => {
            const article = secondaryArticles[i];
            
            return (
              <div key={i} className="space-y-1">
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
                {article ? (
                  <div className="text-[8px] font-medium text-gray-900 dark:text-white">
                    {article.title}
                  </div>
                ) : (
                  <div className={`h-1.5 rounded w-full ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'}`} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderNewspaperPreview = () => {
    const mainArticles = columns['col-0'] || [];
    const secondaryArticles = columns['col-1'] || [];
    
    return (
      <div className="grid grid-cols-[2fr,1fr] gap-4">
        {/* Main Column */}
        <div className="space-y-4">
          {[...Array(2)].map((_, i) => {
            const article = mainArticles[i];
            
            return (
              <div key={i} className="flex gap-3">
                <div className={`
                  w-1/3 aspect-[4/3] rounded overflow-hidden max-h-[300px]
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
                <div className="flex-1">
                  {article ? (
                    <>
                      <div className="text-[20px] font-medium text-gray-900 dark:text-white mb-1">
                        {article.title}
                      </div>
                      {article.subtitle && (
                        <div className="text-[12px] text-gray-500 dark:text-gray-400">
                          {article.subtitle}
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <div className={`h-2 rounded w-full mb-1 ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'}`} />
                      <div className={`h-1.5 rounded w-2/3 ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'}`} />
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Secondary Column */}
        <div className="space-y-2 border-l border-gray-200 dark:border-gray-700 pl-4">
          {[...Array(4)].map((_, i) => {
            const article = secondaryArticles[i];
            
            return (
              <div key={i}>
                {article ? (
                  <>
                    <div className="text-[20px] font-medium text-gray-900 dark:text-white mb-0.5">
                      {article.title}
                    </div>
                    {article.subtitle && (
                      <div className="text-[12px] text-gray-500 dark:text-gray-400">
                        {article.subtitle}
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div className={`h-1.5 rounded w-full mb-1 ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'}`} />
                    <div className={`h-1 rounded w-2/3 ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'}`} />
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderMagazinePreview = () => {
    const mainArticle = columns['col-0']?.[0];
    const secondaryArticles = columns['col-1'] || [];
    const tertiaryArticles = columns['col-2'] || [];
    
    return (
      <div className="space-y-4">
        {/* Hero Article */}
        <div className="grid grid-cols-[1.5fr,1fr] gap-4">
          <div className={`
            aspect-[4/3] rounded overflow-hidden max-h-[300px]
            ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'}
          `}>
            {mainArticle?.content?.image?.desktop_image_path && (
              <img
                src={mainArticle.content.image.desktop_image_path}
                alt={mainArticle.title}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div>
            {mainArticle ? (
              <>
                <div className="text-[20px] font-medium text-gray-900 dark:text-white mb-1">
                  {mainArticle.title}
                </div>
                {mainArticle.subtitle && (
                  <div className="text-[12px] text-gray-500 dark:text-gray-400">
                    {mainArticle.subtitle}
                  </div>
                )}
              </>
            ) : (
              <>
                <div className={`h-2 rounded w-full mb-1 ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'}`} />
                <div className={`h-1.5 rounded w-2/3 ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'}`} />
              </>
            )}
          </div>
        </div>

        {/* Secondary Grid */}
        <div className="grid grid-cols-3 gap-3">
          {[...Array(3)].map((_, i) => {
            const article = secondaryArticles[i];
            
            return (
              <div key={i} className="space-y-2">
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
                {article ? (
                  <div className="text-[18px] font-medium text-gray-900 dark:text-white">
                    {article.title}
                  </div>
                ) : (
                  <div className={`h-1.5 rounded w-full ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'}`} />
                )}
              </div>
            );
          })}
        </div>

        {/* Tertiary Articles */}
        <div className="grid grid-cols-4 gap-2">
          {[...Array(4)].map((_, i) => {
            const article = tertiaryArticles[i];
            
            return (
              <div key={i}>
                {article ? (
                  <div className="text-[8px] font-medium text-gray-900 dark:text-white">
                    {article.title}
                  </div>
                ) : (
                  <div className={`h-1.5 rounded w-full ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'}`} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderVideoGridPreview = () => {
    const mainVideo = columns['col-0']?.[0];
    const secondaryVideos = columns['col-1'] || [];
    
    return (
      <div className="grid grid-cols-[2fr,1fr] gap-3">
        {/* Main Video */}
        <div className="space-y-2">
          <div className={`
            aspect-video rounded overflow-hidden relative max-h-[300px]
            ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'}
          `}>
            {mainVideo?.content?.image?.desktop_image_path && (
              <>
                <img
                  src={mainVideo.content.image.desktop_image_path}
                  alt={mainVideo.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20" />
              </>
            )}
            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center
                ${isDarkTheme ? 'bg-white/20' : 'bg-black/20'}
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
          {mainVideo ? (
            <>
              <div className="text-[20px] font-medium text-gray-900 dark:text-white">
                {mainVideo.title}
              </div>
              {mainVideo.subtitle && (
                <div className="text-[12px] text-gray-500 dark:text-gray-400">
                  {mainVideo.subtitle}
                </div>
              )}
            </>
          ) : (
            <>
              <div className={`h-2 rounded w-full mb-1 ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'}`} />
              <div className={`h-1.5 rounded w-2/3 ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'}`} />
            </>
          )}
        </div>

        {/* Secondary Videos */}
        <div className="space-y-2">
          {[...Array(3)].map((_, i) => {
            const video = secondaryVideos[i];
            
            return (
              <div key={i} className="flex gap-2">
                <div className={`
                  w-20 aspect-video rounded overflow-hidden relative shrink-0
                  ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'}
                `}>
                  {video?.content?.image?.desktop_image_path && (
                    <>
                      <img
                        src={video.content.image.desktop_image_path}
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/20" />
                    </>
                  )}
                  {/* Small Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className={`
                      w-4 h-4 rounded-full flex items-center justify-center
                      ${isDarkTheme ? 'bg-white/20' : 'bg-black/20'}
                    `}>
                      <div className={`
                        w-0 h-0 border-t-[3px] border-t-transparent
                        border-l-[5px] border-r-0
                        border-b-[3px] border-b-transparent
                        ${isDarkTheme ? 'border-l-white' : 'border-l-white'}
                        ml-0.5
                      `} />
                    </div>
                  </div>
                </div>
                <div className="min-w-0">
                  {video ? (
                    <div className="text-[12px] font-medium text-gray-900 dark:text-white line-clamp-2">
                      {video.title}
                    </div>
                  ) : (
                    <>
                      <div className={`h-1.5 rounded w-full mb-1 ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'}`} />
                      <div className={`h-1.5 rounded w-2/3 ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'}`} />
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

  const getLayoutPreview = () => {
    switch (variantType) {
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
        return null;
    }
  };

  return (
    <div className="relative">
      <div className="text-sm font-medium mb-2 text-gray-600 dark:text-gray-400">
        Preview do Layout
      </div>
      <div className={`
        w-full aspect-[21/9] p-4 rounded-lg max-h-[700px]
        ${isDarkTheme ? 'bg-gray-800' : 'bg-gray-100'}
        border-2 border-transparent hover:border-blue-500/50
        transition-colors duration-200
      `}>
        {getLayoutPreview()}
      </div>
    </div>
  );
};

export default MixedLayoutPreview; 