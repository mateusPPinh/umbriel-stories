import React from 'react';
import { useBlockStyles } from '../../../hooks/useBlockStyles';
import { BlockVariant, Article, MasonryStyles } from '../../../types';
import { defaultClasses } from '../../../constants/defaultClasses';

interface BaseVariantProps {
  variant: BlockVariant & {
    config: {
      styles: MasonryStyles;
    };
  };
  isDarkTheme?: boolean;
  customStyles?: any;
}

const MasonryGrid: React.FC<BaseVariantProps> = ({ variant, isDarkTheme, customStyles }) => {
  const classes = defaultClasses.grid.masonry;
  const { articles } = variant.config;
  const styles = variant.config.styles || {};

  // Classes base do Tailwind para o masonry
  const masonryClasses = {
    container: 'w-full',
    grid: [
      'columns-1 md:columns-2 lg:columns-3',
      'gap-6'
    ].join(' '),
    article: [
      'break-inside-avoid',
      'mb-6',
      'bg-transparent dark:bg-transparent', // Garante transparência
      'p-4',
      'rounded-lg'
    ].join(' '),
    image: {
      wrapper: 'relative overflow-hidden rounded-lg mb-4',
      img: 'w-full h-full object-cover'
    },
    content: {
      title: 'text-xl font-semibold text-gray-900 dark:text-white mb-2',
      subtitle: 'text-md text-gray-600 dark:text-gray-300'
    }
  };

  // Classes para diferentes aspect ratios
  const aspectRatios = {
    square: 'aspect-square',
    portrait: 'aspect-[3/4]',
    landscape: 'aspect-[4/3]'
  };

  // Classes para diferentes efeitos hover
  const hoverEffects = {
    scale: 'hover:scale-[1.02] transition-transform duration-300',
    lift: 'hover:-translate-y-2 transition-transform duration-300',
    none: ''
  };

  // Helper para aspect ratio aleatório
  const getRandomAspectRatio = () => {
    const variations = styles.imageVariations || ['square'];
    const random = Math.floor(Math.random() * variations.length);
    return aspectRatios[variations[random] as keyof typeof aspectRatios] || aspectRatios.square;
  };

  return (
    <div className={`${masonryClasses.container} ${customStyles?.container || ''}`}>
      <div className={`
        ${masonryClasses.grid}
        ${hoverEffects[styles.hoverEffect as keyof typeof hoverEffects] || ''}
      `}>
        {Object.entries(articles).map(([colKey, colArticles]) => (
          colArticles.map((article: Article) => (
            <div 
              key={article.id}
              className={masonryClasses.article}
            >
              {article.content.image?.desktop_image_path && (
                <div className={`${masonryClasses.image.wrapper} ${getRandomAspectRatio()}`}>
                  <img
                    src={article.content.image.desktop_image_path}
                    alt={article.title}
                    className={masonryClasses.image.img}
                  />
                </div>
              )}
              
              <div>
                <h3 className={masonryClasses.content.title}>
                  {article.title}
                </h3>
                {styles.showExcerpt && (
                  <p className={masonryClasses.content.subtitle}>
                    {article.subtitle}
                  </p>
                )}
              </div>
            </div>
          ))
        ))}
      </div>
    </div>
  );
};

export default MasonryGrid; 