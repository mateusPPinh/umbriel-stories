import React from 'react';
import { PageBlock } from '../../types';
import Sidebar from './variants/Sidebar';
import Magazine from './variants/Magazine';
import Newspaper from './variants/Newspaper';
import Showcase from './variants/Showcase';

interface MixedBlockProps {
  block: PageBlock;
  isDarkTheme?: boolean;
}

const MixedBlock: React.FC<MixedBlockProps> = ({ block, isDarkTheme }) => {
  const variant = block.variants[0];

  const renderVariant = () => {
    switch (variant.variantType) {
      case 'sidebar':
        return <Sidebar  variant={variant as any} isDarkTheme={isDarkTheme} customStyles={{}} />;
      case 'magazine':
        return <Magazine  variant={variant as any} isDarkTheme={isDarkTheme} customStyles={{}} />;
      case 'newspaper':
        return <Newspaper  variant={variant as any} isDarkTheme={isDarkTheme} customStyles={{}} />;
      case 'showcase':
        return <Showcase  variant={variant as any} isDarkTheme={isDarkTheme} customStyles={{}} />;
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

export default MixedBlock; 