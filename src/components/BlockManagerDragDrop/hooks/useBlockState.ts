import { useState, useCallback, useRef } from 'react';
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
  // Track drag state
  const isDraggingRef = useRef(false);
  
  // Estado local que será usado no componente
  const [blockState, setBlockState] = useState<LocalBlockState & { variantStates: { [key: string]: VariantState } }>(() => {
    const defaultConfig = {
      layout: {
        columns: '6',
        gap: '0px',
        padding: '24px',
        styles: {
          width: '100%',
          backgroundColor: 'transparent'
        },
        responsive: {
          mobile: 1,
          tablet: 1,
          desktop: 1
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
              fontSize: 'lg',
              fontWeight: 'medium',
              color: '#1a1a1a'
            },
            subtitleProps: {
              fontSize: 'sm',
              color: '#4a5568'
            },
            timelineProps: {
              color: '#3182ce',
              width: '2px',
              markerSize: '12px',
              markerColor: '#3182ce'
            }
          },
          dark: {
            columnStyle: {
              background: 'transparent',
              padding: '16px'
            },
            headingProps: {
              fontSize: 'lg',
              fontWeight: 'medium',
              color: '#ffffff'
            },
            subtitleProps: {
              fontSize: 'sm',
              color: '#a0aec0'
            },
            timelineProps: {
              color: '#63b3ed',
              width: '2px',
              markerSize: '12px',
              markerColor: '#63b3ed'
            }
          }
        },
        showExcerpt: true,
        showMetadata: true,
        showDate: true,
        timelineStyle: 'solid',
        markerStyle: 'circle',
        hoverEffect: 'highlight'
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
        config: variantStates[initialVariant].config
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

  // Função para atualizar as posições dos artigos
  const updateArticlePositions = useCallback((newArticles: { [key: string]: Article[] }) => {
    // Usar uma função de atualização de estado para garantir que estamos trabalhando com o estado mais recente
    setBlockState(prevState => {
      // Criar uma cópia profunda do estado atual para evitar mutações
      const updatedState = { ...prevState };
      
      // Atualizar o estado da variante atual
      const currentVariantState = { ...updatedState.variantStates[updatedState.currentVariant.variantType] };
      
      // Atualizar os artigos da variante atual
      currentVariantState.articles = newArticles;
      
      // Atualizar o config.articles para refletir os IDs dos artigos
      const updatedConfig = { ...currentVariantState.config };
      const updatedArticlesConfig: { [key: string]: string[] } = {};
      
      // Para cada coluna, atualizar os IDs dos artigos
      Object.keys(newArticles).forEach(columnId => {
        updatedArticlesConfig[columnId] = newArticles[columnId].map(article => 
          // Verifica se o artigo já é um ID (string) ou um objeto com ID
          typeof article === 'string' ? String(article) : String(article.id)
        );
      });
      
      // Atualizar o config com os novos IDs de artigos
      updatedConfig.articles = updatedArticlesConfig;
      currentVariantState.config = updatedConfig;
      
      // Atualizar o estado da variante no estado global
      updatedState.variantStates[updatedState.currentVariant.variantType] = currentVariantState;
      
      // Atualizar os artigos no estado global
      updatedState.articles = newArticles;
      
      return updatedState;
    });
  }, []);

  // Set drag state
  const setDragging = useCallback((isDragging: boolean) => {
    isDraggingRef.current = isDragging;
  }, []);

  // Função para atualizar a variante
  const updateVariant = useCallback((newVariantType: VariantType) => {
    // Don't update variant during drag operations
    if (isDraggingRef.current) {
      console.warn('Cannot update variant during drag operation');
      return;
    }
    
    setBlockState(prev => {
      // Verificar se a variante existe
      if (!prev.variantStates[newVariantType]) {
        console.error(`Variante "${newVariantType}" não encontrada em variantStates`);
        return prev;
      }
      
      // Obter o estado da variante
      const variantState = prev.variantStates[newVariantType];
      
      return {
        ...prev,
        articles: variantState.articles,
        currentVariant: {
          variantType: newVariantType,
          variantPosition: variantState.variantPosition,
          config: variantState.config
        }
      };
    });
  }, []);

  // Função para atualizar a posição da variante
  const updateVariantPosition = useCallback((position: number) => {
    setBlockState(prev => {
      const currentVariantType = prev.currentVariant.variantType;
      
      return {
        ...prev,
        currentVariant: {
          ...prev.currentVariant,
          variantPosition: position
        },
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
  const getApiFormat = () => {
    const { currentVariant } = blockState;
    
    // Obter o estado atual da variante
    const variantState = blockState.variantStates[currentVariant.variantType];
    
    // Obter os IDs dos artigos diretamente do config da variante
    const { articles: allArticlesConfig } = variantState.config;
    
    // Remove o pool e mantém apenas as colunas reais
    const { pool, ...columnsArticlesConfig } = allArticlesConfig;
    
    // Cria uma cópia do config sem o pool e garante que o formato está correto
    const configWithoutPool = {
      ...variantState.config,
      articles: columnsArticlesConfig
    };

    return {
      pageId: blockState.pageId,
      blockType: 'articles',
      blockPosition: blockState.blockPosition,
      template: blockState.template,
      variants: [
        {
          variantType: currentVariant.variantType,
          variantPosition: currentVariant.variantPosition,
          config: configWithoutPool
        }
      ]
    };
  };

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
    getApiFormat,
    setDragging
  };
}; 