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

const MasonryGrid: React.FC<BaseVariantProps> = ({ variant, isDarkTheme, customStyles }) => {
  const classes = defaultClasses.grid.masonry;
  const { articles } = variant.config;

  // Define default styles
  const defaultStyles = {
    theme: {
      light: {
        columnStyle: {
          background: "#ffffff",
          padding: 16,
          borderRadius: '8px'
        },
        headingProps: {
          fontSize: "xl",
          fontWeight: "semibold",
          color: "#1a1a1a"
        },
        subtitleProps: {
          fontSize: "md",
          color: "#4a4a4a"
        }
      },
      dark: {
        columnStyle: {
          background: "#1a1a1a",
          padding: 16,
          borderRadius: '8px'
        },
        headingProps: {
          fontSize: "xl",
          fontWeight: "semibold",
          color: "#ffffff"
        },
        subtitleProps: {
          fontSize: "md",
          color: "#e0e0e0"
        }
      }
    },
    titleSize: 'xl',
    showExcerpt: true,
    showMetadata: true,
    masonryGap: '24px',
    masonryColumns: {
      mobile: 1,
      tablet: 2,
      desktop: 3
    },
    imageVariations: ['square', 'portrait', 'landscape'],
    hoverEffect: 'scale' // 'scale' | 'lift' | 'none'
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

  // Helper to get random aspect ratio
  const getRandomAspectRatio = () => {
    const variations = mergedStyles.imageVariations;
    const random = Math.floor(Math.random() * variations.length);
    switch (variations[random]) {
      case 'portrait':
        return 'aspect-[3/4]';
      case 'landscape':
        return 'aspect-[4/3]';
      default:
        return 'aspect-square';
    }
  };

  // Helper to get hover effect class
  const getHoverEffectClass = () => {
    switch (mergedStyles.hoverEffect) {
      case 'scale':
        return 'hover:scale-[1.02] transition-transform duration-300';
      case 'lift':
        return 'hover:-translate-y-2 transition-transform duration-300';
      default:
        return '';
    }
  };

  return (
    <div className={`${classes.container} ${customStyles?.container || ''}`} style={containerStyle}>
      <div 
        className={`
          columns-1 md:columns-2 lg:columns-3
          gap-6
          ${getHoverEffectClass()}
        `}
      >
        {Object.entries(articles).map(([colKey, colArticles]) => (
          colArticles.map((article: Article) => (
            <div 
              key={article.id}
              className={`
                break-inside-avoid
                mb-6
                ${classes.article}
              `}
              style={columnStyle(colKey)}
            >
              {article.content.image?.desktop_image_path && (
                <div className={`relative ${getRandomAspectRatio()} overflow-hidden rounded-lg mb-4`}>
                  <img
                    src={article.content.image.desktop_image_path}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <div className="p-4">
                <h3 className="font-medium mb-2" style={headingStyle}>
                  {article.title}
                </h3>
                {mergedStyles.showExcerpt && (
                  <p style={subtitleStyle}>
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

export default MasonryGrid; 