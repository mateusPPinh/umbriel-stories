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

// Helper function to merge styles
const mergeStyles = (defaultStyles: any, customStyles: any) => {
  if (!customStyles) return defaultStyles;
  return {
    ...defaultStyles,
    ...customStyles,
    columnStyles: {
      ...defaultStyles.columnStyles,
      ...customStyles.columnStyles
    },
    theme: {
      light: {
        ...defaultStyles.theme?.light,
        ...customStyles.theme?.light,
        columnStyle: {
          ...defaultStyles.theme?.light?.columnStyle,
          ...customStyles.theme?.light?.columnStyle
        }
      },
      dark: {
        ...defaultStyles.theme?.dark,
        ...customStyles.theme?.dark,
        columnStyle: {
          ...defaultStyles.theme?.dark?.columnStyle,
          ...customStyles.theme?.dark?.columnStyle
        }
      }
    }
  };
};

const FeaturedGrid: React.FC<BaseVariantProps> = ({ variant, isDarkTheme, customStyles }) => {
  const classes = defaultClasses.grid.featured;
  const { articles } = variant.config;
  const styles = variant.config.styles || {};

  const featuredClasses = {
    container: 'w-full',
    grid: [
      'grid grid-cols-1',
      'md:grid-cols-2',
      'lg:grid-cols-3',
      'gap-8'
    ].join(' '),
    article: [
      'flex flex-col',
    ].join(' '),
    image: {
      wrapper: 'relative aspect-[16/10] overflow-hidden',
      img: 'w-full h-full object-cover',
      overlay: 'absolute inset-0 bg-gradient-to-b from-transparent to-black/80'
    },
    content: {
      wrapper: 'absolute bottom-0 left-0 right-0 p-6',
      title: 'text-2xl font-bold text-white mb-2',
      subtitle: 'text-lg text-white/80'
    }
  };

  return (
    <div className={`${featuredClasses.container} ${customStyles?.container || ''}`}>
      <div className={`${featuredClasses.grid} ${customStyles?.grid || ''}`}>
        {Object.entries(articles).map(([colKey, colArticles]) => (
          colArticles.map((article: Article) => (
            <div 
              key={article.id}
              className={featuredClasses.article}
            >
              {article.content?.image?.desktop_image_path ? (
                <div className={featuredClasses.image.wrapper}>
                  <img
                    src={article.content.image.desktop_image_path}
                    alt={article.title}
                    className={featuredClasses.image.img}
                  />
                  {styles.featuredImageOverlay && (
                    <div className={featuredClasses.image.overlay} />
                  )}
                  <div className={featuredClasses.content.wrapper}>
                    <h3 className={featuredClasses.content.title}>
                      {article.title}
                    </h3>
                    {styles.showExcerpt ? (
                      <p className={featuredClasses.content.subtitle}>
                        {article.subtitle}
                      </p>
                    ) : (
                      <p className={featuredClasses.content.subtitle}>
                        {article.subtitle}
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                null
              )}
            </div>
          ))
        ))}
      </div>
    </div>
  );
};

export default FeaturedGrid; 