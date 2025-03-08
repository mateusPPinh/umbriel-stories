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

const CompactList: React.FC<BaseVariantProps> = ({ 
  variant, 
  isDarkTheme, 
  customStyles, 
  clientGeneralSettingsData,
  // The layout prop can come from two places: 
  // 1. Directly passed as a prop (for client-side control)
  // 2. From the variant's config.styles (when loaded from API)
  layout: explicitLayout 
}) => {
  const theme = useClientTheme({ clientGeneralSettingsData, isDarkTheme })
  const classes = defaultClasses.list.compact;
  const { articles } = variant.config;

  // Define default styles
  const defaultStyles = {
    theme: {
      light: {
        columnStyle: {
          background: "transparent",
          borderBottom: "1px solid #e2e8f0",
          padding: "16px 0"
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
          background: "transparent",
          borderBottom: "1px solid #2d3748",
          padding: "16px 0"
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
    titleSize: 'lg',
    showExcerpt: true,
    showMetadata: true,
    hoverEffect: 'background', // 'background' | 'translate' | 'none'
    dividerStyle: 'solid', // 'solid' | 'dashed' | 'dotted'
    spacing: {
      itemPadding: '16px 0',
      itemGap: '0'
    },
    layout: 'single',
    gridGap: '24px'
  };

  // Get the actual layout to use, prioritizing:
  // 1. Explicit layout prop
  // 2. Layout from variant's config
  // 3. Default to 'single'
  const layoutFromConfig = (variant.config.styles as any)?.layout;
  const actualLayout = explicitLayout || layoutFromConfig || 'single';
  
  // Merge styles with grid-specific styles
  const defaultGridStyles = {
    gridGap: '24px',
    columns: 2,
    backgroundColor: 'transparent'
  };
  
  const gridStyles = (variant.config.styles as any)?.gridStyles || {};
  
  // Merge default styles with variant styles
  const mergedStyles = mergeStyles(
    { 
      ...defaultStyles,
      layout: actualLayout,
      gridGap: defaultGridStyles.gridGap,
      gridStyles: {
        ...defaultGridStyles,
        ...gridStyles
      }
    },
    variant.config.styles
  );
  
  // Override styles.layout in variant config to ensure it's used by the component
  // This is critical for the layout to persist in the Next.js frontend
  (variant.config.styles as any) = {
    ...(variant.config.styles as any),
    layout: actualLayout
  };
  
  const gridGap = defaultGridStyles.gridGap;

  // Use merged styles in useBlockStyles
  const { containerStyle, columnStyle, headingStyle, subtitleStyle } = useBlockStyles({
    config: {
      ...variant.config,
      styles: mergedStyles
    } as any,
    isDarkTheme
  });

  // Helper to get hover effect class
  const getHoverEffectClass = () => {
    switch (mergedStyles.hoverEffect) {
      case 'background':
        return 'hover:bg-gray-50 dark:hover:bg-gray-800';
      case 'translate':
        return 'hover:translate-x-2';
      default:
        return '';
    }
  };

  // Helper to get divider style
  const getDividerStyle = () => {
    switch (mergedStyles.dividerStyle) {
      case 'dashed':
        return 'border-dashed';
      case 'dotted':
        return 'border-dotted';
      default:
        return 'border-solid';
    }
  };

  // Check if we have articles to display
  const hasArticles = articles && Object.entries(articles).some(([_, articleArr]) => 
    Array.isArray(articleArr) && articleArr.length > 0
  );

  // Render skeleton component
  const renderSkeleton = () => {
    return (
      <div className={`w-full ${actualLayout === 'grid' ? 'grid grid-cols-2 gap-6' : 'flex flex-col space-y-4'}`}>
        {Array.from({ length: actualLayout === 'grid' ? 6 : 4 }).map((_, index) => (
          <div 
            key={index}
            className={`
              animate-pulse 
              ${actualLayout === 'grid' 
                ? 'p-4 rounded-lg' 
                : `py-4 ${index < 3 ? 'border-b border-gray-200 dark:border-gray-700' : ''}`
              }
            `}
          >
            {/* Title */}
            <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3"></div>
            
            {/* Excerpt */}
            <div className="space-y-2 mt-2">
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
            </div>
            
            {/* Date */}
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mt-3"></div>
          </div>
        ))}
      </div>
    );
  };

  

  // Log for debugging
  console.log('CompactList rendering with layout:', actualLayout, 'from sources:', {
    explicitLayout,
    layoutFromConfig,
    mergedStyles,
    hasArticles
  });

  return (
    <div className={`${classes.container} ${customStyles?.container || ''}`} style={containerStyle}>
      {!hasArticles ? (
        renderSkeleton()
      ) : (
        <div 
          className={`
            ${classes.list} 
            ${actualLayout === 'grid' ? 'grid grid-cols-2 gap-6' : 'flex flex-col space-y-0'} 
            ${customStyles?.list || ''}
          `}
          style={{
            gap: actualLayout === 'grid' ? gridGap : undefined
          }}
        >
          {Object.entries(articles).map(([colKey, colArticles]) =>  {
            return colArticles.map((article: Article) => {
              const articleUrl = generateArticleUrl(article);
              return (
                <div 
                  key={article.id}
                  className={`
                    transition-all duration-200
                    ${getHoverEffectClass()}
                    ${actualLayout !== 'grid' ? `${getDividerStyle()} border-b` : ''}
                    ${actualLayout !== 'grid' ? 'last:border-b-0' : ''}
                    ${actualLayout === 'grid' ? 'h-full p-3 rounded' : ''}
                  `}
                  style={columnStyle(colKey)}
                >
                  <div className="flex flex-col">
                    <Link className="hover:underline transition-all duration-300" href={articleUrl}>
                      <h3 
                        className={`mb-1 ${actualLayout === 'grid' ? 'text-lg' : ''}`}
                        style={{
                          color: theme.title.color,
                          fontFamily: theme.title.fontFamily,
                        }}
                      >
                        {article.title}
                      </h3>
                    </Link>
                    {mergedStyles.showExcerpt && (
                      <p 
                        className={`${actualLayout === 'grid' ? 'line-clamp-3' : 'line-clamp-2'} mt-1`}
                        style={{
                          color: theme.subtitle.color,
                          fontFamily: theme.subtitle.fontFamily,
                        }}
                      >
                        {article.subtitle}
                      </p>
                    )}
                    {mergedStyles.showMetadata && (
                      <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                        {article.created_at && (
                          <time dateTime={article.created_at}>
                            {new Date(article.created_at).toLocaleDateString('pt-BR', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </time>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            });
          })}
        </div>
      )}
    </div>
  );
};

export default CompactList; 