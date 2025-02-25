import React from 'react';
import { useBlockStyles } from '../../../hooks/useBlockStyles';
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

const FeaturedGrid: React.FC<BaseVariantProps> = ({ variant, isDarkTheme, customStyles }) => {
  const classes = defaultClasses.grid.featured;
  const { articles } = variant.config;

  // Define default styles
  const defaultStyles = {
    theme: {
      light: {
        columnStyle: {
          background: "#ffffff",
          padding: 0,
          borderRadius: '12px',
          overflow: 'hidden'
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
          background: "#1a1a1a",
          padding: 0,
          borderRadius: '12px',
          overflow: 'hidden'
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
    imageHeight: '300px',
    showExcerpt: true,
    showMetadata: true,
    featuredImageOverlay: true,
    overlayGradient: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%)',
    gridGap: '32px',
    gridColumns: {
      mobile: 1,
      tablet: 2,
      desktop: 3
    }
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
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={article.content.image.desktop_image_path}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                  {mergedStyles.featuredImageOverlay && (
                    <div 
                      className="absolute inset-0" 
                      style={{ background: mergedStyles.overlayGradient }}
                    />
                  )}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-white mb-2" style={headingStyle}>
                      {article.title}
                    </h3>
                    {mergedStyles.showExcerpt && (
                      <p className="text-white/80" style={subtitleStyle}>
                        {article.subtitle}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))
        ))}
      </div>
    </div>
  );
};

export default FeaturedGrid; 