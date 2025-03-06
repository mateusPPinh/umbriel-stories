import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { Article } from '../../PageblockV2/types';
import DroppableColumn from './DroppableColumn';
import ListLayoutPreview from './ListLayoutPreview';
import ArticlesPool from './ArticlesPool';
import { BlockConfig } from './StyleConfigModal';
import { useBlockState } from '../hooks/useBlockState';
import { ListVariantType, ArticleFilters, ClientTheme } from '../types';
import { adaptBlockConfig } from '../utils/adapters';
import Button from '../../../components/Button';
import Sidebar from './Sidebar';
import { PageResponse } from '../interfaces/pages.types';
import { Editorial } from '../interfaces/editorial.types';
import DragDropTips from './DragDropTips';

// Definição dos tipos de variantes de layout
const LAYOUT_VARIANTS = {
  chronological: {
    label: 'Cronológico',
    maxItems: 10
  },
  compact: {
    label: 'Compacto',
    maxItems: 10
  },
  card: {
    label: 'Cartão',
    maxItems: 10
  }
};

type LayoutVariant = keyof typeof LAYOUT_VARIANTS;

interface ListBlockConfig {
  articles: Record<string, Article[]>;
  variant?: 'chronological' | 'compact' | 'card';
  layout: {
    columns: number;
    gap: string;
    styles: {
      grid: {
        autoRows: string;
        templateColumns: string;
      };
      width: string;
      columnStyles: Record<string, any>;
      backgroundColor: string;
      gridFlow?: string;
      minColumnWidth?: string;
    };
    padding: string;
    imageSize: string;
    responsive: {
      mobile: number;
      tablet: number;
      desktop: number;
    };
    aspectRatio: string;
  };
  mediaConfig: {
    type: string;
    customUrl: string;
    videoConfig?: {
      loop: boolean;
      muted: boolean;
      autoplay: boolean;
      controls: boolean;
    };
    useArticleMedia: boolean;
  };
  styles: {
    theme: {
      light: {
        columnStyle: {
          background: string;
        };
        headingProps: {
          fontSize: string;
          fontWeight?: number;
          color: string;
        };
        subtitleProps: {
          fontSize: string;
          color: string;
        };
      };
      dark: {
        columnStyle: {
          background: string;
        };
        headingProps: {
          fontSize: string;
          fontWeight?: number;
          color: string;
        };
        subtitleProps: {
          fontSize: string;
          color: string;
        };
      };
    };
    showExcerpt: boolean;
    showMetadata: boolean;
    titleSize: string;
    columnStyle: Record<string, any>;
    imageHeight: string;
    timelineStyle?: 'solid' | 'dashed' | 'dotted';
    markerStyle?: 'circle' | 'square' | 'diamond';
    hoverEffect?: 'highlight' | 'scale' | 'background' | 'translate' | 'none';
    dividerStyle?: 'solid' | 'dashed' | 'dotted';
    thumbnailShape?: 'square' | 'rounded' | 'circle';
  };
}

interface ListManagerProps {
  pageId: string;
  articles: Article[];
  isDarkTheme?: boolean;
  onSave: (data: any) => void;
  variant?: ListVariantType;
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

const ListManager = ({ 
  pageId,
  articles, 
  isDarkTheme, 
  onSave, 
  variant = 'chronological',
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
}: ListManagerProps) => {
  const {
    blockState,
    updateArticlePositions,
    updateVariant,
    updateBlockConfig,
    updateBlockIdentifiers,
    getApiFormat
  } = useBlockState({
    pageId,
    template: 'list',
    initialVariant: variant as ListVariantType,
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

  const [blockConfig, setBlockConfig] = useState<ListBlockConfig>({
    articles: { 'col-0': blockState.articles['col-0'] || [] },
    variant: blockState.currentVariant.variantType as 'chronological' | 'compact' | 'card',
    layout: {
      columns: 1,
      gap: '1rem',
      styles: {
        grid: {
          autoRows: 'auto',
          templateColumns: '1fr'
        },
        width: '100%',
        columnStyles: {},
        backgroundColor: 'transparent'
      },
      padding: '1rem',
      imageSize: '100%',
      responsive: {
        mobile: 1,
        tablet: 1,
        desktop: 1
      },
      aspectRatio: '16/9'
    },
    mediaConfig: {
      type: 'image',
      customUrl: '',
      videoConfig: {
        loop: false,
        muted: true,
        autoplay: false,
        controls: true
      },
      useArticleMedia: true
    },
    styles: {
      theme: {
        light: {
          columnStyle: {
            background: '#ffffff'
          },
          headingProps: {
            fontSize: '1.125rem',
            fontWeight: 500,
            color: '#111827'
          },
          subtitleProps: {
            fontSize: '0.875rem',
            color: '#6B7280'
          }
        },
        dark: {
          columnStyle: {
            background: '#1F2937'
          },
          headingProps: {
            fontSize: '1.125rem',
            fontWeight: 500,
            color: '#F9FAFB'
          },
          subtitleProps: {
            fontSize: '0.875rem',
            color: '#9CA3AF'
          }
        }
      },
      showExcerpt: true,
      showMetadata: true,
      titleSize: 'text-lg',
      columnStyle: {},
      imageHeight: 'h-48',
      timelineStyle: 'solid',
      markerStyle: 'circle',
      hoverEffect: 'highlight',
      dividerStyle: 'solid',
      thumbnailShape: 'rounded'
    }
  });

  // Atualiza o blockConfig quando a variante muda
  useEffect(() => {
    setBlockConfig(prev => ({
      ...prev,
      variant: blockState.currentVariant.variantType as 'chronological' | 'compact' | 'card',
      articles: { 'col-0': blockState.articles['col-0'] || [] }
    }));
  }, [blockState.currentVariant.variantType, blockState.articles]);

  // Garantir que estamos usando uma variante válida
  const variantType = blockState.currentVariant.variantType as LayoutVariant;
  const validVariantType = LAYOUT_VARIANTS[variantType] ? variantType : 'chronological';
  
  // Usar useEffect para atualizar a variante se necessário
  useEffect(() => {
    if (validVariantType !== variantType) {
      console.warn(`Variante "${variantType}" não encontrada, usando "chronological" como fallback`);
      updateVariant('chronological' as ListVariantType);
    }
  }, [variantType, validVariantType, updateVariant]);

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

    // Se não houver destino, não fazer nada
    if (!destination) return;

    // Se a origem e destino forem iguais e o índice for o mesmo, não fazer nada
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

    // Verificar se a coluna de destino já atingiu o limite máximo de artigos
    if (
      source.droppableId !== destination.droppableId && 
      destination.droppableId === 'col-0' && 
      blockState.articles['col-0'] && 
      blockState.articles['col-0'].length + selectedArticles.length > LAYOUT_VARIANTS[validVariantType].maxItems
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
  }, [blockState.articles, selectedPoolArticleIds, validVariantType, LAYOUT_VARIANTS, updateArticlePositions]);

  // Função para remover múltiplos artigos de uma coluna e devolvê-los para a pool
  const handleRemoveArticles = (columnId: string, articleIds: (string | number)[]) => {
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
  };

  // Função para remover um único artigo (mantida para compatibilidade)
  const handleRemoveArticle = (columnId: string, articleId: string | number) => {
    handleRemoveArticles(columnId, [articleId]);
  };

  // Mover a função getUsedArticleIds para dentro do componente e usar useCallback
  const getUsedArticleIds = useCallback(() => {
    const usedIds: (string | number)[] = [];
    
    // Percorre todas as colunas disponíveis e coleta os IDs dos artigos
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
                Gerenciador de Lista
              </h2>
              <div className="flex items-center gap-2">
                <label htmlFor="variant-select" className="text-sm text-gray-600 dark:text-gray-400">
                  Variante:
                </label>
                <select
                  id="variant-select"
                  value={blockState.currentVariant.variantType}
                  onChange={(e) => updateVariant(e.target.value as ListVariantType)}
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
            <ListLayoutPreview
              variant={validVariantType}
              articles={blockState.articles['col-0'] || []}
              isDarkTheme={isDarkTheme}
              blockConfig={adaptBlockConfig(externalBlockConfig) as any}
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

              {/* Item 2: Coluna de artigos da lista */}
              <div className="flex-1 flex flex-row gap-4">
                <div className="flex-1 max-h-[70vh] overflow-y-auto">
                  <DroppableColumn
                    columnId="col-0"
                    articles={blockState.articles['col-0'] || []}
                    isDarkTheme={isDarkTheme}
                    label="Artigos da Lista"
                    maxItems={LAYOUT_VARIANTS[validVariantType].maxItems}
                    blockConfig={adaptBlockConfig(externalBlockConfig) as any}
                    handleRemoveArticle={handleRemoveArticle}
                    handleRemoveArticles={handleRemoveArticles}
                    variant={validVariantType}
                    useCompactView={true}
                  />
                </div>
                
                {/* Item 3: Preview */}
                <div className="flex-1 max-h-[70vh] overflow-y-auto">
                  <ListLayoutPreview
                    variant={validVariantType}
                    articles={blockState.articles['col-0'] || []}
                    isDarkTheme={isDarkTheme}
                    blockConfig={adaptBlockConfig(externalBlockConfig) as any}
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

export default React.memo(ListManager); 