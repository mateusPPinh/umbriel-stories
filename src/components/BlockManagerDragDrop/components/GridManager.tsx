import React, { useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Article } from '../../PageblockV2/types';
import LayoutPreview from './LayoutPreview';
import ArticlesPool from './ArticlesPool';
import DroppableColumn from './DroppableColumn';

interface GridManagerProps {
  articles: Article[];
  isDarkTheme?: boolean;
  onSave: (columns: { [key: string]: Article[] }) => void;
}

const GridManager: React.FC<GridManagerProps> = ({ articles, isDarkTheme, onSave }) => {
  const [variantType, setVariantType] = useState<string>('standard');
  const [columns, setColumns] = useState<{ [key: string]: Article[] }>({
    'pool': articles,
    'col-0': [],
    'col-1': [],
    'col-2': []
  });

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    // Se não houver destino, não fazer nada
    if (!destination) return;

    // Se a origem e destino forem iguais e o índice for o mesmo, não fazer nada
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) return;

    // Copia os arrays de origem e destino
    const sourceCol = Array.from(columns[source.droppableId]);
    const destCol = source.droppableId === destination.droppableId
      ? sourceCol
      : Array.from(columns[destination.droppableId]);

    // Remove o item da origem
    const [removed] = sourceCol.splice(source.index, 1);

    // Adiciona o item no destino
    destCol.splice(destination.index, 0, removed);

    // Atualiza o estado
    const newColumns = {
      ...columns,
      [source.droppableId]: sourceCol,
      [destination.droppableId]: destCol
    };

    setColumns(newColumns);
    onSave(newColumns);
  };

  const variants = [
    { id: 'standard', label: 'Padrão', columns: [
      { id: 'col-0', title: 'Coluna 1', maxItems: 4, width: 'w-1/3' },
      { id: 'col-1', title: 'Coluna 2', maxItems: 4, width: 'w-1/3' },
      { id: 'col-2', title: 'Coluna 3', maxItems: 4, width: 'w-1/3' }
    ]},
    { id: 'featured', label: 'Destaque', columns: [
      { id: 'col-0', title: 'Destaque', maxItems: 1, width: 'w-2/3' },
      { id: 'col-1', title: 'Lateral', maxItems: 4, width: 'w-1/3' }
    ]},
    { id: 'masonry', label: 'Masonry', columns: [
      { id: 'col-0', title: 'Coluna 1', maxItems: 6, width: 'w-1/3' },
      { id: 'col-1', title: 'Coluna 2', maxItems: 6, width: 'w-1/3' },
      { id: 'col-2', title: 'Coluna 3', maxItems: 6, width: 'w-1/3' }
    ]},
    { id: 'sidebargrid', label: 'Sidebar', columns: [
      { id: 'col-0', title: 'Principal', maxItems: 4, width: 'w-2/3' },
      { id: 'col-1', title: 'Sidebar', maxItems: 3, width: 'w-1/3' }
    ]},
    { id: 'newsfeed', label: 'Feed', columns: [
      { id: 'col-0', title: 'Feed', maxItems: 10, width: 'w-full' }
    ]},
    { id: 'newsgrid', label: 'Grid', columns: [
      { id: 'col-0', title: 'Grid', maxItems: 12, width: 'w-full' }
    ]}
  ];

  const currentVariant = variants.find(v => v.id === variantType) || variants[0];

  return (
    <div className="flex flex-col gap-6">
      {/* Preview e Seletor de Variante */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Tipo de Grid:
          </div>
          <div className="flex gap-2">
            {variants.map(variant => (
              <button
                key={variant.id}
                onClick={() => setVariantType(variant.id)}
                className={`
                  px-3 py-1.5 text-sm font-medium rounded-md
                  transition-colors duration-200
                  ${variantType === variant.id
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400'
                    : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
                  }
                `}
              >
                {variant.label}
              </button>
            ))}
          </div>
        </div>

        <LayoutPreview
          variantType={variantType}
          isDarkTheme={isDarkTheme}
          columns={columns}
        />
      </div>

      {/* Área de Drag and Drop */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-[2fr,1fr] gap-6">
          {/* Pool de Artigos */}
          <ArticlesPool
            articles={columns.pool}
            isDarkTheme={isDarkTheme}
            droppableId="pool"
          />

          {/* Colunas do Grid */}
          <div className={`
            grid gap-4
            ${currentVariant.columns.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}
          `}>
            {currentVariant.columns.map(column => (
              <DroppableColumn
                key={column.id}
                id={column.id}
                droppableId={column.id}
                title={column.title}
                articles={columns[column.id] || []}
                maxItems={column.maxItems}
                isDarkTheme={isDarkTheme}
                width={column.width}
              />
            ))}
          </div>
        </div>
      </DragDropContext>
    </div>
  );
};

export default GridManager; 