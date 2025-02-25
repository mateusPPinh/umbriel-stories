import React from 'react';
import { PageBlock } from '../../types';
import Hero from './variants/Hero';
import Split from './variants/Split';
import Triple from './variants/Triple';

interface FeaturedBlockProps {
  block: PageBlock;
  isDarkTheme?: boolean;
}

const FeaturedBlock: React.FC<FeaturedBlockProps> = ({ block, isDarkTheme }) => {
  const variant = block.variants[0];

  const renderVariant = () => {
    switch (variant.variantType) {
      case 'hero':
        return <Hero variant={variant} isDarkTheme={isDarkTheme} />;
      case 'split':
        return <Split variant={variant} isDarkTheme={isDarkTheme} />;
      case 'triple':
        return <Triple variant={variant} isDarkTheme={isDarkTheme} />;
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

export default FeaturedBlock; 