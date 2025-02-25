import React from 'react';
import { BlockVariant } from '../../../types';
import { useBlockStyles } from '../../../hooks/useBlockStyles';
import { useResponsiveGrid } from '../../../hooks/useResponsiveGrid';
import Image from '../../../components/Image';
import { defaultClasses } from '../../../constants/defaultClasses';

interface NewspaperProps {
  variant: BlockVariant;
  isDarkTheme?: boolean;
  customStyles?: any;
}

const Newspaper: React.FC<NewspaperProps> = ({ variant, isDarkTheme, customStyles }) => {
  const classes = defaultClasses.mixed.newspaper;
  const { articles, styles } = variant.config;
  const { paddingClass } = useResponsiveGrid(variant.config);
  const { containerStyle, columnStyle, headingStyle, subtitleStyle } = useBlockStyles({
    config: variant.config as any,
    isDarkTheme
  });

  return (
    <div className={`${classes.container} ${paddingClass} ${customStyles?.container || ''}`} style={containerStyle}>
      <div className="space-y-8">
        <div className={classes.grid}>
          <div className={`${classes.grid} grid-cols-1 md:grid-cols-[3fr,1fr,1fr] gap-6`}>
            <div className={`${classes.article} relative min-h-[700px] rounded-lg overflow-hidden`}>
              {articles['col-0']?.[0] && (
                <div className="h-full">
                  {articles['col-0'][0].content.image?.desktop_image_path && (
                    <>
                      <Image
                        src={articles['col-0'][0].content.image.desktop_image_path}
                        alt={articles['col-0'][0].title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70" />
                    </>
                  )}
                  <div className={`${articles['col-0'][0].content.image ? 'absolute bottom-0 left-0 right-0' : ''} p-8`}>
                    <h2 className="text-4xl font-bold text-white mb-3" style={headingStyle}>
                      {articles['col-0'][0].title}
                    </h2>
                    {styles.showExcerpt && (
                      <p className="text-xl text-white/90" style={subtitleStyle}>
                        {articles['col-0'][0].subtitle}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {['col-1', 'col-2'].map((colKey) => (
              articles[colKey]?.[0] && (
                <div key={colKey} className="flex flex-col gap-3" style={columnStyle(colKey)}>
                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                    <Image
                      src={articles[colKey][0].content.image.desktop_image_path || ''}
                      alt={articles[colKey][0].title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-medium" style={headingStyle}>
                    {articles[colKey][0].title}
                  </h3>
                  {styles.showExcerpt && (
                    <p className="text-sm" style={subtitleStyle}>
                      {articles[colKey][0].subtitle}
                    </p>
                  )}
                </div>
              )
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {['col-3', 'col-4', 'col-5', 'col-6'].map((colKey) => (
            articles[colKey]?.[0] && (
              <div key={colKey} className="flex flex-col gap-3" style={columnStyle(colKey)}>
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                  <Image
                    src={articles[colKey][0].content.image.desktop_image_path || ''}
                    alt={articles[colKey][0].title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-base font-medium" style={headingStyle}>
                  {articles[colKey][0].title}
                </h3>
                {styles.showExcerpt && (
                  <p className="text-sm" style={subtitleStyle}>
                    {articles[colKey][0].subtitle}
                  </p>
                )}
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  );
};

export default Newspaper; 