import React from 'react';
import { useBlockStyles } from '../../../hooks/useBlockStyles';
import { 
  BlockVariant, 
  Article, 
  ThemeProps, 
  StyleProps,
  BlockConfig
} from '../../../types/index';
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

const Masonry: React.FC<BaseVariantProps> = ({ variant, isDarkTheme, customStyles }) => {
  const classes = defaultClasses.mixed.masonry || { container: '' };
  const { articles } = variant.config;
  const items = Object.values(articles).flat();
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

  const columnCount = variant.config.layout?.columns || 3;
  const gap = variant.config.layout?.gap || '24px';

  // Construct the columns class based on configuration
  const columnsClass = `columns-1 md:columns-2 lg:columns-${columnCount}`;
  const gapClass = `gap-x-[${gap}]`;

  return (
    <div className={`${classes.container} ${customStyles?.container || ''}`} style={containerStyle}>
      <div className={customStyles?.masonryGrid || `${columnsClass} ${gapClass}`}>
        {items.map((article: Article) => (
          <article 
            key={article.id} 
            className={customStyles?.article || 'break-inside-avoid mb-6'}
            style={theme.columnStyle}
          >
            {article.content.image?.desktop_image_path && (
              <div 
                className={customStyles?.imageWrapper || 'relative w-full overflow-hidden mb-4'}
              >
                <img
                  src={article.content.image.desktop_image_path}
                  alt={article.title}
                  className={customStyles?.image || 'w-full h-full object-cover'}
                />
              </div>
            )}
            
            <div className={customStyles?.content || 'p-4'}>
              <h2 
                className={customStyles?.heading || 'mb-3'} 
                style={theme.headingProps}
              >
                {article.title}
              </h2>
              
              {styles.showExcerpt && (
                <p 
                  className={customStyles?.subtitle || ''} 
                  style={theme.subtitleProps}
                >
                  {article.subtitle}
                </p>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Masonry; 