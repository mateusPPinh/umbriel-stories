import React, { useState } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { Article } from '../../PageblockV2/types';
import DraggableArticle from './DraggableArticle';
import DroppableColumn from './DroppableColumn';
import MixedLayoutPreview from './MixedLayoutPreview';

interface MixedManagerProps {
  articles: Article[];
  isDarkTheme?: boolean;
  onSave: (columns: { [key: string]: Article[] }) => void;
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

const MixedManager: React.FC<MixedManagerProps> = ({ articles, isDarkTheme, onSave }) => {
  const [variantType, setVariantType] = useState<LayoutVariant>('sidebar');
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
    <div className="space-y-4">
      {/* Layout Selector */}
      <div className="flex items-center gap-2">
        <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
          Tipo de Layout:
        </div>
        <div className="flex gap-2">
          {Object.entries(LAYOUT_VARIANTS).map(([key, config]) => (
            <button
              key={key}
              onClick={() => setVariantType(key as LayoutVariant)}
              className={`
                px-3 py-1.5 text-xs font-medium rounded-full
                transition-colors duration-200
                ${
                  variantType === key
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
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

      {/* Drag and Drop Area */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-[2fr,1fr,1fr] gap-4">
          {/* Articles Pool */}
          <Droppable droppableId="pool">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`
                  p-4 rounded-lg min-h-[200px]
                  ${
                    snapshot.isDraggingOver
                      ? 'bg-blue-50 dark:bg-blue-900/20'
                      : 'bg-gray-50 dark:bg-gray-800/50'
                  }
                `}
              >
                <div className="text-sm font-medium mb-3 text-gray-600 dark:text-gray-400">
                  Pool de Artigos ({columns.pool.length})
                </div>
                <div className="space-y-2">
                  {columns.pool.map((article, index) => (
                    <DraggableArticle
                      key={article.id}
                      article={article}
                      index={index}
                    />
                  ))}
                </div>
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          {/* Layout Columns */}
          <div className="col-span-2 grid grid-cols-2 gap-4">
            {Object.entries(currentLayout.maxItems).map(([columnId, maxItems]) => (
              <DroppableColumn
                key={columnId}
                id={columnId}
                droppableId={columnId}
                title={currentLayout.columnLabels[columnId as keyof typeof currentLayout.columnLabels]}
                articles={columns[columnId] || []}
                maxItems={maxItems}
                isDarkTheme={isDarkTheme}
                width="w-full"
              />
            ))}
          </div>
        </div>
      </DragDropContext>
    </div>
  );
};

export default MixedManager; 