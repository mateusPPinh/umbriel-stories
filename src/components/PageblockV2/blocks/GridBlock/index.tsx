import React from 'react';
import { PageBlock } from '../../types';
import StandardGrid from './variants/StandardGrid';
import FeaturedGrid from './variants/FeaturedGrid';
import MasonryGrid from './variants/MasonryGrid';
import SidebarGrid from './variants/SidebarGrid';
import NewsFeedGrid from './variants/NewsFeedGrid';
import NewsGrid from './variants/NewsGrid';
interface GridBlockProps {
  block: PageBlock;
  isDarkTheme?: boolean;
}

const GridBlock: React.FC<GridBlockProps> = ({ block, isDarkTheme }) => {
  const variant = block.variants[0];

  const renderVariant = () => {
    switch (variant.variantType) {
      case 'standard':
        return <StandardGrid variant={variant as any} isDarkTheme={isDarkTheme} />;
      case 'featured':
        return <FeaturedGrid variant={variant as any} isDarkTheme={isDarkTheme} />;
      case 'masonry':
        return <MasonryGrid variant={variant as any} isDarkTheme={isDarkTheme} />;
      case 'sidebargrid':
        return <SidebarGrid variant={variant as any} isDarkTheme={isDarkTheme} />;
      case 'newsfeed':
        return <NewsFeedGrid variant={variant as any} isDarkTheme={isDarkTheme} />;
      case 'newsgrid':
        return <NewsGrid variant={variant as any} isDarkTheme={isDarkTheme} />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      {renderVariant()}
    </div>
  );
};

export default GridBlock; 