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

const Sidebar: React.FC<BaseVariantProps> = ({ variant, isDarkTheme, customStyles }) => {
  const classes = defaultClasses.mixed.sidebar;
  const { articles } = variant.config;

  // Define default styles
  const defaultStyles = {
    theme: {
      light: {
        mainColumnStyle: {
          background: "#ffffff",
          padding: "24px",
          borderRadius: "8px"
        },
        sidebarStyle: {
          background: "#f7fafc",
          padding: "20px",
          borderRadius: "8px"
        },
        headingProps: {
          fontSize: {
            main: "2xl",
            sidebar: "lg"
          },
          fontWeight: {
            main: "bold",
            sidebar: "medium"
          },
          color: "#1a1a1a"
        },
        subtitleProps: {
          fontSize: {
            main: "lg",
            sidebar: "sm"
          },
          color: "#4a5568"
        }
      },
      dark: {
        mainColumnStyle: {
          background: "#1a1a1a",
          padding: "24px",
          borderRadius: "8px"
        },
        sidebarStyle: {
          background: "#2d3748",
          padding: "20px",
          borderRadius: "8px"
        },
        headingProps: {
          fontSize: {
            main: "2xl",
            sidebar: "lg"
          },
          fontWeight: {
            main: "bold",
            sidebar: "medium"
          },
          color: "#ffffff"
        },
        subtitleProps: {
          fontSize: {
            main: "lg",
            sidebar: "sm"
          },
          color: "#a0aec0"
        }
      }
    },
    layout: {
      sidebarPosition: 'right', // 'left' | 'right'
      sidebarWidth: '300px',
      gap: '24px'
    },
    showExcerpt: {
      main: true,
      sidebar: true
    },
    showImage: {
      main: true,
      sidebar: true
    },
    imageStyle: {
      main: {
        aspectRatio: '16/9',
        borderRadius: '8px'
      },
      sidebar: {
        aspectRatio: '4/3',
        borderRadius: '6px'
      }
    }
  };

  // Merge default styles with variant styles
  const mergedStyles = mergeStyles(defaultStyles, variant.config.styles);
  
  // Use merged styles in useBlockStyles
  const { containerStyle, columnStyle } = useBlockStyles({
    config: {
      ...variant.config,
      styles: mergedStyles
    } as any,
    isDarkTheme
  });

  // Get theme-specific styles
  const theme = mergedStyles.theme[isDarkTheme ? 'dark' : 'light'];

  // Helper functions to get specific styles
  const getHeadingStyle = (type: 'main' | 'sidebar') => ({
    fontSize: theme.headingProps.fontSize[type],
    fontWeight: theme.headingProps.fontWeight[type],
    color: theme.headingProps.color
  });

  const getSubtitleStyle = (type: 'main' | 'sidebar') => ({
    fontSize: theme.subtitleProps.fontSize[type],
    color: theme.subtitleProps.color
  });

  const mainArticle = articles['col-0']?.[0];
  const sidebarArticles = articles['col-1'] || [];

  return (
    <div className={`${classes.container} ${customStyles?.container || ''}`} style={containerStyle}>
      <div 
        className={`
          grid grid-cols-1 lg:grid-cols-[1fr_${mergedStyles.layout.sidebarWidth}]
          ${mergedStyles.layout.sidebarPosition === 'left' ? 'lg:grid-cols-[${mergedStyles.layout.sidebarWidth}_1fr]' : ''}
          gap-${mergedStyles.layout.gap}
        `}
      >
        {/* Main Column */}
        <div 
          className={`${mergedStyles.layout.sidebarPosition === 'left' ? 'lg:order-2' : ''}`}
          style={mergedStyles.theme[isDarkTheme ? 'dark' : 'light'].mainColumnStyle}
        >
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
              
              <h2 className="text-2xl font-bold mb-4" style={getHeadingStyle('main')}>
                {mainArticle.title}
              </h2>
              
              {mergedStyles.showExcerpt.main && (
                <p className="text-lg mb-4" style={getSubtitleStyle('main')}>
                  {mainArticle.subtitle}
                </p>
              )}
            </article>
          )}
        </div>

        {/* Sidebar - Lista de artigos relacionados */}
        <aside 
          className={`${mergedStyles.layout.sidebarPosition === 'left' ? 'lg:order-1' : ''}`}
          style={mergedStyles.theme[isDarkTheme ? 'dark' : 'light'].sidebarStyle}
        >
          <h3 className="text-lg font-semibold mb-4">Artigos Relacionados</h3>
          <div className="space-y-4">
            {sidebarArticles.map((article: Article) => (
              <div 
                key={article.id} 
                className="flex flex-col border-b border-gray-200 dark:border-gray-700 last:border-0 pb-4 last:pb-0"
              >
                <h4 className="text-base mb-1" style={getHeadingStyle('sidebar')}>
                  {article.title}
                </h4>
                
                {mergedStyles.showExcerpt.sidebar && (
                  <p className="text-sm" style={getSubtitleStyle('sidebar')}>
                    {article.subtitle}
                  </p>
                )}
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Sidebar; 