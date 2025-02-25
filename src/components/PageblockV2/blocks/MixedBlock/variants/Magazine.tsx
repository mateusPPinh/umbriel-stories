import React from 'react';
import { BlockVariant } from '../../../types';
import { useBlockStyles } from '../../../hooks/useBlockStyles';
import { useResponsiveGrid } from '../../../hooks/useResponsiveGrid';
import Image from '../../../components/Image';
import { defaultClasses } from '../../../constants/defaultClasses';

interface MagazineProps {
  variant: BlockVariant;
  isDarkTheme?: boolean;
  customStyles?: any;
}

const Magazine: React.FC<MagazineProps> = ({ variant, isDarkTheme, customStyles }) => {
  const classes = defaultClasses.mixed.magazine;
  const { articles, styles } = variant.config;
  const { paddingClass } = useResponsiveGrid(variant.config);
  const { containerStyle, columnStyle, headingStyle, subtitleStyle, bodyStyle, linkStyle } = useBlockStyles({
    config: variant.config as any,
    isDarkTheme
  });

  return (
    <div className={`${classes.container} ${customStyles?.container || ''}`} style={containerStyle}>
      <div className="space-y-6">
        <div className={classes.grid}>
          <div className={`${classes.grid} grid-cols-1 md:grid-cols-[2.5fr,1fr,1fr] gap-6`}>
            <div className={classes.article} style={columnStyle('col-0')}>
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
                  <div className={`${articles['col-0'][0].content.image ? 'absolute bottom-0 left-0 right-0' : ''} p-6`}>
                    <h2 className="text-3xl font-bold text-white mb-2" style={headingStyle}>
                      {articles['col-0'][0].title}
                    </h2>
                    {styles.showExcerpt && (
                      <p className="text-white/90" style={subtitleStyle}>
                        {articles['col-0'][0].subtitle}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {['col-1', 'col-2'].map((colKey) => (
              articles[colKey]?.[0] && (
                <div key={colKey} className="flex flex-col gap-4" style={columnStyle(colKey)}>
                  {articles[colKey][0].content.image?.desktop_image_path && (
                    <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                      <Image
                        src={articles[colKey][0].content.image.desktop_image_path}
                        alt={articles[colKey][0].title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <h3 className="text-xl font-medium" style={headingStyle}>
                    {articles[colKey][0].title}
                  </h3>
                  {styles.showExcerpt && (
                    <p className="text-base" style={subtitleStyle}>
                      {articles[colKey][0].subtitle}
                    </p>
                  )}
                </div>
              )
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {['col-3', 'col-4', 'col-5'].map((colKey) => (
            articles[colKey]?.[0] && (
              <div key={colKey} className="flex flex-col gap-4" style={columnStyle(colKey)}>
                {articles[colKey][0].content.image?.desktop_image_path && (
                  <div className="relative aspect-video rounded-lg overflow-hidden">
                    <Image
                      src={articles[colKey][0].content.image.desktop_image_path}
                      alt={articles[colKey][0].title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <h3 className="text-lg font-medium" style={headingStyle}>
                  {articles[colKey][0].title}
                </h3>
                {styles.showExcerpt && (
                  <p className="text-base" style={subtitleStyle}>
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

export default Magazine; 