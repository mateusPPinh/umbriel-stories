import React from 'react';
import { useBlockStyles } from '../../../hooks/useBlockStyles';
import { 
  BlockVariant, 
  Article, 
  ThemeProps, 
  StyleProps,
  BlockConfig
} from '../../../types/index';
import { defaultClasses } from '../../../constants/defaultClasses';

interface BaseVariantProps {
  variant: BlockVariant;
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

const StandardGrid: React.FC<BaseVariantProps> = ({ variant, isDarkTheme, customStyles }) => {
  const classes = defaultClasses.grid.standard;
  const { articles } = variant.config;
  const styles = variant.config.styles || {};
  const layout = variant.config.layout || {};

  const standardClasses = {
    container: [
      'w-full max-w-[1238px] mx-auto',
      'mb-[40px] mt-[40px]',
      'bg-white dark:bg-gray-900',
      'p-8 rounded-lg'
    ].join(' '),
    grid: [
      'grid grid-cols-1',
      'md:grid-cols-2',
      `lg:grid-cols-${layout.columns || 3}`,
      `gap-[${layout.gap || '24px'}]`
    ].join(' '),
    article: [
      'flex flex-col',
      'bg-white dark:bg-gray-800',
      'rounded-lg overflow-hidden',
      'transition-all duration-300',
      'hover:shadow-lg'
    ].join(' '),
    image: {
      wrapper: 'relative aspect-[16/10] overflow-hidden mb-4',
      img: 'w-full h-full object-cover'
    },
    content: {
      wrapper: 'p-4',
      title: 'text-xl font-bold text-gray-900 dark:text-white mb-2',
      subtitle: 'text-lg text-gray-600 dark:text-gray-300'
    }
  };

  const items = Object.values(articles).flat();

  return (
    <div className={`${standardClasses.container} ${customStyles?.container || ''}`}>
      <div className={`${standardClasses.grid} ${customStyles?.grid || ''}`}>
        {items.map((article: Article) => (
          <article 
            key={article.id} 
            className={standardClasses.article}
          >
            {article.content.image?.desktop_image_path && (
              <div className={standardClasses.image.wrapper}>
                <img
                  src={article.content.image.desktop_image_path}
                  alt={article.title}
                  className={standardClasses.image.img}
                />
              </div>
            )}
            
            <div className={standardClasses.content.wrapper}>
              <h2 className={standardClasses.content.title}>
                {article.title}
              </h2>
              
              {styles.showExcerpt && (
                <p className={standardClasses.content.subtitle}>
                  {article.subtitle}
                </p>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default StandardGrid;