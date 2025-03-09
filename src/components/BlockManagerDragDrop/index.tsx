import React, { useState, useCallback, useMemo } from 'react';
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
  pageData?: PageResponse[];
  editorialsData?: Editorial;
  isPagesLoading?: boolean;
  isEditorialsLoading?: boolean;
  onPageSelect?: (pageId: string) => void;
  onEditorialSelect?: (editorialId: string, subEditorialId?: string) => void;
  onPublishBlock?: () => void;
  showSidebar?: boolean;
  clientGeneralSettingsData: ClientTheme;
  children?: React.ReactNode;
}

const BlockManagerDragDrop = React.memo(({
  articles,
  blockType,
  isDarkTheme,
  onSave,
  variant,
  pageId,
  pageData,
  editorialsData,
  isPagesLoading = false,
  isEditorialsLoading = false,
  onPageSelect,
  onEditorialSelect,
  onPublishBlock,
  clientGeneralSettingsData,
  children
}: BlockManagerDragDropProps) => {
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [blockConfig, setBlockConfig] = useState<BlockConfig>(defaultBlockConfig);
  const [currentVariant, setCurrentVariant] = useState<string>(variant || 'standard');
  const [isPreviewOnly, setIsPreviewOnly] = useState(false);

  // Garantir que pageData é sempre um array
  const safePageData = useMemo(() => {
    return Array.isArray(pageData) ? pageData : [];
  }, [pageData]);

  // Garantir que editorialsData tem a estrutura correta
  const safeEditorialsData = useMemo(() => {
    if (!editorialsData) {
      return { editorials: [] };
    }
    return editorialsData;
  }, [editorialsData]);

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

  const togglePreviewMode = useCallback(() => {
    setIsPreviewOnly(prev => !prev);
  }, []);

  const commonProps = {
    articles,
    isDarkTheme,
    onSave,
    blockConfig,
    onConfigClick: handleOpenConfigModal,
    pageId,
    isPreviewOnly,
    pageData: safePageData,
    editorialsData: safeEditorialsData,
    isPagesLoading,
    isEditorialsLoading,
    onPageSelect,
    onEditorialSelect,
    onPublishBlock,
    clientGeneralSettingsData,
    children
  };

  const managers = {
    grid: <GridManager {...commonProps} variant={currentVariant as GridVariantType} />,
    list: <ListManager {...commonProps} variant={currentVariant as ListVariantType} />,
    mixed: <MixedManager {...commonProps} variant={currentVariant as MixedVariantType} />,
    featured: <FeaturedManager {...commonProps} variant={currentVariant as FeaturedVariantType} />
  };

  return (
    <div className="w-full h-full">
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 0 0 16 0 0 11-6 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Visualização Completa
              </>
            )}
          </button>
        </div>
      </div>
      
      {managers[blockType]}
      
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
