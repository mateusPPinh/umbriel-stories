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

const Chronological: React.FC<BaseVariantProps> = ({ variant, isDarkTheme, customStyles }) => {
  const classes = defaultClasses.list.chronological;
  const { articles } = variant.config;

  // Define default styles
  const defaultStyles = {
    theme: {
      light: {
        columnStyle: {
          background: "transparent",
          padding: "16px"
        },
        headingProps: {
          fontSize: "lg",
          fontWeight: "medium",
          color: "#1a1a1a"
        },
        subtitleProps: {
          fontSize: "sm",
          color: "#4a5568"
        },
        timelineProps: {
          color: "#3182ce",
          width: "2px",
          markerSize: "12px",
          markerColor: "#3182ce"
        }
      },
      dark: {
        columnStyle: {
          background: "transparent",
          padding: "16px"
        },
        headingProps: {
          fontSize: "lg",
          fontWeight: "medium",
          color: "#ffffff"
        },
        subtitleProps: {
          fontSize: "sm",
          color: "#a0aec0"
        },
        timelineProps: {
          color: "#63b3ed",
          width: "2px",
          markerSize: "12px",
          markerColor: "#63b3ed"
        }
      }
    },
    showExcerpt: true,
    showMetadata: true,
    showDate: true,
    dateFormat: 'MMM DD, YYYY',
    timelineStyle: 'solid', // 'solid' | 'dashed' | 'dotted'
    markerStyle: 'circle', // 'circle' | 'square' | 'diamond'
    hoverEffect: 'highlight' // 'highlight' | 'scale' | 'none'
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

  // Helper to get timeline style
  const getTimelineStyle = () => {
    const { timelineProps } = mergedStyles.theme[isDarkTheme ? 'dark' : 'light'];
    switch (mergedStyles.timelineStyle) {
      case 'dashed':
        return `dashed ${timelineProps.width} ${timelineProps.color}`;
      case 'dotted':
        return `dotted ${timelineProps.width} ${timelineProps.color}`;
      default:
        return `solid ${timelineProps.width} ${timelineProps.color}`;
    }
  };

  // Helper to get marker style
  const getMarkerClass = () => {
    switch (mergedStyles.markerStyle) {
      case 'square':
        return 'rounded-none';
      case 'diamond':
        return 'rotate-45';
      default:
        return 'rounded-full';
    }
  };

  // Helper to get hover effect class
  const getHoverEffectClass = () => {
    switch (mergedStyles.hoverEffect) {
      case 'highlight':
        return 'hover:bg-primary/5';
      case 'scale':
        return 'hover:scale-[1.02]';
      default:
        return '';
    }
  };

  return (
    <div className={`${classes.container} ${customStyles?.container || ''}`} style={containerStyle}>
      <div className={`${classes.list} relative ${customStyles?.list || ''}`}>
        {/* Timeline */}
        <div 
          className="absolute left-4 top-0 bottom-0 w-px"
          style={{ borderLeft: getTimelineStyle() }}
        />

        {Object.entries(articles).map(([colKey, colArticles]) => (
          colArticles.map((article: Article) => (
            <div 
              key={article.id}
              className={`
                relative pl-12 py-6 transition-all duration-200
                ${getHoverEffectClass()}
              `}
              style={columnStyle(colKey)}
            >
              {/* Timeline marker */}
              <div 
                className={`
                  absolute left-3 top-8 -translate-x-1/2
                  ${getMarkerClass()}
                `}
                style={{
                  width: mergedStyles.theme[isDarkTheme ? 'dark' : 'light'].timelineProps.markerSize,
                  height: mergedStyles.theme[isDarkTheme ? 'dark' : 'light'].timelineProps.markerSize,
                  backgroundColor: mergedStyles.theme[isDarkTheme ? 'dark' : 'light'].timelineProps.markerColor
                }}
              />

              {mergedStyles.showDate && article.publishedAt && (
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  {new Date(article.publishedAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </div>
              )}

              <h3 className="mb-2" style={headingStyle}>
                {article.title}
              </h3>
              
              {mergedStyles.showExcerpt && (
                <p className="mb-2" style={subtitleStyle}>
                  {article.subtitle}
                </p>
              )}

              {mergedStyles.showMetadata && (
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {/* Add metadata rendering here */}
                </div>
              )}
            </div>
          ))
        ))}
      </div>
    </div>
  );
};

export default Chronological; 