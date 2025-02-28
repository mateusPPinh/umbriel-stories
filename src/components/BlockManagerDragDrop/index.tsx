import React from 'react';
import { Article } from '../PageblockV2/types';
import GridManager from './components/GridManager';
import ListManager from './components/ListManager';
import FeaturedManager from './components/FeaturedManager';

interface BlockManagerDragDropProps {
  articles: Article[];
  blockType: 'grid' | 'list' | 'featured';
  isDarkTheme?: boolean;
  onSave: (columns: { [key: string]: Article[] }) => void;
}

const BlockManagerDragDrop: React.FC<BlockManagerDragDropProps> = ({
  articles,
  blockType,
  isDarkTheme,
  onSave
}) => {
  const renderManager = () => {
    switch (blockType) {
      case 'grid':
        return (
          <GridManager
            articles={articles}
            isDarkTheme={isDarkTheme}
            onSave={onSave}
          />
        );
      case 'list':
        return (
          <ListManager
            articles={articles}
            isDarkTheme={isDarkTheme}
            onSave={onSave}
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
    <div className="w-full">
      {renderManager()}
    </div>
  );
};

export default BlockManagerDragDrop;
