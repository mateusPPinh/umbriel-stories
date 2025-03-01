import React, { useState, useEffect } from 'react';
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
  variant?: 'hero' | 'split' | 'triple';
}

const FeaturedManager: React.FC<FeaturedManagerProps> = ({ 
  articles, 
  isDarkTheme, 
  onSave,
  blockConfig,
  onConfigClick,
  variant = 'hero'
}) => {
  const [variantType, setVariantType] = useState<string>(variant);
  
  // Função auxiliar para criar o estado inicial das colunas
  const createInitialColumns = () => {
    return {
      pool: [...articles],
      'col-0': []
    };
  };
  
  const [columns, setColumns] = useState<{ [key: string]: Article[] }>(createInitialColumns);

  // Reseta as colunas quando a variante muda
  useEffect(() => {
    setVariantType(variant);
  }, [variant]);

  // Efeito para lidar com a mudança de variante
  useEffect(() => {
    const resetColumns = () => {
      // Coleta todos os artigos de todas as colunas
      const allArticles = [...(columns.pool || [])];
      if (columns['col-0']) {
        allArticles.push(...columns['col-0']);
      }
      
      // Cria um novo estado com todos os artigos na pool
      setColumns({
        pool: allArticles,
        'col-0': []
      });
    };

    resetColumns();
  }, [variantType]);

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    // Se não houver destino, não fazer nada
    if (!destination) return;

    // Se a origem e destino forem iguais e o índice for o mesmo, não fazer nada
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) return;

    // Verifica se a coluna de destino já atingiu o limite máximo
    if (destination.droppableId !== 'pool') {
      const currentVariant = variants.find(v => v.id === variantType) || variants[0];
      const currentItems = columns[destination.droppableId]?.length || 0;
      
      // Se estiver movendo dentro da mesma coluna, não conta o item sendo movido
      const effectiveCurrentItems = 
        source.droppableId === destination.droppableId
          ? currentItems - 1
          : currentItems;

      if (effectiveCurrentItems >= currentVariant.maxItems) {
        return;
      }
    }

    // Copia os arrays de origem e destino
    const sourceCol = Array.from(columns[source.droppableId] || []);
    const destCol = source.droppableId === destination.droppableId
      ? sourceCol
      : Array.from(columns[destination.droppableId] || []);

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
    { 
      id: 'hero', 
      label: 'Hero', 
      maxItems: 1
    },
    { 
      id: 'split', 
      label: 'Split', 
      maxItems: 2
    },
    { 
      id: 'triple', 
      label: 'Triple', 
      maxItems: 3
    }
  ];

  const currentVariant = variants.find(v => v.id === variantType) || variants[0];

  const slotsCount = {
    'hero': 1,
    'split': 2,
    'triple': 3
  }[variantType] || 1;

  // Função para remover um artigo de uma coluna e devolvê-lo para a pool
  const handleRemoveArticle = (columnId: string, articleId: string | number) => {
    // Encontra o artigo na coluna
    const article = columns[columnId]?.find(a => a.id === articleId);
    
    if (!article) return;
    
    // Remove o artigo da coluna
    const updatedColumn = columns[columnId]?.filter(a => a.id !== articleId) || [];
    
    // Adiciona o artigo de volta à pool
    const updatedPool = [...(columns.pool || []), article];
    
    // Atualiza o estado
    const newColumns = {
      ...columns,
      [columnId]: updatedColumn,
      pool: updatedPool
    };
    
    setColumns(newColumns);
    onSave(newColumns);
  };

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
                articles={columns.pool || []}
                isDarkTheme={isDarkTheme}
              />
              <div className="w-full">
                <DroppableColumn
                  id="col-0"
                  droppableId="col-0"
                  title={currentVariant.label}
                  articles={columns['col-0'] || []}
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
                  onRemoveArticle={handleRemoveArticle}
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