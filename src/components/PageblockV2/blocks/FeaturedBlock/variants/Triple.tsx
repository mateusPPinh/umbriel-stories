import React from 'react';
import { useBlockStyles } from '../../../hooks/useBlockStyles';
import { useResponsiveGrid } from '../../../hooks/useResponsiveGrid';
import { BlockVariant, Article } from '../../../types';
import { defaultClasses } from '../../../constants/defaultClasses';

interface BaseVariantProps {
  variant: BlockVariant;
  isDarkTheme?: boolean;
  customStyles?: any;
}

const Triple: React.FC<BaseVariantProps> = ({ variant, isDarkTheme, customStyles }) => {
  const classes = defaultClasses.featured.triple;
  const { articles } = variant.config;
  const styles = variant.config.styles || {};

  // Define default styles
  const defaultStyles = {
    container: [
      'w-full max-w-[1238px] mx-auto bg-transparent',
      'mb-[40px] mt-[40px]'
    ].join(' '),
    grid: 'grid grid-cols-1 md:grid-cols-3 gap-6',
    article: [
      'flex flex-col gap-4',
      'hover:opacity-90 transition-opacity'
    ].join(' '),
    image: 'w-full h-full object-cover',
    content: 'p-2',
    heading: [
      'mb-0',
      'text-[1.5rem] text-gray-900 font-bold sm:text-[1rem] dark:text-white',
    ].join(' '),
    subtitle: [
      'text-lg text-gray-600 dark:text-gray-400',
    ].join(' ')
  };

  return (
    <div className={`${defaultStyles.container} ${customStyles?.container || ''}`}  >
      <div className={`${defaultStyles.grid} ${customStyles?.grid || ''}`}>
        {Object.entries(articles).map(([colKey, colArticles]) => (
          colArticles.map((article: Article) => (
            <div 
              key={article.id}
              className={defaultStyles.article}
            >
              {article.content?.image?.desktop_image_path ? (
                <div className={defaultStyles.image}>
                  <img
                    src={article.content.image.desktop_image_path}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                null
              )}
              
              <div className={defaultStyles.content}>
                <h3 className={defaultStyles.heading}>
                  {article.title}
                </h3>
                {styles.showExcerpt ? (
                  <p className={defaultStyles.subtitle}>
                    {article.subtitle}
                  </p>
                ) : (
                  <p className={defaultStyles.subtitle}>
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

export default Triple; 