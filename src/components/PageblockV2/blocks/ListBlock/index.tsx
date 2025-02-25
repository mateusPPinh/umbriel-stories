import React from 'react';
import { PageBlock } from '../../types';
import CompactList from './variants/CompactList';
import ListWithThumbnail from './variants/ListWithThumbnail';
import Chronological from './variants/Chronological';

interface ListBlockProps {
  block: PageBlock;
  isDarkTheme?: boolean;
}

const ListBlock: React.FC<ListBlockProps> = ({ block, isDarkTheme }) => {
  const variant = block.variants[0];

  const renderVariant = () => {
    switch (variant.variantType) {
      case 'compact':
        return <CompactList variant={variant} isDarkTheme={isDarkTheme} />;
      case 'thumbnail':
        return <ListWithThumbnail variant={variant} isDarkTheme={isDarkTheme} />;
      case 'chronological':
        return <Chronological variant={variant} isDarkTheme={isDarkTheme} />;
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

export default ListBlock; 