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

const CompactList: React.FC<BaseVariantProps> = ({ variant, isDarkTheme, customStyles }) => {
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

  return (
    <div className={`${classes.container} ${customStyles?.container || ''}`} style={containerStyle}>
      <div className={`${classes.list} ${customStyles?.list || ''}`}>
        {Object.entries(articles).map(([colKey, colArticles]) => (
          colArticles.map((article: Article) => (
            <div 
              key={article.id}
              className={`
                transition-all duration-200
                ${getHoverEffectClass()}
                ${getDividerStyle()}
                last:border-b-0
              `}
              style={columnStyle(colKey)}
            >
              <div className="flex flex-col">
                <h3 className="mb-1" style={headingStyle}>
                  {article.title}
                </h3>
                {mergedStyles.showExcerpt ? (
                  <p style={subtitleStyle}>
                    {article.subtitle}
                  </p>
                ) : (
                  <p style={subtitleStyle}>
                    {article.subtitle}
                  </p>
                )}
                {mergedStyles.showMetadata ? (
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    {/* Add metadata rendering here */}
                  </div>
                ) : (
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
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

export default CompactList; 