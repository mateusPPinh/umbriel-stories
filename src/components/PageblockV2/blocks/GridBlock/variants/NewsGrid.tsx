// src/components/PageblockV2/blocks/GridBlock/variants/NewsGrid.tsx
import React from 'react';
import { Article, ClientTheme, GridStyles } from 'src/components/PageblockV2/types';
import { BlockVariant } from 'src/components/PageblockV2/types';
import { generateArticleUrl } from '../../../utils/generateArticleUrl';
import Link from '../../../../Link';
import { defaultClasses } from '../../../constants/defaultClasses';
import { useClientTheme } from '../../../hooks/useClientTheme';
interface BaseVariantProps {
  variant: BlockVariant & {
    config: {
      styles: GridStyles;
      links?: Array<{ title: string; url: string }>;
    };
  };
  isDarkTheme?: boolean;
  customStyles?: any;
  clientGeneralSettingsData: ClientTheme;   
}

const NewsGrid: React.FC<BaseVariantProps> = ({ variant, isDarkTheme, clientGeneralSettingsData }) => {
  const theme = useClientTheme({ clientGeneralSettingsData, isDarkTheme })
  const { articles, links } = variant.config;
  const classes = defaultClasses.newsgrid;

  // Agrupa os artigos por row
  const rows: { [key: string]: { [key: string]: any } } = Object.entries(articles).reduce((acc, [key, articles]) => {
    const [row] = key.split('-');
    if (!acc[row]) acc[row] = {};
    acc[row][key] = articles;
    return acc;
  }, {} as { [key: string]: { [key: string]: any } });

  return (
    <div className={classes.container}>
      {Object.entries(rows).map(([rowId, rowColumns]) => (
        <div key={rowId} className={classes.grid}>
          {Object.entries(rowColumns).map(([columnId, columnArticles]) => (
            <div key={columnId} className={classes.column}>
              {columnArticles.map((article: Article, index: number) => {
                const articleUrl = generateArticleUrl(article);
                return (
                  <article 
                    key={article.id} 
                    className={index === 0 
                      ? classes.mainArticle 
                      : classes.secondaryArticle}
                  >
                    {index === 0 && article.content?.image?.desktop_image_path && (
                      <div className={classes.imageWrapper}>
                        <img 
                          src={article.content?.image?.desktop_image_path} 
                          alt={article.title}
                          className={classes.image}
                        />
                      </div>
                    )}
                    {index === 0 ? (
                      <Link href={articleUrl}>
                        <h3 className={classes.mainTitle} style={{
                          color: theme.title.color,
fontSize: theme?.fontSize?.pageblockTitle,

                          fontFamily: theme.title.fontFamily,
                        }}>
                          {article.title}
                        </h3>
                      </Link>
                    ) : (
                      <Link href={articleUrl}>
                        <h3 className={classes.secondaryTitle} style={{
                          color: theme.title.color,
fontSize: theme?.fontSize?.pageblockTitle,

                          fontFamily: theme.title.fontFamily,
                        }}>
                          {article.title}
                        </h3>
                      </Link>
                    )}
                  </article>
                );
              })}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default NewsGrid;