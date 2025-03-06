import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { Article } from '../../PageblockV2/types';
import DroppableColumn from './DroppableColumn';
import MixedLayoutPreview from './MixedLayoutPreview';
import ArticlesPool from './ArticlesPool';
import { BlockConfig } from './StyleConfigModal';
import { useBlockState } from '../hooks/useBlockState';
import { VariantType, ArticleFilters, ClientTheme } from '../types';
import Button from '../../../components/Button';
import Sidebar from './Sidebar';
import { PageResponse } from '../interfaces/pages.types';
import { Editorial } from '../interfaces/editorial.types';
import DragDropTips from './DragDropTips';
import { adaptBlockConfig } from '../utils/adapters';

interface MixedManagerProps {
  pageId: string;
  articles: Article[];
  isDarkTheme?: boolean;
  onSave: (data: any) => void;
  variant?: keyof typeof LAYOUT_VARIANTS;
  blockConfig: BlockConfig;
  onConfigClick: () => void;
  isPreviewOnly?: boolean;
  onDragStart?: () => void;
  onDragEnd?: () => void;
  pageData?: PageResponse[];
  editorialsData?: Editorial;
  isPagesLoading?: boolean;
  isEditorialsLoading?: boolean;
  onPageSelect?: (pageId: string) => void;
  onEditorialSelect?: (editorialId: string, subEditorialId?: string) => void;
  onPublishBlock?: () => void;
  clientGeneralSettingsData: ClientTheme;
}

// Ajuste na tipagem das colunas
type BaseColumnId = 'col-0' | 'col-1' | 'col-2';
type ColumnId = BaseColumnId;

type VariantColumns<T extends BaseColumnId[]> = {
  [K in T[number]]: K extends keyof Record<BaseColumnId, any> ? Record<BaseColumnId, any>[K] : never;
};

interface LayoutConfig<T extends BaseColumnId[]> {
  label: string;
  maxItems: { [K in T[number]]: number };
  columnLabels: { [K in T[number]]: string };
}

type VariantConfig<T extends BaseColumnId[]> = {
  label: string;
  maxItems: { [K in T[number]]: number };
  columnLabels: { [K in T[number]]: string };
};

type LayoutVariants = {
  sidebar: VariantConfig<['col-0', 'col-1']>;
  showcase: VariantConfig<['col-0', 'col-1', 'col-2']>;
  newspaper: VariantConfig<['col-0', 'col-1', 'col-2']>;
  magazine: VariantConfig<['col-0', 'col-1', 'col-2']>;
  videogrid: VariantConfig<['col-0', 'col-1', 'col-2']>;
};

const LAYOUT_VARIANTS: LayoutVariants = {
  sidebar: {
    label: 'Sidebar',
    maxItems: {
      'col-0': 1,
      'col-1': 4,
    },
    columnLabels: {
      'col-0': 'Artigo Principal',
      'col-1': 'Sidebar',
    },
  },
  showcase: {
    label: 'Showcase',
    maxItems: {
      'col-0': 1,
      'col-1': 3,
      'col-2': 4,
    },
    columnLabels: {
      'col-0': 'Artigo Principal',
      'col-1': 'Artigos Secundários',
      'col-2': 'Artigos Secundários',
    },
  },
  newspaper: {
    label: 'Newspaper',
    maxItems: {
      'col-0': 2,
      'col-1': 4,
      'col-2': 4,
    },
    columnLabels: {
      'col-0': 'Artigos Principais',
      'col-1': 'Artigos Secundários',
      'col-2': 'Artigos Secundários',
    },
  },
  magazine: {
    label: 'Magazine',
    maxItems: {
      'col-0': 1,
      'col-1': 3,
      'col-2': 4,
    },
    columnLabels: {
      'col-0': 'Artigo Principal',
      'col-1': 'Artigos com Imagem',
      'col-2': 'Artigos Texto',
    },
  },
  videogrid: {
    label: 'Video Grid',
    maxItems: {
      'col-0': 1,
      'col-1': 2,
      'col-2': 2,
    },
    columnLabels: {
      'col-0': 'Vídeo Principal',
      'col-1': 'Title and Description',
      'col-2': 'Title and Description',
    },
  },
} as const;

type LayoutVariant = keyof typeof LAYOUT_VARIANTS;

// Função auxiliar para verificar se uma coluna existe em um layout
const columnExistsInVariant = (columnId: string, variant: LayoutVariant): columnId is keyof typeof LAYOUT_VARIANTS[typeof variant]['maxItems'] => {
  return columnId in LAYOUT_VARIANTS[variant].maxItems;
};

// Ajuste na tipagem do MixedLayoutPreview
interface MixedLayoutPreviewProps {
  variant: keyof typeof LAYOUT_VARIANTS;
  columns: Record<string, Article[]>;
  isDarkTheme?: boolean;
  blockConfig: BlockConfig;
  clientGeneralSettingsData: ClientTheme;
}

const MixedManager: React.FC<MixedManagerProps> = ({ 
  pageId,
  articles, 
  isDarkTheme, 
  onSave, 
  variant = 'sidebar',
  blockConfig: externalBlockConfig,
  onConfigClick,
  isPreviewOnly = false,
  onDragStart,
  onDragEnd,
  pageData = [],
  editorialsData,
  isPagesLoading = false,
  isEditorialsLoading = false,
  onPageSelect,
  onEditorialSelect,
  onPublishBlock,
  clientGeneralSettingsData
}) => {
  // Garantir que sempre temos uma variante válida
  const safeVariant = useMemo(() => {
    const validVariant = variant && LAYOUT_VARIANTS[variant] ? variant : 'sidebar';
    if (validVariant !== variant) {
      console.warn(`Variante "${variant}" não encontrada, usando "sidebar" como fallback`);
    }
    return validVariant;
  }, [variant]) as LayoutVariant;

  const isDraggingRef = useRef(false);
  const [showTips, setShowTips] = useState(false);
  const [selectedPoolArticleIds, setSelectedPoolArticleIds] = useState<(string | number)[]>([]);
  const [filters, setFilters] = useState<ArticleFilters>({
    hasImage: false,
    limit: 30,
    searchTerm: '',
    search: '',
    page: '',
    editorial: '',
    subEditorial: '',
    isMultiSelectEnabled: false
  });
  
  const {
    blockState,
    updateArticlePositions,
    updateVariant,
    updateVariantPosition,
    updateBlockPosition,
    updateBlockConfig,
    updateBlockIdentifiers,
    getApiFormat,
    setDragging
  } = useBlockState({
    pageId,
    template: 'mixed',
    initialArticles: articles,
    initialVariant: safeVariant,
    blockPosition: 1,
    pageData: pageData,
    editorialsData: editorialsData
  });

  const handleFiltersChange = useCallback((newFilters: Partial<ArticleFilters>) => {
    setFilters((prev: ArticleFilters) => ({ ...prev, ...newFilters }));
  }, []);

  const handlePoolSelectionChange = useCallback((selectedIds: (string | number)[]) => {
    setSelectedPoolArticleIds(selectedIds);
  }, []);

  // Filter articles based on current filters
  const filteredArticles = useMemo(() => {
    let filtered = blockState.articles.pool;

    // Filter by image
    if (filters.hasImage) {
      filtered = filtered.filter(article => {
        const desktopImage = article.content?.image?.desktop_image_path;
        const mobileImage = article.content?.image?.mobile_image_path;
        
        const hasValidDesktopImage = desktopImage && typeof desktopImage === 'string' && desktopImage.trim().length > 0;
        const hasValidMobileImage = mobileImage && typeof mobileImage === 'string' && mobileImage.trim().length > 0;
        
        return hasValidDesktopImage || hasValidMobileImage;
      });
    }

    // Filter by text (title and subtitle)
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(article => 
        article.title.toLowerCase().includes(searchLower) ||
        article.subtitle?.toLowerCase().includes(searchLower)
      );
    }

    // Apply limit
    return filtered.slice(0, filters.limit);
  }, [blockState.articles.pool, filters]);

  const handleDragStartInternal = useCallback(() => {
    isDraggingRef.current = true;
    setDragging?.(true);
    document.body.classList.add('reduced-animation');
    document.body.style.pointerEvents = 'auto';
    onDragStart?.();
  }, [onDragStart, setDragging]);

  const handleDragEndInternal = useCallback((result: DropResult) => {
    isDraggingRef.current = false;
    setDragging?.(false);
    document.body.classList.remove('reduced-animation');
    document.body.style.pointerEvents = '';
    onDragEnd?.();
    
    const { source, destination } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) return;

    const variantType = blockState.currentVariant.variantType as LayoutVariant;
    if (!LAYOUT_VARIANTS[variantType]) {
      console.error(`Variante "${variantType}" não encontrada em LAYOUT_VARIANTS`);
      return;
    }
    
    const currentVariant = LAYOUT_VARIANTS[variantType];
    const destColumn = destination.droppableId as ColumnId;
    
    if (!Object.keys(currentVariant.maxItems).includes(destColumn)) {
      console.error(`Coluna "${destColumn}" não encontrada na variante "${variantType}"`);
      return;
    }

    // Determina os artigos selecionados baseado na origem
    const selectedArticles = source.droppableId === 'pool'
      ? selectedPoolArticleIds.length > 0
        ? blockState.articles.pool.filter(article => selectedPoolArticleIds.includes(article.id))
        : [blockState.articles.pool[source.index]]
      : blockState.articles[source.droppableId].filter(article => 
          result.draggableId.includes(String(article.id))
        );

    // Verificar se a coluna de destino já atingiu o limite máximo de artigos
    if (
      source.droppableId !== destination.droppableId && 
      destColumn && 
      blockState.articles[destColumn] && 
      blockState.articles[destColumn].length + selectedArticles.length > currentVariant.maxItems[destColumn as keyof typeof currentVariant.maxItems]
    ) {
      return;
    }

    // Copia os arrays de origem e destino mantendo as referências aos objetos originais
    const sourceCol = [...(blockState.articles[source.droppableId] || [])];
    const destCol = source.droppableId === destination.droppableId
      ? sourceCol
      : [...(blockState.articles[destination.droppableId] || [])];

    // Remove os itens da origem e mantém a referência aos objetos originais
    const removedArticles = selectedArticles.map(article => {
      const index = sourceCol.findIndex(a => a.id === article.id);
      if (index !== -1) {
        return sourceCol.splice(index, 1)[0];
      }
      return article;
    });

    // Adiciona os mesmos objetos (não cópias) no destino
    destCol.splice(destination.index, 0, ...removedArticles);

    // Atualiza o estado
    const newColumns = {
      ...blockState.articles,
      [source.droppableId]: sourceCol,
      [destination.droppableId]: destCol
    };

    updateArticlePositions(newColumns);

    // Limpa a seleção após o drag
    if (source.droppableId === 'pool') {
      setSelectedPoolArticleIds([]);
    }
  }, [blockState.articles, blockState.currentVariant.variantType, selectedPoolArticleIds, updateArticlePositions, onDragEnd, setDragging]);

  // Função para remover múltiplos artigos
  const handleRemoveArticles = useCallback((columnId: string, articleIds: (string | number)[]) => {
    if (isDraggingRef.current) {
      console.warn('Cannot remove articles during drag operation');
      return;
    }
    
    // Encontra os artigos na coluna - garantindo que estamos usando as referências originais
    const articlesToRemove = blockState.articles[columnId]?.filter(article => 
      articleIds.some(id => String(id) === String(article.id))
    );
    
    if (!articlesToRemove?.length) return;
    
    // Remove os artigos da coluna
    const updatedColumn = blockState.articles[columnId]?.filter(article => 
      !articleIds.some(id => String(id) === String(article.id))
    ) || [];
    
    // Adiciona os artigos de volta à pool - usando as referências originais
    const updatedPool = [...(blockState.articles.pool || []), ...articlesToRemove];
    
    // Atualiza o estado
    const newColumns = {
      ...blockState.articles,
      [columnId]: updatedColumn,
      pool: updatedPool
    };
    
    updateArticlePositions(newColumns);
  }, [blockState.articles, updateArticlePositions]);

  // Função para remover um único artigo (mantida para compatibilidade)
  const handleRemoveArticle = useCallback((columnId: string, articleId: string | number) => {
    handleRemoveArticles(columnId, [articleId]);
  }, [handleRemoveArticles]);

  // Mover a função getUsedArticleIds para dentro do componente e usar useCallback
  const getUsedArticleIds = useCallback(() => {
    const usedIds: (string | number)[] = [];
    
    Object.keys(blockState.articles).forEach(colId => {
      if (colId !== 'pool') {
        const columnArticles = blockState.articles[colId] || [];
        columnArticles.forEach(article => {
          usedIds.push(article.id);
        });
      }
    });
    
    return usedIds;
  }, [blockState.articles]);

  const handlePageSelect = useCallback((pageId: string) => {
    updateBlockIdentifiers(pageId, undefined, undefined);
    onPageSelect?.(pageId);
    setFilters((prev: ArticleFilters) => ({
      ...prev,
      page: pageId,
      editorial: '',
      subEditorial: ''
    }));
  }, [onPageSelect, updateBlockIdentifiers]);

  const handleEditorialSelect = useCallback((editorialId: string, subEditorialId?: string) => {
    updateBlockIdentifiers(undefined, editorialId, subEditorialId);
    onEditorialSelect?.(editorialId, subEditorialId);
    setFilters((prev: ArticleFilters) => ({
      ...prev,
      editorial: editorialId,
      subEditorial: subEditorialId || '',
      page: ''
    }));
  }, [onEditorialSelect, updateBlockIdentifiers]);

  const handleClearSelection = useCallback(() => {
    updateBlockIdentifiers(pageId, undefined, undefined);
    setFilters((prev: ArticleFilters) => ({
      ...prev,
      page: '',
      editorial: '',
      subEditorial: ''
    }));
  }, [pageId, updateBlockIdentifiers]);

  // Função para lidar com a mudança de variante
  const handleVariantChange = useCallback((newVariant: string) => {
    if (LAYOUT_VARIANTS[newVariant as LayoutVariant]) {
      updateVariant(newVariant as VariantType);
    }
  }, [updateVariant]);

  return (
    <div className="relative">
      <DragDropTips 
        isDarkTheme={isDarkTheme} 
        isForced={showTips}
        onDismiss={() => setShowTips(false)}
      />

      <div className="flex flex-col gap-4">
        {!isPreviewOnly && (
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                Gerenciador Mixed
              </h2>
              <div className="flex items-center gap-2">
                <label htmlFor="variant-select" className="text-sm text-gray-600 dark:text-gray-400">
                  Variante:
                </label>
                <select
                  id="variant-select"
                  value={blockState.currentVariant.variantType}
                  onChange={(e) => handleVariantChange(e.target.value)}
                  className="text-sm rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 focus:border-blue-500 focus:ring-blue-500"
                >
                  {Object.entries(LAYOUT_VARIANTS).map(([key, value]) => (
                    <option key={key} value={key}>
                      {value.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowTips(true)}
                className={`
                  p-2 rounded-full transition-colors
                  ${isDarkTheme 
                    ? 'hover:bg-gray-700 text-gray-400 hover:text-gray-300' 
                    : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
                  }
                `}
                title="Mostrar dicas de uso"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                  />
                </svg>
              </button>
              <Button variant="primary" onClick={() => onSave(getApiFormat())}>
                Salvar
              </Button>
              <Button variant="info" onClick={onConfigClick}>
                Configurar Estilos
              </Button>
            </div>
          </div>
        )}

        {isPreviewOnly ? (
          <div className="w-full">
            <MixedLayoutPreview
              variant={blockState.currentVariant.variantType as LayoutVariant}
              columns={blockState.articles}
              isDarkTheme={isDarkTheme}
              blockConfig={adaptBlockConfig(externalBlockConfig) as any}
              clientGeneralSettingsData={clientGeneralSettingsData}
            />
          </div>
        ) : (
          <DragDropContext onDragStart={handleDragStartInternal} onDragEnd={handleDragEndInternal}>
            <div className="flex flex-row gap-4 w-full h-full">
              {/* Item 1: Lista de artigos (Pool) - Coluna estreita */}
              <Sidebar 
                pageData={pageData}
                editorialsData={editorialsData}
                isPagesLoading={isPagesLoading}
                isEditorialsLoading={isEditorialsLoading}
                blockConfig={adaptBlockConfig(externalBlockConfig) as any}
                filters={filters}
                onFiltersChange={handleFiltersChange}
                onPageSelect={handlePageSelect}
                onEditorialSelect={handleEditorialSelect}
                onClearSelection={handleClearSelection}
                onPublishBlock={onPublishBlock}
                onSave={() => {}}
                onConfigClick={() => {}}
                className='max-w-[320px] w-full p-0'
              >
                <div className="w-full scrollable-container" style={{ maxHeight: '35vh', overflowY: 'auto', marginBottom: '10px' }}>
                  <ArticlesPool
                    articles={filteredArticles}
                    isDarkTheme={isDarkTheme}
                    blockConfig={adaptBlockConfig(externalBlockConfig) as any}
                    usedArticleIds={getUsedArticleIds()}
                    isCompact={true}
                    isMultiSelectEnabled={true}
                    onSelectionChange={handlePoolSelectionChange}
                  />
                </div>
              </Sidebar>

              {/* Item 2: Colunas do layout */}
              <div className="flex-1 flex flex-col gap-6 mt-8">
                {Object.entries(LAYOUT_VARIANTS[blockState.currentVariant.variantType as LayoutVariant].columnLabels)
                  .filter(([columnId]) => columnExistsInVariant(columnId, blockState.currentVariant.variantType as LayoutVariant))
                  .map(([columnId, label]) => (
                    <div key={columnId} className="flex-1">
                      <DroppableColumn
                        columnId={columnId}
                        articles={blockState.articles[columnId] || []}
                        isDarkTheme={isDarkTheme}
                        label={label}
                        maxItems={LAYOUT_VARIANTS[blockState.currentVariant.variantType as LayoutVariant].maxItems[columnId as keyof typeof LAYOUT_VARIANTS[LayoutVariant]['maxItems']]}
                        blockConfig={adaptBlockConfig(externalBlockConfig) as any}
                        handleRemoveArticle={handleRemoveArticle}
                        handleRemoveArticles={handleRemoveArticles}
                        variant={blockState.currentVariant.variantType as LayoutVariant}
                        useCompactView={true}
                      />
                    </div>
                  ))}
              </div>

              {/* Item 3: Preview */}
              <div className="flex-1 max-h-[70vh] overflow-y-auto">
                <MixedLayoutPreview
                  variant={blockState.currentVariant.variantType as LayoutVariant}
                  columns={blockState.articles}
                  isDarkTheme={isDarkTheme}
                  blockConfig={adaptBlockConfig(externalBlockConfig) as any}
                  clientGeneralSettingsData={clientGeneralSettingsData}
                />
              </div>
            </div>
          </DragDropContext>
        )}
      </div>
    </div>
  );
};

export default React.memo(MixedManager); 