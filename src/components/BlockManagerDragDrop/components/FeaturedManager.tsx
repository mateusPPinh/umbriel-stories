import React, { useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Article } from '../../PageblockV2/types';
import DroppableColumn from './DroppableColumn';
import FeaturedLayoutPreview from './FeaturedLayoutPreview';
import ArticlesPool from './ArticlesPool';
import { BlockConfig } from './StyleConfigModal';

interface FeaturedManagerProps {
  articles: Article[];
  isDarkTheme?: boolean;
  onSave: (columns: { [key: string]: Article[] }) => void;
  blockConfig: BlockConfig;
  onConfigClick: () => void;
}

const FeaturedManager: React.FC<FeaturedManagerProps> = ({ 
  articles, 
  isDarkTheme, 
  onSave,
  blockConfig,
  onConfigClick
}) => {
  const [variantType, setVariantType] = useState<string>('hero');
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
    { id: 'hero', label: 'Hero', maxItems: 1 },
    { id: 'split', label: 'Split', maxItems: 2 },
    { id: 'triple', label: 'Triple', maxItems: 3 }
  ];

  const currentVariant = variants.find(v => v.id === variantType) || variants[0];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">
            Gerenciador de Destaque
          </h2>
          <div className="flex items-center gap-2">
            <label htmlFor="variant-select" className="text-sm text-gray-600 dark:text-gray-400">
              Variante:
            </label>
            <select
              id="variant-select"
              value={variantType}
              onChange={(e) => setVariantType(e.target.value)}
              className="text-sm rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 focus:border-blue-500 focus:ring-blue-500"
            >
              {variants.map(variant => (
                <option key={variant.id} value={variant.id}>
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

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2">
          <DragDropContext onDragEnd={handleDragEnd}>
            <div className="flex flex-col gap-4">
              <ArticlesPool
                droppableId="pool"
                articles={columns.pool}
                isDarkTheme={isDarkTheme}
              />
              <div className="w-full">
                <DroppableColumn
                  id="col-0"
                  droppableId="col-0"
                  title={currentVariant.label}
                  articles={columns['col-0']}
                  maxItems={currentVariant.maxItems}
                  isDarkTheme={isDarkTheme}
                  width="w-full"
                  showExcerpt={blockConfig.styles.showExcerpt}
                  isFeatured={true}
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
            </div>
          </DragDropContext>
        </div>
        <div className="lg:col-span-3">
          <FeaturedLayoutPreview
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

export default FeaturedManager; 