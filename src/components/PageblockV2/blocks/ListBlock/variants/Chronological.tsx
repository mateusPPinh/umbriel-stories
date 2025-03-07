import React from 'react';
import { BlockVariant, Article, TimelineStyles, ClientTheme } from '../../../types';
import { defaultClasses } from '../../../constants/defaultClasses';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { generateArticleUrl } from '../../../utils/generateArticleUrl';
import { useClientTheme } from '../../../hooks/useClientTheme';
import Link from '../../../../Link'

interface BaseVariantProps {
  variant: BlockVariant & {
    config: {
      styles: TimelineStyles;
    };
  };
  isDarkTheme?: boolean;
  customStyles?: any;
  clientGeneralSettingsData: ClientTheme;
}

const Chronological: React.FC<BaseVariantProps> = ({ variant, isDarkTheme, customStyles, clientGeneralSettingsData }) => {
  const theme = useClientTheme({ clientGeneralSettingsData, isDarkTheme })
  const classes = defaultClasses.list.chronological;
  const { articles } = variant.config;
  const styles = variant.config.styles || {};

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
  

  return (
    <div className={`${classes.container} ${customStyles?.container || ''}`}>
      <div className={classes.list}>
        {/* Linha do Timeline */}
        <div className={`
          ${classes.timeline}
          ${classes.variants.line[styles.timelineStyle || 'solid']}
        `} />

        {Object.entries(articles).map(([colKey, colArticles]) => (
          colArticles.map((article: Article) => {
            const articleUrl = generateArticleUrl(article);
            
            return (
              <div 
                key={article.id}
                className={`
                  ${classes.item}
                  ${classes.variants.hover[styles.hoverEffect || 'highlight']}
                  group
                `}
              >
                <div className={`
                  ${classes.marker}
                  ${classes.variants.marker[styles.markerStyle || 'circle']}
                `} />

                {article.created_at ? (
                  <div className={classes.content.date}>
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
                    <p className={classes.content.subtitle} style={{
                      color: theme.subtitle.color,
                      fontFamily: theme.subtitle.fontFamily,
                    }}>
                      {article.subtitle}
                    </p>
                  ) : null}

                  {/* Preview do texto no hover */}
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