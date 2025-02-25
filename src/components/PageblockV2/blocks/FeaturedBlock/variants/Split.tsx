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

const Split: React.FC<BaseVariantProps> = ({ variant, isDarkTheme, customStyles }) => {
  const classes = defaultClasses.featured.split;
  const { articles } = variant.config;

  // Define default styles
  const defaultStyles = {
    theme: {
      light: {
        columnStyle: {
          background: "#ffffff"
        },
        headingProps: {
          fontSize: "2xl",
          fontWeight: "bold",
          color: "#1a1a1a"
        },
        subtitleProps: {
          fontSize: "lg",
          color: "#4a4a4a"
        }
      },
      dark: {
        columnStyle: {
          background: "#1a1a1a"
        },
        headingProps: {
          fontSize: "2xl",
          fontWeight: "bold",
          color: "#ffffff"
        },
        subtitleProps: {
          fontSize: "lg",
          color: "#e0e0e0"
        }
      }
    },
    titleSize: '2xl',
    columnStyle: {},
    imageHeight: '400px',
    showExcerpt: true,
    showMetadata: true
  };

  // Merge default styles with variant styles
  const mergedStyles = mergeStyles(defaultStyles, variant.config.styles);
  
  // Use merged styles in useBlockStyles
  const { containerStyle, columnStyle, headingStyle, subtitleStyle } = useBlockStyles({
    config: {
      ...variant.config,
      styles: mergedStyles
    } as any,
    isDarkTheme
  });

  return (
    <div className={`${classes.container} ${customStyles?.container || ''}`} style={containerStyle}>
      <div className={`${classes.grid} ${customStyles?.grid || ''}`}>
        {Object.entries(articles).map(([colKey, colArticles]) => (
          colArticles.map((article: Article) => (
            <div 
              key={article.id}
              className={`
                flex flex-col md:flex-row gap-6
                mb-8 last:mb-0
              `}
              style={columnStyle(colKey)}
            >
              {article.content.image?.desktop_image_path && (
                <div className="w-full md:w-1/2">
                  <div className="relative aspect-video rounded-lg overflow-hidden">
                    <img
                      src={article.content.image.desktop_image_path}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}
              
              <div className={article.content.image ? 'w-full md:w-1/2' : 'w-full'}>
                <h3 className="text-2xl font-medium mb-3" style={headingStyle}>
                  {article.title}
                </h3>
                {mergedStyles.showExcerpt && (
                  <p className="text-lg" style={subtitleStyle}>
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

export default Split; 