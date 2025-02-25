import React from 'react';
import { BlockVariant, Article } from '../../../types';
import { useBlockStyles } from '../../../hooks/useBlockStyles';
import { useResponsiveGrid } from '../../../hooks/useResponsiveGrid';
import Image from '../../../components/Image';
import { defaultClasses } from '../../../constants/defaultClasses';

interface BaseVariantProps {
  variant: BlockVariant;
  isDarkTheme?: boolean;
  customStyles?: any;
}

interface ChronologicalProps extends BaseVariantProps {
  variant: BlockVariant;
}

interface ListWithThumbnailProps extends BaseVariantProps {
  variant: BlockVariant;
}

const Chronological: React.FC<ChronologicalProps> = ({ variant, isDarkTheme, customStyles }) => {
  const classes = defaultClasses.list.chronological;
  const { articles, styles } = variant.config;
  const { containerStyle, columnStyle, headingStyle, subtitleStyle, bodyStyle, linkStyle } = useBlockStyles({
    config: variant.config as any,
    isDarkTheme
  });

  return (
    <div className={`${classes.container} ${customStyles?.container || ''}`} style={containerStyle}>
      <div className={`${classes.grid} ${customStyles?.grid || ''}`}>
        {/* Timeline line */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-200" />
        
        {Object.entries(articles).map(([colKey, colArticles]) => (
          colArticles.map((article: Article) => (
            <div 
              key={article.id}
              className={`${classes.article} relative`}
              style={columnStyle(colKey)}
            >
              {/* Timeline dot */}
              <div className="absolute -left-[2.25rem] w-4 h-4 rounded-full bg-gray-200" />
              
              <div className="flex flex-col md:flex-row gap-6">
                {article.content.image?.desktop_image_path && (
                  <div className="md:w-1/3">
                    <div className="relative aspect-video w-full rounded-lg overflow-hidden">
                      <img
                        src={article.content.image.desktop_image_path}
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}
                
                <div className={article.content.image ? 'md:w-2/3' : 'w-full'}>
                  <h3 className="text-xl font-medium mb-2" style={headingStyle}>
                    {article.title}
                  </h3>
                  
                  {styles.showExcerpt && (
                    <p className="text-base" style={subtitleStyle}>
                      {article.subtitle}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))
        ))}
      </div>
    </div>
  );
};

export default Chronological; 