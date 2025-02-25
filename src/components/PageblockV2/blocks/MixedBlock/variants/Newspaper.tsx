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

const Newspaper: React.FC<BaseVariantProps> = ({ variant, isDarkTheme, customStyles }) => {
  const classes = defaultClasses.mixed.newspaper;
  const { articles } = variant.config;

  // Define default styles
  const defaultStyles = {
    theme: {
      light: {
        mainArticleStyle: {
          background: "#ffffff",
          padding: "32px",
          borderRight: "1px solid #e2e8f0"
        },
        columnStyle: {
          background: "#ffffff",
          padding: "24px",
          borderRight: "1px solid #e2e8f0"
        },
        headingProps: {
          fontSize: {
            main: "4xl",
            column: "xl",
            secondary: "lg"
          },
          fontWeight: {
            main: "bold",
            column: "semibold",
            secondary: "medium"
          },
          fontFamily: {
            main: "serif",
            column: "serif",
            secondary: "sans"
          },
          color: "#1a1a1a"
        },
        subtitleProps: {
          fontSize: {
            main: "xl",
            column: "lg",
            secondary: "base"
          },
          color: "#4a5568",
          fontFamily: "serif"
        }
      },
      dark: {
        mainArticleStyle: {
          background: "#1a1a1a",
          padding: "32px",
          borderRight: "1px solid #2d3748"
        },
        columnStyle: {
          background: "#1a1a1a",
          padding: "24px",
          borderRight: "1px solid #2d3748"
        },
        headingProps: {
          fontSize: {
            main: "4xl",
            column: "xl",
            secondary: "lg"
          },
          fontWeight: {
            main: "bold",
            column: "semibold",
            secondary: "medium"
          },
          fontFamily: {
            main: "serif",
            column: "serif",
            secondary: "sans"
          },
          color: "#ffffff"
        },
        subtitleProps: {
          fontSize: {
            main: "xl",
            column: "lg",
            secondary: "base"
          },
          color: "#a0aec0",
          fontFamily: "serif"
        }
      }
    },
    showExcerpt: {
      main: true,
      column: true,
      secondary: true
    },
    showImage: {
      main: true,
      column: true,
      secondary: false
    },
    imageStyle: {
      main: {
        aspectRatio: '16/9',
        borderRadius: '0'
      },
      column: {
        aspectRatio: '4/3',
        borderRadius: '0'
      }
    },
    showDate: true,
    dateFormat: {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
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
  const getHeadingStyle = (type: 'main' | 'column' | 'secondary') => ({
    fontSize: theme.headingProps.fontSize[type],
    fontWeight: theme.headingProps.fontWeight[type],
    fontFamily: theme.headingProps.fontFamily[type],
    color: theme.headingProps.color
  });

  const getSubtitleStyle = (type: 'main' | 'column' | 'secondary') => ({
    fontSize: theme.subtitleProps.fontSize[type],
    color: theme.subtitleProps.color,
    fontFamily: theme.subtitleProps.fontFamily
  });

  const mainArticle = articles['col-0']?.[0];
  const columnArticles = articles['col-1'] || [];
  const secondaryArticles = articles['col-2'] || [];

  return (
    <div className={`${classes.container} ${customStyles?.container || ''}`} style={containerStyle}>
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen">
        {/* Main Article Column */}
        <div className="lg:col-span-6" style={theme.mainArticleStyle}>
          {mainArticle && (
            <article>
              {mergedStyles.showDate && mainArticle.publishedAt && (
                <time className="block mb-6 text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  {new Date(mainArticle.publishedAt).toLocaleDateString('en-US', mergedStyles.dateFormat)}
                </time>
              )}

              <h1 className="mb-6 leading-tight" style={getHeadingStyle('main')}>
                {mainArticle.title}
              </h1>
              
              {mergedStyles.showExcerpt.main && (
                <p className="mb-8 leading-relaxed" style={getSubtitleStyle('main')}>
                  {mainArticle.subtitle}
                </p>
              )}

              {mergedStyles.showImage.main && mainArticle.content.image?.desktop_image_path && (
                <div 
                  className="relative w-full overflow-hidden mb-6"
                  style={{ 
                    aspectRatio: mergedStyles.imageStyle.main.aspectRatio
                  }}
                >
                  <img
                    src={mainArticle.content.image.desktop_image_path}
                    alt={mainArticle.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </article>
          )}
        </div>

        {/* Column Articles */}
        <div className="lg:col-span-3" style={theme.columnStyle}>
          {columnArticles.map((article: Article) => (
            <article key={article.id} className="mb-12 last:mb-0">
              {mergedStyles.showImage.column && article.content.image?.desktop_image_path && (
                <div 
                  className="relative w-full overflow-hidden mb-4"
                  style={{ 
                    aspectRatio: mergedStyles.imageStyle.column.aspectRatio
                  }}
                >
                  <img
                    src={article.content.image.desktop_image_path}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <h2 className="mb-4 leading-snug" style={getHeadingStyle('column')}>
                {article.title}
              </h2>
              
              {mergedStyles.showExcerpt.column && (
                <p className="leading-relaxed" style={getSubtitleStyle('column')}>
                  {article.subtitle}
                </p>
              )}
            </article>
          ))}
        </div>

        {/* Secondary Articles */}
        <div className="lg:col-span-3" style={theme.columnStyle}>
          <div className="space-y-8">
            {secondaryArticles.map((article: Article) => (
              <article key={article.id}>
                <h3 className="mb-3" style={getHeadingStyle('secondary')}>
                  {article.title}
                </h3>
                
                {mergedStyles.showExcerpt.secondary && (
                  <p style={getSubtitleStyle('secondary')}>
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

export default Newspaper; 