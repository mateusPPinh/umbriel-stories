import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { Article } from '../../PageblockV2/types';
import DroppableColumn from './DroppableColumn';
import FeaturedLayoutPreview from './FeaturedLayoutPreview';
import ArticlesPool from './ArticlesPool';
import { BlockConfig } from './StyleConfigModal';
import { useBlockState } from '../hooks/useBlockState';
import { FeaturedVariantType } from '../types';
import Button from '../../Button';

interface FeaturedManagerProps {
  pageId: string;
  articles: Article[];
  isDarkTheme?: boolean;
  onSave: (data: any) => void;
  variant?: FeaturedVariantType;
  blockConfig: BlockConfig;
  onConfigClick: () => void;
  isPreviewOnly?: boolean;
}

const FeaturedManager: React.FC<FeaturedManagerProps> = ({ 
  pageId,
  articles, 
  isDarkTheme, 
  onSave, 
  variant = 'hero',
  blockConfig,
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
    template: 'featured',
    initialVariant: variant,
    initialArticles: articles
  });

  const handleDragEnd = useCallback((result: DropResult) => {
    const { source, destination } = result;
    
    // Log para depuração
    console.log('FeaturedManager - handleDragEnd - result:', result);
    console.log('FeaturedManager - handleDragEnd - source:', source);
    console.log('FeaturedManager - handleDragEnd - destination:', destination);
    
    if (!destination) return;

    // Se a origem e destino forem iguais e o índice for o mesmo, não fazer nada
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) return;

    // Verificar se a coluna de destino já atingiu o limite máximo de artigos
    // Todos os artigos vão para col-0, independente da variante
    if (
      source.droppableId !== destination.droppableId && 
      destination.droppableId === 'col-0' &&
      blockState.articles['col-0'] && 
      blockState.articles['col-0'].length >= currentVariant.maxItems
    ) {
      console.log('FeaturedManager - Limite máximo de artigos atingido:', currentVariant.maxItems);
      return;
    }

    // Usar spread operator para manter as referências aos objetos originais
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
  }, [blockState, updateArticlePositions]);

  const handleRemoveArticle = useCallback((columnId: string, articleId: string | number) => {
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
  }, [blockState, updateArticlePositions]);

  const handleSave = useCallback(() => {
    const blockData = getApiFormat();
    onSave?.(blockData);
  }, [blockState, onSave]);

  const handleVariantChange = useCallback((newVariant: FeaturedVariantType) => {
    updateVariant(newVariant);
  }, [updateVariant]);

  const variants = [
    { id: 'hero', label: 'Hero', maxItems: 1 },
    { id: 'split', label: 'Split', maxItems: 2 },
    { id: 'triple', label: 'Triple', maxItems: 3 }
  ];

  const currentVariant = variants.find(v => v.id === blockState.currentVariant.variantType) || variants[0];

  // Função memoizada para evitar cálculos repetidos
  const getUsedArticleIds = useCallback(() => {
    const usedIds: (string | number)[] = [];
    
    Object.keys(blockState.articles).forEach(colKey => {
      if (colKey !== 'pool') {
        blockState.articles[colKey].forEach(article => {
          usedIds.push(article.id);
        });
      }
    });
    
    return usedIds;
  }, [blockState.articles]);

  // Determinar se devemos mostrar a coluna secundária com base na variante
  const shouldShowSecondaryColumn = false; // Removemos a coluna secundária, todos os artigos vão para col-0

  // Memoizar o conteúdo renderizado para evitar re-renderizações desnecessárias
  const renderContent = useMemo(() => {
    // Log para depuração
    console.log('FeaturedManager - blockState:', blockState);
    console.log('FeaturedManager - currentVariant:', blockState.currentVariant);
    console.log('FeaturedManager - articles col-0:', blockState.articles['col-0']);
    
    if (isPreviewOnly) {
      return (
        <div className="w-full">
          <FeaturedLayoutPreview
            variantType={blockState.currentVariant.variantType}
            columns={blockState.articles}
            isDarkTheme={isDarkTheme}
            blockConfig={blockConfig}
          />
        </div>
      );
    }
    
    return (
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Área de artigos disponíveis */}
          <div className="md:col-span-1">
            <ArticlesPool
              articles={blockState.articles.pool}
              isDarkTheme={isDarkTheme}
              blockConfig={blockConfig}
              usedArticleIds={getUsedArticleIds()}
              isCompact={true}
            />
          </div>
          
          {/* Área de colunas e preview */}
          <div className="md:col-span-2">
            <div className="mb-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <label htmlFor="variant-select" className="text-sm text-gray-600 dark:text-gray-400">
                      Variante:
                    </label>
                    <select
                      id="variant-select"
                      value={blockState.currentVariant.variantType}
                      onChange={(e) => handleVariantChange(e.target.value as FeaturedVariantType)}
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
                  <Button
                    onClick={handleSave}
                    variant="primary"
                  >
                    Salvar
                  </Button>
                  <Button
                    onClick={onConfigClick}
                    variant="secondary"
                  >
                    Configurar Estilos
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Layout em duas colunas para DroppableColumn e Preview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Coluna para os artigos */}
              <div>
                <DroppableColumn
                  columnId="col-0"
                  label={shouldShowSecondaryColumn ? 'Artigo Principal' : 'Artigos em destaque'}
                  articles={blockState.articles['col-0'] || []}
                  maxItems={currentVariant.maxItems}
                  isDarkTheme={isDarkTheme}
                  blockConfig={blockConfig}
                  handleRemoveArticle={handleRemoveArticle}
                  variant={blockState.currentVariant.variantType}
                  useCompactView={true}
                />
              </div>
              
              {/* Coluna para o preview */}
              <div>
                <FeaturedLayoutPreview
                  variantType={blockState.currentVariant.variantType}
                  columns={blockState.articles}
                  isDarkTheme={isDarkTheme}
                  blockConfig={blockConfig}
                />
              </div>
            </div>
          </div>
        </div>
      </DragDropContext>
    );
  }, [
    articles, 
    blockState, 
    blockConfig, 
    handleDragEnd, 
    handleRemoveArticle, 
    isDarkTheme, 
    isPreviewOnly, 
    currentVariant, 
    shouldShowSecondaryColumn, 
    getUsedArticleIds,
    handleSave,
    onConfigClick
  ]);
  
  return (
    <div className="featured-manager">
      {renderContent}
    </div>
  );
};

// Exportar com memo para evitar re-renders desnecessários
export default React.memo(FeaturedManager); 