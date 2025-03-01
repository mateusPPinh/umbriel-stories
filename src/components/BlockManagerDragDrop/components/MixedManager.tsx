import React, { useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Article } from '../../PageblockV2/types';
import DroppableColumn from './DroppableColumn';
import MixedLayoutPreview from './MixedLayoutPreview';
import ArticlesPool from './ArticlesPool';

interface MixedManagerProps {
  articles: Article[];
  isDarkTheme?: boolean;
  onSave: (columns: { [key: string]: Article[] }) => void;
  variant?: keyof typeof LAYOUT_VARIANTS;
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

const MixedManager: React.FC<MixedManagerProps> = ({ articles, isDarkTheme, onSave, variant = 'sidebar' }) => {
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

  const currentLayout = LAYOUT_VARIANTS[variantType];

  return (
    <div className="space-y-6">
      {/* Layout Selector */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Tipo de Layout:
          </div>
          <div className="flex flex-wrap gap-2">
            {Object.entries(LAYOUT_VARIANTS).map(([key, config]) => (
              <button
                key={key}
                onClick={() => setVariantType(key as LayoutVariant)}
                className={`
                  px-3 py-1.5 text-sm font-medium rounded-md
                  transition-colors duration-200
                  ${
                    variantType === key
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400'
                      : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
                  }
                `}
              >
                {config.label}
              </button>
            ))}
          </div>
        </div>

        {/* Layout Preview */}
        <MixedLayoutPreview
          variantType={variantType}
          isDarkTheme={isDarkTheme}
          columns={columns}
        />
      </div>

      {/* Drag and Drop Area */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Articles Pool */}
          <div className="w-full md:w-1/3 md:order-2">
            <ArticlesPool
              articles={columns.pool}
              isDarkTheme={isDarkTheme}
              droppableId="pool"
            />
          </div>

          {/* Layout Columns */}
          <div className="w-full md:w-2/3 md:order-1">
            <div className={`
              ${variantType === 'magazine' 
                ? 'grid grid-cols-1 gap-4' 
                : 'grid grid-cols-1 md:grid-cols-2 gap-4'
              }
            `}>
              {Object.entries(currentLayout.maxItems).map(([columnId, maxItems]) => {
                // Para o layout magazine, ajustamos o layout para ter uma coluna principal e duas secundárias
                if (variantType === 'magazine') {
                  if (columnId === 'col-0') {
                    return (
                      <DroppableColumn
                        key={columnId}
                        id={columnId}
                        droppableId={columnId}
                        title={currentLayout.columnLabels[columnId as keyof typeof currentLayout.columnLabels]}
                        articles={columns[columnId] || []}
                        maxItems={maxItems}
                        isDarkTheme={isDarkTheme}
                        width="w-full"
                        headingProps={{
                          fontSize: '1.125rem',
                          fontWeight: '500'
                        }}
                        showExcerpt={true}
                      />
                    );
                  } else if (columnId === 'col-1' || columnId === 'col-2') {
                    // Renderizamos as colunas secundárias lado a lado
                    return columnId === 'col-1' ? (
                      <div key={columnId} className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <DroppableColumn
                          id={columnId}
                          droppableId={columnId}
                          title={currentLayout.columnLabels[columnId as keyof typeof currentLayout.columnLabels]}
                          articles={columns[columnId] || []}
                          maxItems={maxItems}
                          isDarkTheme={isDarkTheme}
                          width="w-full"
                          headingProps={{
                            fontSize: '1rem',
                            fontWeight: '500'
                          }}
                          showExcerpt={false}
                        />
                        <DroppableColumn
                          id="col-2"
                          droppableId="col-2"
                          title={currentLayout.columnLabels['col-2' as keyof typeof currentLayout.columnLabels]}
                          articles={columns['col-2'] || []}
                          maxItems={currentLayout.maxItems['col-2' as keyof typeof currentLayout.maxItems]}
                          isDarkTheme={isDarkTheme}
                          width="w-full"
                          headingProps={{
                            fontSize: '1rem',
                            fontWeight: '500'
                          }}
                          showExcerpt={false}
                        />
                      </div>
                    ) : null;
                  }
                }

                // Para outros layouts, renderizamos normalmente
                return (
                  <DroppableColumn
                    key={columnId}
                    id={columnId}
                    droppableId={columnId}
                    title={currentLayout.columnLabels[columnId as keyof typeof currentLayout.columnLabels]}
                    articles={columns[columnId] || []}
                    maxItems={maxItems}
                    isDarkTheme={isDarkTheme}
                    width="w-full"
                    headingProps={{
                      fontSize: columnId === 'col-0' ? '1.125rem' : '1rem',
                      fontWeight: '500'
                    }}
                    showExcerpt={columnId === 'col-0'}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </DragDropContext>
    </div>
  );
};

export default MixedManager; 