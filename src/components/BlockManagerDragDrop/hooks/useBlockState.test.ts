import { renderHook, act } from '@testing-library/react';
import { useBlockState } from './useBlockState';
import { Article } from '../../PageblockV2/types';

const mockArticles: Article[] = [
  {
    id: '1',
    title: 'Article 1',
    subtitle: 'Subtitle 1',
    slug: 'article-1',
    created_at: '2025-02-27 18:43:44.989767',
    content: {
      image: {
        desktop_image_path: 'https://picsum.photos/800/600'
      }
    }
  },
  {
    id: '2',
    title: 'Article 2',
    subtitle: 'Subtitle 2',
    slug: 'article-2',
    created_at: '2025-02-27 18:43:44.989767',
    content: {
      image: {
        desktop_image_path: 'https://picsum.photos/800/600'
      }
    }
  }
];

describe('useBlockState', () => {
  const defaultProps = {
    pageId: 'page-1',
    template: 'featured' as const,
    initialVariant: 'split' as const,
    initialArticles: mockArticles,
    blockPosition: 1
  };

  it('should initialize with correct default values', () => {
    const { result } = renderHook(() => useBlockState(defaultProps));

    expect(result.current.blockState).toEqual(expect.objectContaining({
      pageId: defaultProps.pageId,
      blockType: 'articles',
      blockPosition: defaultProps.blockPosition,
      template: defaultProps.template,
      currentVariant: expect.objectContaining({
        variantType: defaultProps.initialVariant,
        variantPosition: 1,
        config: expect.objectContaining({
          layout: expect.objectContaining({
            columns: '6'
          })
        })
      })
    }));
  });

  it('should update article positions correctly', () => {
    const { result } = renderHook(() => useBlockState(defaultProps));

    const newColumns = {
      'pool': [mockArticles[1]],
      'col-0': [mockArticles[0]],
      'col-1': [],
      'col-2': []
    };

    act(() => {
      result.current.updateArticlePositions(newColumns);
    });

    expect(result.current.blockState.articles).toEqual(newColumns);
    expect(result.current.blockState.currentVariant.config.articles).toEqual({
      'pool': [mockArticles[1].id],
      'col-0': [mockArticles[0].id],
      'col-1': [],
      'col-2': []
    });
  });

  it('should update variant type correctly', () => {
    const { result } = renderHook(() => useBlockState(defaultProps));

    act(() => {
      result.current.updateVariant('triple');
    });

    expect(result.current.blockState.currentVariant.variantType).toBe('triple');
  });

  it('should update variant position correctly', () => {
    const { result } = renderHook(() => useBlockState(defaultProps));

    act(() => {
      result.current.updateVariantPosition(2);
    });

    expect(result.current.blockState.currentVariant.variantPosition).toBe(2);
  });

  it('should update block position correctly', () => {
    const { result } = renderHook(() => useBlockState(defaultProps));

    act(() => {
      result.current.updateBlockPosition(3);
    });

    expect(result.current.blockState.blockPosition).toBe(3);
  });

  it('should update block config correctly', () => {
    const { result } = renderHook(() => useBlockState(defaultProps));

    const newConfig = {
      layout: {
        columns: '6',
        gap: '32px',
        styles: {
          width: '100%',
          backgroundColor: 'transparent'
        }
      }
    };

    act(() => {
      result.current.updateBlockConfig(newConfig);
    });

    expect(result.current.blockState.currentVariant.config.layout).toEqual(
      expect.objectContaining(newConfig.layout)
    );
  });

  it('should generate correct API format without pool in articles', () => {
    const { result } = renderHook(() => useBlockState(defaultProps));

    // Primeiro, vamos adicionar alguns artigos nas colunas
    act(() => {
      result.current.updateArticlePositions({
        'pool': [mockArticles[1]],
        'col-0': [mockArticles[0]],
        'col-1': [],
        'col-2': []
      });
    });

    const apiFormat = result.current.getApiFormat();

    // Verifica a estrutura geral
    expect(apiFormat).toEqual({
      pageId: defaultProps.pageId,
      blockType: 'articles',
      blockPosition: defaultProps.blockPosition,
      template: defaultProps.template,
      variants: [
        expect.objectContaining({
          variantType: defaultProps.initialVariant,
          variantPosition: 1,
          config: expect.objectContaining({
            layout: expect.objectContaining({
              columns: '6',
              gap: '24px',
              styles: expect.any(Object)
            }),
            articles: {
              'col-0': [mockArticles[0].id],
              'col-1': [],
              'col-2': []
            },
            styles: expect.any(Object)
          })
        })
      ]
    });

    // Verifica especificamente que o pool não está presente no articles do config
    const variant = apiFormat.variants[0];
    expect(variant.config.articles).not.toHaveProperty('pool');
  });

  // Tests for List variants
  describe('List variants', () => {
    const listProps = {
      pageId: 'page-1',
      template: 'list' as const,
      initialVariant: 'chronological' as const,
      initialArticles: mockArticles,
      blockPosition: 1
    };

    it('should initialize with correct list variant', () => {
      const { result } = renderHook(() => useBlockState(listProps));

      expect(result.current.blockState.currentVariant.variantType).toBe('chronological');
      expect(result.current.blockState.template).toBe('list');
    });

    it('should update to different list variant correctly', () => {
      const { result } = renderHook(() => useBlockState(listProps));

      act(() => {
        result.current.updateVariant('compact');
      });

      expect(result.current.blockState.currentVariant.variantType).toBe('compact');
    });

    it('should handle article positions for list variants correctly', () => {
      const { result } = renderHook(() => useBlockState(listProps));

      const newColumns = {
        'pool': [mockArticles[1]],
        'col-0': [mockArticles[0]]
      };

      act(() => {
        result.current.updateArticlePositions(newColumns);
      });

      expect(result.current.blockState.articles).toEqual(newColumns);
      expect(result.current.blockState.currentVariant.config.articles).toEqual({
        'pool': [mockArticles[1].id],
        'col-0': [mockArticles[0].id]
      });
    });

    it('should generate correct API format for list variants', () => {
      const { result } = renderHook(() => useBlockState(listProps));

      act(() => {
        result.current.updateArticlePositions({
          'pool': [mockArticles[1]],
          'col-0': [mockArticles[0]]
        });
      });

      const apiFormat = result.current.getApiFormat();

      expect(apiFormat).toEqual({
        pageId: listProps.pageId,
        blockType: 'articles',
        blockPosition: listProps.blockPosition,
        template: listProps.template,
        variants: [
          expect.objectContaining({
            variantType: listProps.initialVariant,
            variantPosition: 1,
            config: expect.objectContaining({
              articles: {
                'col-0': [mockArticles[0].id]
              }
            })
          })
        ]
      });
    });
  });
}); 