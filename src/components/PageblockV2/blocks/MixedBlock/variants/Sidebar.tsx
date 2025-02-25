import React from 'react';
import { BlockVariant } from '../../../types';
import { useBlockStyles } from '../../../hooks/useBlockStyles';
import { useResponsiveGrid } from '../../../hooks/useResponsiveGrid';
import Image from '../../../components/Image';
import { defaultClasses } from '../../../constants/defaultClasses';

interface SidebarProps {
  variant: BlockVariant;
  isDarkTheme?: boolean;
  customStyles?: any;
}

const Sidebar: React.FC<SidebarProps> = ({ variant, isDarkTheme = false, customStyles }) => {
  const { articles, styles } = variant.config;
  const { paddingClass } = useResponsiveGrid(variant.config);
  const { containerStyle, columnStyle, headingStyle, subtitleStyle } = useBlockStyles({
    config: variant.config as any,
    isDarkTheme
  });

  const classes = defaultClasses.mixed.sidebar;
  const sidebarPosition = variant.config.layout.styles?.columnStyles?.sidebarPosition || 'right';

  return (
    <div className={`${classes.container} ${paddingClass} ${customStyles?.container || ''}`} style={containerStyle}>
      <div className={`${classes.grid} ${
        sidebarPosition === 'left' 
          ? 'md:grid-cols-[300px,1fr]' 
          : 'md:grid-cols-[1fr,300px]'
      }`}>
        {/* Main Content */}
        <div className={sidebarPosition === 'left' ? 'order-2' : 'order-1'}>
          {articles['col-0']?.[0] && (
            <div className="space-y-6" style={columnStyle('col-0')}>
              {articles['col-0'][0].content.image?.desktop_image_path && (
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <Image
                    src={articles['col-0'][0].content.image.desktop_image_path}
                    alt={articles['col-0'][0].title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="space-y-4">
                <h2 className="text-3xl font-bold" style={headingStyle}>
                  {articles['col-0'][0].title}
                </h2>
                {styles.showExcerpt && (
                  <p className="text-lg" style={subtitleStyle}>
                    {articles['col-0'][0].subtitle}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className={`${classes.article} ${sidebarPosition === 'left' ? 'order-1' : 'order-2'}`}>
          {['col-1', 'col-2', 'col-3', 'col-4'].map((colKey) => (
            articles[colKey]?.[0] && (
              <div 
                key={colKey} 
                className="flex gap-4 pb-6 border-b last:border-0 last:pb-0" 
                style={columnStyle(colKey)}
              >
                {articles[colKey][0].content.image?.desktop_image_path && (
                  <div className="flex-shrink-0 w-24">
                    <div className="relative aspect-square rounded overflow-hidden">
                      <Image
                        src={articles[colKey][0].content.image.desktop_image_path}
                        alt={articles[colKey][0].title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}
                <div className={articles[colKey][0].content.image ? '' : 'w-full'}>
                  <h3 className="text-base font-medium mb-1" style={headingStyle}>
                    {articles[colKey][0].title}
                  </h3>
                  {styles.showExcerpt && (
                    <p className="text-sm" style={subtitleStyle}>
                      {articles[colKey][0].subtitle}
                    </p>
                  )}
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 