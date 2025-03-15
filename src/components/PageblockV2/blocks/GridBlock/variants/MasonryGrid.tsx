import React from 'react';
import { useBlockStyles } from '../../../hooks/useBlockStyles';
import { BlockVariant, Article, MasonryStyles, ClientTheme } from '../../../types';
import { defaultClasses } from '../../../constants/defaultClasses';
import { generateArticleUrl } from '../../../utils/generateArticleUrl';
import Link from '../../../../Link'
import { useClientTheme } from '../../../hooks/useClientTheme';
interface BaseVariantProps {
  variant: BlockVariant & {
    config: {
      styles: MasonryStyles;
    };
  };
  isDarkTheme?: boolean;
  customStyles?: any;
  clientGeneralSettingsData: ClientTheme;
}

const MasonryGrid: React.FC<BaseVariantProps> = ({ variant, isDarkTheme, customStyles, clientGeneralSettingsData   }) => {
  const theme = useClientTheme({ clientGeneralSettingsData, isDarkTheme })
  const classes = defaultClasses.grid.masonry;
  const { articles } = variant.config;
  const styles = variant.config.styles || {};


  // Classes para diferentes aspect ratios
  const aspectRatios = {
    square: 'aspect-square',
    portrait: 'aspect-[3/4]',
    landscape: 'aspect-[4/3]'
  };

  // Classes para diferentes efeitos hover
  const hoverEffects = {
    scale: 'hover:scale-[1.02] transition-transform duration-300',
    lift: 'hover:-translate-y-2 transition-transform duration-300',
    none: ''
  };

  // Helper para aspect ratio aleatório
  const getRandomAspectRatio = () => {
    const variations = styles.imageVariations || ['square'];
    const random = Math.floor(Math.random() * variations.length);
    return aspectRatios[variations[random] as keyof typeof aspectRatios] || aspectRatios.square;
  };

  return (
    <div className={`${classes.container} ${customStyles?.container || ''}`}>
      <div className={`
        ${classes.grid}
        ${hoverEffects[styles.hoverEffect as keyof typeof hoverEffects] || ''}
      `}>
        {Object.entries(articles).map(([colKey, colArticles]) => (
          colArticles.map((article: Article) => {
            const articleUrl = generateArticleUrl(article);
            return (
              <div 
              key={article.id}
              className={classes.article}
            >
              {article.content?.image?.desktop_image_path && (
                <div className={`${classes.image.wrapper} ${getRandomAspectRatio()}`}>
                  <img
                    src={article.content?.image?.desktop_image_path}
                    alt={article.title}
                    className={classes.image.img}
                  />
                </div>
              )}
              
              <div>
               <Link href={articleUrl} aria-label={article.title} className="hover:underline transition-all duration-300">
               <h3 className={classes.content.title} style={{
                color: theme.title.color,
fontSize: theme?.fontSize?.pageblockTitle,

                fontFamily: theme.title.fontFamily,
               }}>
                  {article.title}
                </h3>
               </Link>
                {styles.showExcerpt ? (
                  <p className={classes.content.subtitle} style={{
                    color: theme.subtitle.color,
fontSize: theme?.fontSize?.pageblockSubtitle,

                    fontFamily: theme.subtitle.fontFamily,
                  }}>
                    {article.subtitle}
                  </p>
                ) : (
                  <p className={classes.content.subtitle} style={{
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

export default MasonryGrid; 