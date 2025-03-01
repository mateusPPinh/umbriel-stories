import React, { useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Article } from '../../PageblockV2/types';
import LayoutPreview from './LayoutPreview';
import ArticlesPool from './ArticlesPool';
import DroppableColumn from './DroppableColumn';
import { MasonryColumn } from './MasonryColumn';
import { BlockConfig } from './StyleConfigModal';

interface GridManagerProps {
  articles: Article[];
  isDarkTheme?: boolean;
  onSave: (columns: { [key: string]: Article[] }) => void;
  variant?: string;
  blockConfig: BlockConfig;
  onConfigClick: () => void;
}

const GridManager: React.FC<GridManagerProps> = ({ 
  articles, 
  isDarkTheme, 
  onSave, 
  variant = 'standard',
  blockConfig,
  onConfigClick
}) => {
  const [variantType, setVariantType] = useState<string>(variant);
  const [columns, setColumns] = useState<{ [key: string]: Article[] }>({
    'pool': articles,
    'col-0': [],
    'col-1': [],
    'col-2': [],
    'col-3': []
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

  // Definição das variantes de grid com suas configurações específicas
  const variants = [
    { 
      id: 'standard', 
      label: 'Padrão', 
      columns: [
        { id: 'col-0', title: 'Coluna 1', maxItems: 4, width: 'w-full' },
        { id: 'col-1', title: 'Coluna 2', maxItems: 4, width: 'w-full' },
        { id: 'col-2', title: 'Coluna 3', maxItems: 4, width: 'w-full' }
      ],
      layout: {
        container: 'w-full',
        grid: 'grid grid-cols-1 md:grid-cols-3 gap-6'
      }
    },
    { 
      id: 'featured', 
      label: 'Destaque', 
      columns: [
        { id: 'col-0', title: 'Destaque', maxItems: 1, width: 'w-full' },
        { id: 'col-1', title: 'Lateral', maxItems: 4, width: 'w-full' }
      ],
      layout: {
        container: 'w-full',
        grid: 'grid grid-cols-3 gap-6'
      }
    },
    { 
      id: 'masonry', 
      label: 'Masonry', 
      columns: [
        { id: 'col-0', title: 'Coluna 1', maxItems: 6, width: 'w-full' },
        { id: 'col-1', title: 'Coluna 2', maxItems: 6, width: 'w-full' },
        { id: 'col-2', title: 'Coluna 3', maxItems: 6, width: 'w-full' }
      ],
      layout: {
        container: 'w-full',
        grid: 'grid grid-cols-1 md:grid-cols-3 gap-6'
      }
    },
    { 
      id: 'sidebargrid', 
      label: 'Sidebar', 
      columns: [
        { id: 'col-0', title: 'Principal', maxItems: 4, width: 'w-full' },
        { id: 'col-1', title: 'Sidebar', maxItems: 3, width: 'w-full' }
      ],
      layout: {
        container: 'w-full',
        wrapper: 'flex flex-col md:flex-row gap-6'
      }
    },
    { 
      id: 'newsfeed', 
      label: 'Feed', 
      columns: [
        { id: 'col-0', title: 'Feed Principal', maxItems: 5, width: 'w-full' },
        { id: 'col-1', title: 'Feed Lateral', maxItems: 5, width: 'w-full' }
      ],
      layout: {
        container: 'w-full',
        grid: 'grid grid-cols-3 gap-6'
      }
    },
    { 
      id: 'newsgrid', 
      label: 'Grid', 
      columns: [
        { id: 'col-0', title: 'Grid', maxItems: 12, width: 'w-full' }
      ],
      layout: {
        container: 'w-full',
        grid: 'grid grid-cols-1 md:grid-cols-5 gap-6'
      }
    }
  ];

  const currentVariant = variants.find(v => v.id === variantType) || variants[0];

  // Renderiza as colunas com base no tipo de variante
  const renderColumns = () => {
    // Layout para Masonry
    if (variantType === 'masonry') {
      return (
        <div className={currentVariant.layout.container}>
          <div className={currentVariant.layout.grid}>
            {currentVariant.columns.map(column => (
              <MasonryColumn
                key={column.id}
                id={column.id}
                droppableId={column.id}
                articles={columns[column.id] || []}
                maxItems={column.maxItems}
                isDarkTheme={isDarkTheme}
                headingProps={{ 
                  text: column.title,
                  fontSize: blockConfig.styles.theme[isDarkTheme ? 'dark' : 'light'].headingProps.fontSize,
                  fontWeight: blockConfig.styles.theme[isDarkTheme ? 'dark' : 'light'].headingProps.fontWeight,
                  color: blockConfig.styles.theme[isDarkTheme ? 'dark' : 'light'].headingProps.color
                }}
                subtitleProps={{
                  fontSize: blockConfig.styles.theme[isDarkTheme ? 'dark' : 'light'].subtitleProps.fontSize,
                  color: blockConfig.styles.theme[isDarkTheme ? 'dark' : 'light'].subtitleProps.color
                }}
                showExcerpt={blockConfig.styles.showExcerpt}
              />
            ))}
          </div>
        </div>
      );
    }

    // Layout para Featured
    if (variantType === 'featured') {
      return (
        <div className={currentVariant.layout.container}>
          <div className={currentVariant.layout.grid}>
            <div className="col-span-2">
              <DroppableColumn
                key={currentVariant.columns[0].id}
                id={currentVariant.columns[0].id}
                droppableId={currentVariant.columns[0].id}
                title={currentVariant.columns[0].title}
                articles={columns[currentVariant.columns[0].id] || []}
                maxItems={currentVariant.columns[0].maxItems}
                isDarkTheme={isDarkTheme}
                width="w-full"
                showExcerpt={true}
                isFeatured={true}
                headingProps={{
                  fontSize: '1.125rem',
                  fontWeight: '500'
                }}
                subtitleProps={{
                  fontSize: '0.875rem',
                  color: isDarkTheme ? '#9CA3AF' : '#6B7280'
                }}
              />
            </div>
            <div className="col-span-1">
              <DroppableColumn
                key={currentVariant.columns[1].id}
                id={currentVariant.columns[1].id}
                droppableId={currentVariant.columns[1].id}
                title={currentVariant.columns[1].title}
                articles={columns[currentVariant.columns[1].id] || []}
                maxItems={currentVariant.columns[1].maxItems}
                isDarkTheme={isDarkTheme}
                width="w-full"
                showExcerpt={false}
                headingProps={{
                  fontSize: '1rem',
                  fontWeight: '500'
                }}
                subtitleProps={{
                  fontSize: '0.75rem',
                  color: isDarkTheme ? '#9CA3AF' : '#6B7280'
                }}
              />
            </div>
          </div>
        </div>
      );
    }

    // Layout para Sidebar
    if (variantType === 'sidebargrid') {
      return (
        <div className={currentVariant.layout.container}>
          <div className={currentVariant.layout.wrapper}>
            <div className="w-full md:w-2/3">
              <DroppableColumn
                key={currentVariant.columns[0].id}
                id={currentVariant.columns[0].id}
                droppableId={currentVariant.columns[0].id}
                title={currentVariant.columns[0].title}
                articles={columns[currentVariant.columns[0].id] || []}
                maxItems={currentVariant.columns[0].maxItems}
                isDarkTheme={isDarkTheme}
                width="w-full"
                showExcerpt={true}
                isSidebarMain={true}
                headingProps={{
                  fontSize: '1.125rem',
                  fontWeight: '500'
                }}
                subtitleProps={{
                  fontSize: '0.875rem',
                  color: isDarkTheme ? '#9CA3AF' : '#6B7280'
                }}
              />
            </div>
            <div className="w-full md:w-1/3">
              <DroppableColumn
                key={currentVariant.columns[1].id}
                id={currentVariant.columns[1].id}
                droppableId={currentVariant.columns[1].id}
                title={currentVariant.columns[1].title}
                articles={columns[currentVariant.columns[1].id] || []}
                maxItems={currentVariant.columns[1].maxItems}
                isDarkTheme={isDarkTheme}
                width="w-full"
                showExcerpt={false}
                isSidebarSide={true}
                headingProps={{
                  fontSize: '1rem',
                  fontWeight: '500'
                }}
                subtitleProps={{
                  fontSize: '0.75rem',
                  color: isDarkTheme ? '#9CA3AF' : '#6B7280'
                }}
              />
            </div>
          </div>
        </div>
      );
    }

    // Layout para NewsFeed
    if (variantType === 'newsfeed') {
      return (
        <div className={currentVariant.layout.container}>
          <div className={currentVariant.layout.grid}>
            <div className="col-span-1">
              <DroppableColumn
                key={currentVariant.columns[0].id}
                id={currentVariant.columns[0].id}
                droppableId={currentVariant.columns[0].id}
                title={currentVariant.columns[0].title}
                articles={columns[currentVariant.columns[0].id] || []}
                maxItems={currentVariant.columns[0].maxItems}
                isDarkTheme={isDarkTheme}
                width="w-full"
                showExcerpt={true}
                isNewsFeedMain={true}
                headingProps={{
                  fontSize: '1.125rem',
                  fontWeight: '500'
                }}
                subtitleProps={{
                  fontSize: '0.875rem',
                  color: isDarkTheme ? '#9CA3AF' : '#6B7280'
                }}
              />
            </div>
            <div className="col-span-1">
              {/* Espaço para imagem destacada */}
              <div className="h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg p-4 text-center text-gray-500 dark:text-gray-400">
                Área para imagem destacada do primeiro artigo
              </div>
            </div>
            <div className="col-span-1">
              <DroppableColumn
                key={currentVariant.columns[1].id}
                id={currentVariant.columns[1].id}
                droppableId={currentVariant.columns[1].id}
                title={currentVariant.columns[1].title}
                articles={columns[currentVariant.columns[1].id] || []}
                maxItems={currentVariant.columns[1].maxItems}
                isDarkTheme={isDarkTheme}
                width="w-full"
                showExcerpt={false}
                isNewsFeedSide={true}
                headingProps={{
                  fontSize: '1rem',
                  fontWeight: '500'
                }}
                subtitleProps={{
                  fontSize: '0.75rem',
                  color: isDarkTheme ? '#9CA3AF' : '#6B7280'
                }}
              />
            </div>
          </div>
        </div>
      );
    }

    // Layout para NewsGrid
    if (variantType === 'newsgrid') {
      return (
        <div className={currentVariant.layout.container}>
          <DroppableColumn
            key={currentVariant.columns[0].id}
            id={currentVariant.columns[0].id}
            droppableId={currentVariant.columns[0].id}
            title={currentVariant.columns[0].title}
            articles={columns[currentVariant.columns[0].id] || []}
            maxItems={currentVariant.columns[0].maxItems}
            isDarkTheme={isDarkTheme}
            width="w-full"
            showExcerpt={false}
            isNewsGrid={true}
            headingProps={{
              fontSize: '1.125rem',
              fontWeight: '500'
            }}
            subtitleProps={{
              fontSize: '0.75rem',
              color: isDarkTheme ? '#9CA3AF' : '#6B7280'
            }}
          />
        </div>
      );
    }

    // Layout padrão para Standard
    return (
      <div className="space-y-4">
        {currentVariant.columns.map(column => (
          <DroppableColumn
            key={column.id}
            id={column.id}
            droppableId={column.id}
            title={column.title}
            articles={columns[column.id] || []}
            maxItems={column.maxItems}
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
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">
            Gerenciador de Grid
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
              {renderColumns()}
            </div>
          </DragDropContext>
        </div>
        <div className="lg:col-span-3">
          <LayoutPreview
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

export default GridManager; 