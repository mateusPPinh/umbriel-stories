import React from 'react';
import { useBlockStyles } from '../../../hooks/useBlockStyles';
import { BlockVariant, Article, ThemeProps, StyleProps, BlockConfig } from '../../../types/index';
import { defaultClasses } from '../../../constants/defaultClasses';

interface BaseVariantProps {
  variant: BlockVariant;
  isDarkTheme?: boolean;
  customStyles?: any;
}

const defaultColumnStyle = {
  background: 'transparent',
  padding: 16
};

const defaultHeadingProps: StyleProps = {
  fontSize: 'xl',
  fontWeight: 'bold',
  color: '#1a1a1a'
};

const defaultSubtitleProps: StyleProps = {
  fontSize: 'lg',
  color: '#4a5568'
};

const defaultTheme: ThemeProps = {
  columnStyle: defaultColumnStyle,
  headingProps: defaultHeadingProps,
  subtitleProps: defaultSubtitleProps,
  bodyProps: {},
  linkProps: {
    color: '#000',
    hoverColor: '#000'
  }
};

const darkTheme: ThemeProps = {
  ...defaultTheme,
  columnStyle: {
    ...defaultColumnStyle,
    background: '#1a1a1a'
  },
  headingProps: {
    ...defaultHeadingProps,
    color: '#ffffff'
  },
  subtitleProps: {
    ...defaultSubtitleProps,
    color: '#a0aec0'
  },
  linkProps: {
    color: '#fff',
    hoverColor: '#fff'
  }
};

const defaultStyles: BlockConfig['styles'] = {
  theme: {
    light: {
      columnStyle: {
        background: '#ffffff'
      },
      headingProps: {
        fontSize: 'xl',
        fontWeight: 700,
        color: '#1a1a1a'
      },
      subtitleProps: {
        fontSize: 'lg',
        color: '#4a5568'
      }
    },
    dark: {
      columnStyle: {
        background: '#1a1a1a'
      },
      headingProps: {
        fontSize: 'xl',
        fontWeight: 700,
        color: '#ffffff'
      },
      subtitleProps: {
        fontSize: 'lg',
        color: '#a0aec0'
      }
    }
  },
  showExcerpt: true
};

const Showcase: React.FC<BaseVariantProps> = ({ variant, isDarkTheme, customStyles }) => {
  const classes = defaultClasses.mixed.showcase || { container: '' };
  const { articles } = variant.config;
  const styles = variant.config.styles || defaultStyles;
  const theme = styles.theme?.[isDarkTheme ? 'dark' : 'light'] || (isDarkTheme ? darkTheme : defaultTheme);

  const { containerStyle } = useBlockStyles({
    config: {
      ...variant.config,
      styles: {
        ...styles,
        theme: {
          light: defaultTheme,
          dark: darkTheme
        }
      }
    },
    isDarkTheme
  });

  const featuredArticle = articles['col-0']?.[0];
  const gridArticles = articles['col-1'] || [];
  const listArticles = articles['col-2'] || [];

  return (
    <div className={`${classes.container} ${customStyles?.container || ''}`} style={containerStyle}>
      <div className={customStyles?.grid || 'grid grid-cols-12 gap-6'}>
        {/* Featured Article */}
        <div className={customStyles?.featuredColumn || 'col-span-12 lg:col-span-6'}>
          {featuredArticle && (
            <article className={`${customStyles?.article || ''} relative w-full h-full bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden`}>
              {featuredArticle.content.image?.desktop_image_path && (
                <>
                  <img
                    src={featuredArticle.content.image.desktop_image_path}
                    alt={featuredArticle.title}
                    className="w-full h-full object-cover"
                  />
                </>
              )}

              <div className="p-8">
                <h1 className="text-4xl font-bold mb-4" style={theme.headingProps}>
                  {featuredArticle.title}
                </h1>
                
                {styles.showExcerpt && (
                  <p className="text-xl mb-4" style={theme.subtitleProps}>
                    {featuredArticle.subtitle}
                  </p>
                )}
              </div>
            </article>
          )}
        </div>

        {/* Grid Articles */}
        <div className={customStyles?.gridColumn || 'col-span-12 lg:col-span-3'}>
          <div className={customStyles?.gridLayout || 'grid grid-cols-1 gap-6'}>
            {gridArticles.map((article: Article) => (
              <article 
                key={article.id} 
                className={`${customStyles?.gridArticle || ''} flex flex-col bg-white dark:bg-gray-900 rounded-lg overflow-hidden`}
                style={theme.columnStyle}
              >
                {article.content.image?.desktop_image_path && (
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={article.content.image.desktop_image_path}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                <div className="flex-1 p-4">
                  <h2 className="mb-2 line-clamp-2" style={theme.headingProps}>
                    {article.title}
                  </h2>
                  
                  {styles.showExcerpt && (
                    <p className="line-clamp-2" style={theme.subtitleProps}>
                      {article.subtitle}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* List Articles */}
        <div className={customStyles?.listColumn || 'col-span-12 lg:col-span-3'}>
          <div className={customStyles?.listLayout || 'space-y-6'}>
            {listArticles.map((article: Article) => (
              <article 
                key={article.id} 
                className={`${customStyles?.listArticle || ''} flex flex-col bg-white dark:bg-gray-900 rounded-lg overflow-hidden p-4`}
                style={theme.columnStyle}
              >
                <h3 className="mb-2 line-clamp-2" style={theme.headingProps}>
                  {article.title}
                </h3>
                
                {styles.showExcerpt && (
                  <p className="line-clamp-2" style={theme.subtitleProps}>
                    {article.subtitle}
                  </p>
                )}
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Showcase; 