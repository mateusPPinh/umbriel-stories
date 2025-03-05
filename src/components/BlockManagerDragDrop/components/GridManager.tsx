import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { Article } from '../../PageblockV2/types';
import { useBlockState } from '../hooks/useBlockState';
import DroppableColumn from './DroppableColumn';
import Button from '../../Button';
import LayoutPreview from './LayoutPreview';
import ArticlesPool from './ArticlesPool';
import { BlockConfig } from './StyleConfigModal';
import { GridVariantType, VariantType, Column, GridVariant } from '../types';
import Sidebar from './Sidebar';
import { PageResponse } from '../interfaces/pages.types';
import { Editorial } from '../interfaces/editorial.types';

interface ArticleFilters {
  hasImage: boolean;
  limit: number;
  searchTerm: string;
}

// Definindo os layouts de grid disponíveis
const GRID_VARIANTS: Record<GridVariantType, GridVariant> = {
  standard: {
    id: 'standard',
    title: 'Standard Grid',
    maxItems: 6,
    columns: [
      { id: 'col-0', title: 'Column 1', width: 'w-full' },
      { id: 'col-1', title: 'Column 2', width: 'w-full' },
      { id: 'col-2', title: 'Column 3', width: 'w-full' }
    ],
    layout: {
      container: 'w-full',
      grid: 'grid grid-cols-1 md:grid-cols-3 gap-6'
    }
  },
  featured: {
    id: 'featured',
    title: 'Featured Grid',
    maxItems: 6,
    columns: [
      { id: 'col-0', title: 'Featured', width: 'w-full' },
      { id: 'col-1', title: 'Secondary', width: 'w-full' }
    ],
    layout: {
      container: 'w-full',
      grid: 'grid grid-cols-1 md:grid-cols-3 gap-6'
    }
  },
  masonry: {
    id: 'masonry',
    title: 'Masonry Grid',
    maxItems: 6,
    columns: [
      { id: 'col-0', title: 'Column 1', width: 'w-full' }
    ],
    layout: {
      container: 'w-full',
      grid: 'columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4'
    }
  },
  sidebargrid: {
    id: 'sidebargrid',
    title: 'Sidebar Grid',
    maxItems: 6,
    columns: [
      { id: 'col-0', title: 'Main', width: 'w-full' },
      { id: 'col-1', title: 'Sidebar', width: 'w-full' }
    ],
    layout: {
      container: 'w-full',
      wrapper: 'flex flex-col md:flex-row gap-6'
    }
  },
  newsfeed: {
    id: 'newsfeed',
    title: 'News Feed',
    maxItems: 6,
    columns: [
      { id: 'col-0', title: 'Main Feed', width: 'w-full' },
      { id: 'col-1', title: 'Side Feed', width: 'w-full' }
    ],
    layout: {
      container: 'w-full',
      grid: 'grid grid-cols-1 md:grid-cols-3 gap-6'
    }
  },
  newsgrid: {
    id: 'newsgrid',
    title: 'News Grid',
    maxItems: 6,
    columns: [
      { id: 'col-0', title: 'Column 1', width: 'w-full' },
      { id: 'col-1', title: 'Column 2', width: 'w-full' }
    ],
    layout: {
      container: 'w-full',
      grid: 'grid grid-cols-1 md:grid-cols-2 gap-6'
    }
  }
};

interface GridManagerProps {
  pageId: string;
  articles: Article[];
  isDarkTheme?: boolean;
  onSave: (data: any) => void;
  variant?: GridVariantType;
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
}

interface HeadingProps {
  text?: string;
  fontSize: string;
  fontWeight: string;
  color: string;
}

interface SubtitleProps {
  fontSize: string;
  color: string;
}

const GridManager: React.FC<GridManagerProps> = ({ 
  pageId,
  articles, 
  isDarkTheme = false, 
  onSave, 
  variant = 'standard',
  blockConfig,
  onConfigClick,
  isPreviewOnly = false,
  pageData,
  editorialsData,
  isPagesLoading = false,
  isEditorialsLoading = false,
  onPageSelect,
  onEditorialSelect,
  onPublishBlock
}) => {
  const {
    blockState,
    updateArticlePositions,
    updateVariant,
    updateVariantPosition,
    updateBlockPosition,
    updateBlockConfig,
    updateBlockIdentifiers,
    getApiFormat,
    handleRemoveArticle,
  } = useBlockState({
    pageId,
    template: 'grid',
    initialArticles: articles,
    initialVariant: variant,
    blockPosition: 1,
    pageData: pageData,
    editorialsData: editorialsData
  });
  
  const [showVariantSelector, setShowVariantSelector] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [filters, setFilters] = useState<ArticleFilters>({
    hasImage: false,
    limit: 30,
    searchTerm: ''
  });
  const [selectedArticleIds, setSelectedArticleIds] = useState<(string | number)[]>([]);

  // Add safety check for currentVariant
  const currentVariantType = blockState.currentVariant?.variantType as GridVariantType;
  const currentVariant = GRID_VARIANTS[currentVariantType] || GRID_VARIANTS.standard;

  // Add console warning if variant is not found
  if (!GRID_VARIANTS[currentVariantType]) {
    console.warn(`Grid variant "${currentVariantType}" not found, falling back to standard layout`);
  }

  // Performance optimizations
  const dragStyles = useMemo(() => ({
    draggingContainer: {
      transition: 'background-color 0.2s ease',
      opacity: isDragging ? 0.8 : 1,
    },
    draggingItem: {
      transition: 'transform 0.1s cubic-bezier(0.2, 0, 0, 1)',
      willChange: 'transform',
    }
  }), [isDragging]);

  // Filter articles based on current filters
  const filteredArticles = useMemo(() => {
    let filtered = blockState.articles.pool;

    // Filter by image
    if (filters.hasImage) {
      filtered = filtered.filter(article => {
        const desktopImage = article.content?.image?.desktop_image_path;
        const mobileImage = article.content?.image?.mobile_image_path;
        
        // Verifica se pelo menos uma das imagens existe e tem conteúdo válido
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

  // Função auxiliar para obter todos os IDs de artigos que já estão em uso nas colunas
  const getUsedArticleIds = useCallback(() => {
    const usedIds: (string | number)[] = [];
    const columnsToCheck = Object.keys(blockState.articles)
      .filter(key => key !== 'pool');
    
    columnsToCheck.forEach(colId => {
      const columnArticles = blockState.articles[colId] || [];
      columnArticles.forEach(article => {
        usedIds.push(article.id);
      });
    });
    
    return usedIds;
  }, [blockState.articles]);

  // Verifica se a variante atual permite múltipla seleção
  const isMultiSelectEnabled = useMemo(() => {
    // Se for masonry (1 coluna) ou qualquer variante com maxItems = 1, desabilita
    if (currentVariantType === 'masonry') return false;
    
    // Verifica se alguma coluna tem maxItems = 1
    const hasColumnWithSingleItem = currentVariant.columns.some(col => {
      const columnMaxItems = currentVariant.maxItems;
      return columnMaxItems === 1;
    });

    return !hasColumnWithSingleItem;
  }, [currentVariantType, currentVariant]);

  // Função para mover múltiplos artigos
  const moveMultipleArticles = useCallback((sourceId: string, destinationId: string, destinationIndex: number) => {
    const sourceCol = [...blockState.articles[sourceId]];
    const destCol = [...blockState.articles[destinationId]];
    
    // Filtra os artigos selecionados da coluna de origem
    const selectedArticles = sourceCol.filter(article => selectedArticleIds.includes(article.id));
    
    // Remove os artigos selecionados da coluna de origem
    const newSourceCol = sourceCol.filter(article => !selectedArticleIds.includes(article.id));
    
    // Verifica se a coluna de destino tem espaço para todos os artigos selecionados
    const availableSpace = currentVariant.maxItems - destCol.length;
    const articlesToMove = selectedArticles.slice(0, availableSpace);
    
    // Insere os artigos na posição de destino
    destCol.splice(destinationIndex, 0, ...articlesToMove);
    
    // Atualiza o estado
    const newColumns = {
      ...blockState.articles,
      [sourceId]: newSourceCol,
      [destinationId]: destCol
    };
    
    updateArticlePositions(newColumns);
    setSelectedArticleIds([]); // Limpa a seleção após mover
  }, [blockState.articles, selectedArticleIds, currentVariant.maxItems, updateArticlePositions]);

  // Função para iniciar o arrastar - seta o estado de arrastar
  const handleDragStart = useCallback(() => {
    setIsDragging(true);
    // Congelamos todas as animações durante o drag
    document.body.classList.add('reduced-animation');
    
    // Previne que o nível de zoom interrompa o drag
    document.body.style.pointerEvents = 'auto';
  }, []);

  const handleDragEnd = useCallback((result: DropResult) => {
    // Restaura animações e estado após o drag
    document.body.classList.remove('reduced-animation');
    document.body.style.pointerEvents = '';
    setIsDragging(false);
    
    const { source, destination } = result;

    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) return;

    const destColumn = currentVariant.columns.find(col => col.id === destination.droppableId);
    
    // Se houver artigos selecionados e o drag começou da pool
    if (selectedArticleIds.length > 0 && source.droppableId === 'pool') {
      moveMultipleArticles(source.droppableId, destination.droppableId, destination.index);
      return;
    }

    // Verifica se há espaço na coluna de destino
    if (
      source.droppableId !== destination.droppableId && 
      destColumn && 
      blockState.articles[destination.droppableId] && 
      blockState.articles[destination.droppableId].length >= currentVariant.maxItems
    ) {
      return;
    }

    // Comportamento padrão para um único artigo
    const sourceCol = [...blockState.articles[source.droppableId]];
    const destCol = source.droppableId === destination.droppableId
      ? sourceCol
      : [...blockState.articles[destination.droppableId]];

    const [removed] = sourceCol.splice(source.index, 1);
    destCol.splice(destination.index, 0, removed);

    const newColumns = {
      ...blockState.articles,
      [source.droppableId]: sourceCol,
      [destination.droppableId]: destCol
    };

    updateArticlePositions(newColumns);
  }, [blockState.articles, currentVariant, updateArticlePositions, selectedArticleIds, moveMultipleArticles]);

  const handleSave = useCallback(() => {
    onSave(getApiFormat());
  }, [getApiFormat, onSave]);

  const getColumnHeadingProps = useCallback((column: Column): HeadingProps => ({
    text: column.title,
    fontSize: '18px',
    fontWeight: '600',
    color: isDarkTheme ? '#FFFFFF' : '#000000'
  }), [isDarkTheme]);

  const getColumnSubtitleProps = useCallback((): SubtitleProps => ({
    fontSize: '14px',
    color: isDarkTheme ? '#E2E8F0' : '#4A5568'
  }), [isDarkTheme]);

  // Render layout functions with memoization for performance
  const renderMasonryLayout = useMemo(() => (
    <div className={currentVariant?.layout?.container} style={dragStyles.draggingContainer}>
      <DroppableColumn
        key={currentVariant?.columns[0]?.id}
        columnId={currentVariant?.columns[0]?.id}
        articles={blockState.articles[currentVariant?.columns[0]?.id] || []}
        maxItems={currentVariant?.maxItems}
        isDarkTheme={isDarkTheme}
        label={currentVariant?.columns[0]?.title}
        blockConfig={blockConfig}
        handleRemoveArticle={handleRemoveArticle}
        variant="masonry"
        useCompactView={true}
      />
    </div>
  ), [blockState.articles, currentVariant, isDarkTheme, blockConfig, handleRemoveArticle, dragStyles.draggingContainer]);

  const renderFeaturedLayout = useMemo(() => (
    <div className={currentVariant?.layout?.container} style={dragStyles.draggingContainer}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-2">
          <DroppableColumn
            key={currentVariant?.columns[0]?.id}
            columnId={currentVariant?.columns[0]?.id}
            articles={blockState.articles[currentVariant?.columns[0]?.id] || []}
            maxItems={currentVariant?.maxItems}
            isDarkTheme={isDarkTheme}
            label={currentVariant?.columns[0]?.title}
            blockConfig={blockConfig}
            handleRemoveArticle={handleRemoveArticle}
            variant="featured-main"
            useCompactView={true}
          />
        </div>
        <div className="col-span-1">
          <DroppableColumn
            key={currentVariant?.columns[1]?.id}
            columnId={currentVariant?.columns[1]?.id}
            articles={blockState.articles[currentVariant?.columns[1]?.id] || []}
            maxItems={currentVariant?.maxItems}
            isDarkTheme={isDarkTheme}
            label={currentVariant?.columns[1]?.title}
            blockConfig={blockConfig}
            handleRemoveArticle={handleRemoveArticle}
            variant="featured-secondary"
            useCompactView={true}
          />
        </div>
      </div>
    </div>
  ), [blockState.articles, currentVariant, isDarkTheme, blockConfig, handleRemoveArticle, dragStyles.draggingContainer]);

  const renderSidebarLayout = useMemo(() => (
    <div className={currentVariant.layout.container} style={dragStyles.draggingContainer}>
      <div className={currentVariant.layout.wrapper || ''}>
        <div className="w-full md:w-2/3">
          <DroppableColumn
            key={currentVariant.columns[0].id}
            columnId={currentVariant.columns[0].id}
            articles={blockState.articles[currentVariant.columns[0].id] || []}
            maxItems={currentVariant.maxItems}
            isDarkTheme={isDarkTheme}
            label={currentVariant.columns[0].title}
            blockConfig={blockConfig}
            handleRemoveArticle={handleRemoveArticle}
            variant="sidebar-main"
            useCompactView={true}
          />
        </div>
        <div className="w-full md:w-1/3">
          <DroppableColumn
            key={currentVariant.columns[1].id}
            columnId={currentVariant.columns[1].id}
            articles={blockState.articles[currentVariant.columns[1].id] || []}
            maxItems={currentVariant.maxItems}
            isDarkTheme={isDarkTheme}
            label={currentVariant.columns[1].title}
            blockConfig={blockConfig}
            handleRemoveArticle={handleRemoveArticle}
            variant="sidebar-side"
            useCompactView={true}
          />
        </div>
      </div>
    </div>
  ), [blockState.articles, currentVariant, isDarkTheme, blockConfig, handleRemoveArticle, dragStyles.draggingContainer]);

  const renderNewsFeedLayout = useMemo(() => (
    <div className={currentVariant.layout.container} style={dragStyles.draggingContainer}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-2">
          <DroppableColumn
            key={currentVariant.columns[0].id}
            columnId={currentVariant.columns[0].id}
            articles={blockState.articles[currentVariant.columns[0].id] || []}
            maxItems={currentVariant.maxItems}
            isDarkTheme={isDarkTheme}
            label={currentVariant.columns[0].title}
            blockConfig={blockConfig}
            handleRemoveArticle={handleRemoveArticle}
            variant="newsfeed-main"
            useCompactView={true}
          />
        </div>
        <div className="col-span-1">
          <DroppableColumn
            key={currentVariant.columns[1].id}
            columnId={currentVariant.columns[1].id}
            articles={blockState.articles[currentVariant.columns[1].id] || []}
            maxItems={currentVariant.maxItems}
            isDarkTheme={isDarkTheme}
            label={currentVariant.columns[1].title}
            blockConfig={blockConfig}
            handleRemoveArticle={handleRemoveArticle}
            variant="newsfeed-side"
            useCompactView={true}
          />
        </div>
      </div>
    </div>
  ), [blockState.articles, currentVariant, isDarkTheme, blockConfig, handleRemoveArticle, dragStyles.draggingContainer]);

  const renderStandardLayout = useMemo(() => (
    <div className={currentVariant.layout.wrapper || ''} style={dragStyles.draggingContainer}>
      {currentVariant.columns.map(column => (
        <DroppableColumn
          key={column.id}
          columnId={column.id}
          articles={blockState.articles[column.id] || []}
          maxItems={currentVariant.maxItems}
          isDarkTheme={isDarkTheme}
          label={column.title}
          blockConfig={blockConfig}
          handleRemoveArticle={handleRemoveArticle}
          variant="standard"
          useCompactView={true}
        />
      ))}
    </div>
  ), [blockState.articles, currentVariant, isDarkTheme, blockConfig, handleRemoveArticle, dragStyles.draggingContainer]);

  const renderColumns = useCallback(() => {
    switch (currentVariantType) {
      case 'masonry':
        return renderMasonryLayout;
      case 'featured':
        return renderFeaturedLayout;
      case 'sidebargrid':
        return renderSidebarLayout;
      case 'newsfeed':
        return renderNewsFeedLayout;
      case 'standard':
      default:
        return renderStandardLayout;
    }
  }, [currentVariantType, renderMasonryLayout, renderFeaturedLayout, renderSidebarLayout, renderNewsFeedLayout, renderStandardLayout]);

  const handlePageSelect = useCallback((pageId: string) => {
    updateBlockIdentifiers(pageId, undefined, undefined);
    onPageSelect?.(pageId);
  }, [onPageSelect, updateBlockIdentifiers]);

  const handleEditorialSelect = useCallback((editorialId: string, subEditorialId?: string) => {
    updateBlockIdentifiers(undefined, editorialId, subEditorialId);
    onEditorialSelect?.(editorialId, subEditorialId);
  }, [onEditorialSelect, updateBlockIdentifiers]);

  const handleClearSelection = useCallback(() => {
    // Não limpa o pageId pois ele é obrigatório na inicialização
    // Apenas limpa as seleções de editorias
    updateBlockIdentifiers(pageId, undefined, undefined);
  }, [pageId, updateBlockIdentifiers]);

  useEffect(() => {
    console.log("GridManager: Dados formatados:", {
      blockState,
      apiFormat: getApiFormat()
    });
  }, [blockState]);

  return (
    <div className="flex flex-col gap-4">
      {!isPreviewOnly && (
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">
              Gerenciador de Grid
            </h2>
            <div className="flex items-center gap-2">
              <label htmlFor="variant-select" className="text-sm text-gray-600 dark:text-gray-400">
                Variante:
              </label>
              <select
                id="variant-select"
                value={currentVariantType}
                onChange={(e) => updateVariant(e.target.value as GridVariantType)}
                className="text-sm rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 focus:border-blue-500 focus:ring-blue-500"
              >
                {Object.keys(GRID_VARIANTS).map(variant => (
                  <option key={variant} value={variant}>
                    {variant}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="primary" onClick={handleSave}>
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
          <LayoutPreview 
            variantType={currentVariantType}
            columns={blockState.articles}
            isDarkTheme={isDarkTheme}
            blockConfig={blockConfig}
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
              blockConfig={blockConfig}
              filters={filters}
              onFiltersChange={setFilters}
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
                  blockConfig={blockConfig}
                  usedArticleIds={getUsedArticleIds()}
                  isCompact={true}
                  isMultiSelectEnabled={isMultiSelectEnabled}
                  onSelectionChange={setSelectedArticleIds}
                />
              </div>
            </Sidebar>
            
            {/* Item 2: Colunas para os artigos - Coluna mais estreita */}
            <div className="w-1/4 min-w-[250px]" style={{ maxHeight: '70vh', overflow: 'auto' }}>
              <div className="flex flex-col gap-3" style={{ overflow: 'visible' }}>
                {renderColumns()}
              </div>
            </div>
            
            {/* Item 3: Preview - Coluna mais larga, ocupando o espaço restante */}
            <div className="flex-1 min-w-[300px]" style={{ maxHeight: '70vh', overflow: 'auto' }}>
              <LayoutPreview 
                variantType={currentVariantType}
                columns={blockState.articles}
                isDarkTheme={isDarkTheme}
                blockConfig={blockConfig}
              />
            </div>
          </div>
        </DragDropContext>
      )}
    </div>
  );
}

export default React.memo(GridManager, (prevProps, nextProps) => {
  return (
    prevProps.articles === nextProps.articles &&
    prevProps.variant === nextProps.variant &&
    prevProps.blockConfig === nextProps.blockConfig &&
    prevProps.isDarkTheme === nextProps.isDarkTheme
  );
}); 