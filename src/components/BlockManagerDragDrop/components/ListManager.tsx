import React, { useState, useEffect } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Article } from '../../PageblockV2/types';
import DroppableColumn from './DroppableColumn';
import ListLayoutPreview from './ListLayoutPreview';
import ArticlesPool from './ArticlesPool';
import { BlockConfig } from './StyleConfigModal';

interface ListBlockConfig {
  articles: Record<string, Article[]>;
  variant?: 'chronological' | 'compact' | 'thumbnail';
  layout: {
    columns: number;
    gap: string;
    styles: {
      grid: {
        autoRows: string;
        templateColumns: string;
      };
      width: string;
      columnStyles: Record<string, any>;
      backgroundColor: string;
      gridFlow?: string;
      minColumnWidth?: string;
    };
    padding: string;
    imageSize: string;
    responsive: {
      mobile: number;
      tablet: number;
      desktop: number;
    };
    aspectRatio: string;
  };
  mediaConfig: {
    type: string;
    customUrl: string;
    videoConfig?: {
      loop: boolean;
      muted: boolean;
      autoplay: boolean;
      controls: boolean;
    };
    useArticleMedia: boolean;
  };
  styles: {
    theme: {
      light: {
        columnStyle: {
          background: string;
        };
        headingProps: {
          fontSize: string;
          fontWeight?: number;
          color: string;
        };
        subtitleProps: {
          fontSize: string;
          color: string;
        };
      };
      dark: {
        columnStyle: {
          background: string;
        };
        headingProps: {
          fontSize: string;
          fontWeight?: number;
          color: string;
        };
        subtitleProps: {
          fontSize: string;
          color: string;
        };
      };
    };
    showExcerpt: boolean;
    showMetadata: boolean;
    titleSize: string;
    columnStyle: Record<string, any>;
    imageHeight: string;
    timelineStyle?: 'solid' | 'dashed' | 'dotted';
    markerStyle?: 'circle' | 'square' | 'diamond';
    hoverEffect?: 'highlight' | 'scale' | 'background' | 'translate' | 'none';
    dividerStyle?: 'solid' | 'dashed' | 'dotted';
    thumbnailShape?: 'square' | 'rounded' | 'circle';
  };
}

interface ListManagerProps {
  articles: Article[];
  isDarkTheme?: boolean;
  onSave: (columns: { [key: string]: Article[] }) => void;
  variant?: string;
  blockConfig: BlockConfig;
  onConfigClick: () => void;
}

const ListManager: React.FC<ListManagerProps> = ({ 
  articles, 
  isDarkTheme, 
  onSave, 
  variant = 'chronological',
  blockConfig: initialBlockConfig,
  onConfigClick
}) => {
  const [variantType, setVariantType] = useState<string>(variant);
  const [columns, setColumns] = useState<{ [key: string]: Article[] }>({
    'pool': articles,
    'col-0': []
  });
  const [blockConfig, setBlockConfig] = useState<ListBlockConfig>({
    articles: { 'col-0': columns['col-0'] },
    variant: variantType as 'chronological' | 'compact' | 'thumbnail',
    layout: {
      columns: 1,
      gap: '1rem',
      styles: {
        grid: {
          autoRows: 'auto',
          templateColumns: '1fr'
        },
        width: '100%',
        columnStyles: {},
        backgroundColor: 'transparent'
      },
      padding: '1rem',
      imageSize: '100%',
      responsive: {
        mobile: 1,
        tablet: 1,
        desktop: 1
      },
      aspectRatio: '16/9'
    },
    mediaConfig: {
      type: 'image',
      customUrl: '',
      videoConfig: {
        loop: false,
        muted: true,
        autoplay: false,
        controls: true
      },
      useArticleMedia: true
    },
    styles: {
      theme: {
        light: {
          columnStyle: {
            background: '#ffffff'
          },
          headingProps: {
            fontSize: '1.125rem',
            fontWeight: 500,
            color: '#111827'
          },
          subtitleProps: {
            fontSize: '0.875rem',
            color: '#6B7280'
          }
        },
        dark: {
          columnStyle: {
            background: '#1F2937'
          },
          headingProps: {
            fontSize: '1.125rem',
            fontWeight: 500,
            color: '#F9FAFB'
          },
          subtitleProps: {
            fontSize: '0.875rem',
            color: '#9CA3AF'
          }
        }
      },
      showExcerpt: true,
      showMetadata: true,
      titleSize: 'text-lg',
      columnStyle: {},
      imageHeight: 'h-48',
      timelineStyle: 'solid',
      markerStyle: 'circle',
      hoverEffect: 'highlight',
      dividerStyle: 'solid',
      thumbnailShape: 'rounded'
    }
  });

  // Atualiza o blockConfig quando a variante muda
  useEffect(() => {
    setBlockConfig(prev => ({
      ...prev,
      variant: variantType as 'chronological' | 'compact' | 'thumbnail',
      articles: { 'col-0': columns['col-0'] }
    }));
  }, [variantType, columns]);

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

  // Função para remover um artigo de uma coluna e devolvê-lo para a pool
  const handleRemoveArticle = (columnId: string, articleId: string | number) => {
    // Encontra o artigo na coluna
    const article = columns[columnId].find(a => a.id === articleId);
    
    if (!article) return;
    
    // Remove o artigo da coluna
    const updatedColumn = columns[columnId].filter(a => a.id !== articleId);
    
    // Adiciona o artigo de volta à pool
    const updatedPool = [...columns.pool, article];
    
    // Atualiza o estado
    const newColumns = {
      ...columns,
      [columnId]: updatedColumn,
      pool: updatedPool
    };
    
    setColumns(newColumns);
    onSave(newColumns);
  };

  const variants = [
    { id: 'chronological', label: 'Timeline', maxItems: 10 },
    { id: 'compact', label: 'Lista Compacta', maxItems: 15 },
    { id: 'thumbnail', label: 'Cards', maxItems: 8 }
  ];

  const currentVariant = variants.find(v => v.id === variantType) || variants[0];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">
            Gerenciador de Lista
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
          className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
        >
          Configurar
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
                  title="Lista de Artigos"
                  articles={columns['col-0']}
                  maxItems={currentVariant.maxItems}
                  isDarkTheme={isDarkTheme}
                  onRemoveArticle={handleRemoveArticle}
                  width="w-full"
                />
              </div>
            </div>
          </DragDropContext>
        </div>

        <div className="lg:col-span-3">
          <ListLayoutPreview
            blockConfig={blockConfig}
            columns={[columns['col-0']]}
          />
        </div>
      </div>
    </div>
  );
};

export default ListManager; 