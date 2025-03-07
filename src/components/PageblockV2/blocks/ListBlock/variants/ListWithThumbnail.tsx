import React from 'react';
import { useBlockStyles } from '../../../hooks/useBlockStyles';
import { BlockVariant, Article, ClientTheme } from '../../../types';
import { defaultClasses } from '../../../constants/defaultClasses';
import { useClientTheme } from '../../../hooks/useClientTheme';
import { generateArticleUrl } from '../../../utils/generateArticleUrl';
import Link from '../../../../Link'



interface BaseVariantProps {
  variant: BlockVariant;
  isDarkTheme?: boolean;
  customStyles?: any;
  clientGeneralSettingsData: ClientTheme;
  layout?: 'single' | 'grid';
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

const ListWithThumbnail: React.FC<BaseVariantProps> = ({ 
  variant, 
  isDarkTheme, 
  customStyles, 
  clientGeneralSettingsData, 
  // The layout prop can come from two places: 
  // 1. Directly passed as a prop (for client-side control)
  // 2. From the variant's config.styles (when loaded from API)
  layout: explicitLayout
}) => {
  const theme = useClientTheme({ clientGeneralSettingsData, isDarkTheme });
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
    thumbnailShape: 'square',
    showExcerpt: true,
    showMetadata: true,
    hoverEffect: 'scale',
    imagePosition: 'left',
    layout: 'single',
    gridGap: '24px'
  };

  // Determine the actual layout to use
  // Priority: 1. Explicit layout prop, 2. Style config, 3. Default
  // This ensures both client-side control and API payload control work
  const layoutFromConfig = (variant.config.styles as any)?.layout;
  const actualLayout = explicitLayout || layoutFromConfig || 'single';
  
  // Get grid gap from config or use default
  const gridGap = (variant.config.styles as any)?.gridGap || '24px';

  // Apply the layout-specific thumbnail size
  const thumbnailSize = actualLayout === 'grid' 
    ? { width: '180px', height: '120px' }
    : { width: '120px', height: '120px' };

  // Merge default styles with variant styles
  const mergedStyles = mergeStyles(
    { 
      ...defaultStyles,
      thumbnailSize,
      layout: actualLayout,
      gridGap
    },
    variant.config.styles
  );
  
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

  // Log for debugging
  console.log('ListWithThumbnail rendering with layout:', actualLayout, 'from sources:', {
    explicitLayout,
    layoutFromConfig,
    mergedStyles
  });

  return (
    <div className={`${classes.container} ${customStyles?.container || ''}`} style={containerStyle}>
      <div 
        className={`
          ${classes.list} 
          ${actualLayout === 'grid' ? 'grid grid-cols-2 gap-6' : 'space-y-4'} 
          ${customStyles?.list || ''}
        `}
        style={{
          gap: actualLayout === 'grid' ? gridGap : undefined
        }}
      >
        {Object.entries(articles).map(([colKey, colArticles]) => {
          const articleUrl = generateArticleUrl(colArticles[0]);
          return (
             colArticles.map((article: Article) => (
            <div 
              key={article.id}
              className={`
                flex ${mergedStyles.imagePosition === 'right' ? 'flex-row-reverse' : 'flex-row'}
                gap-6 items-start
                ${getHoverEffectClass()}
                ${actualLayout === 'grid' ? 'h-full' : ''}
              `}
              style={columnStyle(colKey)}
            >
              {article.content?.image?.desktop_image_path && (
                <div 
                  className="flex-shrink-0"
                  style={{
                    width: actualLayout === 'grid' ? '180px' : mergedStyles.thumbnailSize.width,
                    height: actualLayout === 'grid' ? '120px' : mergedStyles.thumbnailSize.height
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
                <Link href={articleUrl}>
                <h3 className={`mb-2 ${actualLayout === 'grid' ? 'text-lg font-semibold' : ''}`} style={{
                  color: theme.title.color,
                  fontFamily: theme.title.fontFamily,
                }}>
                  {article.title}
                </h3>
                </Link>
                {mergedStyles.showExcerpt ? (
                  <p className={`mb-2 ${actualLayout === 'grid' ? 'line-clamp-3' : 'line-clamp-2'}`} style={{
                    color: theme.subtitle.color,
                    fontFamily: theme.subtitle.fontFamily,
                  }}>
                    {article.subtitle}
                  </p>
                ) : null}
                {mergedStyles.showMetadata ? (
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {/* Add metadata rendering here */}
                  </div>
                ) : null}
              </div>
            </div>
          ))
          )
        })}
      </div>
    </div>
  );
};

export default ListWithThumbnail; 