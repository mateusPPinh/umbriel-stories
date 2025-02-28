import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { Article, PageBlock } from '../PageblockV2/types';
import LayoutPreview from './components/LayoutPreview';
import DraggableArticle from './components/DraggableArticle';
import DroppableColumn from './components/DroppableColumn';
import ArticlesPool from './components/ArticlesPool';

export interface BlockManagerDragDropProps {
  blockType: 'grid';
  variantType: 'standard' | 'featured' | 'masonry' | 'sidebargrid' | 'newsfeed' | 'newsgrid';
  articles: Article[];
  onUpdateBlock: (config: any) => void;
  currentConfig?: any;
  isDarkTheme?: boolean;
}

interface ColumnConfig {
  id: string;
  maxItems: number;
  title: string;
  width: string;
}

// Configurações específicas para cada variante do Grid
const GRID_VARIANT_CONFIGS: Record<string, { columns: ColumnConfig[] }> = {
  standard: {
    columns: [
      { id: 'col-0', maxItems: 6, title: 'Grade Principal', width: 'w-full' }
    ]
  },
  featured: {
    columns: [
      { id: 'col-0', maxItems: 3, title: 'Artigos em Destaque', width: 'w-full' }
    ]
  },
  masonry: {
    columns: [
      { id: 'col-0', maxItems: 3, title: 'Coluna 1', width: 'w-full md:w-1/3' },
      { id: 'col-1', maxItems: 3, title: 'Coluna 2', width: 'w-full md:w-1/3' },
      { id: 'col-2', maxItems: 3, title: 'Coluna 3', width: 'w-full md:w-1/3' }
    ]
  },
  sidebargrid: {
    columns: [
      { id: 'col-0', maxItems: 2, title: 'Conteúdo Principal', width: 'w-full md:w-2/3' },
      { id: 'col-1', maxItems: 3, title: 'Barra Lateral', width: 'w-full md:w-1/3' }
    ]
  },
  newsgrid: {
    columns: [
      { id: 'col-0', maxItems: 3, title: 'Coluna Principal', width: 'w-full md:w-1/5' },
      { id: 'col-1', maxItems: 3, title: 'Segunda Coluna', width: 'w-full md:w-1/5' },
      { id: 'col-2', maxItems: 3, title: 'Terceira Coluna', width: 'w-full md:w-1/5' },
      { id: 'col-3', maxItems: 3, title: 'Quarta Coluna', width: 'w-full md:w-1/5' },
      { id: 'col-4', maxItems: 3, title: 'Quinta Coluna', width: 'w-full md:w-1/5' }
    ]
  },
  newsfeed: {
    columns: [
      { id: 'col-0', maxItems: 3, title: 'Coluna Principal', width: 'w-full md:w-1/2' },
      { id: 'col-1', maxItems: 4, title: 'Coluna Lateral', width: 'w-full md:w-1/2' }
    ]
  }
};

const BlockManagerDragDrop: React.FC<BlockManagerDragDropProps> = ({
  blockType,
  variantType,
  articles,
  onUpdateBlock,
  currentConfig,
  isDarkTheme
}) => {
  const [columns, setColumns] = React.useState<{ [key: string]: Article[] }>(() => {
    // Inicializa as colunas com os artigos existentes ou arrays vazios
    const variantConfig = GRID_VARIANT_CONFIGS[variantType];
    if (!variantConfig) return {};

    const initialColumns: { [key: string]: Article[] } = {};
    variantConfig.columns.forEach(column => {
      initialColumns[column.id] = currentConfig?.articles?.[column.id] || [];
    });

    return initialColumns;
  });

  const handleDragEnd = (result: any) => {
    const { source, destination } = result;

    // Dropped outside a valid drop zone
    if (!destination) return;

    // Get column config for validation
    const variantConfig = GRID_VARIANT_CONFIGS[variantType];
    const destColumn = variantConfig.columns.find(col => col.id === destination.droppableId);

    // Validate max items in destination column
    if (destColumn && columns[destination.droppableId].length >= destColumn.maxItems) {
      return; // Could add a visual feedback here
    }

    // If source is articles pool
    if (source.droppableId === 'articles-pool') {
      // Get the dragged article
      const draggedArticle = articles[source.index];
      
      // Add to destination column
      const destColumnArticles = [...columns[destination.droppableId]];
      destColumnArticles.splice(destination.index, 0, draggedArticle);

      setColumns({
        ...columns,
        [destination.droppableId]: destColumnArticles
      });
    }
    // If moving between columns
    else {
      // Same column move
      if (source.droppableId === destination.droppableId) {
        const column = [...columns[source.droppableId]];
        const [removed] = column.splice(source.index, 1);
        column.splice(destination.index, 0, removed);
        
        setColumns({
          ...columns,
          [source.droppableId]: column
        });
      } 
      // Cross column move
      else {
        const sourceColumn = [...columns[source.droppableId]];
        const destColumn = [...columns[destination.droppableId]];
        const [removed] = sourceColumn.splice(source.index, 1);
        destColumn.splice(destination.index, 0, removed);

        setColumns({
          ...columns,
          [source.droppableId]: sourceColumn,
          [destination.droppableId]: destColumn
        });
      }
    }

    // Update parent component
    onUpdateBlock({
      articles: columns
    });
  };

  const variantConfig = GRID_VARIANT_CONFIGS[variantType];
  if (!variantConfig) return null;

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="w-full p-4">
        <div className="flex flex-wrap -mx-2">
          {/* Layout Preview */}
          <div className="w-full p-2 mb-4">
            <LayoutPreview 
              variantType={variantType} 
              isDarkTheme={isDarkTheme}
              columns={columns}
            />
          </div>

          {/* Available Articles Pool */}
          <div className="w-full p-2 mb-4">
            <h3 className={`text-lg font-medium mb-2 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
              Artigos Disponíveis
            </h3>
            <ArticlesPool articles={articles} isDarkTheme={isDarkTheme} />
          </div>

          {/* Grid Columns */}
          {variantConfig.columns.map((column) => (
            <DroppableColumn
              key={column.id}
              id={column.id}
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
  );
};

export default BlockManagerDragDrop;
