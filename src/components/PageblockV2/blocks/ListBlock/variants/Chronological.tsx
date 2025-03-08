import React from 'react';
import { BlockVariant, Article, TimelineStyles, ClientTheme } from '../../../types';
import { defaultClasses } from '../../../constants/defaultClasses';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { generateArticleUrl } from '../../../utils/generateArticleUrl';
import { useClientTheme } from '../../../hooks/useClientTheme';
import Link from '../../../../Link'
import { useBlockStyles } from '../../../hooks/useBlockStyles';

interface BaseVariantProps {
  variant: BlockVariant & {
    config: {
      styles: TimelineStyles;
    };
  };
  isDarkTheme?: boolean;
  customStyles?: any;
  clientGeneralSettingsData: ClientTheme;
  layout?: 'single' | 'grid';
}

const Chronological: React.FC<BaseVariantProps> = ({ variant, isDarkTheme, customStyles, clientGeneralSettingsData, layout: explicitLayout }) => {
  const theme = useClientTheme({ clientGeneralSettingsData, isDarkTheme })
  const classes = defaultClasses.list.chronological;
  const { articles } = variant.config;
  const styles = variant.config.styles || {};

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

  const formatRelativeTime = (date: string | Date) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return formatDistanceToNow(dateObj, { 
      addSuffix: true,
      locale: ptBR 
    });
  };

  const truncateText = (text: string, maxLength: number = 150) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  const layoutFromConfig = (variant.config.styles as any)?.layout;
  const actualLayout = explicitLayout || layoutFromConfig || 'single';
  
  // Get grid gap from config or use default
  const gridGap = (variant.config.styles as any)?.gridGap || '24px';

  // Apply the layout-specific thumbnail size
  const thumbnailSize = actualLayout === 'grid' 
    ? { width: '180px', height: '120px' }
    : { width: '120px', height: '120px' };

  // Ensure grid styles are merged correctly
  const defaultGridStyles = {
    gridGap: '24px',
    columns: 2,
    backgroundColor: 'transparent'
  };
  
  const gridStyles = (variant.config.styles as any)?.gridStyles || {};

  // Merge default styles with variant styles
  const mergedStyles = mergeStyles(
    { 
      ...styles,
      thumbnailSize,
      layout: actualLayout, // Important: preserve layout in mergedStyles
      gridGap,
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
  
  // Use merged styles in useBlockStyles
  const { containerStyle, columnStyle, headingStyle, subtitleStyle } = useBlockStyles({
    config: {
      ...variant.config,
      styles: mergedStyles
    } as any,
    isDarkTheme
  });

  return (
    <div className={`${classes.container} ${customStyles?.container || ''}`} style={containerStyle}>
      <div className={`
        ${classes.list}
        ${actualLayout === 'grid' ? 'grid grid-cols-2 gap-6' : ''}
      `}>
        {/* Linha do Timeline - só exibir no layout single */}
        {actualLayout !== 'grid' && (
          <div className={`
            ${classes.timeline}
            ${classes.variants.line[styles.timelineStyle || 'solid']}
            space-y-4
            ${customStyles?.list || ''} 
          `} />
        )}

        {Object.entries(articles).map(([colKey, colArticles]) => (
          colArticles.map((article: Article) => {
            const articleUrl = generateArticleUrl(article);
            
            return (
              <div 
                key={article.id}
                className={`
                  ${classes.item}
                  ${actualLayout === 'grid' ? 'p-4 rounded-lg border border-gray-200 dark:border-gray-700' : ''}
                  ${classes.variants.hover[styles.hoverEffect || 'highlight']}
                  group
                `}
                style={{
                  marginBottom: actualLayout === 'grid' ? 0 : '1rem'
                }}
              >
                {actualLayout !== 'grid' && (
                  <div className={`
                    ${classes.marker}
                    ${classes.variants.marker[styles.markerStyle || 'circle']}
                  `} />
                )}

                {article.created_at ? (
                  <div className={`
                    ${classes.content.date}
                    ${actualLayout === 'grid' ? 'mb-2' : ''}
                  `}>
                    <span>
                      {new Date(article.created_at).toLocaleDateString('pt-BR', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                    <span className={classes.content.relativeTime}>
                      {formatRelativeTime(article.created_at)}
                    </span>
                  </div>
                ) : null}

                <Link 
                  className="hover:underline transition-all duration-300" href={articleUrl}
                >
                  <h3 className={`
                    ${classes.content.title}
                    group-hover:text-blue-600 dark:group-hover:text-blue-400
                    transition-colors duration-200
                  `} style={{
                    color: theme.title.color,
                    fontFamily: theme.title.fontFamily,
                  }}>
                    {article.title}
                  </h3>
                  
                  {article.subtitle ? (
                    <p className={`
                      ${classes.content.subtitle}
                      ${actualLayout === 'grid' ? 'line-clamp-3' : ''}
                    `} style={{
                      color: theme.subtitle.color,
                      fontFamily: theme.subtitle.fontFamily,
                    }}>
                      {article.subtitle}
                    </p>
                  ) : null}

                  {/* Preview do texto no hover - apenas no layout single */}
                  {actualLayout !== 'grid' && (
                    <div className={`
                      ${classes.content.preview}
                      opacity-0 max-h-0 overflow-hidden transition-all duration-200
                      group-hover:opacity-100 group-hover:max-h-96
                      prose prose-sm dark:prose-invert
                    `}>
                      {article.articleBody ? (
                        <>
                          <div 
                            dangerouslySetInnerHTML={{ __html: article.articleBody }}
                            className="text-sm text-gray-600 dark:text-gray-400 mt-2"
                          />
                          <span className="
                            mt-4 text-sm font-medium
                            text-blue-600 hover:text-blue-700
                            dark:text-blue-400 dark:hover:text-blue-300
                            transition-colors duration-200
                            flex items-center gap-2
                            cursor-pointer
                          ">
                            Continue lendo
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              width="16" 
                              height="16" 
                              viewBox="0 0 24 24" 
                              fill="none" 
                              stroke="currentColor" 
                              strokeWidth="2" 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              className="inline-block"
                            >
                              <path d="M5 12h14" />
                              <path d="m12 5 7 7-7 7" />
                            </svg>
                          </span>
                        </>
                      ) : article?.articleBody ? (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2" style={{
                          color: theme.subtitle.color,
                          fontFamily: theme.subtitle.fontFamily,
                        }}>
                          {truncateText(article.articleBody, 150)}
                        </p>
                      ) : null}
                    </div>
                  )}
                </Link>
              </div>
            );
          })
        ))}
      </div>
    </div>
  );
};

export default Chronological; 