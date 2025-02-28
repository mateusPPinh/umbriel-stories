import React from 'react';
import { Article } from '../PageblockV2/types';
import GridManager from './components/GridManager';
import ListManager from './components/ListManager';
import MixedManager from './components/MixedManager';

interface BlockManagerDragDropProps {
  articles: Article[];
  blockType: 'grid' | 'list' | 'mixed';
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
      case 'mixed':
        return (
          <MixedManager
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
