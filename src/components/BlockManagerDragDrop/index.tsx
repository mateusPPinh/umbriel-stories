import React from 'react';
import { Article } from '../PageblockV2/types';
import GridManager from './components/GridManager';
import ListManager from './components/ListManager';
import MixedManager from './components/MixedManager';
import FeaturedManager from './components/FeaturedManager';
interface BlockManagerDragDropProps {
  articles: Article[];
  blockType: 'grid' | 'list' | 'mixed' | 'featured';
  isDarkTheme?: boolean;
  onSave: (columns: { [key: string]: Article[] }) => void;
  variant?: string;
}

const BlockManagerDragDrop: React.FC<BlockManagerDragDropProps> = ({
  articles,
  blockType,
  isDarkTheme,
  onSave,
  variant
}) => {
  const renderManager = () => {
    switch (blockType) {
      case 'grid':
        return (
          <GridManager
            articles={articles}
            isDarkTheme={isDarkTheme}
            onSave={onSave}
            variant={variant}
          />
        );
      case 'list':
        return (
          <ListManager
            articles={articles}
            isDarkTheme={isDarkTheme}
            onSave={onSave}
            variant={variant}
          />
        );
      case 'mixed':
        return (
          <MixedManager
            articles={articles}
            isDarkTheme={isDarkTheme}
            onSave={onSave}
            variant={variant}
          />
        );
      case 'featured':
        return (
          <FeaturedManager
            articles={articles}
            isDarkTheme={isDarkTheme}
            onSave={onSave}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full">
      {renderManager()}
    </div>
  );
};

export default BlockManagerDragDrop;
