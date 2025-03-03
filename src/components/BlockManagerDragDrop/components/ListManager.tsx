import React, { useState, useEffect, useCallback } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { Article } from '../../PageblockV2/types';
import DroppableColumn from './DroppableColumn';
import ListLayoutPreview from './ListLayoutPreview';
import ArticlesPool from './ArticlesPool';
import { BlockConfig } from './StyleConfigModal';
import { useBlockState } from '../hooks/useBlockState';
import { ListVariantType } from '../types';
import { adaptBlockConfig } from '../utils/adapters';
import Button from '../../../components/Button';

// Definição dos tipos de variantes de layout
const LAYOUT_VARIANTS = {
  chronological: {
    label: 'Cronológico',
    maxItems: 10
  },
  compact: {
    label: 'Compacto',
    maxItems: 10
  },
  card: {
    label: 'Cartão',
    maxItems: 10
  }
};

type LayoutVariant = keyof typeof LAYOUT_VARIANTS;

interface ListBlockConfig {
  articles: Record<string, Article[]>;
  variant?: 'chronological' | 'compact' | 'card';
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
  pageId: string;
  articles: Article[];
  isDarkTheme?: boolean;
  onSave: (data: any) => void;
  variant?: ListVariantType;
  blockConfig: BlockConfig;
  onConfigClick: () => void;
  isPreviewOnly?: boolean;
}

const ListManager = ({ 
  pageId,
  articles, 
  isDarkTheme, 
  onSave, 
  variant = 'chronological',
  blockConfig: externalBlockConfig,
  onConfigClick,
  isPreviewOnly = false
}: ListManagerProps) => {
  const {
    blockState,
    updateArticlePositions,
    updateVariant,
    updateBlockConfig,
    getApiFormat
  } = useBlockState({
    pageId,
    template: 'list',
    initialVariant: variant as ListVariantType,
    initialArticles: articles
  });

  const [blockConfig, setBlockConfig] = useState<ListBlockConfig>({
    articles: { 'col-0': blockState.articles['col-0'] || [] },
    variant: blockState.currentVariant.variantType as 'chronological' | 'compact' | 'card',
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
      variant: blockState.currentVariant.variantType as 'chronological' | 'compact' | 'card',
      articles: { 'col-0': blockState.articles['col-0'] || [] }
    }));
  }, [blockState.currentVariant.variantType, blockState.articles]);

  // Garantir que estamos usando uma variante válida
  const variantType = blockState.currentVariant.variantType as LayoutVariant;
  const validVariantType = LAYOUT_VARIANTS[variantType] ? variantType : 'chronological';
  
  // Usar useEffect para atualizar a variante se necessário
  useEffect(() => {
    if (validVariantType !== variantType) {
      console.warn(`Variante "${variantType}" não encontrada, usando "chronological" como fallback`);
      updateVariant('chronological' as ListVariantType);
    }
  }, [variantType, validVariantType, updateVariant]);

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    // Se não houver destino, não fazer nada
    if (!destination) return;

    // Se a origem e destino forem iguais e o índice for o mesmo, não fazer nada
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) return;

    // Verificar se a coluna de destino já atingiu o limite máximo de artigos
    if (
      source.droppableId !== destination.droppableId && 
      destination.droppableId === 'col-0' && 
      blockState.articles['col-0'] && 
      blockState.articles['col-0'].length >= LAYOUT_VARIANTS[validVariantType].maxItems
    ) {
      return;
    }

    // Copia os arrays de origem e destino mantendo as referências aos objetos originais
    const sourceCol = [...(blockState.articles[source.droppableId] || [])];
    const destCol = source.droppableId === destination.droppableId
      ? sourceCol
      : [...(blockState.articles[destination.droppableId] || [])];

    // Remove o item da origem e mantém a referência ao objeto original
    const [removed] = sourceCol.splice(source.index, 1);

    // Adiciona o mesmo objeto (não uma cópia) no destino
    destCol.splice(destination.index, 0, removed);

    // Atualiza o estado
    const newColumns = {
      ...blockState.articles,
      [source.droppableId]: sourceCol,
      [destination.droppableId]: destCol
    };

    updateArticlePositions(newColumns);
  };

  // Função para remover um artigo de uma coluna e devolvê-lo para a pool
  const handleRemoveArticle = (columnId: string, articleId: string | number) => {
    // Encontra o artigo na coluna - garantindo que estamos usando a referência original
    const article = blockState.articles[columnId]?.find(a => String(a.id) === String(articleId));
    
    if (!article) return;
    
    // Remove o artigo da coluna
    const updatedColumn = blockState.articles[columnId]?.filter(a => String(a.id) !== String(articleId)) || [];
    
    // Adiciona o artigo de volta à pool - usando a referência original do artigo
    const updatedPool = [...(blockState.articles.pool || []), article];
    
    // Atualiza o estado
    const newColumns = {
      ...blockState.articles,
      [columnId]: updatedColumn,
      pool: updatedPool
    };
    
    updateArticlePositions(newColumns);
  };

  // Mover a função getUsedArticleIds para dentro do componente e usar useCallback
  const getUsedArticleIds = useCallback(() => {
    const usedIds: (string | number)[] = [];
    
    // Percorre todas as colunas disponíveis e coleta os IDs dos artigos
    Object.keys(blockState.articles).forEach(colId => {
      if (colId !== 'pool') {
        const columnArticles = blockState.articles[colId] || [];
        columnArticles.forEach(article => {
          usedIds.push(article.id);
        });
      }
    });
    
    return usedIds;
  }, [blockState.articles]);

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
                onChange={(e) => updateVariant(e.target.value as ListVariantType)}
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
            <Button variant="primary" onClick={() => onSave(getApiFormat())}>
              Salvar
            </Button>
            <Button variant="info" onClick={onConfigClick}>
              Configurar Estilos
            </Button>
          </div>
        </div>
      )}

      {isPreviewOnly ? (
        <div className="w-full">
          <ListLayoutPreview
            variant={validVariantType}
            articles={blockState.articles['col-0'] || []}
            isDarkTheme={isDarkTheme}
            blockConfig={adaptBlockConfig(externalBlockConfig) as any}
          />
        </div>
      ) : (
        <div className="flex h-[70vh] gap-4">
          <DragDropContext onDragEnd={handleDragEnd}>
            <div className="w-1/6 min-w-[180px] max-h-[70vh] overflow-y-auto">
              <ArticlesPool
                articles={blockState.articles.pool}
                isDarkTheme={isDarkTheme}
                blockConfig={adaptBlockConfig(externalBlockConfig) as any}
                usedArticleIds={getUsedArticleIds()}
                isCompact={true}
              />
            </div>
            
            <div className="w-1/4 min-w-[250px] max-h-[70vh] overflow-y-auto">
              <DroppableColumn
                columnId="col-0"
                articles={blockState.articles['col-0'] || []}
                isDarkTheme={isDarkTheme}
                label="Artigos da Lista"
                maxItems={LAYOUT_VARIANTS[validVariantType].maxItems}
                blockConfig={adaptBlockConfig(externalBlockConfig) as any}
                handleRemoveArticle={handleRemoveArticle}
                variant={validVariantType}
                useCompactView={true}
              />
            </div>
          </DragDropContext>
          
          <div className="flex-1 max-h-[70vh] overflow-y-auto">
            <ListLayoutPreview
              variant={validVariantType}
              articles={blockState.articles['col-0'] || []}
              isDarkTheme={isDarkTheme}
              blockConfig={adaptBlockConfig(externalBlockConfig) as any}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(ListManager); 