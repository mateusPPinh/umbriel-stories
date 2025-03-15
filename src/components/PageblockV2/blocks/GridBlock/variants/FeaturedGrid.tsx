import React from 'react';
import { BlockVariant, Article, GridStyles, ClientTheme } from '../../../types';
import { defaultClasses } from '../../../constants/defaultClasses';
import { generateArticleUrl } from '../../../utils/generateArticleUrl';
import Link from '../../../../Link';
import { useClientTheme } from '../../../hooks/useClientTheme';
interface BaseVariantProps {
  variant: BlockVariant & {
    config: {
      styles: GridStyles;
    };
  };
  isDarkTheme?: boolean;
  customStyles?: any;
  clientGeneralSettingsData: ClientTheme;
}

const FeaturedGrid: React.FC<BaseVariantProps> = ({ variant, isDarkTheme, customStyles, clientGeneralSettingsData }) => {
  const theme = useClientTheme({ clientGeneralSettingsData, isDarkTheme })
  const classes = defaultClasses.grid.featured;
  const { articles } = variant.config;
  const styles = variant.config.styles || {};

  return (
    <div className={`${classes.container} ${customStyles?.container || ''}`}>
      <div className={`${classes.grid} ${customStyles?.grid || ''}`}>
        {Object.entries(articles).map(([colKey, colArticles]) => (
          colArticles.map((article: Article) => {
            const articleUrl = generateArticleUrl(article);
            
            return (
              <div 
                key={article.id}
                className={`${classes.article} group`}
              >
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
                    {styles?.featuredImageOverlay && (
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
                      `} style={{
                        color: theme.title.color,
fontSize: theme?.fontSize?.pageblockTitle,

                        fontFamily: theme.title.fontFamily,
                      }}>
                        {article.title}
                      </h3>
                      {article.subtitle && (
                        <p className={classes.content.subtitle} style={{
                          color: theme.subtitle.color,
fontSize: theme?.fontSize?.pageblockSubtitle,

                          fontFamily: theme.subtitle.fontFamily,
                        }}>
                          {article.subtitle}
                        </p>
                      )}
                    </div>
                  </Link>
                ) : (
                  <Link 
                    href={articleUrl}
                    className="block group"
                  >
                    <h3 className={`
                      ${classes.content.title}
                      transition-colors duration-200
                      group-hover:text-blue-600 dark:group-hover:text-blue-400
                    `} style={{
                      color: theme.title.color,
fontSize: theme?.fontSize?.pageblockTitle,

                      fontFamily: theme.title.fontFamily,
                    }}>
                      {article.title}
                    </h3>
                    {article.subtitle && (
                      <p className={classes.content.subtitle} style={{
                        color: theme.subtitle.color,
fontSize: theme?.fontSize?.pageblockSubtitle,

                        fontFamily: theme.subtitle.fontFamily,
                      }}>
                        {article.subtitle}
                      </p>
                    )}
                  </Link>
                )}
              </div>
            );
          })
        ))}
      </div>
    </div>
  );
};

export default FeaturedGrid; 