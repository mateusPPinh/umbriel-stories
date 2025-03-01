import React, { useState, useCallback, useMemo, lazy, Suspense } from 'react';
import { Article } from '../PageblockV2/types';
import type { BlockConfig } from './components/StyleConfigModal';
import { GridVariantType, MixedVariantType, FeaturedVariantType, ListVariantType } from './types';

// Lazy loading dos componentes pesados
const GridManager = lazy(() => import('./components/GridManager'));
const ListManager = lazy(() => import('./components/ListManager'));
const MixedManager = lazy(() => import('./components/MixedManager'));
const FeaturedManager = lazy(() => import('./components/FeaturedManager'));
const StyleConfigModal = lazy(() => import('./components/StyleConfigModal'));

// Configuração padrão memoizada
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
  pageId: string;
}

const BlockManagerDragDrop: React.FC<BlockManagerDragDropProps> = React.memo(({
  articles,
  blockType,
  isDarkTheme,
  onSave,
  variant,
  pageId
}) => {
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [blockConfig, setBlockConfig] = useState<BlockConfig>(defaultBlockConfig);
  const [currentVariant, setCurrentVariant] = useState<string>(variant || 'standard');

  const handleOpenConfigModal = useCallback(() => {
    setIsConfigModalOpen(true);
  }, []);

  const handleCloseConfigModal = useCallback(() => {
    setIsConfigModalOpen(false);
  }, []);

  const handleSaveConfig = useCallback((config: BlockConfig) => {
    setBlockConfig(config);
    setIsConfigModalOpen(false);
  }, []);

  const renderManager = useMemo(() => {
    const commonProps = {
      articles,
      isDarkTheme,
      onSave,
      blockConfig,
      onConfigClick: handleOpenConfigModal,
      pageId
    };

    const fallback = <div className="w-full h-64 flex items-center justify-center">
      <div className="animate-pulse text-gray-500 dark:text-gray-400">Carregando gerenciador...</div>
    </div>;

    switch (blockType) {
      case 'grid':
        return (
          <Suspense fallback={fallback}>
            <GridManager
              {...commonProps}
              variant={currentVariant as GridVariantType}
            />
          </Suspense>
        );
      case 'list':
        return (
          <Suspense fallback={fallback}>
            <ListManager
              {...commonProps}
              variant={currentVariant as ListVariantType}
            />
          </Suspense>
        );
      case 'mixed':
        return (
          <Suspense fallback={fallback}>
            <MixedManager
              {...commonProps}
              variant={currentVariant as MixedVariantType}
            />
          </Suspense>
        );
      case 'featured':
        return (
          <Suspense fallback={fallback}>
            <FeaturedManager
              {...commonProps}
              variant={currentVariant as FeaturedVariantType}
            />
          </Suspense>
        );
      default:
        return null;
    }
  }, [articles, blockType, isDarkTheme, onSave, currentVariant, blockConfig, handleOpenConfigModal, pageId]);

  return (
    <div className="w-full h-full">
      {renderManager}
      
      <Suspense fallback={null}>
        <StyleConfigModal
          isOpen={isConfigModalOpen}
          onClose={handleCloseConfigModal}
          onSave={handleSaveConfig}
          currentConfig={blockConfig}
          blockType={blockType}
          variantType={currentVariant}
        />
      </Suspense>
    </div>
  );
});

BlockManagerDragDrop.displayName = 'BlockManagerDragDrop';

export default BlockManagerDragDrop;
