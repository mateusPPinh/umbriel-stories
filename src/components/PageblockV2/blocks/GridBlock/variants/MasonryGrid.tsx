import React from 'react';
import { BlockVariant } from '../../../types';
import { useBlockStyles } from '../../../hooks/useBlockStyles';
import { useResponsiveGrid } from '../../../hooks/useResponsiveGrid';
import Image from '../../../components/Image';
import { defaultClasses } from '../../../constants/defaultClasses';

interface MasonryGridProps {
  variant: BlockVariant;
  isDarkTheme?: boolean;
  customStyles?: React.CSSProperties;
}

const MasonryGrid: React.FC<MasonryGridProps> = ({ variant, isDarkTheme, customStyles }) => {
  const { articles, styles } = variant.config;
  const { gridColumns, gapClass, paddingClass } = useResponsiveGrid(variant.config);
  const { containerStyle, columnStyle, headingStyle, subtitleStyle } = useBlockStyles({
    config: variant.config as any,
    isDarkTheme
  });
  const classes = defaultClasses.grid.masonry;

  return (
    <div 
      className={`grid ${gridColumns} ${gapClass} w-full ${paddingClass}`}
      style={containerStyle}
    >
      {Object.entries(articles).map(([colKey, colArticles]) => (
        colArticles.map((article, index) => (
          <div 
            key={article.id}
            className="flex flex-col gap-4"
            style={columnStyle(colKey)}
          >
            <div className={`relative aspect-[${index % 2 === 0 ? '16/9' : '4/5'}] rounded-lg overflow-hidden`}>
              <Image
                src={article.content.image.desktop_image_path || ''}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div>
              <h3 
                className="text-lg font-medium mb-2"
                style={headingStyle}
              >
                {article.title}
              </h3>
              
              {styles.showExcerpt && (
                <p 
                  className="text-base"
                  style={subtitleStyle}
                >
                  {article.subtitle}
                </p>
              )}
            </div>
          </div>
        ))
      ))}
    </div>
  );
};

export default MasonryGrid; 