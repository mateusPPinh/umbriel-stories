import React from 'react';
import { BlockVariant, Article, ClientTheme } from '../../../types';
import { defaultClasses } from '../../../constants/defaultClasses';
import { generateArticleUrl } from '../../../utils/generateArticleUrl';
import Link from '../../../../Link';
import { useClientTheme } from '../../../hooks/useClientTheme';

interface BaseVariantProps {
  variant: BlockVariant;
  isDarkTheme?: boolean;
  customStyles?: any;
  clientGeneralSettingsData: ClientTheme;
}

const Triple: React.FC<BaseVariantProps> = ({ variant, isDarkTheme, customStyles, clientGeneralSettingsData }) => {
  const theme = useClientTheme({ clientGeneralSettingsData, isDarkTheme })
  const classes = defaultClasses.featured.triple;
  const { articles } = variant.config;
  const styles = variant.config.styles || {};

  return (
    <div className={`${classes.container} ${customStyles?.container || ''}`}  >
      <div className={`${classes.grid} ${customStyles?.grid || ''}`}>
        {Object.entries(articles).map(([colKey, colArticles]) => (
          colArticles.map((article: Article) => {
            const articleUrl = generateArticleUrl(article)
            return (
              <div 
              key={article.id}
              className={classes.article}
            >
              {article.content?.image?.desktop_image_path ? (
                <div className={classes.image}>
                  <img
                    src={article.content.image.desktop_image_path}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                null
              )}
              
              <div className={classes.content}>
                <Link href={articleUrl} aria-label={article.title} className="hover:underline transition-all duration-300">
                  <h3 className={classes.heading} style={{
                    color: theme.title.color,
fontSize: theme?.fontSize?.pageblockTitle,

                    fontFamily: theme.title.fontFamily,
                  }}>
                    {article.title}
                  </h3>
                </Link>
                {styles.showExcerpt ? (
                  <p className={classes.subtitle} style={{
                    color: theme.subtitle.color,
fontSize: theme?.fontSize?.pageblockSubtitle,

                    fontFamily: theme.subtitle.fontFamily,
                  }}>
                    {article.subtitle}
                  </p>
                ) : (
                  <p className={classes.subtitle} style={{
                    color: theme.subtitle.color,
fontSize: theme?.fontSize?.pageblockSubtitle,

                    fontFamily: theme.subtitle.fontFamily,
                  }}>
                    {article.subtitle}
                  </p>
                )}
              </div>
            </div>
            )
          })
        ))}
      </div>
    </div>
  );
};

export default Triple; 