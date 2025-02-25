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

  // Define default styles
  const defaultStyles: BlockConfig['styles'] = {
    theme: {
      light: {
        columnStyle: {
          background: '#ffffff'
        },
        headingProps: {
          fontSize: 'xl',
          fontWeight: 700,
          color: '#1a1a1a'
        },
        subtitleProps: {
          fontSize: 'lg',
          color: '#4a5568'
        }
      },
      dark: {
        columnStyle: {
          background: '#1a1a1a'
        },
        headingProps: {
          fontSize: 'xl',
          fontWeight: 700,
          color: '#ffffff'
        },
        subtitleProps: {
          fontSize: 'lg',
          color: '#a0aec0'
        }
      }
    },
    showExcerpt: true
  };

  // Merge default styles with variant styles
  const mergedStyles = mergeStyles(defaultStyles, variant.config.styles);
  
  // Use merged styles in useBlockStyles
  const { containerStyle, columnStyle, headingStyle, subtitleStyle } = useBlockStyles({
    config: {
      ...variant.config,
      styles: mergedStyles
    },
    isDarkTheme
  });

  const items = Object.values(articles).flat();
  const columnCount = variant.config.layout?.columns || 3;
  const gap = variant.config.layout?.gap || '24px';

  // Construct the columns class based on configuration
  const columnsClass = `columns-1 md:columns-2 lg:columns-${columnCount}`;
  const gapClass = `gap-x-[${gap}]`;

  return (
    <div className={`${classes.container} ${customStyles?.container || ''}`} style={containerStyle}>
      <div className={customStyles?.grid || `${columnsClass} ${gapClass}`}>
        {items.map((article: Article) => (
          <article 
            key={article.id} 
            className={customStyles?.article || 'break-inside-avoid mb-6'}
            style={columnStyle()}
          >
            {article.content.image?.desktop_image_path && (
              <div 
                className={customStyles?.imageWrapper || 'relative w-full overflow-hidden mb-4'}
              >
                <img
                  src={article.content.image.desktop_image_path}
                  alt={article.title}
                  className={customStyles?.image || 'w-full h-full object-cover'}
                />
              </div>
            )}
            
            <div className={customStyles?.content || 'p-4'}>
              <h2 
                className={customStyles?.heading || 'mb-3'} 
                style={headingStyle}
              >
                {article.title}
              </h2>
              
              {mergedStyles.showExcerpt && (
                <p 
                  className={customStyles?.subtitle || ''} 
                  style={subtitleStyle}
                >
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