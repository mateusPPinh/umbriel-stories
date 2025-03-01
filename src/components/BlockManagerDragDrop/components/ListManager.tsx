import React, { useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Article } from '../../PageblockV2/types';
import DroppableColumn from './DroppableColumn';
import ListLayoutPreview from './ListLayoutPreview';
import ArticlesPool from './ArticlesPool';

interface ListManagerProps {
  articles: Article[];
  isDarkTheme?: boolean;
  onSave: (columns: { [key: string]: Article[] }) => void;
  variant?: string;
}

const ListManager: React.FC<ListManagerProps> = ({ articles, isDarkTheme, onSave, variant = 'chronological' }) => {
  const [variantType, setVariantType] = useState<string>(variant);
  const [columns, setColumns] = useState<{ [key: string]: Article[] }>({
    'pool': articles,
    'col-0': []
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
    { id: 'chronological', label: 'Timeline', maxItems: 10 },
    { id: 'compact', label: 'Lista Compacta', maxItems: 15 },
    { id: 'card', label: 'Cards', maxItems: 8 }
  ];

  const currentVariant = variants.find(v => v.id === variantType) || variants[0];

  return (
    <div className="flex flex-col gap-6">
      {/* Preview e Seletor de Variante */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Tipo de Lista:
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

        <ListLayoutPreview
          variantType={variantType}
          isDarkTheme={isDarkTheme}
          columns={columns}
        />
      </div>

      {/* Área de Drag and Drop */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Pool de Artigos */}
          <div className="w-full md:w-1/3 md:order-2">
            <ArticlesPool
              articles={columns.pool}
              isDarkTheme={isDarkTheme}
              droppableId="pool"
            />
          </div>

          {/* Coluna da Lista */}
          <div className="w-full md:w-2/3 md:order-1">
            <DroppableColumn
              id="col-0"
              droppableId="col-0"
              title="Lista"
              articles={columns['col-0']}
              maxItems={currentVariant.maxItems}
              isDarkTheme={isDarkTheme}
              width="w-full"
              headingProps={{
                fontSize: '1.125rem',
                fontWeight: '500'
              }}
            />
          </div>
        </div>
      </DragDropContext>
    </div>
  );
};

export default ListManager; 