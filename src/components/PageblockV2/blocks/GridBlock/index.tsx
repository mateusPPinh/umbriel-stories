import React from 'react';
import { PageBlock } from '../../types';
import StandardGrid from './variants/StandardGrid';
import FeaturedGrid from './variants/FeaturedGrid';
import MasonryGrid from './variants/MasonryGrid';

interface GridBlockProps {
  block: PageBlock;
  isDarkTheme?: boolean;
}

const GridBlock: React.FC<GridBlockProps> = ({ block, isDarkTheme }) => {
  const variant = block.variants[0];

  const renderVariant = () => {
    switch (variant.variantType) {
      case 'standard':
        return <StandardGrid variant={variant} isDarkTheme={isDarkTheme} />;
      case 'featured':
        return <FeaturedGrid variant={variant} isDarkTheme={isDarkTheme} />;
      case 'masonry':
        return <MasonryGrid variant={variant} isDarkTheme={isDarkTheme} />;
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