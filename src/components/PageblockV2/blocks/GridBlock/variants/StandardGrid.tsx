import React from 'react';
import { 
  BlockVariant, 
  Article, 
} from '../../../types';
import { generateArticleUrl } from '../../../utils/generateArticleUrl';
import Link from '../../../../Link';
import { useClientTheme } from '../../../hooks/useClientTheme';
import { ClientTheme } from '../../../types';
import {defaultClasses} from '../../../constants/defaultClasses';
interface BaseVariantProps {
  variant: BlockVariant;
  isDarkTheme?: boolean;
  customStyles?: any;
  clientGeneralSettingsData: ClientTheme;
}

const StandardGrid: React.FC<BaseVariantProps> = ({ variant, isDarkTheme, customStyles, clientGeneralSettingsData }) => {
  const theme = useClientTheme({ clientGeneralSettingsData, isDarkTheme })
  const classes = defaultClasses.grid.standard;
  const { articles } = variant.config;
  const styles = variant.config.styles || {};
  const layout = variant.config.layout || {};

  const items = Object.values(articles).flat();

  return (
    <div className={`${classes.container} ${customStyles?.container || ''}`}>
      <div className={`${classes.grid} ${customStyles?.grid || ''}`}>
        {items.map((article: Article) => {
          const articleUrl = generateArticleUrl(article);
          return (
            <article 
            key={article.id} 
            className={classes.article}
          >
            {article.content?.image?.desktop_image_path && (
              <div className={classes.image.wrapper}>
                <img
                  src={article.content?.image?.desktop_image_path}
                  alt={article.title}
                  className={classes.image.img}
                />
              </div>
            )}
            
            <div className={classes.content.wrapper}>
              <Link href={articleUrl} className="hover:underline transition-all duration-300">
              <h2 className={classes.content.title} style={{
                color: theme.title.color,
                fontFamily: theme.title.fontFamily,
              }}>
                {article.title}
              </h2>
              </Link>
              
              {styles.showExcerpt ? (
                <p className={classes.content.subtitle} style={{
                  color: theme.subtitle.color,
                  fontFamily: theme.subtitle.fontFamily,
                }}>
                  {article.subtitle}
                </p>
              ) : (
                <p className={classes.content.subtitle} style={{
                  color: theme.subtitle.color,
                  fontFamily: theme.subtitle.fontFamily,
                }}>
                  {article.subtitle}
                </p>
              )}
            </div>
          </article>
          )
        })}
      </div>
    </div>
  );
};

export default StandardGrid;