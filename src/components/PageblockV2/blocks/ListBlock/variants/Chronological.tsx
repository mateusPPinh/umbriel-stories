import React from 'react';
import { useBlockStyles } from '../../../hooks/useBlockStyles';
import { BlockVariant, Article, TimelineStyles } from '../../../types';
import { defaultClasses } from '../../../constants/defaultClasses';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface BaseVariantProps {
  variant: BlockVariant & {
    config: {
      styles: TimelineStyles;
    };
  };
  isDarkTheme?: boolean;
  customStyles?: any;
}

const Chronological: React.FC<BaseVariantProps> = ({ variant, isDarkTheme, customStyles }) => {
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

  return (
    <div className={`${classes.container} ${customStyles?.container || ''}`}>
      <div className={classes.list}>
        {/* Linha do Timeline */}
        <div className={`
          ${classes.timeline}
          ${classes.variants.line[styles.timelineStyle || 'solid']}
        `} />

        {Object.entries(articles).map(([colKey, colArticles]) => (
          colArticles.map((article: Article) => (
            <div 
              key={article.id}
              className={`
                ${classes.item}
                ${classes.variants.hover[styles.hoverEffect || 'highlight']}
              `}
            >
              <div className={`
                ${classes.marker}
                ${classes.variants.marker[styles.markerStyle || 'circle']}
              `} />

              {styles.showDate && article.created_at && (
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
              )}

              <h3 className={classes.content.title}>
                {article.title}
              </h3>
              
              {styles.showExcerpt ? (
                <p className={classes.content.subtitle}>
                  {article.subtitle}
                </p>
              ) : (
                <p className={classes.content.subtitle}>
                  {article.subtitle}
                </p>
              )}

              {styles.showMetadata ? (
                <div className={classes.content.metadata}>
                  {/* Metadata aqui */}
                </div>
              ) : (
                <div className={classes.content.metadata}>
                  {/* Metadata aqui */}
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