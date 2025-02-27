import React from 'react';
import { BlockVariant, Article, GridStyles } from '../../../types';
import { defaultClasses } from '../../../constants/defaultClasses';

interface BaseVariantProps {
  variant: BlockVariant & {
    config: {
      styles: GridStyles;
    };
  };
  isDarkTheme?: boolean;
  customStyles?: any;
}

const Sidebar: React.FC<BaseVariantProps> = ({ variant, isDarkTheme, customStyles }) => {
  const classes = defaultClasses.mixed.sidebar;
  const { articles } = variant.config;
  const items = Object.values(articles).flat();
  const styles = variant.config.styles || {};

  const mainArticle = items[0];
  const sidebarArticles = items.slice(1);

  return (
    <div className={`${classes.container} ${customStyles?.container || ''}`}>
      <div className={customStyles?.grid || classes.grid}>
        {/* Main Article */}
        <div className={customStyles?.mainColumn || classes.mainColumn}>
          {articles['col-0'].map((article: Article, index: number) => (
            <div
              key={article.id}
              className={customStyles?.mainArticle || classes.article.main}
            >
              <article>
                {mainArticle.content.image?.desktop_image_path && (
                  <div className={customStyles?.imageWrapper || classes.imageWrapper}>
                    <img
                      src={mainArticle.content.image.desktop_image_path}
                      alt={mainArticle.title}
                      className={customStyles?.image || classes.image}
                    />
                  </div>
                )}
                
                <div className={customStyles?.content || classes.content}>
                  <h2 className={classes.heading || customStyles?.heading}>
                    {mainArticle.title}
                  </h2>
                  
                  {styles.showExcerpt ? (
                    <p className={customStyles?.subtitle || classes.subtitle}>
                      {mainArticle.subtitle}
                    </p>
                  ) : (
                    <p className={customStyles?.subtitle || classes.subtitle}>
                      {mainArticle.subtitle}
                    </p>
                  )}
                </div>
              </article>
            </div>
          ))}
        </div>

        {/* Sidebar Articles */}
        <div className={customStyles?.sidebarColumn || classes.sidebarColumn}>
          {sidebarArticles.map((article: Article, index: number) => (
            <div
              key={article.id}
              className={[
                customStyles?.sidebarArticle || classes.article.sidebar,
                index !== (sidebarArticles.length - 1) ? 'border-b border-gray-200 dark:border-gray-700 pb-4 mb-4' : ''
              ].filter(Boolean).join(' ')}
            >
              <article>
                {article.content.image?.desktop_image_path && (
                  <div className={customStyles?.imageWrapper || classes.imageWrapper}>
                    <img
                      src={article.content.image.desktop_image_path}
                      alt={article.title}
                      className={customStyles?.image || classes.image}
                    />
                  </div>
                )}
                
                <div className={customStyles?.content || classes.content}>
                  <h2 className={customStyles?.heading || classes.heading}>
                    {article.title}
                  </h2>
                  
                  {styles.showExcerpt ? (
                    <p className={customStyles?.subtitle || classes.subtitle}>
                      {article.subtitle}
                    </p>
                  ) : (
                    <p className={customStyles?.subtitle || classes.subtitle}>
                      {article.subtitle}
                    </p>
                  )}
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 