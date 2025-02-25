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

const Showcase: React.FC<BaseVariantProps> = ({ variant, isDarkTheme, customStyles }) => {
  const classes = defaultClasses.mixed.showcase;
  const { articles } = variant.config;

  // Define default styles
  const defaultStyles = {
    theme: {
      light: {
        featuredStyle: {
          background: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%)",
          padding: "24px",
          borderRadius: "16px"
        },
        gridStyle: {
          background: "#ffffff",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
        },
        listStyle: {
          background: "#f8fafc",
          padding: "16px",
          borderRadius: "8px"
        },
        headingProps: {
          fontSize: {
            featured: "4xl",
            grid: "xl",
            list: "lg"
          },
          fontWeight: {
            featured: "bold",
            grid: "semibold",
            list: "medium"
          },
          color: {
            featured: "#ffffff",
            grid: "#1a1a1a",
            list: "#1a1a1a"
          }
        },
        subtitleProps: {
          fontSize: {
            featured: "xl",
            grid: "lg",
            list: "base"
          },
          color: {
            featured: "rgba(255,255,255,0.9)",
            grid: "#4a5568",
            list: "#4a5568"
          }
        }
      },
      dark: {
        featuredStyle: {
          background: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.9) 100%)",
          padding: "24px",
          borderRadius: "16px"
        },
        gridStyle: {
          background: "#1a1a1a",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.3)"
        },
        listStyle: {
          background: "#2d3748",
          padding: "16px",
          borderRadius: "8px"
        },
        headingProps: {
          fontSize: {
            featured: "4xl",
            grid: "xl",
            list: "lg"
          },
          fontWeight: {
            featured: "bold",
            grid: "semibold",
            list: "medium"
          },
          color: {
            featured: "#ffffff",
            grid: "#ffffff",
            list: "#ffffff"
          }
        },
        subtitleProps: {
          fontSize: {
            featured: "xl",
            grid: "lg",
            list: "base"
          },
          color: {
            featured: "rgba(255,255,255,0.9)",
            grid: "#a0aec0",
            list: "#a0aec0"
          }
        }
      }
    },
    showExcerpt: {
      featured: true,
      grid: true,
      list: true
    },
    showImage: {
      featured: true,
      grid: true,
      list: false
    },
    imageStyle: {
      featured: {
        aspectRatio: '21/9',
        borderRadius: '16px'
      },
      grid: {
        aspectRatio: '16/9',
        borderRadius: '8px'
      }
    },
    hoverEffect: {
      featured: 'scale',
      grid: 'lift',
      list: 'highlight'
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
  const getHeadingStyle = (type: 'featured' | 'grid' | 'list') => ({
    fontSize: theme.headingProps.fontSize[type],
    fontWeight: theme.headingProps.fontWeight[type],
    color: theme.headingProps.color[type]
  });

  const getSubtitleStyle = (type: 'featured' | 'grid' | 'list') => ({
    fontSize: theme.subtitleProps.fontSize[type],
    color: theme.subtitleProps.color[type]
  });

  const getHoverClass = (type: 'featured' | 'grid' | 'list') => {
    switch (mergedStyles.hoverEffect[type]) {
      case 'scale':
        return 'transform transition-transform duration-300 hover:scale-[1.02]';
      case 'lift':
        return 'transition-shadow duration-300 hover:shadow-lg';
      case 'highlight':
        return 'transition-colors duration-300 hover:bg-gray-50 dark:hover:bg-gray-800';
      default:
        return '';
    }
  };

  const featuredArticle = articles['col-0']?.[0];
  const gridArticles = articles['col-1'] || [];
  const listArticles = articles['col-2'] || [];

  return (
    <div className={`${classes.container} ${customStyles?.container || ''}`} style={containerStyle}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Featured Article */}
        <div className="lg:col-span-12">
          {featuredArticle && (
            <article className={`relative ${getHoverClass('featured')}`}>
              {mergedStyles.showImage.featured && featuredArticle.content.image?.desktop_image_path && (
                <div 
                  className="relative w-full overflow-hidden"
                  style={{ 
                    aspectRatio: mergedStyles.imageStyle.featured.aspectRatio,
                    borderRadius: mergedStyles.imageStyle.featured.borderRadius
                  }}
                >
                  <img
                    src={featuredArticle.content.image.desktop_image_path}
                    alt={featuredArticle.title}
                    className="w-full h-full object-cover"
                  />
                  <div 
                    className="absolute inset-0 flex flex-col justify-end p-8"
                    style={theme.featuredStyle}
                  >
                    <h1 className="mb-4" style={getHeadingStyle('featured')}>
                      {featuredArticle.title}
                    </h1>
                    
                    {mergedStyles.showExcerpt.featured && (
                      <p className="mb-4" style={getSubtitleStyle('featured')}>
                        {featuredArticle.subtitle}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </article>
          )}
        </div>

        {/* Grid Articles */}
        <div className="lg:col-span-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {gridArticles.map((article: Article) => (
              <article 
                key={article.id}
                className={`${getHoverClass('grid')}`}
                style={theme.gridStyle}
              >
                {mergedStyles.showImage.grid && article.content.image?.desktop_image_path && (
                  <div 
                    className="relative w-full overflow-hidden mb-4"
                    style={{ 
                      aspectRatio: mergedStyles.imageStyle.grid.aspectRatio,
                      borderRadius: mergedStyles.imageStyle.grid.borderRadius
                    }}
                  >
                    <img
                      src={article.content.image.desktop_image_path}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                <h2 className="mb-3" style={getHeadingStyle('grid')}>
                  {article.title}
                </h2>
                
                {mergedStyles.showExcerpt.grid && (
                  <p style={getSubtitleStyle('grid')}>
                    {article.subtitle}
                  </p>
                )}
              </article>
            ))}
          </div>
        </div>

        {/* List Articles */}
        <div className="lg:col-span-4" style={theme.listStyle}>
          <div className="space-y-6">
            {listArticles.map((article: Article) => (
              <article 
                key={article.id}
                className={`p-4 ${getHoverClass('list')}`}
              >
                <h3 className="mb-2" style={getHeadingStyle('list')}>
                  {article.title}
                </h3>
                
                {mergedStyles.showExcerpt.list && (
                  <p style={getSubtitleStyle('list')}>
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

export default Showcase; 