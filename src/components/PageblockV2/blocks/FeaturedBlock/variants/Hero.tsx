import React from 'react';
import { BlockVariant, Article } from '../../../types';
import { useBlockStyles } from '../../../hooks/useBlockStyles';
import { useResponsiveGrid } from '../../../hooks/useResponsiveGrid';
import { defaultClasses } from '../../../constants/defaultClasses';

interface BaseVariantProps {
  variant: BlockVariant;
  isDarkTheme?: boolean;
  customStyles?: any;
}

const Hero: React.FC<BaseVariantProps> = ({ variant, isDarkTheme, customStyles }) => {
  const classes = defaultClasses.featured.hero;
  const { articles } = variant.config;
  const styles = variant.config.styles || {};


  // Define default styles
  const defaultStyles = {
    container: [
      'w-full max-w-[1238px] mx-auto mt-12 mb-12 bg-transparent',
    ].join(' '),
    grid: 'relative aspect-[21/9]',
    article: [
      'relative w-full h-full',
    ].join(' '),
    image: 'w-full h-full object-cover',
    content: 'p-2',
    heading: [
      'mb-0',
      'text-[1.5rem] font-bold sm:text-[1rem] text-white dark:text-white',
    ].join(' '),
    subtitle: [
      'text-lg text-white/80 dark:text-white/80',
    ].join(' ')
  };


  return (
    <div className={`${classes.container} ${customStyles?.container || ''}`}>
      <div className={`${classes.grid} ${customStyles?.grid || ''}`}>
        {Object.entries(articles).map(([colKey, colArticles]) => (
          colArticles.map((article: Article) => (
            <div 
              key={article.id}
              className={classes.article}
            >
              {article.content.image?.desktop_image_path && (
                <div className="relative aspect-[21/9] rounded-lg overflow-hidden">
                  <img
                    src={article.content.image.desktop_image_path}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                </div>
              )}
              
              <div className={`${article.content.image ? 'absolute bottom-0 left-0 right-0' : ''} p-8`}>
                <h2 className={classes.heading}>
                  {article.title}
                </h2>
                {styles.showExcerpt ? (
                  <p className={classes.subtitle}>
                    {article.subtitle}
                  </p>
                ) : (
                  <p className={classes.subtitle}>
                    {article.subtitle}
                  </p>
                )}
              </div>
            </div>
          ))
        ))}
      </div>
    </div>
  );
};

export default Hero; 