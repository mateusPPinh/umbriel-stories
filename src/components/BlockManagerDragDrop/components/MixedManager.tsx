import React, { useState, useEffect } from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { Article } from '../../PageblockV2/types';
import DroppableColumn from './DroppableColumn';
import MixedLayoutPreview from './MixedLayoutPreview';
import ArticlesPool from './ArticlesPool';
import { BlockConfig } from './StyleConfigModal';
import { useBlockState } from '../hooks/useBlockState';
import { VariantType } from '../types';

interface MixedManagerProps {
  pageId: string;
  articles: Article[];
  isDarkTheme?: boolean;
  onSave: (data: any) => void;
  variant?: keyof typeof LAYOUT_VARIANTS;
  blockConfig: BlockConfig;
  onConfigClick: () => void;
  isPreviewOnly?: boolean;
}

type BaseColumnId = 'col-0' | 'col-1' | 'col-2';
type ColumnId = BaseColumnId;

type VariantColumns<T extends BaseColumnId[]> = {
  [K in T[number]]: K extends keyof Record<BaseColumnId, any> ? Record<BaseColumnId, any>[K] : never;
};

interface LayoutConfig<T extends BaseColumnId[]> {
  label: string;
  maxItems: { [K in T[number]]: number };
  columnLabels: { [K in T[number]]: string };
}

type VariantConfig<T extends BaseColumnId[]> = {
  label: string;
  maxItems: { [K in T[number]]: number };
  columnLabels: { [K in T[number]]: string };
};

type LayoutVariants = {
  sidebar: VariantConfig<['col-0', 'col-1']>;
  showcase: VariantConfig<['col-0', 'col-1', 'col-2']>;
  newspaper: VariantConfig<['col-0', 'col-1', 'col-2']>;
  magazine: VariantConfig<['col-0', 'col-1', 'col-2']>;
  videogrid: VariantConfig<['col-0', 'col-1', 'col-2']>;
};

const LAYOUT_VARIANTS: LayoutVariants = {
  sidebar: {
    label: 'Sidebar',
    maxItems: {
      'col-0': 1,
      'col-1': 4,
    },
    columnLabels: {
      'col-0': 'Artigo Principal',
      'col-1': 'Sidebar',
    },
  },
  showcase: {
    label: 'Showcase',
    maxItems: {
      'col-0': 1,
      'col-1': 3,
      'col-2': 4,
    },
    columnLabels: {
      'col-0': 'Artigo Principal',
      'col-1': 'Artigos Secundários',
      'col-2': 'Artigos Secundários',
    },
  },
  newspaper: {
    label: 'Newspaper',
    maxItems: {
      'col-0': 2,
      'col-1': 4,
      'col-2': 4,
    },
    columnLabels: {
      'col-0': 'Artigos Principais',
      'col-1': 'Artigos Secundários',
      'col-2': 'Artigos Secundários',
    },
  },
  magazine: {
    label: 'Magazine',
    maxItems: {
      'col-0': 1,
      'col-1': 3,
      'col-2': 4,
    },
    columnLabels: {
      'col-0': 'Artigo Principal',
      'col-1': 'Artigos com Imagem',
      'col-2': 'Artigos Texto',
    },
  },
  videogrid: {
    label: 'Video Grid',
    maxItems: {
      'col-0': 1,
      'col-1': 2,
      'col-2': 2,
    },
    columnLabels: {
      'col-0': 'Vídeo Principal',
      'col-1': 'Title and Description',
      'col-2': 'Title and Description',
    },
  },
};

type LayoutVariant = keyof typeof LAYOUT_VARIANTS;

// Função auxiliar para verificar se uma coluna existe em um layout
const columnExistsInVariant = (columnId: string, variant: LayoutVariant): boolean => {
  return Object.keys(LAYOUT_VARIANTS[variant].maxItems).includes(columnId);
};

const MixedManager: React.FC<MixedManagerProps> = ({ 
  pageId,
  articles, 
  isDarkTheme, 
  onSave, 
  variant = 'sidebar',
  blockConfig,
  onConfigClick,
  isPreviewOnly = false
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
    template: 'mixed',
    initialArticles: articles,
    initialVariant: variant as any,
    blockPosition: 1
  });

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) return;

    const variantType = blockState.currentVariant.variantType as LayoutVariant;
    // Verificar se a variante existe no LAYOUT_VARIANTS
    if (!LAYOUT_VARIANTS[variantType]) {
      console.error(`Variante "${variantType}" não encontrada em LAYOUT_VARIANTS`);
      return;
    }
    
    const currentVariant = LAYOUT_VARIANTS[variantType];
    const destColumn = destination.droppableId as ColumnId;
    
    // Verificar se a coluna de destino existe na variante atual
    if (!Object.keys(currentVariant.maxItems).includes(destColumn)) {
      console.error(`Coluna "${destColumn}" não encontrada na variante "${variantType}"`);
      return;
    }
    
    if (
      source.droppableId !== destination.droppableId && 
      destColumn && 
      blockState.articles[destColumn] && 
      blockState.articles[destColumn].length >= (currentVariant.maxItems[destColumn as keyof typeof currentVariant.maxItems] || 0)
    ) {
      return;
    }

    // Usar spread operator para manter as referências aos objetos originais
    const sourceCol = [...blockState.articles[source.droppableId]];
    const destCol = source.droppableId === destination.droppableId
    ? sourceCol
    : [...blockState.articles[destination.droppableId]];

    // Remover o artigo da coluna de origem e manter a referência ao objeto original
    const [removed] = sourceCol.splice(source.index, 1);
    
    // Adicionar o mesmo objeto (não uma cópia) na coluna de destino
    destCol.splice(destination.index, 0, removed);

    const newColumns = {
      ...blockState.articles,
      [source.droppableId]: sourceCol,
      [destination.droppableId]: destCol
    };

    updateArticlePositions(newColumns);
  };

  const handleRemoveArticle = (columnId: string, articleId: string | number) => {
    // Encontra o artigo na coluna - garantindo que estamos usando a referência original
    const article = blockState.articles[columnId].find(a => String(a.id) === String(articleId));
    
    if (!article) return;
    
    // Remove o artigo da coluna
    const updatedColumn = blockState.articles[columnId].filter(a => String(a.id) !== String(articleId));
    
    // Adiciona o artigo de volta à pool - usando a referência original do artigo
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

  const handleVariantChange = (newVariant: LayoutVariant) => {
    updateVariant(newVariant);
  };

  // Garantir que estamos usando uma variante válida
  const variantType = blockState.currentVariant.variantType as LayoutVariant;
  const validVariantType = LAYOUT_VARIANTS[variantType] ? variantType : 'sidebar';
  const currentVariant = LAYOUT_VARIANTS[validVariantType];
  const availableColumns = Object.keys(currentVariant.maxItems) as ColumnId[];

  // Se a variante atual não for válida, atualizá-la para uma variante válida
  if (validVariantType !== variantType) {
    console.warn(`Variante "${variantType}" não encontrada, usando "sidebar" como fallback`);
    // Atualizar a variante para uma válida na próxima renderização
    setTimeout(() => updateVariant('sidebar' as VariantType), 0);
  }

  // Função para determinar as propriedades específicas de cada coluna com base na variante
  const getColumnProps = (colId: string) => {
    switch (validVariantType) {
      case 'sidebar':
        return {
          isSidebarMain: colId === 'col-0', // Artigos principais com imagem grande
          isSidebarSide: colId === 'col-1', // Artigos secundários com imagem pequena
          showExcerpt: colId === 'col-0' && blockConfig.styles.showExcerpt
        };
      case 'showcase':
        return {
          isFeatured: colId === 'col-0', // Artigo principal em destaque (1)
          isNewsFeedSide: colId === 'col-1', // Artigos em lista com imagem (2)
          isCompact: colId === 'col-2', // Artigos em lista sem imagem, só título e subtítulo (3)
          showExcerpt: blockConfig.styles.showExcerpt
        };
      case 'newspaper':
        return {
          isNewsFeedMain: colId === 'col-0', // 2 artigos principais em lista vertical
          isCompact: colId === 'col-1' || colId === 'col-2', // 4 artigos em lista vertical, só título e descrição
          hasBorder: colId === 'col-1' || colId === 'col-2', // Borda à esquerda nas colunas 2 e 3
          showExcerpt: blockConfig.styles.showExcerpt
        };
      case 'magazine':
        return {
          isMagazineMain: colId === 'col-0', // Artigo principal
          isMagazineSecondary: colId === 'col-1', // Artigos secundários com imagem
          isMagazineTertiary: colId === 'col-2', // Artigos terciários com imagem
          showExcerpt: blockConfig.styles.showExcerpt
        };
      case 'videogrid':
        return {
          isFeatured: colId === 'col-0', // Vídeo principal
          isNewsGrid: colId === 'col-1', // Title and Subtitle without image
          isNewsGrid2: colId === 'col-2', // Title and Subtitle without image
          showExcerpt: blockConfig.styles.showExcerpt
        };
      default:
        return {};
    }
  };

  // Função para determinar o layout das colunas com base na variante
  const getColumnsLayout = () => {
    switch (validVariantType) {
      case 'sidebar':
        return 'grid grid-cols-1 md:grid-cols-[2fr,1fr] gap-4';
      case 'showcase':
      case 'newspaper':
        return 'grid grid-cols-1 md:grid-cols-3 gap-4';
      case 'magazine':
        return 'grid grid-cols-1 md:grid-cols-[2fr,1fr,1fr] gap-4';
      case 'videogrid':
        return 'grid grid-cols-1 md:grid-cols-[2fr,1fr,1fr] gap-4';
      default:
        return 'space-y-4';
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {!isPreviewOnly && (
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <label htmlFor="variant-select" className="text-sm text-gray-600 dark:text-gray-400">
                Variante:
              </label>
              <select
                id="variant-select"
                value={blockState.currentVariant.variantType}
                onChange={(e) => handleVariantChange(e.target.value as LayoutVariant)}
                className="text-sm rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 focus:border-blue-500 focus:ring-blue-500"
              >
                {Object.entries(LAYOUT_VARIANTS).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value.label}
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
      )}

      {isPreviewOnly ? (
        <div className="w-full">
          <MixedLayoutPreview
            variant={validVariantType}
            columns={blockState.articles}
            isDarkTheme={isDarkTheme}
            blockConfig={blockConfig}
          />
        </div>
      ) : (
        <div className="flex h-[70vh] gap-4">
          <DragDropContext onDragEnd={handleDragEnd}>
            <div className="w-1/12 min-w-[120px] max-h-[70vh] overflow-y-auto">
              <ArticlesPool
                droppableId="pool"
                articles={blockState.articles.pool}
                isDarkTheme={isDarkTheme}
              />
            </div>
            
            <div className="w-1/3 min-w-[250px] max-h-[70vh] overflow-y-auto">
              <div className={getColumnsLayout()}>
                {availableColumns.map(colId => (
                  <DroppableColumn
                    key={colId}
                    id={colId}
                    droppableId={colId}
                    title={currentVariant.columnLabels[colId as keyof typeof currentVariant.columnLabels]}
                    articles={blockState.articles[colId] || []}
                    maxItems={currentVariant.maxItems[colId as keyof typeof currentVariant.maxItems]}
                    isDarkTheme={isDarkTheme}
                    width="w-full"
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
                    {...getColumnProps(colId)}
                  />
                ))}
              </div>
            </div>
          </DragDropContext>
          
          <div className="flex-1 max-h-[70vh] overflow-y-auto">
            <MixedLayoutPreview
              variant={validVariantType}
              columns={blockState.articles}
              isDarkTheme={isDarkTheme}
              blockConfig={blockConfig}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MixedManager; 