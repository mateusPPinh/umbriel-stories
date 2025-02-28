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

const ListWithThumbnail: React.FC<BaseVariantProps> = ({ variant, isDarkTheme, customStyles }) => {
  const classes = defaultClasses.list.thumbnail;
  const { articles } = variant.config;

  // Define default styles
  const defaultStyles = {
    theme: {
      light: {
        columnStyle: {
          background: "#ffffff",
          padding: "16px",
          borderBottom: "1px solid #e2e8f0"
        },
        headingProps: {
          fontSize: "lg",
          fontWeight: "medium",
          color: "#1a1a1a"
        },
        subtitleProps: {
          fontSize: "sm",
          color: "#4a5568"
        }
      },
      dark: {
        columnStyle: {
          background: "#1a1a1a",
          padding: "16px",
          borderBottom: "1px solid #2d3748"
        },
        headingProps: {
          fontSize: "lg",
          fontWeight: "medium",
          color: "#ffffff"
        },
        subtitleProps: {
          fontSize: "sm",
          color: "#a0aec0"
        }
      }
    },
    thumbnailSize: {
      width: '120px',
      height: '120px'
    },
    thumbnailShape: 'square', // 'square' | 'rounded' | 'circle'
    showExcerpt: true,
    showMetadata: true,
    hoverEffect: 'scale', // 'scale' | 'glow' | 'none'
    imagePosition: 'left' // 'left' | 'right'
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

  // Helper to get thumbnail shape class
  const getThumbnailShapeClass = () => {
    switch (mergedStyles.thumbnailShape) {
      case 'rounded':
        return 'rounded-lg';
      case 'circle':
        return 'rounded-full';
      default:
        return 'rounded-none';
    }
  };

  // Helper to get hover effect class
  const getHoverEffectClass = () => {
    switch (mergedStyles.hoverEffect) {
      case 'scale':
        return 'hover:scale-[1.02] transition-transform duration-300';
      case 'glow':
        return 'hover:shadow-lg hover:shadow-primary/20 transition-shadow duration-300';
      default:
        return '';
    }
  };

  return (
    <div className={`${classes.container} ${customStyles?.container || ''}`} style={containerStyle}>
      <div className={`${classes.list} space-y-4 ${customStyles?.list || ''}`}>
        {Object.entries(articles).map(([colKey, colArticles]) => (
          colArticles.map((article: Article) => (
            <div 
              key={article.id}
              className={`
                flex ${mergedStyles.imagePosition === 'right' ? 'flex-row-reverse' : 'flex-row'}
                gap-6 items-start
                ${getHoverEffectClass()}
              `}
              style={columnStyle(colKey)}
            >
              {article.content?.image?.desktop_image_path && (
                <div 
                  className="flex-shrink-0"
                  style={{
                    width: mergedStyles.thumbnailSize.width,
                    height: mergedStyles.thumbnailSize.height
                  }}
                >
                  <div className={`relative w-full h-full overflow-hidden ${getThumbnailShapeClass()}`}>
                    <img
                      src={article.content?.image?.desktop_image_path}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}
              
              <div className="flex-grow">
                <h3 className="mb-2" style={headingStyle}>
                  {article.title}
                </h3>
                {mergedStyles.showExcerpt ? (
                  <p className="mb-2" style={subtitleStyle}>
                    {article.subtitle}
                  </p>
                ) : (
                  <p className="mb-2" style={subtitleStyle}>
                    {article.subtitle}
                  </p>
                )}
                {mergedStyles.showMetadata ? (
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {/* Add metadata rendering here */}
                  </div>
                ) : (
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {/* Add metadata rendering here */}
                  </div>
                )}
              </div>
            </div>
          ))
        ))}
      </div>
    </div>
  );
};

export default ListWithThumbnail; 