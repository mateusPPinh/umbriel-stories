import React, { useState, useEffect, useCallback, useRef } from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { Article } from '../../PageblockV2/types';
import DroppableColumn from './DroppableColumn';
import MixedLayoutPreview from './MixedLayoutPreview';
import ArticlesPool from './ArticlesPool';
import { BlockConfig } from './StyleConfigModal';
import { useBlockState } from '../hooks/useBlockState';
import { VariantType } from '../types';
import Button from '../../../components/Button';

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
}

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
};

type LayoutVariant = keyof typeof LAYOUT_VARIANTS;

// Função auxiliar para verificar se uma coluna existe em um layout
const columnExistsInVariant = (columnId: string, variant: LayoutVariant): boolean => {
  return Object.keys(LAYOUT_VARIANTS[variant].maxItems).includes(columnId);
};

const MixedManager: React.FC<MixedManagerProps> = ({ 
  pageId,
  articles, 
  isDarkTheme, 
  onSave, 
  variant = 'sidebar',
  blockConfig,
  onConfigClick,
  isPreviewOnly = false,
  onDragStart,
  onDragEnd
}) => {
  // Add a ref to track drag state
  const isDraggingRef = useRef(false);
  
  const {
    blockState,
    updateArticlePositions,
    updateVariant,
    updateVariantPosition,
    updateBlockPosition,
    updateBlockConfig,
    getApiFormat,
    setDragging
  } = useBlockState({
    pageId,
    template: 'mixed',
    initialArticles: articles,
    initialVariant: variant as any,
    blockPosition: 1
  });

  const handleDragStartInternal = useCallback(() => {
    // Set dragging state to true when drag starts
    isDraggingRef.current = true;
    setDragging?.(true);
    
    // Call parent onDragStart if provided
    onDragStart?.();
  }, [onDragStart, setDragging]);

  const handleDragEndInternal = useCallback((result: DropResult) => {
    // Set dragging state to false when drag ends
    isDraggingRef.current = false;
    setDragging?.(false);
    
    // Call parent onDragEnd if provided
    onDragEnd?.();
    
    const { source, destination } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) return;

    const variantType = blockState.currentVariant.variantType as LayoutVariant;
    // Verificar se a variante existe no LAYOUT_VARIANTS
    if (!LAYOUT_VARIANTS[variantType]) {
      console.error(`Variante "${variantType}" não encontrada em LAYOUT_VARIANTS`);
      return;
    }
    
    const currentVariant = LAYOUT_VARIANTS[variantType];
    const destColumn = destination.droppableId as ColumnId;
    
    // Verificar se a coluna de destino existe na variante atual
    if (!Object.keys(currentVariant.maxItems).includes(destColumn)) {
      console.error(`Coluna "${destColumn}" não encontrada na variante "${variantType}"`);
      return;
    }
    
    if (
      source.droppableId !== destination.droppableId && 
      destColumn && 
      blockState.articles[destColumn] && 
      blockState.articles[destColumn].length >= (currentVariant.maxItems[destColumn as keyof typeof currentVariant.maxItems] || 0)
    ) {
      return;
    }

    // Create deep copies of arrays to avoid mutations
    const newArticles = { ...blockState.articles };
    
    // Create copies of arrays for source and destination columns
    const sourceCol = [...newArticles[source.droppableId]];
    const destCol = source.droppableId === destination.droppableId
      ? sourceCol
      : [...newArticles[destination.droppableId]];

    // Remove the article from source column
    const [removed] = sourceCol.splice(source.index, 1);
    
    // Add the article to destination column
    destCol.splice(destination.index, 0, removed);

    // Update state with new columns
    const newColumns = {
      ...newArticles,
      [source.droppableId]: sourceCol,
      [destination.droppableId]: destCol
    };

    // Update article positions after drag ends
    updateArticlePositions(newColumns);
  }, [blockState.articles, blockState.currentVariant.variantType, updateArticlePositions, onDragEnd, setDragging]);

  const handleRemoveArticle = useCallback((columnId: string, articleId: string | number) => {
    // Don't remove articles during drag operations
    if (isDraggingRef.current) {
      console.warn('Cannot remove article during drag operation');
      return;
    }
    
    // Find the article in the column
    const article = blockState.articles[columnId].find(a => String(a.id) === String(articleId));
    
    if (!article) return;
    
    // Create deep copies of arrays to avoid mutations
    const newArticles = { ...blockState.articles };
    
    // Remove the article from the column
    const updatedColumn = newArticles[columnId].filter(a => String(a.id) !== String(articleId));
    
    // Add the article back to the pool
    const updatedPool = [...newArticles.pool, article];
    
    const newColumns = {
      ...newArticles,
      [columnId]: updatedColumn,
      pool: updatedPool
    };
    
    // Update article positions
    updateArticlePositions(newColumns);
  }, [blockState.articles, updateArticlePositions]);

  const handleSave = () => {
    const data = getApiFormat();
    onSave(data);
  };

  const handleVariantChange = (newVariant: LayoutVariant) => {
    updateVariant(newVariant);
  };

  // Garantir que estamos usando uma variante válida
  const variantType = blockState.currentVariant.variantType as LayoutVariant;
  const validVariantType = LAYOUT_VARIANTS[variantType] ? variantType : 'sidebar';
  const currentVariant = LAYOUT_VARIANTS[validVariantType];
  const availableColumns = Object.keys(currentVariant.maxItems) as ColumnId[];

  // Usar useEffect para atualizar a variante se necessário
  useEffect(() => {
    if (validVariantType !== variantType) {
      console.warn(`Variante "${variantType}" não encontrada, usando "sidebar" como fallback`);
      updateVariant('sidebar' as VariantType);
    }
  }, [variantType, validVariantType, updateVariant]);

  // Função para determinar as propriedades específicas de cada coluna com base na variante
  const getColumnProps = (colId: string) => {
    switch (validVariantType) {
      case 'sidebar':
        return {
          isSidebarMain: colId === 'col-0', // Artigos principais com imagem grande
          isSidebarSide: colId === 'col-1', // Artigos secundários com imagem pequena
          showExcerpt: colId === 'col-0' && blockConfig.styles.showExcerpt
        };
      case 'showcase':
        return {
          isFeatured: colId === 'col-0', // Artigo principal em destaque (1)
          isNewsFeedSide: colId === 'col-1', // Artigos em lista com imagem (2)
          isCompact: colId === 'col-2', // Artigos em lista sem imagem, só título e subtítulo (3)
          showExcerpt: blockConfig.styles.showExcerpt
        };
      case 'newspaper':
        return {
          isNewsFeedMain: colId === 'col-0', // 2 artigos principais em lista vertical
          isCompact: colId === 'col-1' || colId === 'col-2', // 4 artigos em lista vertical, só título e descrição
          hasBorder: colId === 'col-1' || colId === 'col-2', // Borda à esquerda nas colunas 2 e 3
          showExcerpt: blockConfig.styles.showExcerpt
        };
      case 'magazine':
        return {
          isMagazineMain: colId === 'col-0', // Artigo principal
          isMagazineSecondary: colId === 'col-1', // Artigos secundários com imagem
          isMagazineTertiary: colId === 'col-2', // Artigos terciários com imagem
          showExcerpt: blockConfig.styles.showExcerpt
        };
      case 'videogrid':
        return {
          isFeatured: colId === 'col-0', // Vídeo principal
          isNewsGrid: colId === 'col-1', // Title and Subtitle without image
          isNewsGrid2: colId === 'col-2', // Title and Subtitle without image
          showExcerpt: blockConfig.styles.showExcerpt
        };
      default:
        return {};
    }
  };

  // Função para determinar o layout das colunas com base na variante
  const getColumnsLayout = () => {
    switch (validVariantType) {
      case 'sidebar':
        return 'grid grid-cols-1 md:grid-cols-0 gap-4';
      case 'showcase':
        return 'grid grid-cols-1 md:grid-cols-0 gap-4';
      case 'newspaper':
        return 'grid grid-cols-1 md:grid-cols-0 gap-4';
      case 'magazine':
        return 'grid grid-cols-1 md:grid-cols-0 gap-4';
      case 'videogrid':
        return 'grid grid-cols-1 md:grid-cols-0 gap-4';
      default:
        return 'space-y-4';
    }
  };

  // Função auxiliar para obter todos os IDs de artigos que já estão em uso nas colunas
  const getUsedArticleIds = useCallback(() => {
    const usedIds: (string | number)[] = [];
    
    // Percorre todas as colunas disponíveis e coleta os IDs dos artigos
    availableColumns.forEach(colId => {
      const columnArticles = blockState.articles[colId] || [];
      columnArticles.forEach(article => {
        usedIds.push(article.id);
      });
    });
    
    return usedIds;
  }, [blockState.articles, availableColumns]);

  return (
    <div className="flex flex-col h-full">
      {!isPreviewOnly && (
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <label htmlFor="variant-select" className="text-sm text-gray-600 dark:text-gray-400">
                Variante:
              </label>
              <select
                id="variant-select"
                value={blockState.currentVariant.variantType}
                onChange={(e) => handleVariantChange(e.target.value as LayoutVariant)}
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
          <MixedLayoutPreview
            variant={validVariantType}
            columns={blockState.articles}
            isDarkTheme={isDarkTheme}
            blockConfig={blockConfig}
          />
        </div>
      ) : (
        <div className="flex h-[70vh] gap-4">
          <DragDropContext onDragStart={handleDragStartInternal} onDragEnd={handleDragEndInternal}>
            <div className="w-[10%] min-w-[120px] max-h-[70vh] overflow-y-auto scrollable-container">
              <ArticlesPool
                articles={blockState.articles.pool}
                isDarkTheme={isDarkTheme}
                blockConfig={blockConfig}
                usedArticleIds={getUsedArticleIds()}
                isCompact={true}
              />
            </div>
            
            <div className="w-[20%] min-w-[150px] h-full overflow-y-auto scrollable-container">
              <div className={getColumnsLayout()}>
                {availableColumns.map(colId => (
                  <DroppableColumn
                    key={colId}
                    columnId={colId}
                    articles={blockState.articles[colId] || []}
                    isDarkTheme={isDarkTheme}
                    label={currentVariant.columnLabels[colId as keyof typeof currentVariant.columnLabels]}
                    maxItems={currentVariant.maxItems[colId as keyof typeof currentVariant.maxItems]}
                    blockConfig={blockConfig}
                    handleRemoveArticle={handleRemoveArticle}
                    variant={validVariantType}
                    useCompactView={true}
                  />
                ))}
              </div>
            </div>
          </DragDropContext>
          
          <div className="flex-1 max-h-[70vh] overflow-y-auto scrollable-container">
            <MixedLayoutPreview
              variant={validVariantType}
              columns={blockState.articles}
              isDarkTheme={isDarkTheme}
              blockConfig={blockConfig}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(MixedManager); 