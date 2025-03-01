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

export const useBlockState = ({
  pageId,
  template,
  initialVariant,
  initialArticles,
  blockPosition = 1
}: UseBlockStateProps) => {
  // Estado local que será usado no componente
  const [blockState, setBlockState] = useState<LocalBlockState>(() => ({
    pageId,
    blockType: 'articles',
    blockPosition,
    template,
    currentVariant: {
      variantType: initialVariant,
      variantPosition: 1,
      config: {
        layout: {
          columns: '6',
          gap: '24px',
          styles: {
            width: '100%',
            backgroundColor: 'transparent'
          }
        },
        articles: {
          'pool': initialArticles.map(article => article.id),
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
      }
    },
    articles: {
      'pool': initialArticles,
      'col-0': [],
      'col-1': [],
      'col-2': []
    }
  }));

  // Função para atualizar a posição dos artigos
  const updateArticlePositions = useCallback((newColumns: { [key: string]: Article[] }) => {
    setBlockState(prev => ({
      ...prev,
      articles: newColumns,
      currentVariant: {
        ...prev.currentVariant,
        config: {
          ...prev.currentVariant.config,
          articles: Object.entries(newColumns).reduce((acc, [key, articles]) => ({
            ...acc,
            [key]: articles.map(article => article.id)
          }), {})
        }
      }
    }));
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
    setBlockState(prev => ({
      ...prev,
      currentVariant: {
        ...prev.currentVariant,
        variantPosition: position
      }
    }));
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
    setBlockState(prev => ({
      ...prev,
      currentVariant: {
        ...prev.currentVariant,
        config: {
          ...prev.currentVariant.config,
          ...config
        }
      }
    }));
  }, []);

  // Função para gerar o formato final para a API
  const getApiFormat = useCallback((): PageBlock => {
    // Remove o pool e mantém apenas as colunas de artigos
    const { pool, ...articleColumns } = blockState.currentVariant.config.articles;
    
    const variant = {
      ...blockState.currentVariant,
      config: {
        ...blockState.currentVariant.config,
        articles: articleColumns
      }
    };

    return {
      pageId: blockState.pageId,
      blockType: blockState.blockType,
      blockPosition: blockState.blockPosition,
      template: blockState.template,
      variants: [variant]
    };
  }, [blockState]);

  return {
    blockState,
    updateArticlePositions,
    updateVariant,
    updateVariantPosition,
    updateBlockPosition,
    updateBlockConfig,
    getApiFormat
  };
}; 