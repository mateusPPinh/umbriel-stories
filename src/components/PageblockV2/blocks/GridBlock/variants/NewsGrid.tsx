// src/components/PageblockV2/blocks/GridBlock/variants/NewsGrid.tsx
import React from 'react';
import { Article, GridStyles } from 'src/components/PageblockV2/types';
import { BlockVariant } from 'src/components/PageblockV2/types';

interface BaseVariantProps {
  variant: BlockVariant & {
    config: {
      styles: GridStyles;
    };
  };
  isDarkTheme?: boolean;
  customStyles?: any;
}

const NewsGrid: React.FC<BaseVariantProps> = ({ variant, isDarkTheme }) => {
  const { articles } = variant.config;

  // Agrupa os artigos por row
  const rows: { [key: string]: { [key: string]: any } } = Object.entries(articles).reduce((acc, [key, articles]) => {
    const [row] = key.split('-');
    if (!acc[row]) acc[row] = {};
    acc[row][key] = articles;
    return acc;
  }, {} as { [key: string]: { [key: string]: any } });

  const newsClasses = {
    container: [
      "w-full max-w-[1238px] mx-auto",
      "mb-[40px] mt-[40px]",
      "bg-white dark:bg-[#1b1b1b]",
      "p-6 rounded-sm",
    ].join(" "),
    grid: [
      "grid grid-cols-1",
      "md:grid-cols-3",
      "lg:grid-cols-5",
      "gap-6",
    ].join(" "),
    column: "flex flex-col space-y-4",
    mainArticle: [
      "flex flex-col gap-4",
      "hover:opacity-90 transition-opacity",
    ].join(" "),
    secondaryArticle: [
      "border-t border-gray-200 dark:border-gray-800",
      "pt-4",
      "hover:opacity-90 transition-opacity",
    ].join(" "),
    imageWrapper: "relative aspect-[16/10] overflow-hidden mb-3",
    image: "w-full h-full object-cover",
    mainTitle: [
      "text-lg font-semibold",
      "text-gray-900 dark:text-white",
      "leading-tight",
    ].join(" "),
    secondaryTitle: [
      "text-base font-medium",
      "text-gray-800 dark:text-gray-200",
      "leading-snug",
    ].join(" "),
  }

  return (
    <div className={newsClasses.container}>
      {Object.entries(rows).map(([rowId, rowColumns]) => (
        <div key={rowId} className={newsClasses.grid}>
          {Object.entries(rowColumns).map(([columnId, columnArticles]) => (
            <div key={columnId} className={newsClasses.column}>
              {columnArticles.map((article: Article, index: number) => (
                <article 
                  key={article.id} 
                  className={index === 0 
                    ? newsClasses.mainArticle 
                    : newsClasses.secondaryArticle}
                >
                  {index === 0 && article.content.image?.desktop_image_path && (
                    <div className={newsClasses.imageWrapper}>
                      <img 
                        src={article.content.image.desktop_image_path} 
                        alt={article.title}
                        className={newsClasses.image}
                      />
                    </div>
                  )}
                  <h3 
                    className={index === 0 
                      ? newsClasses.mainTitle 
                      : newsClasses.secondaryTitle}
                  >
                    {article.title}
                  </h3>
                </article>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default NewsGrid;