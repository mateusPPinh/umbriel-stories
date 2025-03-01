import React, { useState } from 'react';
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

type ColumnId = 'col-0' | 'col-1' | 'col-2';

interface LayoutConfig {
  label: string;
  maxItems: Record<ColumnId, number>;
  columnLabels: Record<ColumnId, string>;
}

type LayoutVariants = {
  sidebar: {
    label: string;
    maxItems: {
      'col-0': 1;
      'col-1': 4;
    };
    columnLabels: {
      'col-0': string;
      'col-1': string;
    };
  };
  showcase: {
    label: string;
    maxItems: {
      'col-0': 1;
      'col-1': 3;
    };
    columnLabels: {
      'col-0': string;
      'col-1': string;
    };
  };
  newspaper: {
    label: string;
    maxItems: {
      'col-0': 2;
      'col-1': 4;
    };
    columnLabels: {
      'col-0': string;
      'col-1': string;
    };
  };
  magazine: {
    label: string;
    maxItems: {
      'col-0': 1;
      'col-1': 3;
      'col-2': 4;
    };
    columnLabels: {
      'col-0': string;
      'col-1': string;
      'col-2': string;
    };
  };
  videogrid: {
    label: string;
    maxItems: {
      'col-0': 1;
      'col-1': 3;
    };
    columnLabels: {
      'col-0': string;
      'col-1': string;
    };
  };
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
    },
    columnLabels: {
      'col-0': 'Artigo Principal',
      'col-1': 'Artigos Secundários',
    },
  },
  newspaper: {
    label: 'Newspaper',
    maxItems: {
      'col-0': 2,
      'col-1': 4,
    },
    columnLabels: {
      'col-0': 'Artigos Principais',
      'col-1': 'Artigos Secundários',
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
  const [variantType, setVariantType] = useState<LayoutVariant>(variant as LayoutVariant);
  const [columns, setColumns] = useState<{ [key: string]: Article[] }>({
    pool: articles,
    'col-0': [],
    'col-1': [],
    'col-2': [],
  });

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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <DragDropContext onDragEnd={handleDragEnd}>
            <div className="flex flex-col gap-6">
              <ArticlesPool
                droppableId="pool"
                articles={columns.pool}
                isDarkTheme={isDarkTheme}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.keys(currentVariant.maxItems || {}).map((colId) => {
                  const columnId = colId as ColumnId;
                  
                  // Verificar se a coluna existe no objeto currentVariant
                  if (!currentVariant || 
                      !(columnId in currentVariant.columnLabels) || 
                      !(columnId in currentVariant.maxItems)) {
                    return null;
                  }
                  
                  // Determinar a classe CSS com base no tipo de coluna
                  let columnClass = '';
                  if (columnId === 'col-2' && variantType === 'magazine') {
                    columnClass = 'md:col-span-2 lg:col-span-1';
                  }
                  
                  return (
                    <div key={columnId} className={columnClass}>
                      <DroppableColumn
                        id={columnId}
                        droppableId={columnId}
                        title={currentVariant.columnLabels[columnId as keyof typeof currentVariant.columnLabels]}
                        articles={columns[columnId] || []}
                        maxItems={currentVariant.maxItems[columnId as keyof typeof currentVariant.maxItems]}
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
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </DragDropContext>
        </div>
        <div className="lg:col-span-1">
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