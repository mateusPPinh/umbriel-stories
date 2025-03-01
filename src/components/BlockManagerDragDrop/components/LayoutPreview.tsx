import React from 'react';
import { Article } from '../../PageblockV2/types';
import { BlockConfig } from './StyleConfigModal';
import { defaultClasses } from '../../PageblockV2/constants/defaultClasses';
import Link from '../../Link';
import { generateArticleUrl } from '../../PageblockV2/utils/generateArticleUrl';

interface LayoutPreviewProps {
  variantType: string;
  isDarkTheme?: boolean;
  columns: { [key: string]: Article[] };
  blockConfig: BlockConfig;
}

const LayoutPreview: React.FC<LayoutPreviewProps> = ({ variantType, isDarkTheme, columns, blockConfig }) => {
  // Helper para renderizar skeleton de artigo
  const renderArticleSkeleton = (size: 'small' | 'medium' | 'large' = 'medium') => {
    const aspectRatio = size === 'small' ? 'aspect-[4/3]' : size === 'large' ? 'aspect-[16/9]' : 'aspect-[16/10]';
    
    return (
      <div className="flex flex-col gap-2">
        <div className={`${aspectRatio} rounded ${isDarkTheme ? 'bg-gray-700/50' : 'bg-gray-200/50'} w-full`} />
        <div className="space-y-1.5">
          <div className={`h-2.5 rounded ${isDarkTheme ? 'bg-gray-700/50' : 'bg-gray-200/50'}`} />
          <div className={`h-2 rounded w-2/3 ${isDarkTheme ? 'bg-gray-700/50' : 'bg-gray-200/50'}`} />
        </div>
      </div>
    );
  };

  const renderStandardGrid = () => {
    const classes = defaultClasses.grid.standard;
    const items = columns['col-0'] || [];

    return (
      <div className={classes.container}>
        <div className={classes.grid}>
          {items.length > 0 ? (
            items.map((article: Article) => {
              const articleUrl = generateArticleUrl(article);
              return (
                <article key={article.id} className={classes.article}>
                  {article.content?.image?.desktop_image_path && (
                    <div className={classes.image.wrapper}>
                      <img
                        src={article.content.image.desktop_image_path}
                        alt={article.title}
                        className={classes.image.img}
                      />
                    </div>
                  )}
                  
                  <div className={classes.content.wrapper}>
                    <Link href={articleUrl} className="hover:underline transition-all duration-300">
                      <h2 className={classes.content.title}>
                        {article.title}
                      </h2>
                    </Link>
                    
                    {blockConfig.styles.showExcerpt && (
                      <p className={classes.content.subtitle}>
                        {article.subtitle}
                      </p>
                    )}
                  </div>
                </article>
              );
            })
          ) : (
            // Skeleton grid
            [...Array(6)].map((_, i) => (
              <div key={i} className={classes.article}>
                {renderArticleSkeleton('medium')}
              </div>
            ))
          )}
        </div>
      </div>
    );
  };

  const renderSidebarGrid = () => {
    const classes = defaultClasses.grid.sidebargrid;
    const mainArticles = columns['col-0'] || [];
    const sidebarArticles = columns['col-1'] || [];

    return (
      <div className={classes.container}>
        <div className={classes.wrapper}>
          {/* Main Content */}
          <div className={classes.mainContent}>
            {mainArticles.length > 0 ? (
              mainArticles.map((article: Article) => {
                const articleUrl = generateArticleUrl(article);
                return (
                  <div key={article.id} className={classes.article.main}>
                    {article.content?.image?.desktop_image_path && (
                      <img
                        src={article.content.image.desktop_image_path}
                        alt={article.title}
                        className={classes.image.main}
                      />
                    )}
                    <div>
                      <Link
                        href={articleUrl}
                        aria-label={article.title}
                        className="hover:underline transition-all duration-300"
                      >
                        <h3 className={classes.content.main.title}>
                          {article.title}
                        </h3>
                      </Link>
                      {blockConfig.styles.showExcerpt && (
                        <p className={classes.content.main.subtitle}>
                          {article.subtitle}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              // Main content skeleton
              [...Array(4)].map((_, i) => (
                <div key={i} className={classes.article.main}>
                  {renderArticleSkeleton('large')}
                </div>
              ))
            )}
          </div>

          {/* Sidebar */}
          <div className={classes.sidebar}>
            {sidebarArticles.length > 0 ? (
              sidebarArticles.map((article: Article, index: number) => {
                const articleUrl = generateArticleUrl(article);
                return (
                  <div
                    key={article.id}
                    className={[
                      classes.article.sidebar,
                      index !== sidebarArticles.length - 1
                        ? 'border-b border-gray-200 dark:border-gray-700 pb-4 mb-4'
                        : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                  >
                    {article.content?.image?.desktop_image_path && (
                      <img
                        src={article.content.image.desktop_image_path}
                        alt={article.title}
                        className={classes.image.sidebar}
                      />
                    )}
                    <div>
                      <Link
                        href={articleUrl}
                        aria-label={article.title}
                        className="hover:underline transition-all duration-300"
                      >
                        <h3 className={classes.content.sidebar.title}>
                          {article.title}
                        </h3>
                      </Link>
                      {blockConfig.styles.showExcerpt && (
                        <p className={classes.content.sidebar.subtitle}>
                          {article.subtitle}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              // Sidebar skeleton
              [...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className={[
                    classes.article.sidebar,
                    i !== 2 ? 'border-b border-gray-200 dark:border-gray-700 pb-4 mb-4' : '',
                  ].join(' ')}
                >
                  {renderArticleSkeleton('small')}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderNewsFeedGrid = () => {
    const classes = defaultClasses.newsfeed;
    const mainColumnArticles = columns['col-0'] || [];
    const rightColumnArticles = columns['col-1'] || [];
    const firstArticle = mainColumnArticles[0];

    return (
      <div className={classes.container}>
        <div className={classes.grid}>
          {/* Left Column - Articles */}
          <div className={classes.column.main}>
            {mainColumnArticles.length > 0 ? (
              mainColumnArticles.map((article: Article) => {
                const articleUrl = generateArticleUrl(article);
                return (
                  <article key={article.id} className={classes.article.main}>
                    <div className={classes.content}>
                      <Link
                        href={articleUrl}
                        aria-label={article.title}
                        className="hover:underline transition-all duration-300"
                      >
                        <h3 className={classes.title}>{article.title}</h3>
                      </Link>
                      {article.subtitle && (
                        <p className={classes.subtitle}>{article.subtitle}</p>
                      )}
                    </div>
                  </article>
                );
              })
            ) : (
              // Left column skeleton
              [...Array(5)].map((_, i) => (
                <article key={i} className={classes.article.main}>
                  {renderArticleSkeleton('small')}
                </article>
              ))
            )}
          </div>

          {/* Middle Column - Featured Image */}
          <div className={classes.column.image}>
            {firstArticle?.content?.image?.desktop_image_path ? (
              <div className={classes.article.image}>
                <img
                  src={firstArticle.content.image.desktop_image_path}
                  alt={firstArticle.title}
                  className={classes.article.imageContent}
                />
              </div>
            ) : (
              // Middle column skeleton
              <div className={classes.article.image}>
                <div className={`w-full aspect-[4/3] rounded ${isDarkTheme ? 'bg-gray-700/50' : 'bg-gray-200/50'}`} />
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className={classes.column.right}>
            {rightColumnArticles.length > 0 ? (
              rightColumnArticles.map((article: Article) => {
                const articleUrl = generateArticleUrl(article);
                return (
                  <article key={article.id} className={classes.article.main}>
                    <div className={classes.content}>
                      <Link href={articleUrl} aria-label={article.title} className="hover:underline transition-all duration-300">
                        <h3 className={classes.title}>{article.title}</h3>
                      </Link>
                    </div>
                  </article>
                );
              })
            ) : (
              // Right column skeleton
              [...Array(5)].map((_, i) => (
                <article key={i} className={classes.article.main}>
                  {renderArticleSkeleton('small')}
                </article>
              ))
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderNewsGrid = () => {
    const classes = defaultClasses.newsgrid;
    const articles = columns['col-0'] || [];

    // Agrupa os artigos por row
    const rows: { [key: string]: Article[] } = {};
    if (articles.length > 0) {
      articles.forEach((article, index) => {
        const row = Math.floor(index / 5);
        if (!rows[row]) rows[row] = [];
        rows[row].push(article);
      });
    } else {
      // Cria uma row de skeleton
      rows[0] = [];
    }

    return (
      <div className={classes.container}>
        {Object.entries(rows).map(([rowId, rowArticles]) => (
          <div key={rowId} className={classes.grid}>
            {rowArticles.length > 0 ? (
              rowArticles.map((article: Article, index: number) => {
                const articleUrl = generateArticleUrl(article);
                return (
                  <div key={article.id} className={classes.column}>
                    <article className={index === 0 ? classes.mainArticle : classes.secondaryArticle}>
                      {index === 0 && article.content?.image?.desktop_image_path && (
                        <div className={classes.imageWrapper}>
                          <img 
                            src={article.content.image.desktop_image_path} 
                            alt={article.title}
                            className={classes.image}
                          />
                        </div>
                      )}
                      <Link href={articleUrl}>
                        <h3 className={index === 0 ? classes.mainTitle : classes.secondaryTitle}>
                          {article.title}
                        </h3>
                      </Link>
                    </article>
                  </div>
                );
              })
            ) : (
              // Row skeleton
              [...Array(5)].map((_, i) => (
                <div key={i} className={classes.column}>
                  <article className={i === 0 ? classes.mainArticle : classes.secondaryArticle}>
                    {renderArticleSkeleton(i === 0 ? 'large' : 'small')}
                  </article>
                </div>
              ))
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderMasonryGrid = () => {
    const classes = defaultClasses.grid.masonry;
    const articles = columns['col-0'] || [];

    // Helper to generate consistent random heights based on article id
    const getRandomHeight = (id: string | number) => {
      const heights = ['h-48', 'h-64', 'h-56'];
      // Use the last digit of the id to determine the height
      const lastDigit = Number(id.toString().slice(-1));
      return heights[lastDigit % heights.length];
    };

    return (
      <div className={classes.container}>
        <div className="columns-1 md:columns-2 lg:columns-3 gap-x-[24px] space-y-0">
          {articles.length > 0 ? (
            articles.map((article: Article) => {
              const articleUrl = generateArticleUrl(article);
              
              return (
                <div
                  key={article.id}
                  className="break-inside-avoid mb-6 relative group"
                >
                  <article className="relative">
                    {article.content?.image?.desktop_image_path && (
                      <div className="relative w-full overflow-hidden mb-4">
                        <img
                          src={article.content.image.desktop_image_path}
                          alt={article.title}
                          className={`w-full ${getRandomHeight(article.id)} object-cover`}
                        />
                      </div>
                    )}
                    
                    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
                      <h2 className="text-[1.2rem] font-semibold mb-3 text-gray-900 dark:text-white">
                        {article.title}
                      </h2>
                      {blockConfig.styles.showExcerpt && article.subtitle && (
                        <p className="text-[0.9rem] text-gray-700 dark:text-gray-300">
                          {article.subtitle}
                        </p>
                      )}
                    </div>
                  </article>
                </div>
              );
            })
          ) : (
            // Masonry skeleton with varying heights
            [...Array(6)].map((_, i) => (
              <div key={i} className="break-inside-avoid mb-6 relative group">
                <article className="relative">
                  <div className="relative w-full overflow-hidden mb-4">
                    <div className={`w-full ${['h-48', 'h-64', 'h-56'][i % 3]} bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse`} />
                  </div>
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
                    <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2" />
                    <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                  </div>
                </article>
              </div>
            ))
          )}
        </div>
      </div>
    );
  };

  const renderFeaturedGrid = () => {
    const classes = defaultClasses.grid.featured;
    // Only include articles from the grid columns, not from the pool
    const articles = [...(columns['col-0'] || []), ...(columns['col-1'] || [])];

    return (
      <div className={classes.container}>
        <div className={classes.grid}>
          {articles.length > 0 ? (
            articles.map((article: Article) => {
              const articleUrl = generateArticleUrl(article);
              
              return (
                <div key={article.id} className={`${classes.article} group`}>
                  {article.content?.image?.desktop_image_path ? (
                    <Link
                      href={articleUrl}
                      className={`
                        ${classes.image.wrapper}
                        block relative overflow-hidden
                        transition-transform duration-300
                        group-hover:scale-[1.02]
                      `}
                    >
                      <img
                        src={article.content.image.desktop_image_path}
                        alt={article.title}
                        className={`
                          ${classes.image.img}
                          transition-transform duration-300
                          group-hover:scale-105
                        `}
                      />
                      {blockConfig.styles.featuredImageOverlay && (
                        <div className={`
                          ${classes.image.overlay}
                          transition-opacity duration-300
                          group-hover:opacity-75
                        `} />
                      )}
                      <div className={classes.content.wrapper}>
                        <h3 className={`
                          ${classes.content.title}
                          transition-colors duration-200
                          group-hover:text-blue-400
                        `}>
                          {article.title}
                        </h3>
                        {article.subtitle && (
                          <p className={classes.content.subtitle}>
                            {article.subtitle}
                          </p>
                        )}
                      </div>
                    </Link>
                  ) : (
                    <Link href={articleUrl} className="block group">
                      <h3 className={`
                        ${classes.content.title}
                        transition-colors duration-200
                        group-hover:text-blue-600 dark:group-hover:text-blue-400
                      `}>
                        {article.title}
                      </h3>
                      {article.subtitle && (
                        <p className={classes.content.subtitle}>
                          {article.subtitle}
                        </p>
                      )}
                    </Link>
                  )}
                </div>
              );
            })
          ) : (
            // Featured grid skeleton
            [...Array(4)].map((_, i) => (
              <div key={i} className={`${classes.article} group`}>
                <div className={`
                  ${classes.image.wrapper}
                  block relative overflow-hidden
                `}>
                  {renderArticleSkeleton(i === 0 ? 'large' : 'medium')}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  };

  const getLayoutPreview = () => {
    switch (variantType) {
      case 'standard':
        return renderStandardGrid();
      case 'featured':
        return renderFeaturedGrid();
      case 'masonry':
        return renderMasonryGrid();
      case 'sidebargrid':
        return renderSidebarGrid();
      case 'newsfeed':
        return renderNewsFeedGrid();
      case 'newsgrid':
        return renderNewsGrid();
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
        <div className="w-full h-full flex-1 flex items-start justify-center overflow-auto">
          {getLayoutPreview()}
        </div>
      </div>
    </div>
  );
};

export default LayoutPreview; 