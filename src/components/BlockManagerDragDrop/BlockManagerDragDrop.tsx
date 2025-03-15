import React, { useState, useCallback, useMemo, useRef, useTransition, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Article } from '../PageblockV2/types';
import type { BlockConfig } from './components/StyleConfigModal';
import { GridVariantType, MixedVariantType, FeaturedVariantType, ListVariantType } from './types';
import { PageResponse } from './interfaces/pages.types';
import { Editorial } from './interfaces/editorial.types';
import { ClientTheme } from './types';
import { ScheduleRequest, ScheduleResponse } from './interfaces/schedule.types';

// Static imports
import GridManager from './components/GridManager';
import ListManager from './components/ListManager';
import MixedManager from './components/MixedManager';
import FeaturedManager from './components/FeaturedManager';
import StyleConfigModal from './components/StyleConfigModal/index';
import SchedulePublishModal from './components/SchedulePublishModal';
import ScheduleStatusBadge from './components/ScheduleStatusBadge';

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
  },
  metadata: {
    title: '',
    description: ''
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
  initialLayout?: 'single' | 'grid';
  showBlockTypeSelector?: boolean;
  onBlockTypeChange?: (blockType: 'grid' | 'list' | 'mixed' | 'featured') => void;
  children?: React.ReactNode;
  blockId?: string;
  isEditMode?: boolean;
  scheduleInfo?: {
    scheduledAt: string | null;
    scheduledAction: string | null;
    scheduleStatus: string | null;
    scheduledData: any | null;
  };
  onSchedule?: (blockId: string, scheduleData: ScheduleRequest) => void;
  onCancelSchedule?: (blockId: string) => void;
  // New props for loading blocks
  onLoadBlocksByPageId?: (pageId: string) => Promise<any>;
  onLoadBlockById?: (blockId: string) => Promise<any>;
  isBlocksLoading?: boolean;
  // Prop para artigos pré-selecionados
  initialSelectedArticles?: Record<string, any[]>;
}

// Define the ref interface to expose methods to parent components
export interface BlockManagerDragDropRef {
  getCurrentData: () => {
    articles: { [key: string]: Article[] }
  };
}

// Block type options for the selector
const blockTypeOptions = [
  { value: 'grid', label: 'Grid' },
  { value: 'list', label: 'Lista' },
  { value: 'mixed', label: 'Misto' },
  { value: 'featured', label: 'Destaque' }
];

// Convert to forwardRef to allow parent components to access internal methods
const BlockManagerDragDrop = forwardRef<BlockManagerDragDropRef, BlockManagerDragDropProps>(({
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
  clientGeneralSettingsData,
  initialLayout = 'single',
  showBlockTypeSelector = false,
  onBlockTypeChange,
  children,
  blockId,
  isEditMode = false,
  scheduleInfo,
  onSchedule,
  onCancelSchedule,
  // New props for loading blocks
  onLoadBlocksByPageId,
  onLoadBlockById,
  isBlocksLoading = false,
  // Prop para artigos pré-selecionados
  initialSelectedArticles = {}
}, ref) => {
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [blockConfig, setBlockConfig] = useState<BlockConfig>(config || defaultBlockConfig);
  const [currentVariant, setCurrentVariant] = useState<string>(variant || 'standard');
  const [isPreviewOnly, setIsPreviewOnly] = useState(false);
  const isDraggingRef = useRef(false);
  const [isPending, startTransition] = useTransition();
  
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  
  // State for loaded blocks
  const [loadedBlocks, setLoadedBlocks] = useState<any[]>([]);
  const [selectedBlock, setSelectedBlock] = useState<any>(null);
  const [isLoadingBlock, setIsLoadingBlock] = useState(false);

  // State to track the current articles in each column
  const [currentArticles, setCurrentArticles] = useState<{ [key: string]: Article[] }>(initialSelectedArticles);

  // Expose methods to parent component via ref
  useImperativeHandle(ref, () => ({
    getCurrentData: () => {
      // Return the current state of articles in the component
      return {
        articles: currentArticles
      };
    }
  }));

  // Update currentArticles when initialSelectedArticles changes
  useEffect(() => {
    if (initialSelectedArticles && Object.keys(initialSelectedArticles).length > 0) {
      setCurrentArticles(initialSelectedArticles);
    }
  }, [initialSelectedArticles]);

  // Efeito para atualizar o currentVariant quando a prop variant muda
  useEffect(() => {
    console.log('===== EFFECT VARIANT CHANGED =====');
    console.log('Prop variant:', variant);
    console.log('Current variant antes:', currentVariant);
    
    if (variant) {
      console.log('Atualizando currentVariant para:', variant);
      setCurrentVariant(variant);
    }
  }, [variant]);

  // Effect to load blocks by page ID when pageId changes
  useEffect(() => {
    const loadBlocksByPageId = async () => {
      if (onLoadBlocksByPageId && pageId) {
        try {
          setIsLoadingBlock(true);
          const blocks = await onLoadBlocksByPageId(pageId);
          setLoadedBlocks(blocks);
          setIsLoadingBlock(false);
        } catch (error) {
          console.error('Error loading blocks by page ID:', error);
          setIsLoadingBlock(false);
        }
      }
    };

    loadBlocksByPageId();
  }, [pageId, onLoadBlocksByPageId]);

  // Effect to load block by ID when blockId changes
  useEffect(() => {
    const loadBlockById = async () => {
      if (onLoadBlockById && blockId) {
        try {
          setIsLoadingBlock(true);
          const block = await onLoadBlockById(blockId);
          setSelectedBlock(block);
          
          // Update component state with loaded block data
          if (block) {
            // Set block type if available
            if (block.template && onBlockTypeChange) {
              onBlockTypeChange(block.template as any);
            }
            
            // Set variant if available
            if (block.variants && block.variants.length > 0) {
              setCurrentVariant(block.variants[0].variantType);
            }
            
            // Set config if available
            if (block.variants && block.variants.length > 0 && block.variants[0].config) {
              const loadedConfig: BlockConfig = {
                ...block.variants[0].config,
                metadata: block.metadata || { title: '', description: '' }
              };
              setBlockConfig(loadedConfig);
            }
          }
          
          setIsLoadingBlock(false);
        } catch (error) {
          console.error('Error loading block by ID:', error);
          setIsLoadingBlock(false);
        }
      }
    };

    loadBlockById();
  }, [blockId, onLoadBlockById, onBlockTypeChange]);

  // Efeito para inicializar os artigos pré-selecionados
  useEffect(() => {
    console.log('===== INICIALIZANDO ARTIGOS PRÉ-SELECIONADOS =====');
    console.log('initialSelectedArticles:', initialSelectedArticles);
    
    // Verificar se temos artigos pré-selecionados
    if (initialSelectedArticles && Object.keys(initialSelectedArticles).length > 0) {
      // Aqui você pode implementar a lógica para inicializar os artigos nos componentes específicos
      // Por exemplo, você pode passar esses artigos para os componentes GridManager, ListManager, etc.
      console.log('Artigos pré-selecionados disponíveis para inicialização');
    }
  }, [initialSelectedArticles]);

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
    
    // Log the data being saved
    console.log('Saving block data:', data);
    
    // Update the blockConfig with the new data
    if (data && data.variants && data.variants.length > 0 && data.variants[0].config) {
      setBlockConfig(data.variants[0].config);
    }
    
    // Update the currentArticles state when saving
    if (data && data.articles) {
      setCurrentArticles(data.articles);
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

  // Function to get the current block configuration for scheduling
  const getBlockConfig = useCallback(() => {
    // Get the current block configuration based on the blockType
    let currentConfig = {};
    
    // For each block type, we need to get the configuration from the respective manager
    switch (blockType) {
      case 'grid':
        // Get the grid manager configuration
        currentConfig = {
          blockType: 'articles',
          template: 'grid',
          variants: [
            {
              variantType: variant || 'standard',
              variantPosition: 1,
              config: {
                ...blockConfig,
                // Use the current articles state
                articles: currentArticles
              }
            }
          ]
        };
        break;
      case 'list':
        // Get the list manager configuration
        currentConfig = {
          blockType: 'articles',
          template: 'list',
          variants: [
            {
              variantType: variant || 'chronological',
              variantPosition: 1,
              config: {
                ...blockConfig,
                // Use the current articles state
                articles: currentArticles
              }
            }
          ]
        };
        break;
      case 'mixed':
        // Get the mixed manager configuration
        currentConfig = {
          blockType: 'articles',
          template: 'mixed',
          variants: [
            {
              variantType: variant || 'sidebar',
              variantPosition: 1,
              config: {
                ...blockConfig,
                // Use the current articles state
                articles: currentArticles
              }
            }
          ]
        };
        break;
      case 'featured':
        // Get the featured manager configuration
        currentConfig = {
          blockType: 'articles',
          template: 'featured',
          variants: [
            {
              variantType: variant || 'hero',
              variantPosition: 1,
              config: {
                ...blockConfig,
                // Use the current articles state
                articles: currentArticles
              }
            }
          ]
        };
        break;
      default:
        break;
    }
    
    // Add pageId to the configuration
    if (pageId) {
      currentConfig = {
        ...currentConfig,
        pageId
      };
    }
    
    console.log('Generated block configuration for scheduling:', currentConfig);
    return currentConfig;
  }, [blockType, variant, blockConfig, pageId, currentArticles]);

  const handleOpenScheduleModal = useCallback(() => {
    if (isDraggingRef.current) {
      console.warn('Cannot open schedule modal during drag operation');
      return;
    }
    setIsScheduleModalOpen(true);
  }, []);

  const handleCloseScheduleModal = useCallback(() => {
    if (isDraggingRef.current) {
      console.warn('Cannot close schedule modal during drag operation');
      return;
    }
    setIsScheduleModalOpen(false);
  }, []);

  const handleSchedule = useCallback((scheduleData: ScheduleRequest) => {
    if (onSchedule && blockId) {
      // Get the current block configuration
      const currentBlockConfig = getBlockConfig();
      
      // Merge the metadata from scheduleData with the complete block configuration
      const completeScheduleData: ScheduleRequest = {
        ...scheduleData,
        scheduledData: {
          ...currentBlockConfig,
          ...scheduleData.scheduledData,
          // Ensure metadata is preserved
          metadata: {
            ...scheduleData.scheduledData.metadata
          }
        }
      };
      
      console.log('Scheduling block with complete data:', completeScheduleData);
      onSchedule(blockId, completeScheduleData);
      setIsScheduleModalOpen(false);
    }
  }, [onSchedule, blockId, getBlockConfig]);

  const handleCancelSchedule = useCallback(() => {
    if (onCancelSchedule && blockId) {
      onCancelSchedule(blockId);
    }
  }, [onCancelSchedule, blockId]);

  // Handler for block type change
  const handleBlockTypeChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const newBlockType = e.target.value as 'grid' | 'list' | 'mixed' | 'featured';
    if (onBlockTypeChange) {
      onBlockTypeChange(newBlockType);
    }
  }, [onBlockTypeChange]);

  // Handler for block selection from loaded blocks
  const handleBlockSelect = useCallback((blockId: string) => {
    const block = loadedBlocks.find(b => b.id === blockId);
    if (block && onLoadBlockById) {
      onLoadBlockById(blockId).then(loadedBlock => {
        setSelectedBlock(loadedBlock);
        
        // Update component state with loaded block data
        if (loadedBlock) {
          // Set block type if available
          if (loadedBlock.template && onBlockTypeChange) {
            onBlockTypeChange(loadedBlock.template as any);
          }
          
          // Set variant if available
          if (loadedBlock.variants && loadedBlock.variants.length > 0) {
            setCurrentVariant(loadedBlock.variants[0].variantType);
          }
          
          // Set config if available
          if (loadedBlock.variants && loadedBlock.variants.length > 0 && loadedBlock.variants[0].config) {
            const loadedConfig: BlockConfig = {
              ...loadedBlock.variants[0].config,
              metadata: loadedBlock.metadata || { title: '', description: '' }
            };
            setBlockConfig(loadedConfig);
          }
        }
      });
    }
  }, [loadedBlocks, onLoadBlockById, onBlockTypeChange]);

  // Loading state
  const isLoading = isPagesLoading || isEditorialsLoading || isBlocksLoading || isLoadingBlock;

  // Usar a prop variant diretamente em vez do estado interno currentVariant
  // Isso garante que sempre usamos o valor mais recente
  const activeVariant = useMemo(() => {
    // Se temos uma variante válida, usá-la
    if (variant) return variant;
    if (currentVariant) return currentVariant;
    
    // Caso contrário, usar uma variante padrão com base no tipo de bloco
    switch (blockType) {
      case 'grid':
        return 'standard';
      case 'list':
        return 'chronological';
      case 'mixed':
        return 'sidebar';
      case 'featured':
        return 'hero';
      default:
        return 'standard';
    }
  }, [variant, currentVariant, blockType]);

  return (
    <div className={className}>
      {/* Log para debug */}
      <div style={{ display: 'none' }}>
        {(() => {
          console.log('===== RENDERIZANDO COMPONENTE BLOCKMANAGERDRAGDROP =====');
          console.log('Props recebidas:');
          console.log('- blockType:', blockType);
          console.log('- variant:', variant);
          console.log('- currentVariant (estado interno):', currentVariant);
          console.log('- activeVariant (usado na renderização):', activeVariant);
          return null;
        })()}
      </div>
      
      {showBlockTypeSelector && (
        <div className="mb-6 p-4 bg-blue-100 dark:bg-blue-900 border-2 border-blue-500 dark:border-blue-700 rounded-lg shadow-md">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-center">
              <span className="text-lg font-bold text-blue-800 dark:text-blue-200 mr-2">
                Tipo de Bloco:
              </span>
              <select
                id="blockType"
                value={blockType}
                onChange={handleBlockTypeChange}
                className="block w-48 pl-4 pr-10 py-3 text-base font-medium bg-white dark:bg-gray-800 border-2 border-blue-500 dark:border-blue-700 text-blue-800 dark:text-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-lg rounded-md shadow-sm"
              >
                {blockTypeOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="text-sm text-blue-700 dark:text-blue-300 font-medium">
              Selecione o tipo de bloco para alterar o layout do conteúdo
            </div>
          </div>
        </div>
      )}

      {/* Block selection dropdown when blocks are loaded */}
      {loadedBlocks.length > 0 && (
        <div className="mb-6 p-4 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-center">
              <span className="text-lg font-medium text-gray-800 dark:text-gray-200 mr-2">
                Blocos Disponíveis:
              </span>
              <select
                value={selectedBlock?.id || ''}
                onChange={(e) => handleBlockSelect(e.target.value)}
                className="block w-64 pl-4 pr-10 py-2 text-base bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm"
                disabled={isLoading}
              >
                <option value="">Selecione um bloco</option>
                {loadedBlocks.map(block => (
                  <option key={block.id} value={block.id}>
                    {block.metadata?.title || `Bloco ${block.blockPosition}`} ({block.template})
                  </option>
                ))}
              </select>
            </div>
            {isLoading && (
              <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Carregando...
              </div>
            )}
          </div>
        </div>
      )}

      {children && (
        <div className="mb-4">
          {children}
        </div>
      )}
      
      {scheduleInfo && scheduleInfo.scheduledAt && (
        <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
          <div className="flex justify-between items-center">
            <ScheduleStatusBadge
              scheduledAt={scheduleInfo.scheduledAt}
              scheduledAction={scheduleInfo.scheduledAction as any}
              scheduleStatus={scheduleInfo.scheduleStatus as any}
            />
            {scheduleInfo.scheduleStatus === 'pending' && onCancelSchedule && (
              <button
                onClick={handleCancelSchedule}
                className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 dark:border-gray-700 shadow-sm text-xs font-medium rounded text-red-700 dark:text-red-400 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Cancelar agendamento
              </button>
            )}
          </div>
        </div>
      )}
      
      {isEditMode && (
        <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Modo de edição: {blockId}
              </span>
            </div>
            <div className="flex space-x-2">
              {onSchedule && (
                <button
                  onClick={handleOpenScheduleModal}
                  className="inline-flex items-center px-2.5 py-1.5 border border-transparent shadow-sm text-xs font-medium rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Agendar publicação
                </button>
              )}
              {onPublishBlock && (
                <button
                  onClick={onPublishBlock}
                  className="inline-flex items-center px-2.5 py-1.5 border border-transparent shadow-sm text-xs font-medium rounded text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Publicar agora
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {blockType === 'grid' && (
        <GridManager
          pageId={pageId}
          articles={articles}
          isDarkTheme={isDarkTheme}
          onSave={handleSave}
          variant={activeVariant as GridVariantType}
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
          initialSelectedArticles={initialSelectedArticles}
        />
      )}

      {blockType === 'list' && (
        <ListManager
          pageId={pageId}
          articles={articles}
          isDarkTheme={isDarkTheme}
          onSave={handleSave}
          variant={activeVariant as ListVariantType}
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
          initialLayout={initialLayout}
          initialSelectedArticles={initialSelectedArticles}
        />
      )}

      {blockType === 'mixed' && (
        <MixedManager
          pageId={pageId}
          articles={articles}
          isDarkTheme={isDarkTheme}
          onSave={handleSave}
          variant={activeVariant as MixedVariantType}
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
          clientGeneralSettingsData={clientGeneralSettingsData}
          initialSelectedArticles={initialSelectedArticles}
        />
      )}

      {blockType === 'featured' && (
        <FeaturedManager
          pageId={pageId}
          articles={articles}
          isDarkTheme={isDarkTheme}
          onSave={handleSave}
          variant={activeVariant as FeaturedVariantType}
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
          initialSelectedArticles={initialSelectedArticles}
        />
      )}
      
      {isConfigModalOpen && (
        <StyleConfigModal
          isOpen={isConfigModalOpen}
          onClose={handleCloseConfigModal}
          onSave={handleSaveConfig}
          currentConfig={blockConfig as any}
          blockType={blockType}
          variantType={currentVariant}
        />
      )}
      
      {isScheduleModalOpen && onSchedule && blockId && (
        <SchedulePublishModal
          isOpen={isScheduleModalOpen}
          onClose={handleCloseScheduleModal}
          onSchedule={handleSchedule}
          blockId={blockId}
          blockMetadata={blockConfig.metadata || { title: '', description: '' }}
        />
      )}
    </div>
  );
});

BlockManagerDragDrop.displayName = 'BlockManagerDragDrop';

export default BlockManagerDragDrop;
