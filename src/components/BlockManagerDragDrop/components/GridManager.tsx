import React from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Article } from '../../PageblockV2/types';
import LayoutPreview from './LayoutPreview';
import ArticlesPool from './ArticlesPool';
import DroppableColumn from './DroppableColumn';
import { BlockConfig } from './StyleConfigModal';
import { useBlockState } from '../hooks/useBlockState';
import { GridVariantType, GridVariant, Column } from '../types';

interface GridManagerProps {
  pageId: string;
  articles: Article[];
  isDarkTheme?: boolean;
  onSave: (data: any) => void;
  variant?: GridVariantType;
  blockConfig: BlockConfig;
  onConfigClick: () => void;
}

interface HeadingProps {
  text?: string;
  fontSize: string;
  fontWeight: string;
  color: string;
}

interface SubtitleProps {
  fontSize: string;
  color: string;
}

const GRID_VARIANTS: Record<GridVariantType, GridVariant> = {
  standard: {
    id: 'standard',
    title: 'Standard Grid',
    maxItems: 6,
    columns: [
      { id: 'col-0', title: 'Column 1', width: 'w-full' },
      { id: 'col-1', title: 'Column 2', width: 'w-full' },
      { id: 'col-2', title: 'Column 3', width: 'w-full' }
    ],
    layout: {
      container: 'w-full',
      grid: 'grid grid-cols-1 md:grid-cols-3 gap-6'
    }
  },
  featured: {
    id: 'featured',
    title: 'Featured Grid',
    maxItems: 6,
    columns: [
      { id: 'col-0', title: 'Featured', width: 'w-full' },
      { id: 'col-1', title: 'Secondary', width: 'w-full' }
    ],
    layout: {
      container: 'w-full',
      grid: 'grid grid-cols-3 gap-6'
    }
  },
  masonry: {
    id: 'masonry',
    title: 'Masonry Grid',
    maxItems: 6,
    columns: [
      { id: 'col-0', title: 'Column 1', width: 'w-full' }
    ],
    layout: {
      container: 'w-full',
      grid: 'columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4'
    }
  },
  sidebargrid: {
    id: 'sidebargrid',
    title: 'Sidebar Grid',
    maxItems: 6,
    columns: [
      { id: 'col-0', title: 'Main', width: 'w-full' },
      { id: 'col-1', title: 'Sidebar', width: 'w-full' }
    ],
    layout: {
      container: 'w-full',
      wrapper: 'flex flex-col md:flex-row gap-6'
    }
  },
  newsfeed: {
    id: 'newsfeed',
    title: 'News Feed',
    maxItems: 6,
    columns: [
      { id: 'col-0', title: 'Main Feed', width: 'w-full' },
      { id: 'col-1', title: 'Side Feed', width: 'w-full' }
    ],
    layout: {
      container: 'w-full',
      grid: 'grid grid-cols-1 md:grid-cols-3 gap-6'
    }
  },
  newsgrid: {
    id: 'newsgrid',
    title: 'News Grid',
    maxItems: 6,
    columns: [
      { id: 'col-0', title: 'Column 1', width: 'w-full' },
      { id: 'col-1', title: 'Column 2', width: 'w-full' }
    ],
    layout: {
      container: 'w-full',
      grid: 'grid grid-cols-1 md:grid-cols-2 gap-6'
    }
  }
};

const GridManager: React.FC<GridManagerProps> = ({ 
  pageId,
  articles, 
  isDarkTheme = false, 
  onSave, 
  variant = 'standard',
  blockConfig,
  onConfigClick
}) => {
  const {
    blockState,
    updateArticlePositions,
    updateVariant,
    updateVariantPosition,
    updateBlockPosition,
    updateBlockConfig,
    getApiFormat
  } = useBlockState({
    pageId,
    template: 'grid',
    initialArticles: articles,
    initialVariant: variant,
    blockPosition: 1
  });

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) return;

    const currentVariant = GRID_VARIANTS[blockState.currentVariant.variantType as GridVariantType];
    const destColumn = currentVariant.columns.find(col => col.id === destination.droppableId);
    
    if (
      source.droppableId !== destination.droppableId && 
      destColumn && 
      blockState.articles[destination.droppableId] && 
      blockState.articles[destination.droppableId].length >= currentVariant.maxItems
    ) {
      return;
    }

    const sourceCol = Array.from(blockState.articles[source.droppableId]);
    const destCol = source.droppableId === destination.droppableId
      ? sourceCol
      : Array.from(blockState.articles[destination.droppableId]);

    const [removed] = sourceCol.splice(source.index, 1);
    destCol.splice(destination.index, 0, removed);

    const newColumns = {
      ...blockState.articles,
      [source.droppableId]: sourceCol,
      [destination.droppableId]: destCol
    };

    updateArticlePositions(newColumns);
  };

  const handleRemoveArticle = (columnId: string, articleId: string | number) => {
    const article = blockState.articles[columnId].find(a => a.id === articleId);
    
    if (!article) return;
    
    const updatedColumn = blockState.articles[columnId].filter(a => a.id !== articleId);
    const updatedPool = [...blockState.articles.pool, article];
    
    const newColumns = {
      ...blockState.articles,
      [columnId]: updatedColumn,
      pool: updatedPool
    };
    
    updateArticlePositions(newColumns);
  };

  const handleSave = () => {
    const data = getApiFormat();
    onSave(data);
  };

  const currentVariant = GRID_VARIANTS[blockState.currentVariant.variantType as GridVariantType];

  const getColumnHeadingProps = (column: Column): HeadingProps => ({
    text: column.title,
    fontSize: blockConfig.styles.theme[isDarkTheme ? 'dark' : 'light'].headingProps.fontSize,
    fontWeight: blockConfig.styles.theme[isDarkTheme ? 'dark' : 'light'].headingProps.fontWeight,
    color: blockConfig.styles.theme[isDarkTheme ? 'dark' : 'light'].headingProps.color
  });

  const getColumnSubtitleProps = (): SubtitleProps => ({
    fontSize: blockConfig.styles.theme[isDarkTheme ? 'dark' : 'light'].subtitleProps.fontSize,
    color: blockConfig.styles.theme[isDarkTheme ? 'dark' : 'light'].subtitleProps.color
  });

  const renderMasonryLayout = () => (
    <div className={currentVariant.layout.container}>
      <DroppableColumn
        key={currentVariant.columns[0].id}
        id={currentVariant.columns[0].id}
        droppableId={currentVariant.columns[0].id}
        title={currentVariant.columns[0].title}
        articles={blockState.articles[currentVariant.columns[0].id] || []}
        maxItems={currentVariant.maxItems}
        isDarkTheme={isDarkTheme}
        width="w-full"
        showExcerpt={blockConfig.styles.showExcerpt}
        isMasonry={true}
        headingProps={getColumnHeadingProps(currentVariant.columns[0])}
        subtitleProps={getColumnSubtitleProps()}
        onRemoveArticle={handleRemoveArticle}
      />
    </div>
  );

  const renderFeaturedLayout = () => (
    <div className={currentVariant.layout.container}>
      <div className="space-y-4">
        <DroppableColumn
          key={currentVariant.columns[0].id}
          id={currentVariant.columns[0].id}
          droppableId={currentVariant.columns[0].id}
          title={currentVariant.columns[0].title}
          articles={blockState.articles[currentVariant.columns[0].id] || []}
          maxItems={currentVariant.maxItems}
          isDarkTheme={isDarkTheme}
          width="w-full"
          showExcerpt={true}
          isFeatured={true}
          headingProps={getColumnHeadingProps(currentVariant.columns[0])}
          subtitleProps={getColumnSubtitleProps()}
          onRemoveArticle={handleRemoveArticle}
        />
        <DroppableColumn
          key={currentVariant.columns[1].id}
          id={currentVariant.columns[1].id}
          droppableId={currentVariant.columns[1].id}
          title={currentVariant.columns[1].title}
          articles={blockState.articles[currentVariant.columns[1].id] || []}
          maxItems={currentVariant.maxItems}
          isDarkTheme={isDarkTheme}
          width="w-full"
          showExcerpt={false}
          isFeatured={true}
          headingProps={getColumnHeadingProps(currentVariant.columns[1])}
          subtitleProps={getColumnSubtitleProps()}
          onRemoveArticle={handleRemoveArticle}
        />
      </div>
    </div>
  );

  const renderSidebarLayout = () => (
    <div className={currentVariant.layout.container}>
      <div className={currentVariant.layout.wrapper || ''}>
        <div className="w-full md:w-2/3">
          <DroppableColumn
            key={currentVariant.columns[0].id}
            id={currentVariant.columns[0].id}
            droppableId={currentVariant.columns[0].id}
            title={currentVariant.columns[0].title}
            articles={blockState.articles[currentVariant.columns[0].id] || []}
            maxItems={currentVariant.maxItems}
            isDarkTheme={isDarkTheme}
            width={currentVariant.columns[0].width || 'w-full'}
            showExcerpt={true}
            isSidebarMain={true}
            headingProps={getColumnHeadingProps(currentVariant.columns[0])}
            subtitleProps={getColumnSubtitleProps()}
            onRemoveArticle={handleRemoveArticle}
          />
        </div>
        <div className="w-full md:w-1/3">
          <DroppableColumn
            key={currentVariant.columns[1].id}
            id={currentVariant.columns[1].id}
            droppableId={currentVariant.columns[1].id}
            title={currentVariant.columns[1].title}
            articles={blockState.articles[currentVariant.columns[1].id] || []}
            maxItems={currentVariant.maxItems}
            isDarkTheme={isDarkTheme}
            width={currentVariant.columns[1].width || 'w-full'}
            showExcerpt={false}
            isSidebarSide={true}
            headingProps={getColumnHeadingProps(currentVariant.columns[1])}
            subtitleProps={getColumnSubtitleProps()}
            onRemoveArticle={handleRemoveArticle}
          />
        </div>
      </div>
    </div>
  );

  const renderNewsFeedLayout = () => (
    <div className={currentVariant.layout.container}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-2">
          <DroppableColumn
            key={currentVariant.columns[0].id}
            id={currentVariant.columns[0].id}
            droppableId={currentVariant.columns[0].id}
            title={currentVariant.columns[0].title}
            articles={blockState.articles[currentVariant.columns[0].id] || []}
            maxItems={currentVariant.maxItems}
            isDarkTheme={isDarkTheme}
            width="w-full"
            showExcerpt={true}
            isNewsFeedMain={true}
            headingProps={getColumnHeadingProps(currentVariant.columns[0])}
            subtitleProps={getColumnSubtitleProps()}
            onRemoveArticle={handleRemoveArticle}
          />
        </div>
        <div className="col-span-1">
          <DroppableColumn
            key={currentVariant.columns[1].id}
            id={currentVariant.columns[1].id}
            droppableId={currentVariant.columns[1].id}
            title={currentVariant.columns[1].title}
            articles={blockState.articles[currentVariant.columns[1].id] || []}
            maxItems={currentVariant.maxItems}
            isDarkTheme={isDarkTheme}
            width="w-full"
            showExcerpt={false}
            isNewsFeedSide={true}
            headingProps={getColumnHeadingProps(currentVariant.columns[1])}
            subtitleProps={getColumnSubtitleProps()}
            onRemoveArticle={handleRemoveArticle}
          />
        </div>
      </div>
    </div>
  );

  const renderStandardLayout = () => (
    <div className="space-y-4">
      {currentVariant.columns.map(column => (
        <DroppableColumn
          key={column.id}
          id={column.id}
          droppableId={column.id}
          title={column.title}
          articles={blockState.articles[column.id] || []}
          maxItems={currentVariant.maxItems}
          isDarkTheme={isDarkTheme}
          width={column.width || 'w-full'}
          showExcerpt={blockConfig.styles.showExcerpt}
          headingProps={getColumnHeadingProps(column)}
          subtitleProps={getColumnSubtitleProps()}
          onRemoveArticle={handleRemoveArticle}
        />
      ))}
    </div>
  );

  const renderColumns = () => {
    switch (blockState.currentVariant.variantType) {
      case 'masonry':
        return renderMasonryLayout();
      case 'featured':
        return renderFeaturedLayout();
      case 'sidebargrid':
        return renderSidebarLayout();
      case 'newsfeed':
        return renderNewsFeedLayout();
      default:
        return renderStandardLayout();
    }
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
              value={blockState.currentVariant.variantType}
              onChange={(e) => updateVariant(e.target.value as GridVariantType)}
              className="text-sm rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 focus:border-blue-500 focus:ring-blue-500"
            >
              {Object.values(GRID_VARIANTS).map(variant => (
                <option key={variant.id} value={variant.id}>
                  {variant.title}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleSave}
            className="px-3 py-1.5 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Salvar
          </button>
          <button
            onClick={onConfigClick}
            className="px-3 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Configurar Estilos
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2">
          <DragDropContext onDragEnd={handleDragEnd}>
            <div className="flex flex-col gap-4">
              <ArticlesPool
                droppableId="pool"
                articles={blockState.articles.pool}
                isDarkTheme={isDarkTheme}
              />
              {renderColumns()}
            </div>
          </DragDropContext>
        </div>
        <div className="lg:col-span-3">
          <LayoutPreview
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

export default GridManager; 