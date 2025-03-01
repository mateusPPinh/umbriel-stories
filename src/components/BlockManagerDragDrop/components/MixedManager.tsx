import React, { useState, useEffect } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Article } from '../../PageblockV2/types';
import DroppableColumn from './DroppableColumn';
import MixedLayoutPreview from './MixedLayoutPreview';
import ArticlesPool from './ArticlesPool';
import { BlockConfig } from './StyleConfigModal';

interface MixedManagerProps {
  articles: Article[];
  isDarkTheme?: boolean;
  onSave: (columns: { [key: string]: Article[] }) => void;
  variant?: keyof typeof LAYOUT_VARIANTS;
  blockConfig: BlockConfig;
  onConfigClick: () => void;
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
  videogrid: VariantConfig<['col-0', 'col-1']>;
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
      'col-1': 3,
    },
    columnLabels: {
      'col-0': 'Vídeo Principal',
      'col-1': 'Vídeos Secundários',
    },
  },
};

type LayoutVariant = keyof typeof LAYOUT_VARIANTS;

const MixedManager: React.FC<MixedManagerProps> = ({ 
  articles, 
  isDarkTheme, 
  onSave, 
  variant = 'sidebar',
  blockConfig,
  onConfigClick
}) => {
  const [variantType, setVariantType] = useState<LayoutVariant>(
    LAYOUT_VARIANTS[variant as LayoutVariant] ? (variant as LayoutVariant) : 'sidebar'
  );
  
  // Função auxiliar para criar o estado inicial das colunas
  const createInitialColumns = (variant: LayoutVariant) => {
    // Garante que a variante existe, senão usa 'sidebar' como fallback
    const safeVariant = LAYOUT_VARIANTS[variant] ? variant : 'sidebar';
    const availableColumns = Object.keys(LAYOUT_VARIANTS[safeVariant].maxItems) as ColumnId[];
    const initialColumns: { [key: string]: Article[] } = {
      pool: articles
    };
    
    availableColumns.forEach(colId => {
      initialColumns[colId] = [];
    });
    
    return initialColumns;
  };
  
  const [columns, setColumns] = useState<{ [key: string]: Article[] }>(() => 
    createInitialColumns(variant as LayoutVariant)
  );

  // Limpa as colunas quando a variante muda
  useEffect(() => {
    // Garante que a variante existe, senão usa 'sidebar' como fallback
    if (!LAYOUT_VARIANTS[variantType]) {
      setVariantType('sidebar');
      return;
    }
    
    // Retorna todos os artigos das colunas para a pool
    const allArticles = [...columns.pool];
    Object.entries(columns).forEach(([key, articles]) => {
      if (key !== 'pool') {
        allArticles.push(...articles);
      }
    });
    
    // Cria um novo estado com as colunas da nova variante
    const newColumns = createInitialColumns(variantType);
    newColumns.pool = allArticles;
    
    setColumns(newColumns);
    onSave(newColumns);
  }, [variantType]);

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    // Dropped outside a droppable area
    if (!destination) return;

    // Same position
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // Get layout configuration
    const layoutConfig = LAYOUT_VARIANTS[variantType];
    
    // Ensure layoutConfig exists
    if (!layoutConfig) return;

    // Check if destination column has reached its limit
    if (
      destination.droppableId !== 'pool' &&
      destination.droppableId in layoutConfig.maxItems
    ) {
      const maxItems = layoutConfig.maxItems[destination.droppableId as keyof typeof layoutConfig.maxItems];
      const currentItems = columns[destination.droppableId]?.length || 0;

      // If moving within the same column, we need to account for the item being moved
      const effectiveCurrentItems =
        source.droppableId === destination.droppableId
          ? currentItems - 1
          : currentItems;

      if (effectiveCurrentItems >= maxItems) {
        return;
      }
    }

    // Create copy of columns
    const newColumns = { ...columns };

    // Remove from source
    const [removed] = newColumns[source.droppableId].splice(source.index, 1);

    // Add to destination
    newColumns[destination.droppableId].splice(destination.index, 0, removed);

    setColumns(newColumns);
    onSave(newColumns);
  };

  // Função para remover um artigo de uma coluna e devolvê-lo para a pool
  const handleRemoveArticle = (columnId: string, articleId: string | number) => {
    // Encontra o artigo na coluna
    const article = columns[columnId].find(a => a.id === articleId);
    
    if (!article) return;
    
    // Remove o artigo da coluna
    const updatedColumn = columns[columnId].filter(a => a.id !== articleId);
    
    // Adiciona o artigo de volta à pool
    const updatedPool = [...columns.pool, article];
    
    // Atualiza o estado
    const newColumns = {
      ...columns,
      [columnId]: updatedColumn,
      pool: updatedPool
    };
    
    setColumns(newColumns);
    onSave(newColumns);
  };

  const currentVariant = LAYOUT_VARIANTS[variantType];
  
  // Ensure we have a valid variant, fallback to sidebar if not
  if (!currentVariant) {
    // Reset to a valid variant type
    setVariantType('sidebar');
    return null;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">
            Gerenciador de Layout Misto
          </h2>
          <div className="flex items-center gap-2">
            <label htmlFor="variant-select" className="text-sm text-gray-600 dark:text-gray-400">
              Variante:
            </label>
            <select
              id="variant-select"
              value={variantType}
              onChange={(e) => setVariantType(e.target.value as LayoutVariant)}
              className="text-sm rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 focus:border-blue-500 focus:ring-blue-500"
            >
              {Object.entries(LAYOUT_VARIANTS).map(([key, variant]) => (
                <option key={key} value={key}>
                  {variant.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
          onClick={onConfigClick}
          className="px-3 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Configurar Estilos
        </button>
      </div>

      <div className={`grid grid-cols-1 ${Object.keys(currentVariant.maxItems).length > 2 ? 'lg:grid-cols-2' : 'lg:grid-cols-5'} gap-6`}>
        <div className={Object.keys(currentVariant.maxItems).length > 2 ? 'lg:col-span-1' : 'lg:col-span-2'}>
          <DragDropContext onDragEnd={handleDragEnd}>
            <div className="flex flex-col gap-4">
              <ArticlesPool
                droppableId="pool"
                articles={columns.pool}
                isDarkTheme={isDarkTheme}
              />
              <div className={`grid ${Object.keys(currentVariant.maxItems).length > 2 ? 'grid-cols-3' : 'grid-cols-1'} gap-4`}>
                {(Object.keys(currentVariant.maxItems) as BaseColumnId[]).map((colId) => {
                  const columnId = colId as keyof typeof currentVariant.maxItems;
                  return (
                    <div key={columnId}>
                      <DroppableColumn
                        id={columnId}
                        droppableId={columnId}
                        title={currentVariant.columnLabels[columnId]}
                        articles={columns[columnId] || []}
                        maxItems={currentVariant.maxItems[columnId]}
                        isDarkTheme={isDarkTheme}
                        width="w-full"
                        showExcerpt={blockConfig.styles.showExcerpt}
                        headingProps={{
                          fontSize: blockConfig.styles.theme[isDarkTheme ? 'dark' : 'light'].headingProps.fontSize,
                          fontWeight: blockConfig.styles.theme[isDarkTheme ? 'dark' : 'light'].headingProps.fontWeight,
                          color: blockConfig.styles.theme[isDarkTheme ? 'dark' : 'light'].headingProps.color
                        }}
                        subtitleProps={{
                          fontSize: blockConfig.styles.theme[isDarkTheme ? 'dark' : 'light'].subtitleProps.fontSize,
                          color: blockConfig.styles.theme[isDarkTheme ? 'dark' : 'light'].subtitleProps.color
                        }}
                        onRemoveArticle={handleRemoveArticle}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </DragDropContext>
        </div>
        <div className={Object.keys(currentVariant.maxItems).length > 2 ? 'lg:col-span-1' : 'lg:col-span-3'}>
          <MixedLayoutPreview
            variantType={variantType}
            isDarkTheme={isDarkTheme}
            columns={columns}
            blockConfig={blockConfig}
          />
        </div>
      </div>
    </div>
  );
};

export default MixedManager; 