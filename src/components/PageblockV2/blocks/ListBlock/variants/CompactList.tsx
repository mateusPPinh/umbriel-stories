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

interface CompactListProps extends BaseVariantProps {
  variant: BlockVariant;
}

const CompactList: React.FC<CompactListProps> = ({ variant, isDarkTheme, customStyles }) => {
  const classes = defaultClasses.list.compact;
  const { articles, styles } = variant.config;
  const { containerStyle, columnStyle, headingStyle, subtitleStyle, bodyStyle, linkStyle } = useBlockStyles({
    config: variant.config as any,
    isDarkTheme
  });

  return (
    <div className={`${classes.container} ${customStyles?.container || ''}`} style={containerStyle}>
      <div className={`${classes.grid} ${customStyles?.grid || ''}`}>
        <div className="space-y-6">
          {Object.entries(articles).map(([colKey, colArticles]) => (
            colArticles.map((article: Article) => (
              <div 
                key={article.id}
                className={`${classes.article} flex gap-4`}
                style={columnStyle(colKey)}
              >
                {article.content.image?.desktop_image_path && (
                  <div className="flex-shrink-0 w-24">
                    <div className="relative aspect-square rounded overflow-hidden">
                      <img
                        src={article.content.image.desktop_image_path}
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}
                <div className={article.content.image ? '' : 'w-full'}>
                  <h3 className="text-base font-medium mb-1" style={headingStyle}>
                    {article.title}
                  </h3>
                  {styles.showExcerpt && (
                    <p className="text-sm" style={subtitleStyle}>
                      {article.subtitle}
                    </p>
                  )}
                </div>
              </div>
            ))
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompactList; 