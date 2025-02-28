import React from 'react';
import { useBlockStyles } from '../../../hooks/useBlockStyles';
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

const SidebarGrid: React.FC<BaseVariantProps> = ({ variant, isDarkTheme, customStyles }) => {
  const classes = defaultClasses.grid.sidebargrid;
  const { articles } = variant.config;
  const styles = variant.config.styles || {};


  return (
    <div className={`${ classes.container} ${customStyles?.container || ''}`}>
      <div className={`${classes.wrapper} ${customStyles?.wrapper || ''}`}>
        {/* Main Content */}
        <div className={classes.mainContent}>
          {articles['col-0']?.map((article: Article) => (
            <div 
              key={article.id}
              className={classes.article.main}
            >
              {article.content?.image?.desktop_image_path ? (
                <img
                  src={article.content.image.desktop_image_path}
                  alt={article.title}
                  className={classes.image.main}
                />
              ) : (
                null
              )}
              <div>
                <h3 className={classes.content.main.title}>
                  {article.title}
                </h3>
                {styles.showExcerpt ? (
                  <p className={classes.content.main.subtitle}>
                    {article.subtitle}
                  </p>
                ) : (
                  <p className={classes.content.main.subtitle}>
                    {article.subtitle}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <div className={classes.sidebar}>
          {articles['col-1']?.map((article: Article, index: number) => (
            <div 
              key={article.id}
              className={[
                classes.article.sidebar,
                index !== (articles['col-1'].length - 1) ? 'border-b border-gray-200 dark:border-gray-700 pb-4 mb-4' : ''
              ].filter(Boolean).join(' ')}
            >
              {article.content?.image?.desktop_image_path ? (
                <img
                  src={article.content.image.desktop_image_path}
                  alt={article.title}
                  className={classes.image.sidebar}
                />
              ) : (
                null
              )}
              <div>
                <h3 className={classes.content.sidebar.title}>
                  {article.title}
                </h3>
                {styles.showExcerpt ? (
                  <p className={classes.content.sidebar.subtitle}>
                    {article.subtitle}
                  </p>
                ) : (
                  <p className={classes.content.sidebar.subtitle}>
                    {article.subtitle}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SidebarGrid;
