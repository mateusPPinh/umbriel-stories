import React, { useState, useEffect } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Article } from '../../PageblockV2/types';
import DroppableColumn from './DroppableColumn';
import ListLayoutPreview from './ListLayoutPreview';
import ArticlesPool from './ArticlesPool';
import { BlockConfig } from './StyleConfigModal';
import { useBlockState } from '../hooks/useBlockState';
import { ListVariantType } from '../types';

// Definição do tipo ExtendedBlockConfig para compatibilidade com ListLayoutPreview
type MarkerStyle = 'circle' | 'square' | 'diamond';
type HoverEffect = 'highlight' | 'scale' | 'background' | 'translate' | 'none';
type DividerStyle = 'solid' | 'dashed' | 'dotted';
type ThumbnailShape = 'square' | 'rounded' | 'circle';

interface ExtendedBlockConfig {
  layout: {
    columns: string;
    gap: string;
    styles: {
      width: string;
      backgroundColor: string;
    }
  };
  styles: {
    theme: {
      light: {
        columnStyle: {
          background: string;
          padding: string;
        };
        headingProps: {
          fontSize: string;
          fontWeight: string | number;
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
          padding: string;
        };
        headingProps: {
          fontSize: string;
          fontWeight: string | number;
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
    markerStyle?: MarkerStyle;
    hoverEffect?: HoverEffect;
    dividerStyle?: DividerStyle;
    thumbnailShape?: ThumbnailShape;
  };
  variant?: 'chronological' | 'compact' | 'card';
  mediaConfig?: {
    type?: string;
    customUrl?: string;
    videoConfig?: {
      loop: boolean;
      muted: boolean;
      autoplay: boolean;
      controls: boolean;
    };
    useArticleMedia?: boolean;
  };
}

// Função para adaptar BlockConfig para ExtendedBlockConfig
const adaptBlockConfig = (config: BlockConfig): ExtendedBlockConfig => {
  return {
    layout: config.layout,
    styles: {
      theme: {
        light: {
          columnStyle: {
            background: config.styles.theme.light.columnStyle?.background || '#ffffff',
            padding: config.styles.theme.light.columnStyle?.padding || '1rem'
          },
          headingProps: {
            fontSize: config.styles.theme.light.headingProps?.fontSize || '1.125rem',
            fontWeight: config.styles.theme.light.headingProps?.fontWeight || 500,
            color: config.styles.theme.light.headingProps?.color || '#111827'
          },
          subtitleProps: {
            fontSize: config.styles.theme.light.subtitleProps?.fontSize || '0.875rem',
            color: config.styles.theme.light.subtitleProps?.color || '#6B7280'
          }
        },
        dark: {
          columnStyle: {
            background: config.styles.theme.dark.columnStyle?.background || '#1F2937',
            padding: config.styles.theme.dark.columnStyle?.padding || '1rem'
          },
          headingProps: {
            fontSize: config.styles.theme.dark.headingProps?.fontSize || '1.125rem',
            fontWeight: config.styles.theme.dark.headingProps?.fontWeight || 500,
            color: config.styles.theme.dark.headingProps?.color || '#F9FAFB'
          },
          subtitleProps: {
            fontSize: config.styles.theme.dark.subtitleProps?.fontSize || '0.875rem',
            color: config.styles.theme.dark.subtitleProps?.color || '#9CA3AF'
          }
        }
      },
      showExcerpt: config.styles.showExcerpt,
      showMetadata: config.styles.showMetadata || true,
      titleSize: config.styles.titleSize || 'text-lg',
      columnStyle: {},
      imageHeight: 'h-48',
      timelineStyle: config.styles.timelineStyle,
      markerStyle: config.styles.markerStyle as MarkerStyle,
      hoverEffect: config.styles.hoverEffect as HoverEffect,
      dividerStyle: config.styles.dividerStyle as DividerStyle,
      thumbnailShape: config.styles.thumbnailShape as ThumbnailShape
    },
    variant: config.variant as 'chronological' | 'compact' | 'card',
    mediaConfig: config.mediaConfig
  };
};

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

const ListManager: React.FC<ListManagerProps> = ({ 
  pageId,
  articles, 
  isDarkTheme, 
  onSave, 
  variant = 'chronological',
  blockConfig: externalBlockConfig,
  onConfigClick,
  isPreviewOnly = false
}) => {
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

  // Obtém o tipo de variante válido e garante que seja uma chave válida em LAYOUT_VARIANTS
  const rawVariantType = blockState.currentVariant.variantType as string;
  const isValidVariant = Object.keys(LAYOUT_VARIANTS).includes(rawVariantType);
  const validVariantType = isValidVariant ? rawVariantType as LayoutVariant : 'chronological';

  // Se a variante atual não for válida, atualizá-la para uma variante válida
  useEffect(() => {
    if (!isValidVariant) {
      console.warn(`Variante "${rawVariantType}" não encontrada, usando "chronological" como fallback`);
      updateVariant('chronological' as ListVariantType);
    }
  }, [rawVariantType, isValidVariant, updateVariant]);

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

  // Função para remover um artigo de uma coluna e devolvê-lo para a pool
  const handleRemoveArticle = (columnId: string, articleId: string | number) => {
    // Encontra o artigo na coluna
    const article = blockState.articles[columnId]?.find(a => a.id === articleId);
    
    if (!article) return;
    
    // Remove o artigo da coluna
    const updatedColumn = blockState.articles[columnId]?.filter(a => a.id !== articleId) || [];
    
    // Adiciona o artigo de volta à pool
    const updatedPool = [...(blockState.articles.pool || []), article];
    
    // Atualiza o estado
    const newColumns = {
      ...blockState.articles,
      [columnId]: updatedColumn,
      pool: updatedPool
    };
    
    updateArticlePositions(newColumns);
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
            <button
              onClick={() => onSave(getApiFormat())}
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
          <ListLayoutPreview
            variant={validVariantType}
            articles={blockState.articles['col-0'] || []}
            isDarkTheme={isDarkTheme}
            blockConfig={adaptBlockConfig(externalBlockConfig) as any}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-2">
            <DragDropContext onDragEnd={handleDragEnd}>
              <div className="flex flex-col gap-4">
                <ArticlesPool
                  droppableId="pool"
                  articles={blockState.articles.pool}
                  isDarkTheme={isDarkTheme}
                />
                <DroppableColumn
                  id="col-0"
                  droppableId="col-0"
                  title="Artigos da Lista"
                  articles={blockState.articles['col-0'] || []}
                  maxItems={LAYOUT_VARIANTS[validVariantType].maxItems}
                  isDarkTheme={isDarkTheme}
                  width="w-full"
                  headingProps={{
                    fontSize: externalBlockConfig.styles.theme[isDarkTheme ? 'dark' : 'light'].headingProps.fontSize,
                    fontWeight: externalBlockConfig.styles.theme[isDarkTheme ? 'dark' : 'light'].headingProps.fontWeight,
                    color: externalBlockConfig.styles.theme[isDarkTheme ? 'dark' : 'light'].headingProps.color
                  }}
                  subtitleProps={{
                    fontSize: externalBlockConfig.styles.theme[isDarkTheme ? 'dark' : 'light'].subtitleProps.fontSize,
                    color: externalBlockConfig.styles.theme[isDarkTheme ? 'dark' : 'light'].subtitleProps.color
                  }}
                  onRemoveArticle={handleRemoveArticle}
                />
              </div>
            </DragDropContext>
          </div>
          <div className="lg:col-span-3">
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

export default ListManager; 