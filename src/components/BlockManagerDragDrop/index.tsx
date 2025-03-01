import React, { useState } from 'react';
import { Article } from '../PageblockV2/types';
import GridManager from './components/GridManager';
import ListManager from './components/ListManager';
import MixedManager from './components/MixedManager';
import FeaturedManager from './components/FeaturedManager';
import StyleConfigModal, { BlockConfig } from './components/StyleConfigModal';

// Configuração padrão para os blocos
const defaultBlockConfig: BlockConfig = {
  layout: {
    columns: '3',
    gap: '6',
    styles: {
      width: '100%',
      backgroundColor: 'transparent'
    }
  },
  styles: {
    theme: {
      light: {
        columnStyle: {
          background: 'white',
          padding: '1rem'
        },
        headingProps: {
          fontSize: '1.125rem',
          fontWeight: '600',
          color: '#111827'
        },
        subtitleProps: {
          fontSize: '0.875rem',
          color: '#6B7280'
        }
      },
      dark: {
        columnStyle: {
          background: '#1F2937',
          padding: '1rem'
        },
        headingProps: {
          fontSize: '1.125rem',
          fontWeight: '600',
          color: '#F9FAFB'
        },
        subtitleProps: {
          fontSize: '0.875rem',
          color: '#9CA3AF'
        }
      }
    },
    showExcerpt: true
  }
};

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
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [blockConfig, setBlockConfig] = useState<BlockConfig>(defaultBlockConfig);
  const [currentVariant, setCurrentVariant] = useState<string>(variant || 'standard');

  const handleOpenConfigModal = () => {
    setIsConfigModalOpen(true);
  };

  const handleCloseConfigModal = () => {
    setIsConfigModalOpen(false);
  };

  const handleSaveConfig = (config: BlockConfig) => {
    setBlockConfig(config);
    setIsConfigModalOpen(false);
  };

  const renderManager = () => {
    switch (blockType) {
      case 'grid':
        return (
          <GridManager
            articles={articles}
            isDarkTheme={isDarkTheme}
            onSave={onSave}
            variant={currentVariant}
            blockConfig={blockConfig}
            onConfigClick={handleOpenConfigModal}
          />
        );
      case 'list':
        return (
          <ListManager
            articles={articles}
            isDarkTheme={isDarkTheme}
            onSave={onSave}
            variant={currentVariant}
            blockConfig={blockConfig}
            onConfigClick={handleOpenConfigModal}
          />
        );
      case 'mixed':
        return (
          <MixedManager
            articles={articles}
            isDarkTheme={isDarkTheme}
            onSave={onSave}
            variant={currentVariant as 'sidebar' | 'showcase' | 'newspaper' | 'magazine' | 'videogrid'}
            blockConfig={blockConfig}
            onConfigClick={handleOpenConfigModal}
          />
        );
      case 'featured':
        return (
          <FeaturedManager
            articles={articles}
            isDarkTheme={isDarkTheme}
            onSave={onSave}
            blockConfig={blockConfig}
            onConfigClick={handleOpenConfigModal}
            variant={currentVariant as 'hero' | 'split' | 'triple'}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full">
      {renderManager()}
      
      <StyleConfigModal
        isOpen={isConfigModalOpen}
        onClose={handleCloseConfigModal}
        onSave={handleSaveConfig}
        currentConfig={blockConfig}
        blockType={blockType}
        variantType={currentVariant}
      />
    </div>
  );
};

export default BlockManagerDragDrop;
