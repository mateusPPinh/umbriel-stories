import React from 'react';
import { BlockVariant, Article } from '../../../types';
import { useBlockStyles } from '../../../hooks/useBlockStyles';
import { useResponsiveGrid } from '../../../hooks/useResponsiveGrid';
import { defaultClasses } from '../../../constants/defaultClasses';

interface BaseVariantProps {
  variant: BlockVariant;
  isDarkTheme?: boolean;
  customStyles?: any;
}

const Hero: React.FC<BaseVariantProps> = ({ variant, isDarkTheme, customStyles }) => {
  const classes = defaultClasses.featured.hero;
  const { articles, styles } = variant.config;
  const { containerStyle, columnStyle, headingStyle, subtitleStyle, bodyStyle, linkStyle } = useBlockStyles({
    config: variant.config as any,
    isDarkTheme
  });

  return (
    <div className={`${classes.container} ${customStyles?.container || ''}`} style={containerStyle}>
      <div className={`${classes.grid} ${customStyles?.grid || ''}`}>
        {Object.entries(articles).map(([colKey, colArticles]) => (
          colArticles.map((article: Article) => (
            <div 
              key={article.id}
              className={classes.article}
              style={columnStyle(colKey)}
            >
              {article.content.image?.desktop_image_path && (
                <div className="relative aspect-[21/9] rounded-lg overflow-hidden">
                  <img
                    src={article.content.image.desktop_image_path}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                </div>
              )}
              
              <div className={`${article.content.image ? 'absolute bottom-0 left-0 right-0' : ''} p-8`}>
                <h2 className="text-4xl font-bold text-white mb-4" style={headingStyle}>
                  {article.title}
                </h2>
                {styles.showExcerpt && (
                  <p className="text-xl text-white/90" style={subtitleStyle}>
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

export default Hero; 