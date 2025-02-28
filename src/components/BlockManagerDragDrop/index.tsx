import React from 'react';
import { Article } from '../PageblockV2/types';
import GridManager from './components/GridManager';
import ListManager from './components/ListManager';

interface BlockManagerDragDropProps {
  articles: Article[];
  blockType: 'grid' | 'list';
  isDarkTheme?: boolean;
  onSave: (columns: { [key: string]: Article[] }) => void;
}

const BlockManagerDragDrop: React.FC<BlockManagerDragDropProps> = ({
  articles,
  blockType,
  isDarkTheme,
  onSave
}) => {
  return (
    <div className="w-full">
      {blockType === 'grid' ? (
        <GridManager
          articles={articles}
          isDarkTheme={isDarkTheme}
          onSave={onSave}
        />
      ) : (
        <ListManager
          articles={articles}
          isDarkTheme={isDarkTheme}
          onSave={onSave}
        />
      )}
    </div>
  );
};

export default BlockManagerDragDrop;
