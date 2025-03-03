import React, { useState, useCallback, useMemo, lazy, Suspense, useRef } from 'react';
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
  config?: BlockConfig;
  className?: string;
}

const BlockManagerDragDrop = React.memo(({
  articles,
  blockType,
  isDarkTheme,
  onSave,
  variant,
  pageId,
  config,
  className
}: BlockManagerDragDropProps) => {
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [blockConfig, setBlockConfig] = useState<BlockConfig>(config || defaultBlockConfig);
  const [currentVariant, setCurrentVariant] = useState<string>(variant || 'standard');
  const [isPreviewOnly, setIsPreviewOnly] = useState(false);
  const isDraggingRef = useRef(false);

  const handleOpenConfigModal = useCallback(() => {
    if (isDraggingRef.current) {
      console.warn('Cannot open config modal during drag operation');
      return;
    }
    setIsConfigModalOpen(true);
  }, []);

  const handleCloseConfigModal = useCallback(() => {
    setIsConfigModalOpen(false);
  }, []);

  const handleSaveConfig = useCallback((config: BlockConfig) => {
    setBlockConfig(config);
    setIsConfigModalOpen(false);
  }, []);

  const togglePreviewMode = useCallback(() => {
    if (isDraggingRef.current) {
      console.warn('Cannot toggle preview mode during drag operation');
      return;
    }
    setIsPreviewOnly(prev => !prev);
  }, []);

  const handleSave = useCallback((data: any) => {
    if (isDraggingRef.current) {
      console.warn('Cannot save during drag operation');
      return;
    }
    onSave(data);
  }, [onSave]);

  const handleDragStart = useCallback(() => {
    isDraggingRef.current = true;
    
    document.dispatchEvent(new Event('dragstart'));
  }, []);

  const handleDragEnd = useCallback(() => {
    isDraggingRef.current = false;
    
    document.dispatchEvent(new Event('dragend'));
  }, []);

  const renderManager = useMemo(() => {
    const commonProps = {
      articles,
      isDarkTheme,
      onSave: handleSave,
      blockConfig,
      onConfigClick: handleOpenConfigModal,
      pageId,
      isPreviewOnly,
      onDragStart: handleDragStart,
      onDragEnd: handleDragEnd
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
  }, [articles, blockType, isDarkTheme, handleSave, currentVariant, blockConfig, handleOpenConfigModal, pageId, isPreviewOnly, handleDragStart, handleDragEnd]);

  return (
    <div className={`w-full max-w-full ${className || ''}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
          Gerenciador de Layout {blockType === 'mixed' ? 'Misto' : blockType === 'grid' ? 'Grid' : blockType === 'list' ? 'Lista' : 'Destaque'}
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={togglePreviewMode}
            className="flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {isPreviewOnly ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                </svg>
                Mostrar Editor
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Visualização Completa
              </>
            )}
          </button>
        </div>
      </div>
      
      {renderManager}
      
      {isConfigModalOpen && (
        <StyleConfigModal
          isOpen={isConfigModalOpen}
          onClose={handleCloseConfigModal}
          onSave={handleSaveConfig}
          currentConfig={blockConfig}
          blockType={blockType}
          variantType={currentVariant}
        />
      )}
    </div>
  );
});

BlockManagerDragDrop.displayName = 'BlockManagerDragDrop';

export default BlockManagerDragDrop;
