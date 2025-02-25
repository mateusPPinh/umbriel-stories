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

const Hero: React.FC<BaseVariantProps> = ({ variant, isDarkTheme, customStyles }) => {
  const classes = defaultClasses.featured.hero;
  const { articles } = variant.config;

  // Define default styles
  const defaultStyles = {
    theme: {
      light: {
        columnStyle: {
          background: "transparent"
        },
        headingProps: {
          fontSize: "4xl",
          fontWeight: "bold",
          color: "#1a1a1a"
        },
        subtitleProps: {
          fontSize: "xl",
          color: "#4a4a4a"
        }
      },
      dark: {
        columnStyle: {
          background: "transparent"
        },
        headingProps: {
          fontSize: "4xl",
          fontWeight: "bold",
          color: "#ffffff"
        },
        subtitleProps: {
          fontSize: "xl",
          color: "#e0e0e0"
        }
      }
    },
    titleSize: '4xl',
    imageHeight: '600px',
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
              className={classes.article}
              style={columnStyle(colKey)}
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
                <h2 className="text-4xl font-bold text-white mb-4" style={headingStyle}>
                  {article.title}
                </h2>
                {mergedStyles.showExcerpt && (
                  <p className="text-xl text-white/90" style={subtitleStyle}>
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