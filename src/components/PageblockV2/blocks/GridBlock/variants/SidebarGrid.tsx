import React from 'react';
import { useBlockStyles } from '../../../hooks/useBlockStyles';
import { BlockVariant, Article, GridStyles } from '../../../types';
import { defaultClasses } from '../../../constants/defaultClasses';

interface BaseVariantProps {
  variant: BlockVariant & {
    config: {
      styles: GridStyles;
    };
  };
  isDarkTheme?: boolean;
  customStyles?: any;
}

const SidebarGrid: React.FC<BaseVariantProps> = ({ variant, isDarkTheme, customStyles }) => {
  const classes = defaultClasses.grid.sidebar;
  const { articles } = variant.config;
  const styles = variant.config.styles || {};

  const sidebarClasses = {
    container: 'w-full bg-transparent',
    wrapper: [
      'flex flex-col',
      'lg:flex-row',
      'w-full',
      'gap-6'
    ].join(' '),
    mainContent: [
      'flex-1',
      'grid',
      'gap-6'
    ].join(' '),
    sidebar: [
     'w-full lg:w-[360px]' ,
        'shrink-0 ',
        'border-l ',
        'border-gray-200 ',
        'dark:border-gray-700',
        'space-y-6',
        'pl-6'
    ].join(' '),
    article: {
      main: [
        'flex flex-col',
      ].join(' '),
      sidebar: [
        'flex gap-4',
      ].join(' ')
    },
    image: {
      main: 'w-full aspect-[16/9] object-cover mb-4',
      sidebar: 'w-24 h-24 object-cover shrink-0 rounded-lg'
    },
    content: {
      main: {
        title: 'text-xl font-semibold mb-2',
        subtitle: 'text-base text-gray-600 dark:text-gray-400'
      },
      sidebar: {
        title: 'text-base font-medium mb-1',
        subtitle: 'text-sm text-gray-600 dark:text-gray-400'
      }
    }
  };

  return (
    <div className={`${sidebarClasses.container} ${customStyles?.container || ''}`}>
      <div className={`${sidebarClasses.wrapper} ${customStyles?.wrapper || ''}`}>
        {/* Main Content */}
        <div className={sidebarClasses.mainContent}>
          {articles['col-0']?.map((article: Article) => (
            <div 
              key={article.id}
              className={sidebarClasses.article.main}
            >
              {article.content.image?.desktop_image_path && (
                <img
                  src={article.content.image.desktop_image_path}
                  alt={article.title}
                  className={sidebarClasses.image.main}
                />
              )}
              <div>
                <h3 className={sidebarClasses.content.main.title}>
                  {article.title}
                </h3>
                {styles.showExcerpt ? (
                  <p className={sidebarClasses.content.main.subtitle}>
                    {article.subtitle}
                  </p>
                ) : (
                  <p className={sidebarClasses.content.main.subtitle}>
                    {article.subtitle}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <div className={sidebarClasses.sidebar}>
          {articles['col-1']?.map((article: Article, index: number) => (
            <div 
              key={article.id}
              className={[
                sidebarClasses.article.sidebar,
                index !== (articles['col-1'].length - 1) ? 'border-b border-gray-200 dark:border-gray-700 pb-4 mb-4' : ''
              ].filter(Boolean).join(' ')}
            >
              {article.content.image?.desktop_image_path && (
                <img
                  src={article.content.image.desktop_image_path}
                  alt={article.title}
                  className={sidebarClasses.image.sidebar}
                />
              )}
              <div>
                <h3 className={sidebarClasses.content.sidebar.title}>
                  {article.title}
                </h3>
                {styles.showExcerpt ? (
                  <p className={sidebarClasses.content.sidebar.subtitle}>
                    {article.subtitle}
                  </p>
                ) : (
                  <p className={sidebarClasses.content.sidebar.subtitle}>
                    {article.subtitle}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SidebarGrid;
