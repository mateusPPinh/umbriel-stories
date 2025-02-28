// src/components/PageblockV2/blocks/GridBlock/variants/NewsGrid.tsx
import React from 'react';
import { Article, GridStyles } from 'src/components/PageblockV2/types';
import { BlockVariant } from 'src/components/PageblockV2/types';
import { generateArticleUrl } from '../../../utils/generateArticleUrl';
import Link from '../../../../Link';
import { defaultClasses } from '../../../constants/defaultClasses';

interface BaseVariantProps {
  variant: BlockVariant & {
    config: {
      styles: GridStyles;
      links?: Array<{ title: string; url: string }>;
    };
  };
  isDarkTheme?: boolean;
  customStyles?: any;
}

const NewsGrid: React.FC<BaseVariantProps> = ({ variant, isDarkTheme }) => {
  const { articles, links } = variant.config;
  const classes = defaultClasses.newsgrid;

  // Agrupa os artigos por row
  const rows: { [key: string]: { [key: string]: any } } = Object.entries(articles).reduce((acc, [key, articles]) => {
    const [row] = key.split('-');
    if (!acc[row]) acc[row] = {};
    acc[row][key] = articles;
    return acc;
  }, {} as { [key: string]: { [key: string]: any } });

  // const newsClasses = {
  //   container: [
  //     "w-full max-w-[1238px] mx-auto",
  //     "mb-[40px] mt-[40px]",
  //     "bg-transparent",
  //     "p-6",
  //   ].join(" "),
  //   grid: [
  //     "grid grid-cols-1",
  //     "md:grid-cols-3",
  //     "lg:grid-cols-5",
  //     "gap-6",
  //   ].join(" "),
  //   column: "flex flex-col space-y-4",
  //   mainArticle: [
  //     "flex flex-col gap-4",
  //     "hover:opacity-90 transition-opacity",
  //   ].join(" "),
  //   secondaryArticle: [
  //     "border-t border-gray-200 dark:border-gray-800",
  //     "pt-4",
  //     "hover:opacity-90 transition-opacity",
  //   ].join(" "),
  //   imageWrapper: "relative aspect-[16/10] overflow-hidden mb-3",
  //   image: "w-full h-full object-cover",
  //   mainTitle: [
  //     "text-[1rem] sm:text-[0.8rem] font-normal",
  //     "text-gray-900 dark:text-white",
  //     "leading-tight",
  //   ].join(" "),
  //   secondaryTitle: [
  //     "text-[1rem] sm:text-[0.8rem] font-medium",
  //     "text-gray-800 dark:text-gray-200",
  //     "leading-snug",
  //   ].join(" "),
  // }

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
                        <h3 className={classes.mainTitle}>
                          {article.title}
                        </h3>
                      </Link>
                    ) : (
                      <Link href={articleUrl}>
                        <h3 className={classes.secondaryTitle}>
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