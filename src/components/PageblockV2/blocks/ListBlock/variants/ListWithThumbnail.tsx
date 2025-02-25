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

interface ListWithThumbnailProps extends BaseVariantProps {
  variant: BlockVariant;
}

const ListWithThumbnail: React.FC<ListWithThumbnailProps> = ({ variant, isDarkTheme, customStyles }) => {
  const classes = defaultClasses.list.thumbnail;
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
              className={`${classes.article} flex gap-6`}
              style={columnStyle(colKey)}
            >
              {article.content.image?.desktop_image_path && (
                <div className="flex-shrink-0 w-48">
                  <div className="relative aspect-video rounded-lg overflow-hidden">
                    <img
                      src={article.content.image.desktop_image_path}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}
              <div className={article.content.image ? '' : 'w-full'}>
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
          ))
        ))}
      </div>
    </div>
  );
};

export default ListWithThumbnail; 