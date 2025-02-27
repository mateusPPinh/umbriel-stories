import React from 'react';
import { defaultClasses } from '../../../constants/defaultClasses';
import { GridStyles } from 'src/components/PageblockV2/types';
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

const NewsFeedGrid: React.FC<BaseVariantProps> = ({ variant, isDarkTheme }) => {
  const { articles, styles } = variant.config;
  
  // Tratamento de segurança para theme
  const defaultTheme = {
    columnStyle: {},
    headingProps: {
      fontSize: 'lg',
      fontWeight: 600,
      color: isDarkTheme ? '#ffffff' : '#1a1a1a'
    },
    subtitleProps: {
      fontSize: 'base',
      color: isDarkTheme ? '#a0aec0' : '#4a5568'
    }
  };

  // Garante que theme e suas propriedades existam
  const theme = styles?.theme?.[isDarkTheme ? 'dark' : 'light'] ?? defaultTheme;
  const headingProps = theme?.headingProps ?? defaultTheme.headingProps;
  const subtitleProps = theme?.subtitleProps ?? defaultTheme.subtitleProps;

  const newsfeedClasses = {
    container: [
      "w-full max-w-[1238px] mx-auto",
      "mb-[40px] mt-[40px]",
      "bg-white dark:bg-[#1b1b1b]",
      "p-6 rounded-sm",
    ].join(" "),
    grid: "flex flex-col space-y-4",
    column: "w-full",
    article: [
      "w-full",
      "border-b border-gray-200 dark:border-gray-800",
      "pb-4 last:border-b-0",
      "hover:opacity-90 transition-opacity",
    ].join(" "),
    content: "flex flex-col gap-2",
    title: [
      "text-xl font-semibold",
      "text-gray-900 dark:text-white",
      "leading-tight",
    ].join(" "),
    subtitle: [
      "text-base",
      "text-gray-600 dark:text-gray-300",
      "line-clamp-2",
    ].join(" "),
    readTime: [
      "text-sm",
      "text-gray-500 dark:text-gray-400",
      "font-medium",
      "mt-2",
    ].join(" "),
  };

  // Garante que articles existe e é um objeto
  if (!articles || typeof articles !== 'object') {
    return (
      <div className={newsfeedClasses.container}>
        <div className={newsfeedClasses.grid}>
          <p className="text-gray-500 dark:text-gray-400">No articles available</p>
        </div>
      </div>
    );
  }

  return (
    <div className={newsfeedClasses.container}>
      <div className={newsfeedClasses.grid}>
        {Object.entries(articles).map(([columnId, columnArticles]) => (
          <div key={columnId} className={newsfeedClasses.column}>
            {Array.isArray(columnArticles) && columnArticles.map((article) => (
              article && (
                <article 
                  key={article.id ?? columnId} 
                  className={newsfeedClasses.article}
                >
                  <div className={newsfeedClasses.content}>
                    <h3 
                      className={newsfeedClasses.title}
                      style={headingProps}
                    >
                      {article.title ?? 'Untitled Article'}
                    </h3>
                    {article.subtitle && (
                      <p 
                        className={newsfeedClasses.subtitle}
                        style={subtitleProps}
                      >
                        {article.subtitle}
                      </p>
                    )}
                    <span className={newsfeedClasses.readTime}>
                      {article.readTime ? `${article.readTime} MIN READ` : '3 MIN READ'}
                    </span>
                  </div>
                </article>
              )
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsFeedGrid;
