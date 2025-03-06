import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { Article } from '../../PageblockV2/types';
import DroppableColumn from './DroppableColumn';
import FeaturedLayoutPreview from './FeaturedLayoutPreview';
import ArticlesPool from './ArticlesPool';
import { BlockConfig } from './StyleConfigModal';
import { useBlockState } from '../hooks/useBlockState';
import { FeaturedVariantType, ArticleFilters, ClientTheme } from '../types';
import Button from '../../Button';
import Sidebar from './Sidebar';
import { PageResponse } from '../interfaces/pages.types';
import { Editorial } from '../interfaces/editorial.types';
import DragDropTips from './DragDropTips';

interface FeaturedManagerProps {
  pageId: string;
  articles: Article[];
  isDarkTheme?: boolean;
  onSave: (data: any) => void;
  variant?: FeaturedVariantType;
  blockConfig: BlockConfig;
  onConfigClick: () => void;
  isPreviewOnly?: boolean;
  pageData?: PageResponse[];
  editorialsData?: Editorial;
  isPagesLoading?: boolean;
  isEditorialsLoading?: boolean;
  onPageSelect?: (pageId: string) => void;
  onEditorialSelect?: (editorialId: string, subEditorialId?: string) => void;
  onPublishBlock?: () => void;
  clientGeneralSettingsData: ClientTheme;
}

const FeaturedManager: React.FC<FeaturedManagerProps> = ({ 
  pageId,
  articles, 
  isDarkTheme, 
  onSave, 
  variant = 'hero',
  blockConfig: externalBlockConfig,
  onConfigClick,
  isPreviewOnly = false,
  pageData = [],
  editorialsData,
  isPagesLoading = false,
  isEditorialsLoading = false,
  onPageSelect,
  onEditorialSelect,
  onPublishBlock,
  clientGeneralSettingsData
}) => {
  const {
    blockState,
    updateArticlePositions,
    updateVariant,
    updateBlockConfig,
    updateBlockIdentifiers,
    getApiFormat
  } = useBlockState({
    pageId,
    template: 'featured',
    initialVariant: variant,
    initialArticles: articles,
    pageData: pageData,
    editorialsData: editorialsData
  });

  const [selectedPoolArticleIds, setSelectedPoolArticleIds] = useState<(string | number)[]>([]);
  const [showTips, setShowTips] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
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

  const handleFiltersChange = useCallback((newFilters: Partial<ArticleFilters>) => {
    setFilters((prev: ArticleFilters) => ({ ...prev, ...newFilters }));
  }, []);

  const handlePoolSelectionChange = useCallback((selectedIds: (string | number)[]) => {
    setSelectedPoolArticleIds(selectedIds);
  }, []);

  const variants = [
    { id: 'hero', label: 'Hero', maxItems: 1 },
    { id: 'split', label: 'Split', maxItems: 2 },
    { id: 'triple', label: 'Triple', maxItems: 3 }
  ];

  const currentVariant = variants.find(v => v.id === blockState.currentVariant.variantType) || variants[0];

  const handleDragStart = useCallback(() => {
    setIsDragging(true);
    document.body.classList.add('reduced-animation');
    document.body.style.pointerEvents = 'auto';
  }, []);

  const handleDragEnd = useCallback((result: DropResult) => {
    document.body.classList.remove('reduced-animation');
    document.body.style.pointerEvents = '';
    setIsDragging(false);
    
    const { source, destination } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) return;

    // Determina os artigos selecionados baseado na origem
    const selectedArticles = source.droppableId === 'pool'
      ? selectedPoolArticleIds.length > 0
        ? blockState.articles.pool.filter(article => selectedPoolArticleIds.includes(article.id))
        : [blockState.articles.pool[source.index]]
      : blockState.articles[source.droppableId].filter(article => 
          result.draggableId.includes(String(article.id))
        );

    if (
      source.droppableId !== destination.droppableId && 
      destination.droppableId === 'col-0' && 
      blockState.articles['col-0'] && 
      blockState.articles['col-0'].length + selectedArticles.length > currentVariant.maxItems
    ) {
      return;
    }

    const sourceCol = [...(blockState.articles[source.droppableId] || [])];
    const destCol = source.droppableId === destination.droppableId
      ? sourceCol
      : [...(blockState.articles[destination.droppableId] || [])];

    const removedArticles = selectedArticles.map(article => {
      const index = sourceCol.findIndex(a => a.id === article.id);
      if (index !== -1) {
        return sourceCol.splice(index, 1)[0];
      }
      return article;
    });

    destCol.splice(destination.index, 0, ...removedArticles);

    const newColumns = {
      ...blockState.articles,
      [source.droppableId]: sourceCol,
      [destination.droppableId]: destCol
    };

    updateArticlePositions(newColumns);

    if (source.droppableId === 'pool') {
      setSelectedPoolArticleIds([]);
    }
  }, [blockState.articles, selectedPoolArticleIds, currentVariant.maxItems, updateArticlePositions]);

  const handleRemoveArticles = useCallback((columnId: string, articleIds: (string | number)[]) => {
    const articlesToRemove = blockState.articles[columnId]?.filter(article => 
      articleIds.some(id => String(id) === String(article.id))
    );
    
    if (!articlesToRemove?.length) return;
    
    const updatedColumn = blockState.articles[columnId]?.filter(article => 
      !articleIds.some(id => String(id) === String(article.id))
    ) || [];
    
    const updatedPool = [...(blockState.articles.pool || []), ...articlesToRemove];
    
    const newColumns = {
      ...blockState.articles,
      [columnId]: updatedColumn,
      pool: updatedPool
    };
    
    updateArticlePositions(newColumns);
  }, [blockState.articles, updateArticlePositions]);

  const handleRemoveArticle = useCallback((columnId: string, articleId: string | number) => {
    handleRemoveArticles(columnId, [articleId]);
  }, [handleRemoveArticles]);

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

  // Filter articles based on current filters
  const filteredArticles = useMemo(() => {
    let filtered = blockState.articles.pool;

    if (filters.hasImage) {
      filtered = filtered.filter(article => {
        const desktopImage = article.content?.image?.desktop_image_path;
        const mobileImage = article.content?.image?.mobile_image_path;
        
        const hasValidDesktopImage = desktopImage && typeof desktopImage === 'string' && desktopImage.trim().length > 0;
        const hasValidMobileImage = mobileImage && typeof mobileImage === 'string' && mobileImage.trim().length > 0;
        
        return hasValidDesktopImage || hasValidMobileImage;
      });
    }

    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(article => 
        article.title.toLowerCase().includes(searchLower) ||
        article.subtitle?.toLowerCase().includes(searchLower)
      );
    }

    return filtered.slice(0, filters.limit);
  }, [blockState.articles.pool, filters]);

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
                Gerenciador de Destaque
              </h2>
              <div className="flex items-center gap-2">
                <label htmlFor="variant-select" className="text-sm text-gray-600 dark:text-gray-400">
                  Variante:
                </label>
                <select
                  id="variant-select"
                  value={blockState.currentVariant.variantType}
                  onChange={(e) => updateVariant(e.target.value as FeaturedVariantType)}
                  className="text-sm rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 focus:border-blue-500 focus:ring-blue-500"
                >
                  {variants.map(variant => (
                    <option key={variant.id} value={variant.id}>
                      {variant.label}
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
            <FeaturedLayoutPreview
              variantType={blockState.currentVariant.variantType}
              columns={blockState.articles}
              isDarkTheme={isDarkTheme}
              blockConfig={externalBlockConfig}
              clientGeneralSettingsData={clientGeneralSettingsData}
            />
          </div>
        ) : (
          <DragDropContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <div className="flex flex-row gap-4 w-full h-full">
              {/* Item 1: Lista de artigos (Pool) - Coluna estreita */}
              <Sidebar 
                pageData={pageData}
                editorialsData={editorialsData}
                isPagesLoading={isPagesLoading}
                isEditorialsLoading={isEditorialsLoading}
                blockConfig={externalBlockConfig}
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
                    blockConfig={externalBlockConfig}
                    usedArticleIds={getUsedArticleIds()}
                    isCompact={true}
                    isMultiSelectEnabled={true}
                    onSelectionChange={handlePoolSelectionChange}
                  />
                </div>
              </Sidebar>

              {/* Item 2: Coluna de artigos e preview */}
              <div className="flex-1 flex flex-row gap-4">
                <div className="flex-1 max-h-[70vh] overflow-y-auto scrollable-container">
                  <DroppableColumn
                    columnId="col-0"
                    articles={blockState.articles['col-0'] || []}
                    isDarkTheme={isDarkTheme}
                    label="Artigos em Destaque"
                    maxItems={currentVariant.maxItems}
                    blockConfig={externalBlockConfig}
                    handleRemoveArticle={handleRemoveArticle}
                    handleRemoveArticles={handleRemoveArticles}
                    variant={blockState.currentVariant.variantType}
                    useCompactView={true}
                  />
                </div>
                
                {/* Item 3: Preview */}
                <div className="flex-1 max-h-[70vh] overflow-y-auto scrollable-container">
                  <FeaturedLayoutPreview
                    variantType={blockState.currentVariant.variantType}
                    columns={blockState.articles}
                    isDarkTheme={isDarkTheme}
                    blockConfig={externalBlockConfig}
                    clientGeneralSettingsData={clientGeneralSettingsData}
                  />
                </div>
              </div>
            </div>
          </DragDropContext>
        )}
      </div>
    </div>
  );
};

export default React.memo(FeaturedManager); 