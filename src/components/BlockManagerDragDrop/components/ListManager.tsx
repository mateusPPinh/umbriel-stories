import React, { useState } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { Article } from '../../PageblockV2/types';
import DraggableArticle from './DraggableArticle';
import DroppableColumn from './DroppableColumn';
import ListLayoutPreview from './ListLayoutPreview';

interface ListManagerProps {
  articles: Article[];
  isDarkTheme?: boolean;
  onSave: (columns: { [key: string]: Article[] }) => void;
}

const ListManager: React.FC<ListManagerProps> = ({ articles, isDarkTheme, onSave }) => {
  const [variantType, setVariantType] = useState<string>('chronological');
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
        <div className="grid grid-cols-[2fr,1fr] gap-6">
          {/* Pool de Artigos */}
          <Droppable droppableId="pool">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`
                  p-4 rounded-lg min-h-[200px]
                  ${isDarkTheme ? 'bg-gray-800' : 'bg-gray-100'}
                  ${snapshot.isDraggingOver ? 'ring-2 ring-blue-500/50' : ''}
                `}
              >
                <div className="text-sm font-medium mb-4 text-gray-600 dark:text-gray-400">
                  Pool de Artigos
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {columns.pool.map((article, index) => (
                    <DraggableArticle
                      key={article.id}
                      article={article}
                      index={index}
                      isDarkTheme={isDarkTheme}
                      isInColumn={false}
                      columnIsFull={false}
                    />
                  ))}
                </div>
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          {/* Coluna da Lista */}
          <DroppableColumn
            id="col-0"
            title="Lista"
            articles={columns['col-0']}
            maxItems={currentVariant.maxItems}
            isDarkTheme={isDarkTheme}
            width="full"
          />
        </div>
      </DragDropContext>
    </div>
  );
};

export default ListManager; 