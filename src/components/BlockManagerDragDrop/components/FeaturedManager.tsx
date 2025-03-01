import React from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Article } from '../../PageblockV2/types';
import DroppableColumn from './DroppableColumn';
import FeaturedLayoutPreview from './FeaturedLayoutPreview';
import ArticlesPool from './ArticlesPool';
import { BlockConfig } from './StyleConfigModal';
import { useBlockState } from '../hooks/useBlockState';

interface FeaturedManagerProps {
  pageId: string;
  articles: Article[];
  isDarkTheme?: boolean;
  onSave?: (data: any) => void;
  blockConfig: BlockConfig;
  onConfigClick: () => void;
  variant?: 'hero' | 'split' | 'triple';
}

const FeaturedManager: React.FC<FeaturedManagerProps> = ({ 
  pageId,
  articles, 
  isDarkTheme, 
  onSave,
  blockConfig,
  onConfigClick,
  variant = 'hero'
}) => {
  const {
    blockState,
    updateArticlePositions,
    updateVariant,
    updateBlockConfig,
    getApiFormat
  } = useBlockState({
    pageId,
    template: 'featured',
    initialVariant: variant,
    initialArticles: articles
  });

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    const sourceCol = Array.from(blockState.articles[source.droppableId] || []);
    const destCol = source.droppableId === destination.droppableId
      ? sourceCol
      : Array.from(blockState.articles[destination.droppableId] || []);

    // Remove o item da origem
    const [removed] = sourceCol.splice(source.index, 1);

    // Adiciona o item no destino
    destCol.splice(destination.index, 0, removed);

    // Atualiza o estado
    const newColumns = {
      ...blockState.articles,
      [source.droppableId]: sourceCol,
      [destination.droppableId]: destCol
    };

    updateArticlePositions(newColumns);
  };

  const handleRemoveArticle = (columnId: string, articleId: string | number) => {
    const article = blockState.articles[columnId]?.find(a => a.id === articleId);
    
    if (!article) return;
    
    const updatedColumn = blockState.articles[columnId]?.filter(a => a.id !== articleId) || [];
    const updatedPool = [...(blockState.articles.pool || []), article];
    
    const newColumns = {
      ...blockState.articles,
      [columnId]: updatedColumn,
      pool: updatedPool
    };
    
    updateArticlePositions(newColumns);
  };

  const handleSave = () => {
    const blockData = getApiFormat();
    onSave?.(blockData);
  };

  const variants = [
    { id: 'hero', label: 'Hero', maxItems: 1 },
    { id: 'split', label: 'Split', maxItems: 2 },
    { id: 'triple', label: 'Triple', maxItems: 3 }
  ];

  const currentVariant = variants.find(v => v.id === blockState.currentVariant.variantType) || variants[0];

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
              value={blockState.currentVariant.variantType}
              onChange={(e) => updateVariant(e.target.value as 'hero' | 'split' | 'triple')}
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
        <div className="flex items-center gap-2">
          <button
            onClick={onConfigClick}
            className="px-3 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Configurar Estilos
          </button>
          <button
            onClick={handleSave}
            className="px-3 py-1.5 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Salvar
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2">
          <DragDropContext onDragEnd={handleDragEnd}>
            <div className="flex flex-col gap-4">
              <ArticlesPool
                droppableId="pool"
                articles={blockState.articles.pool || []}
                isDarkTheme={isDarkTheme}
              />
              <div className="w-full">
                <DroppableColumn
                  id="col-0"
                  droppableId="col-0"
                  title={currentVariant.label}
                  articles={blockState.articles['col-0'] || []}
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
            variantType={blockState.currentVariant.variantType}
            isDarkTheme={isDarkTheme}
            columns={blockState.articles}
            blockConfig={blockConfig}
          />
        </div>
      </div>
    </div>
  );
};

export default FeaturedManager; 