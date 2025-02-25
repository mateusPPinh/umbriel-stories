import React from 'react';
import { Article, BlockVariant } from '../../../types';
import { useBlockStyles } from '../../../hooks/useBlockStyles';
import { useResponsiveGrid } from '../../../hooks/useResponsiveGrid';
import Image from '../../../components/Image';
import { defaultClasses } from '../../../constants/defaultClasses';

interface BaseVariantProps {
  variant: BlockVariant;
  isDarkTheme?: boolean;
}

interface StandardGridProps extends BaseVariantProps {
  customStyles?: {
    container?: string;
    grid?: string;
    article?: string;
  };
}

const StandardGrid: React.FC<StandardGridProps> = ({ 
  variant, 
  isDarkTheme,
  customStyles 
}) => {
  const classes = defaultClasses.grid.standard;
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
              className="flex flex-col gap-4" 
              style={columnStyle(colKey)}
            >
              {article.content.image?.desktop_image_path && (
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <Image
                    src={article.content.image.desktop_image_path}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <h3 className="text-lg font-medium" style={headingStyle}>
                {article.title}
              </h3>
              {styles.showExcerpt && (
                <p className="text-base" style={subtitleStyle}>
                  {article.subtitle}
                </p>
              )}
            </div>
          ))
        ))}
      </div>
    </div>
  );
};

export default StandardGrid;