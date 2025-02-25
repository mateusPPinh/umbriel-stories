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

const Magazine: React.FC<BaseVariantProps> = ({ variant, isDarkTheme, customStyles }) => {
  const classes = defaultClasses.mixed.magazine;
  const { articles } = variant.config;

  // Define default styles
  const defaultStyles = {
    theme: {
      light: {
        mainArticleStyle: {
          background: "#ffffff",
          padding: "24px",
          borderRadius: "12px"
        },
        secondaryArticleStyle: {
          background: "#f8fafc",
          padding: "16px",
          borderRadius: "8px"
        },
        compactListStyle: {
          background: "transparent",
          borderTop: "2px solid #e2e8f0"
        },
        headingProps: {
          fontSize: {
            main: "3xl",
            secondary: "xl",
            compact: "lg"
          },
          fontWeight: {
            main: "bold",
            secondary: "semibold",
            compact: "medium"
          },
          color: "#1a1a1a"
        },
        subtitleProps: {
          fontSize: {
            main: "xl",
            secondary: "lg",
            compact: "base"
          },
          color: "#4a5568"
        }
      },
      dark: {
        mainArticleStyle: {
          background: "#1a1a1a",
          padding: "24px",
          borderRadius: "12px"
        },
        secondaryArticleStyle: {
          background: "#2d3748",
          padding: "16px",
          borderRadius: "8px"
        },
        compactListStyle: {
          background: "transparent",
          borderTop: "2px solid #4a5568"
        },
        headingProps: {
          fontSize: {
            main: "3xl",
            secondary: "xl",
            compact: "lg"
          },
          fontWeight: {
            main: "bold",
            secondary: "semibold",
            compact: "medium"
          },
          color: "#ffffff"
        },
        subtitleProps: {
          fontSize: {
            main: "xl",
            secondary: "lg",
            compact: "base"
          },
          color: "#a0aec0"
        }
      }
    },
    showExcerpt: {
      main: true,
      secondary: true,
      compact: false
    },
    showImage: {
      main: true,
      secondary: true,
      compact: false
    },
    imageStyle: {
      main: {
        aspectRatio: '16/9',
        borderRadius: '12px'
      },
      secondary: {
        aspectRatio: '4/3',
        borderRadius: '8px'
      }
    }
  };

  // Merge default styles with variant styles
  const mergedStyles = mergeStyles(defaultStyles, variant.config.styles);
  
  // Use merged styles in useBlockStyles
  const { containerStyle } = useBlockStyles({
    config: {
      ...variant.config,
      styles: mergedStyles
    } as any,
    isDarkTheme
  });

  // Get theme-specific styles
  const theme = mergedStyles.theme[isDarkTheme ? 'dark' : 'light'];

  // Helper functions to get specific styles
  const getHeadingStyle = (type: 'main' | 'secondary' | 'compact') => ({
    fontSize: theme.headingProps.fontSize[type],
    fontWeight: theme.headingProps.fontWeight[type],
    color: theme.headingProps.color
  });

  const getSubtitleStyle = (type: 'main' | 'secondary' | 'compact') => ({
    fontSize: theme.subtitleProps.fontSize[type],
    color: theme.subtitleProps.color
  });

  const mainArticle = articles['col-0']?.[0];
  const secondaryArticles = articles['col-1'] || [];
  const compactArticles = articles['col-2'] || [];

  return (
    <div className={`${classes.container} ${customStyles?.container || ''}`} style={containerStyle}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Article */}
        <div className="lg:col-span-7" style={theme.mainArticleStyle}>
          {mainArticle && (
            <article>
              {mergedStyles.showImage.main && mainArticle.content.image?.desktop_image_path && (
                <div 
                  className="relative w-full overflow-hidden mb-6"
                  style={{ 
                    aspectRatio: mergedStyles.imageStyle.main.aspectRatio,
                    borderRadius: mergedStyles.imageStyle.main.borderRadius
                  }}
                >
                  <img
                    src={mainArticle.content.image.desktop_image_path}
                    alt={mainArticle.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <h1 className="mb-4" style={getHeadingStyle('main')}>
                {mainArticle.title}
              </h1>
              
              {mergedStyles.showExcerpt.main && (
                <p className="mb-4" style={getSubtitleStyle('main')}>
                  {mainArticle.subtitle}
                </p>
              )}
            </article>
          )}
        </div>

        {/* Secondary Articles */}
        <div className="lg:col-span-5 space-y-6">
          {secondaryArticles.map((article: Article) => (
            <article 
              key={article.id}
              style={theme.secondaryArticleStyle}
              className="flex flex-col"
            >
              {mergedStyles.showImage.secondary && article.content.image?.desktop_image_path && (
                <div 
                  className="relative w-full overflow-hidden mb-4"
                  style={{ 
                    aspectRatio: mergedStyles.imageStyle.secondary.aspectRatio,
                    borderRadius: mergedStyles.imageStyle.secondary.borderRadius
                  }}
                >
                  <img
                    src={article.content.image.desktop_image_path}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <h2 className="mb-2" style={getHeadingStyle('secondary')}>
                {article.title}
              </h2>
              
              {mergedStyles.showExcerpt.secondary && (
                <p style={getSubtitleStyle('secondary')}>
                  {article.subtitle}
                </p>
              )}
            </article>
          ))}
        </div>

        {/* Compact List */}
        <div className="lg:col-span-12 mt-8" style={theme.compactListStyle}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
            {compactArticles.map((article: Article) => (
              <article key={article.id} className="flex flex-col">
                <h3 className="mb-2" style={getHeadingStyle('compact')}>
                  {article.title}
                </h3>
                
                {mergedStyles.showExcerpt.compact && (
                  <p style={getSubtitleStyle('compact')}>
                    {article.subtitle}
                  </p>
                )}
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Magazine; 