import React from 'react';
import { useBlockStyles } from '../../../hooks/useBlockStyles';
import { useResponsiveGrid } from '../../../hooks/useResponsiveGrid';
import { BlockVariant, Article } from '../../../types';
import { defaultClasses } from '../../../constants/defaultClasses';

interface BaseVariantProps {
  variant: BlockVariant;
  isDarkTheme?: boolean;
  customStyles?: any;
}

const Split: React.FC<BaseVariantProps> = ({ variant, isDarkTheme, customStyles }) => {
  const classes = defaultClasses.featured.split;
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
              className={`
                flex flex-col md:flex-row gap-6
                mb-8 last:mb-0
              `}
              style={columnStyle(colKey)}
            >
              {article.content.image?.desktop_image_path && (
                <div className="w-full md:w-1/2">
                  <div className="relative aspect-video rounded-lg overflow-hidden">
                    <img
                      src={article.content.image.desktop_image_path}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}
              
              <div className={article.content.image ? 'w-full md:w-1/2' : 'w-full'}>
                <h3 className="text-2xl font-medium mb-3" style={headingStyle}>
                  {article.title}
                </h3>
                {styles.showExcerpt && (
                  <p className="text-lg" style={subtitleStyle}>
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

export default Split; 