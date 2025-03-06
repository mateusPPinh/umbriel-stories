import React, { useState, useCallback, useMemo, useRef, useTransition } from 'react';
import { Article } from '../PageblockV2/types';
import type { BlockConfig } from './components/StyleConfigModal';
import { GridVariantType, MixedVariantType, FeaturedVariantType, ListVariantType } from './types';
import { PageResponse } from './interfaces/pages.types';
import { Editorial } from './interfaces/editorial.types';
import { ClientTheme } from './types';

// Static imports
import GridManager from './components/GridManager';
import ListManager from './components/ListManager';
import MixedManager from './components/MixedManager';
import FeaturedManager from './components/FeaturedManager';
import StyleConfigModal from './components/StyleConfigModal';

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
  pageData?: PageResponse[];
  editorialsData?: Editorial;
  isPagesLoading?: boolean;
  isEditorialsLoading?: boolean;
  onPageSelect?: (pageId: string) => void;
  onEditorialSelect?: (editorialId: string, subEditorialId?: string) => void;
  onPublishBlock?: () => void;
  clientGeneralSettingsData: ClientTheme;
}

const BlockManagerDragDrop = React.memo(({
  articles,
  blockType,
  isDarkTheme,
  onSave,
  variant,
  pageId,
  config,
  className,
  pageData,
  editorialsData,
  isPagesLoading = false,
  isEditorialsLoading = false,
  onPageSelect,
  onEditorialSelect,
  onPublishBlock,
  clientGeneralSettingsData
}: BlockManagerDragDropProps) => {
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [blockConfig, setBlockConfig] = useState<BlockConfig>(config || defaultBlockConfig);
  const [currentVariant, setCurrentVariant] = useState<string>(variant || 'standard');
  const [isPreviewOnly, setIsPreviewOnly] = useState(false);
  const isDraggingRef = useRef(false);
  const [isPending, startTransition] = useTransition();

  const handleOpenConfigModal = useCallback(() => {
    if (isDraggingRef.current) {
      console.warn('Cannot open config modal during drag operation');
      return;
    }
    startTransition(() => {
      setIsConfigModalOpen(true);
    });
  }, []);

  const handleCloseConfigModal = useCallback(() => {
    if (isDraggingRef.current) {
      console.warn('Cannot close config modal during drag operation');
      return;
    }
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

  return (
    <div className={className}>
      {blockType === 'grid' && (
        <GridManager
          pageId={pageId}
          articles={articles}
          isDarkTheme={isDarkTheme}
          onSave={handleSave}
          variant={currentVariant as GridVariantType}
          blockConfig={blockConfig}
          onConfigClick={handleOpenConfigModal}
          isPreviewOnly={isPreviewOnly}
          pageData={pageData}
          editorialsData={editorialsData}
          isPagesLoading={isPagesLoading}
          isEditorialsLoading={isEditorialsLoading}
          onPageSelect={onPageSelect}
          onEditorialSelect={onEditorialSelect}
          onPublishBlock={onPublishBlock}
          clientGeneralSettingsData={clientGeneralSettingsData}
        />
      )}

      {blockType === 'list' && (
        <ListManager
          pageId={pageId}
          articles={articles}
          isDarkTheme={isDarkTheme}
          onSave={handleSave}
          variant={currentVariant as ListVariantType}
          blockConfig={blockConfig}
          onConfigClick={handleOpenConfigModal}
          isPreviewOnly={isPreviewOnly}
          pageData={pageData}
          editorialsData={editorialsData}
          isPagesLoading={isPagesLoading}
          isEditorialsLoading={isEditorialsLoading}
          onPageSelect={onPageSelect}
          onEditorialSelect={onEditorialSelect}
          onPublishBlock={onPublishBlock}
          clientGeneralSettingsData={clientGeneralSettingsData}
        />
      )}

      {blockType === 'mixed' && (
        <MixedManager
          pageId={pageId}
          articles={articles}
          isDarkTheme={isDarkTheme}
          onSave={handleSave}
          variant={currentVariant as MixedVariantType}
          blockConfig={blockConfig}
          onConfigClick={handleOpenConfigModal}
          isPreviewOnly={isPreviewOnly}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          pageData={pageData}
          editorialsData={editorialsData}
          isPagesLoading={isPagesLoading}
          isEditorialsLoading={isEditorialsLoading}
          onPageSelect={onPageSelect}
          onEditorialSelect={onEditorialSelect}
          onPublishBlock={onPublishBlock}
        />
      )}

      {blockType === 'featured' && (
        <FeaturedManager
          pageId={pageId}
          articles={articles}
          isDarkTheme={isDarkTheme}
          onSave={handleSave}
          variant={currentVariant as FeaturedVariantType}
          blockConfig={blockConfig}
          onConfigClick={handleOpenConfigModal}
          isPreviewOnly={isPreviewOnly}
          pageData={pageData}
          editorialsData={editorialsData}
          isPagesLoading={isPagesLoading}
          isEditorialsLoading={isEditorialsLoading}
          onPageSelect={onPageSelect}
          onEditorialSelect={onEditorialSelect}
          onPublishBlock={onPublishBlock}
        />
      )}
      
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
