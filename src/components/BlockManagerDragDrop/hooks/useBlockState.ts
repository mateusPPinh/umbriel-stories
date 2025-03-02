import { useState, useCallback } from 'react';
import { Article } from '../../PageblockV2/types';
import { 
  LocalBlockState, 
  BlockVariant, 
  PageBlock, 
  TemplateType, 
  VariantType 
} from '../types';

interface UseBlockStateProps {
  pageId: string;
  template: TemplateType;
  initialVariant: VariantType;
  initialArticles: Article[];
  blockPosition?: number;
}

interface VariantState {
  variantType: VariantType;
  variantPosition: number;
  articles: {
    [key: string]: Article[];
  };
  config: BlockVariant['config'];
}

export const useBlockState = ({
  pageId,
  template,
  initialVariant,
  initialArticles,
  blockPosition = 1
}: UseBlockStateProps) => {
  // Estado local que será usado no componente
  const [blockState, setBlockState] = useState<LocalBlockState & { variantStates: { [key: string]: VariantState } }>(() => {
    const defaultConfig = {
      layout: {
        columns: '6',
        gap: '24px',
        styles: {
          width: '100%',
          backgroundColor: 'transparent'
        }
      },
      articles: {
        'pool': initialArticles.map(article => String(article.id)),
        'col-0': [],
        'col-1': [],
        'col-2': []
      },
      styles: {
        theme: {
          light: {
            columnStyle: {
              background: 'transparent',
              padding: '16px'
            },
            headingProps: {
              fontSize: 'xl',
              fontWeight: 'bold',
              color: '#1a1a1a'
            },
            subtitleProps: {
              fontSize: 'lg',
              color: '#4a5568'
            }
          },
          dark: {
            columnStyle: {
              background: 'transparent',
              padding: '16px'
            },
            headingProps: {
              fontSize: 'xl',
              fontWeight: 'bold',
              color: '#ffffff'
            },
            subtitleProps: {
              fontSize: 'lg',
              color: '#a0aec0'
            }
          }
        },
        showExcerpt: true
      }
    };

    // Inicializa o estado para cada variante
    const variantStates = {
      // Grid variants
      standard: {
        variantType: 'standard' as VariantType,
        variantPosition: 1,
        articles: {
          'pool': initialArticles,
          'col-0': [],
          'col-1': [],
          'col-2': []
        },
        config: {
          ...defaultConfig,
          articles: {
            'pool': initialArticles.map(article => String(article.id)),
            'col-0': [],
            'col-1': [],
            'col-2': []
          }
        }
      },
      featured: {
        variantType: 'featured' as VariantType,
        variantPosition: 1,
        articles: {
          'pool': initialArticles,
          'col-0': [],
          'col-1': []
        },
        config: {
          ...defaultConfig,
          articles: {
            'pool': initialArticles.map(article => String(article.id)),
            'col-0': [],
            'col-1': []
          }
        }
      },
      masonry: {
        variantType: 'masonry' as VariantType,
        variantPosition: 1,
        articles: {
          'pool': initialArticles,
          'col-0': []
        },
        config: {
          ...defaultConfig,
          articles: {
            'pool': initialArticles.map(article => String(article.id)),
            'col-0': []
          }
        }
      },
      sidebargrid: {
        variantType: 'sidebargrid' as VariantType,
        variantPosition: 1,
        articles: {
          'pool': initialArticles,
          'col-0': [],
          'col-1': []
        },
        config: {
          ...defaultConfig,
          articles: {
            'pool': initialArticles.map(article => String(article.id)),
            'col-0': [],
            'col-1': []
          }
        }
      },
      newsfeed: {
        variantType: 'newsfeed' as VariantType,
        variantPosition: 1,
        articles: {
          'pool': initialArticles,
          'col-0': [],
          'col-1': []
        },
        config: {
          ...defaultConfig,
          articles: {
            'pool': initialArticles.map(article => String(article.id)),
            'col-0': [],
            'col-1': []
          }
        }
      },
      newsgrid: {
        variantType: 'newsgrid' as VariantType,
        variantPosition: 1,
        articles: {
          'pool': initialArticles,
          'col-0': [],
          'col-1': []
        },
        config: {
          ...defaultConfig,
          articles: {
            'pool': initialArticles.map(article => String(article.id)),
            'col-0': [],
            'col-1': []
          }
        }
      },
      // Featured variants
      hero: {
        variantType: 'hero' as VariantType,
        variantPosition: 1,
        articles: {
          'pool': initialArticles,
          'col-0': []
        },
        config: {
          ...defaultConfig,
          articles: {
            'pool': initialArticles.map(article => String(article.id)),
            'col-0': []
          }
        }
      },
      split: {
        variantType: 'split' as VariantType,
        variantPosition: 1,
        articles: {
          'pool': initialArticles,
          'col-0': []
        },
        config: {
          ...defaultConfig,
          articles: {
            'pool': initialArticles.map(article => String(article.id)),
            'col-0': []
          }
        }
      },
      triple: {
        variantType: 'triple' as VariantType,
        variantPosition: 1,
        articles: {
          'pool': initialArticles,
          'col-0': []
        },
        config: {
          ...defaultConfig,
          articles: {
            'pool': initialArticles.map(article => String(article.id)),
            'col-0': []
          }
        }
      },
      // List variants
      chronological: {
        variantType: 'chronological' as VariantType,
        variantPosition: 1,
        articles: {
          'pool': initialArticles,
          'col-0': []
        },
        config: {
          ...defaultConfig,
          articles: {
            'pool': initialArticles.map(article => String(article.id)),
            'col-0': []
          }
        }
      },
      compact: {
        variantType: 'compact' as VariantType,
        variantPosition: 1,
        articles: {
          'pool': initialArticles,
          'col-0': []
        },
        config: {
          ...defaultConfig,
          articles: {
            'pool': initialArticles.map(article => String(article.id)),
            'col-0': []
          }
        }
      },
      card: {
        variantType: 'card' as VariantType,
        variantPosition: 1,
        articles: {
          'pool': initialArticles,
          'col-0': []
        },
        config: {
          ...defaultConfig,
          articles: {
            'pool': initialArticles.map(article => String(article.id)),
            'col-0': []
          }
        }
      },
      // Mixed variants
      sidebar: {
        variantType: 'sidebar' as VariantType,
        variantPosition: 1,
        articles: {
          'pool': initialArticles,
          'col-0': [],
          'col-1': []
        },
        config: {
          ...defaultConfig,
          articles: {
            'pool': initialArticles.map(article => String(article.id)),
            'col-0': [],
            'col-1': []
          }
        }
      },
      showcase: {
        variantType: 'showcase' as VariantType,
        variantPosition: 1,
        articles: {
          'pool': initialArticles,
          'col-0': [],
          'col-1': [],
          'col-2': []
        },
        config: {
          ...defaultConfig,
          articles: {
            'pool': initialArticles.map(article => String(article.id)),
            'col-0': [],
            'col-1': [],
            'col-2': []
          }
        }
      },
      newspaper: {
        variantType: 'newspaper' as VariantType,
        variantPosition: 1,
        articles: {
          'pool': initialArticles,
          'col-0': [],
          'col-1': [],
          'col-2': []
        },
        config: {
          ...defaultConfig,
          articles: {
            'pool': initialArticles.map(article => String(article.id)),
            'col-0': [],
            'col-1': [],
            'col-2': []
          }
        }
      },
      magazine: {
        variantType: 'magazine' as VariantType,
        variantPosition: 1,
        articles: {
          'pool': initialArticles,
          'col-0': [],
          'col-1': [],
          'col-2': []
        },
        config: {
          ...defaultConfig,
          articles: {
            'pool': initialArticles.map(article => String(article.id)),
            'col-0': [],
            'col-1': [],
            'col-2': []
          }
        }
      },
      videogrid: {
        variantType: 'videogrid' as VariantType,
        variantPosition: 1,
        articles: {
          'pool': initialArticles,
          'col-0': [],
          'col-1': []
        },
        config: {
          ...defaultConfig,
          articles: {
            'pool': initialArticles.map(article => String(article.id)),
            'col-0': [],
            'col-1': []
          }
        }
      }
    };

    return {
      pageId,
      blockType: 'articles',
      blockPosition,
      template,
      currentVariant: {
        variantType: initialVariant,
        variantPosition: 1,
        config: defaultConfig
      },
      articles: {
        'pool': initialArticles,
        'col-0': [],
        'col-1': [],
        'col-2': []
      },
      variantStates
    };
  });

  // Função para atualizar a posição dos artigos
  const updateArticlePositions = useCallback((newColumns: { [key: string]: Article[] }) => {
    setBlockState(prev => {
      const currentVariantType = prev.currentVariant.variantType;
      
      // Criar cópias profundas para evitar problemas de referência
      const deepCopyColumns = JSON.parse(JSON.stringify(newColumns)) as typeof newColumns;
      
      return {
        ...prev,
        variantStates: {
          ...prev.variantStates,
          [currentVariantType]: {
            ...prev.variantStates[currentVariantType],
            articles: deepCopyColumns,
            config: {
              ...prev.variantStates[currentVariantType].config,
              articles: Object.entries(deepCopyColumns).reduce<Record<string, string[]>>((acc, [key, articles]) => ({
                ...acc,
                [key]: articles.map((article: Article) => String(article.id))
              }), {})
            }
          }
        }
      };
    });
  }, []);

  // Função para atualizar a variante atual
  const updateVariant = useCallback((newVariant: VariantType) => {
    setBlockState(prev => ({
      ...prev,
      currentVariant: {
        ...prev.currentVariant,
        variantType: newVariant
      }
    }));
  }, []);

  // Função para atualizar a posição da variante
  const updateVariantPosition = useCallback((position: number) => {
    setBlockState(prev => {
      const currentVariantType = prev.currentVariant.variantType;
      
      return {
        ...prev,
        variantStates: {
          ...prev.variantStates,
          [currentVariantType]: {
            ...prev.variantStates[currentVariantType],
            variantPosition: position
          }
        }
      };
    });
  }, []);

  // Função para atualizar a posição do bloco
  const updateBlockPosition = useCallback((position: number) => {
    setBlockState(prev => ({
      ...prev,
      blockPosition: position
    }));
  }, []);

  // Função para atualizar as configurações do bloco
  const updateBlockConfig = useCallback((config: Partial<BlockVariant['config']>) => {
    setBlockState(prev => {
      const currentVariantType = prev.currentVariant.variantType;
      
      return {
        ...prev,
        variantStates: {
          ...prev.variantStates,
          [currentVariantType]: {
            ...prev.variantStates[currentVariantType],
            config: {
              ...prev.variantStates[currentVariantType].config,
              ...config
            }
          }
        }
      };
    });
  }, []);

  // Função para gerar o formato final para a API
  const getApiFormat = useCallback((): PageBlock => {
    const getMaxColumns = (variantType: VariantType): number => {
      switch (variantType) {
        // Featured variants
        case 'hero':
          return 1;
        case 'split':
          return 2;
        case 'triple':
          return 3;
        // Grid variants
        case 'standard':
          return 3;
        case 'featured':
          return 2;
        case 'masonry':
          return 1;
        case 'sidebargrid':
          return 2;
        case 'newsfeed':
          return 2;
        case 'newsgrid':
          return 2;
        // List variants
        case 'chronological':
          return 1;
        case 'compact':
          return 1;
        case 'card':
          return 1;
        // Mixed variants
        case 'sidebar':
          return 2;
        case 'showcase':
          return 3;
        case 'newspaper':
          return 3;
        case 'magazine':
          return 3;
        case 'videogrid':
          return 2;
        default:
          return 1;
      }
    };

    // Primeiro, filtramos apenas as variantes que têm artigos configurados
    const variantsWithArticles = Object.values(blockState.variantStates)
      .filter(variantState => {
        const { pool, ...articleColumns } = variantState.config.articles;
        return Object.values(articleColumns).some(articles => articles.length > 0);
      });

    // Depois, organizamos as posições para garantir que não haja conflito
    const variantsByType = variantsWithArticles.reduce((acc, variant) => {
      if (!acc[variant.variantType]) {
        acc[variant.variantType] = [];
      }
      acc[variant.variantType].push(variant);
      return acc;
    }, {} as Record<VariantType, typeof variantsWithArticles>);

    // Para cada tipo, reordenamos as posições se necessário
    Object.values(variantsByType).forEach(variants => {
      variants.forEach((variant, index) => {
        variant.variantPosition = index + 1;
      });
    });

    // Finalmente, geramos o formato final
    const variants = variantsWithArticles.map(variantState => {
      const { pool, ...articleColumns } = variantState.config.articles;
      
      // Filtra apenas as colunas que têm artigos e respeita o limite de colunas da variante
      const maxColumns = getMaxColumns(variantState.variantType);
      const filteredColumns = Object.entries(articleColumns)
        .filter(([_, articles]) => articles.length > 0)
        .slice(0, maxColumns)
        .reduce((acc, [key, articles]) => ({
          ...acc,
          [key]: articles
        }), {});
      
      return {
        variantType: variantState.variantType,
        variantPosition: variantState.variantPosition,
        config: {
          ...variantState.config,
          articles: filteredColumns
        }
      };
    });

    return {
      pageId: blockState.pageId,
      blockType: blockState.blockType,
      blockPosition: blockState.blockPosition,
      template: blockState.template,
      variants
    };
  }, [blockState]);

  // Retorna o estado atual da variante selecionada
  const getCurrentVariantState = useCallback(() => {
    return blockState.variantStates[blockState.currentVariant.variantType];
  }, [blockState.currentVariant.variantType, blockState.variantStates]);

  return {
    blockState: {
      ...blockState,
      articles: getCurrentVariantState().articles,
      currentVariant: {
        ...blockState.currentVariant,
        config: getCurrentVariantState().config
      }
    },
    updateArticlePositions,
    updateVariant,
    updateVariantPosition,
    updateBlockPosition,
    updateBlockConfig,
    getApiFormat
  };
}; 